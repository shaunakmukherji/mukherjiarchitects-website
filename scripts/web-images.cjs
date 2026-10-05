// Turns source images (Insights articles, people portraits) into responsive, compressed web files
// with descriptive, content-hashed names.
//
// sharp is async but the generators are synchronous, so the work runs in a child process:
// processImagesSync() pipes a JSON list of jobs to this same file and reads the JSON results
// back. Results are cached by source path + mtime + size, so unchanged images cost nothing on
// later runs.
//
// Output goes to public/images/<group>/<slug>/ (git-ignored, rebuilt on every build):
//   <name>-<hash>-<width>.webp                     responsive variants for the page (natural or cropped ratio)
//   <name>-<hash>-og.jpg, -16x9.jpg, -4x3.jpg, -1x1.jpg   social-preview / structured-data crops (when asked for)
// The content hash is in every file name, so the files can be cached forever (see vercel.json headers).
//
// A job: { id, group, slug, file, name, aspect?, extras?, position? }
//   aspect    width/height to crop the page variants to (default: keep the image's own ratio)
//   extras    true for every social crop, or a list of keys: 'og' | 'r16x9' | 'r4x3' | 'r1x1'
//   position  where the social crops are anchored: 'centre' (default), 'north' for portraits, ...
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const CACHE_PATH = path.join(ROOT, 'generated', 'web-images-cache.json');
const WIDTHS = [480, 800, 1200, 1600, 2000];
const WEBP_QUALITY = 78;
const CROPS = [
  { key: 'og', suffix: 'og', w: 1200, h: 630 },
  { key: 'r16x9', suffix: '16x9', w: 1200, h: 675 },
  { key: 'r4x3', suffix: '4x3', w: 1200, h: 900 },
  { key: 'r1x1', suffix: '1x1', w: 1200, h: 1200 },
];

// ── Parent side ───────────────────────────────────────────────────────────────

function processImagesSync(jobs) {
  if (!jobs.length) return {};
  const out = execFileSync(process.execPath, [__filename], {
    input: JSON.stringify(jobs),
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  return JSON.parse(out.toString('utf-8'));
}

module.exports = { processImagesSync };

// ── Worker side (runs when this file is executed directly) ───────────────────

async function processJob(job, cache, sharp) {
  const group = job.group || 'insights';
  const position = job.position || 'centre';
  const wanted = job.extras === true ? CROPS : CROPS.filter((c) => Array.isArray(job.extras) && job.extras.includes(c.key));
  const outDir = path.join(ROOT, 'public', 'images', group, job.slug);
  const urlFor = (file) => `/images/${group}/${job.slug}/${file}`;

  const stat = fs.statSync(job.file);
  const cacheKey = JSON.stringify([job.file, stat.mtimeMs, stat.size, group, job.slug, job.name, job.aspect || 0, position, wanted.map((c) => c.key)]);
  const cached = cache[cacheKey];
  if (cached && cached.files.every((f) => fs.existsSync(path.join(outDir, f)))) return cached.result;

  const buf = fs.readFileSync(job.file);
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const base = `${job.name}-${hash}`;
  fs.mkdirSync(outDir, { recursive: true });

  const meta = await sharp(buf).metadata();
  const swap = (meta.orientation || 1) >= 5; // EXIF orientations 5-8 are rotated by 90 degrees
  const srcW = swap ? meta.height : meta.width;
  const srcH = swap ? meta.width : meta.height;
  // Cropped images (cover, gallery tiles) are cut to a fixed ratio once, so what ships is only what's shown
  const ratio = job.aspect || srcW / srcH;
  const maxW = Math.min(srcW, Math.floor(srcH * ratio));

  const widths = WIDTHS.filter((w) => w < maxW);
  widths.push(maxW > WIDTHS[WIDTHS.length - 1] ? WIDTHS[WIDTHS.length - 1] : maxW);
  const files = [];
  const variants = [];
  for (const w of [...new Set(widths)]) {
    const h = Math.round(w / ratio);
    const file = `${base}-${w}.webp`;
    await sharp(buf).rotate().resize(w, h, { fit: 'cover', position: 'centre' }).webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(path.join(outDir, file));
    files.push(file);
    variants.push({ w, h, url: urlFor(file) });
  }

  const result = { variants };
  for (const crop of wanted) {
    const ratioC = crop.w / crop.h;
    const w = Math.min(crop.w, srcW, Math.floor(srcH * ratioC));
    const h = Math.round(w / ratioC);
    const file = `${base}-${crop.suffix}.jpg`;
    await sharp(buf).rotate().resize(w, h, { fit: 'cover', position }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, file));
    files.push(file);
    result[crop.key] = { url: urlFor(file), width: w, height: h };
  }

  cache[cacheKey] = { files, result };
  return result;
}

async function main() {
  const sharp = require('sharp');
  const jobs = JSON.parse(fs.readFileSync(0, 'utf-8'));
  const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) : {};
  const results = {};
  for (const job of jobs) {
    if (!fs.existsSync(job.file)) throw new Error(`Image not found: ${job.file}`);
    results[job.id] = await processJob(job, cache, sharp);
  }
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
  process.stdout.write(JSON.stringify(results));
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
