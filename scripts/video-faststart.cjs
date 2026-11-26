// Web copy of a video with its index ("moov" box) at the front of the file ("fast start").
//
// Phones and cameras often save MP4s with the index at the end. A browser then has to fetch the
// end of the file before it can show even the first frame, so on a slow connection the video sits
// black. This rewrites the file with the index first (the same thing `qt-faststart` and
// `ffmpeg -movflags +faststart` do). No re-encoding: picture and sound are byte-for-byte the same.
//
// The original is only read. The copy goes to public/images/web-video/ (git-ignored, rebuilt by
// every build) with a content hash in its name. If the file is already fast-start, or anything about
// it is unexpected, the original URL is returned unchanged.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'images', 'web-video');
const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf', 'mvex', 'udta']);

function readBoxes(buf, start, end) {
  const boxes = [];
  let pos = start;
  while (pos + 8 <= end) {
    let size = buf.readUInt32BE(pos);
    const type = buf.toString('latin1', pos + 4, pos + 8);
    let header = 8;
    if (size === 1) {
      size = Number(buf.readBigUInt64BE(pos + 8));
      header = 16;
    } else if (size === 0) {
      size = end - pos;
    }
    if (size < header || pos + size > end) throw new Error(`bad box ${type} at ${pos}`);
    boxes.push({ type, start: pos, size, header });
    pos += size;
  }
  return boxes;
}

// Adds `delta` to every chunk offset (stco / co64) inside the moov box
function shiftChunkOffsets(moov, delta) {
  const walk = (start, end) => {
    for (const box of readBoxes(moov, start, end)) {
      const body = box.start + box.header;
      if (CONTAINERS.has(box.type)) {
        walk(body, box.start + box.size);
      } else if (box.type === 'stco') {
        const count = moov.readUInt32BE(body + 4);
        for (let i = 0; i < count; i++) {
          const at = body + 8 + i * 4;
          const value = moov.readUInt32BE(at) + delta;
          if (value > 0xffffffff) throw new Error('offset overflow');
          moov.writeUInt32BE(value, at);
        }
      } else if (box.type === 'co64') {
        const count = moov.readUInt32BE(body + 4);
        for (let i = 0; i < count; i++) {
          const at = body + 8 + i * 8;
          moov.writeBigUInt64BE(moov.readBigUInt64BE(at) + BigInt(delta), at);
        }
      }
    }
  };
  const top = readBoxes(moov, 0, moov.length)[0];
  walk(top.start + top.header, top.size);
}

/** @param siteUrl e.g. "/images/about/People/_gallery/Video.mp4" → URL of the fast-start copy (or siteUrl) */
function webVideo(siteUrl) {
  if (!siteUrl || !/\.(mp4|mov)$/i.test(siteUrl)) return siteUrl;
  try {
    const src = path.join(PUBLIC_DIR, decodeURIComponent(siteUrl));
    const buf = fs.readFileSync(src);
    const boxes = readBoxes(buf, 0, buf.length);
    const moovIndex = boxes.findIndex((b) => b.type === 'moov');
    const mdatIndex = boxes.findIndex((b) => b.type === 'mdat');
    if (moovIndex < 0 || mdatIndex < 0 || moovIndex < mdatIndex) return siteUrl; // already fast-start

    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
    const name = path.basename(src, path.extname(src)).toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'video';
    const file = `${name}-${hash}${path.extname(src).toLowerCase()}`;
    const out = path.join(OUT_DIR, file);

    if (!fs.existsSync(out)) {
      const moovBox = boxes[moovIndex];
      const moov = Buffer.from(buf.subarray(moovBox.start, moovBox.start + moovBox.size));
      // Everything from the first mdat onwards moves down by the size of the index
      shiftChunkOffsets(moov, moovBox.size);
      const before = boxes.slice(0, mdatIndex).filter((b) => b.type !== 'moov');
      const after = boxes.slice(mdatIndex).filter((b) => b.type !== 'moov');
      const parts = [
        ...before.map((b) => buf.subarray(b.start, b.start + b.size)),
        moov,
        ...after.map((b) => buf.subarray(b.start, b.start + b.size)),
      ];
      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(out, Buffer.concat(parts));
    }
    // Remove copies of earlier versions of this video
    for (const f of fs.readdirSync(OUT_DIR)) if (f !== file && f.startsWith(`${name}-`)) fs.unlinkSync(path.join(OUT_DIR, f));
    return `/images/web-video/${file}`;
  } catch (err) {
    console.warn(`⚠️  Could not make a fast-start copy of ${siteUrl} (${err.message}); using the original`);
    return siteUrl;
  }
}

module.exports = { webVideo };
