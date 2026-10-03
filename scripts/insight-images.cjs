// Turns the source images referenced by Insights articles into responsive, compressed web files.
//
// sharp is async but generate-projects.cjs is synchronous, so this runs as a child process:
// the generator pipes a JSON list of jobs to stdin and reads the JSON results from stdout
// (see processImagesSync in insights.cjs). Results are cached by source path + mtime + size, so
// unchanged images cost nothing on later runs.
//
// Output goes to public/images/insights/<article-slug>/ (git-ignored, rebuilt on every build):
//   <name>-<hash>-<width>.webp   responsive variants for the page
//   <name>-<hash>-og.jpg, -16x9.jpg, -4x3.jpg, -1x1.jpg   social-preview / structured-data crops (cover only)
// The content hash is in every file name, so the files can be cached forever (see vercel.json headers).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT_ROOT = path.join(ROOT, 'public', 'images', 'insights');
const CACHE_PATH = path.join(ROOT, 'generated', 'insight-images-cache.json');
const WIDTHS = [480, 800, 1200, 1600, 2000];
const WEBP_QUALITY = 78;
const EXTRA_CROPS = [
  { key: 'og', suffix: 'og', w: 1200, h: 630 },
  { key: 'r16x9', suffix: '16x9', w: 1200, h: 675 },
  { key: 'r4x3', suffix: '4x3', w: 1200, h: 900 },
  { key: 'r1x1', suffix: '1x1', w: 1200, h: 1200 },
];

const urlFor = (slug, file) => `/images/insights/${slug}/${file}`;

async function processJob(job, cache) {
  const stat = fs.statSync(job.file);
  const cacheKey = JSON.stringify([job.file, stat.mtimeMs, stat.size, job.slug, job.name, job.aspect || 0, !!job.extras]);
  const cached = cache[cacheKey];
  if (cached && cached.files.every((f) => fs.existsSync(path.join(OUT_ROOT, job.slug, f)))) return cached.result;

  const buf = fs.readFileSync(job.file);
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const base = `${job.name}-${hash}`;
  const outDir = path.join(OUT_ROOT, job.slug);
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
    variants.push({ w, h, url: urlFor(job.slug, file) });
  }

  const result = { variants };
  if (job.extras) {
    for (const crop of EXTRA_CROPS) {
      const ratioC = crop.w / crop.h;
      const w = Math.min(crop.w, srcW, Math.floor(srcH * ratioC));
      const h = Math.round(w / ratioC);
      const file = `${base}-${crop.suffix}.jpg`;
      await sharp(buf).rotate().resize(w, h, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, file));
      files.push(file);
      result[crop.key] = { url: urlFor(job.slug, file), width: w, height: h };
    }
  }

  cache[cacheKey] = { files, result };
  return result;
}

async function main() {
  const jobs = JSON.parse(fs.readFileSync(0, 'utf-8'));
  const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) : {};
  const results = {};
  for (const job of jobs) {
    if (!fs.existsSync(job.file)) throw new Error(`Image not found: ${job.file}`);
    results[job.id] = await processJob(job, cache);
  }
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
  process.stdout.write(JSON.stringify(results));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
