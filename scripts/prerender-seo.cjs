// Runs after "vite build" and "vite build --ssr entry-server.tsx". Writes one real HTML file per page
// into dist/, with the page fully rendered (text, links, images) and its own <title>, description,
// canonical URL, share image and structured data in <head>. Search engines, AI assistants and
// link previews read this directly; visitors' browsers attach the app to it (hydration).
//
//   /                 → dist/index.html
//   /project/x        → dist/project/x.html   (vercel.json cleanUrls serves it at /project/x)
//   unknown URLs      → dist/404.html         (served by the host with a real 404 status)
//
// Each page's SEO comes from the page itself (usePageSEO, collected during the render), so it always
// matches what the app sets in the browser. generated/seo-manifest.json lists the pages and adds
// extras some pages carry (Insights: image size, preload, RSS link; people: Person data).
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const distDir = path.join(ROOT, 'dist');
const templatePath = path.join(distDir, 'index.html');
const manifestPath = path.join(ROOT, 'generated', 'seo-manifest.json');
const ssrEntry = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const SITE = 'https://www.mukherjiarchitects.com';

for (const [file, hint] of [[templatePath, 'run "vite build" first'], [manifestPath, 'run "npm run generate" first'], [ssrEntry, 'run "vite build --ssr entry-server.tsx --outDir dist-ssr" first']]) {
  if (!fs.existsSync(file)) {
    console.error(`prerender-seo: ${file} not found — ${hint}.`);
    process.exit(1);
  }
}

const template = fs.readFileSync(templatePath, 'utf-8');
const routes = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function setContent(html, selectorRegex, value) {
  return selectorRegex.test(html) ? html.replace(selectorRegex, (_, a, b) => `${a}${escapeHtml(value)}${b}`) : html;
}
const encodePath = (url) => (/%[0-9A-F]{2}/i.test(url) ? url : url.split('/').map((s) => (s ? encodeURIComponent(s) : '')).join('/'));
const absolute = (url) => (!url ? null : url.startsWith('http') ? url : `${SITE}${encodePath(url)}`);

function buildPage(route, rendered) {
  const seo = rendered.seo || {};
  const title = seo.title || route.title;
  const description = seo.description || route.description;
  const image = absolute(seo.image) || route.image;
  const canonical = seo.canonicalPath !== undefined ? `${SITE}${seo.canonicalPath}` : route.canonical;
  const jsonLd = seo.schemas && seo.schemas.length ? seo.schemas : route.jsonLd || [];

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
  html = setContent(html, /(<meta name="description" content=")[^"]*(")/, description);
  html = setContent(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = setContent(html, /(<meta property="og:description" content=")[^"]*(")/, description);
  html = setContent(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = setContent(html, /(<meta name="twitter:description" content=")[^"]*(")/, description);
  if (image) {
    html = setContent(html, /(<meta property="og:image" content=")[^"]*(")/, image);
    html = setContent(html, /(<meta name="twitter:image" content=")[^"]*(")/, image);
  }
  if (canonical) html = setContent(html, /(<meta property="og:url" content=")[^"]*(")/, canonical);
  if (seo.noindex) html = setContent(html, /(<meta name="robots" content=")[^"]*(")/, 'noindex, follow');
  if (route.twitterCard) html = setContent(html, /(<meta name="twitter:card" content=")[^"]*(")/, route.twitterCard);
  if (route.ogType) html = setContent(html, /(<meta property="og:type" content=")[^"]*(")/, route.ogType);

  const headExtras = [];
  if (route.imageMeta) {
    const { width, height, alt } = route.imageMeta;
    headExtras.push(
      `<meta property="og:image:width" content="${width}" data-prerender />`,
      `<meta property="og:image:height" content="${height}" data-prerender />`,
      `<meta property="og:image:alt" content="${escapeHtml(alt)}" data-prerender />`,
      `<meta name="twitter:image:alt" content="${escapeHtml(alt)}" data-prerender />`,
    );
  }
  for (const m of route.meta ?? []) {
    if (m.key === 'keywords') {
      html = setContent(html, /(<meta name="keywords" content=")[^"]*(")/, m.content);
      continue;
    }
    if (m.key === 'og:url' || m.key === 'og:site_name') continue; // already in the template
    headExtras.push(`<meta ${m.attr}="${escapeHtml(m.key)}" content="${escapeHtml(m.content)}" data-prerender />`);
  }
  for (const l of route.links ?? []) {
    if (l.type === 'application/rss+xml') continue; // already in the template
    headExtras.push(`<link rel="${escapeHtml(l.rel)}" type="${escapeHtml(l.type)}" title="${escapeHtml(l.title)}" href="${escapeHtml(l.href)}" data-prerender />`);
  }
  if (route.preload) {
    headExtras.push(`<link rel="preload" as="image" href="${escapeHtml(route.preload.href)}" imagesrcset="${escapeHtml(route.preload.srcSet)}" imagesizes="${escapeHtml(route.preload.sizes)}" fetchpriority="high" data-prerender />`);
  }
  if (canonical) headExtras.push(`<link rel="canonical" href="${escapeHtml(canonical)}" data-prerender />`);
  for (const ld of jsonLd) {
    // "<" is escaped so text can never close the script tag early
    headExtras.push(`<script type="application/ld+json" data-prerender>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  if (headExtras.length) html = html.replace('</head>', () => `    ${headExtras.join('\n    ')}\n  </head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`);
  return html;
}

function write(relFile, html) {
  const out = path.join(distDir, relFile);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf-8');
}

// Files in dist/images that no page uses: notes, READMEs, project.json, archived projects and images
// that sit in project folders but aren't shown. Removed from the upload only; the source folders
// in public/ are not touched.
function pruneUnusedImages() {
  const sources = [
    ...['projects.ts', 'services.ts', 'site-hero.ts', 'web-images.ts', 'insights.ts', 'people.ts', 'teamImages.ts', 'seo-manifest.json'].map((f) => path.join(ROOT, 'generated', f)),
    path.join(ROOT, 'constants.ts'),
  ].filter((f) => fs.existsSync(f));
  let text = sources.map((f) => fs.readFileSync(f, 'utf-8')).join('\n');
  const contentDir = path.join(ROOT, 'content');
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  if (fs.existsSync(contentDir)) text += walk(contentDir).filter((f) => f.endsWith('.md')).map((f) => fs.readFileSync(f, 'utf-8')).join('\n');
  const used = new Set();
  for (const m of text.matchAll(/\/images\/(?:projects|hero)\/[^"'\n)\]]+?\.(?:jpe?g|png|webp|gif|mp4|mov|webm)/gi)) {
    try { used.add(decodeURIComponent(m[0])); } catch { used.add(m[0]); }
  }
  let removed = 0;
  for (const group of ['projects', 'hero']) {
    const dir = path.join(distDir, 'images', group);
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      const site = '/' + path.relative(distDir, file).split(path.sep).join('/');
      if (!used.has(site)) { fs.unlinkSync(file); removed++; }
    }
    // drop now-empty folders
    const prune = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) prune(path.join(d, e.name)); if (!fs.readdirSync(d).length) fs.rmdirSync(d); };
    prune(dir);
  }
  // Notes anywhere else in the images folder
  for (const file of walk(path.join(distDir, 'images'))) if (/\.md$/i.test(file)) { fs.unlinkSync(file); removed++; }
  return { removed, used: used.size };
}

async function main() {
  const { render, extraPaths } = await import(pathToFileURL(ssrEntry).href);

  const pages = [
    ...routes,
    ...extraPaths().map((p) => ({ path: p })),
  ];

  let written = 0;
  for (const route of pages) {
    const rendered = render(route.path);
    write(`${route.path.replace(/^\//, '')}.html`, buildPage(route, rendered));
    written++;
  }

  // Home page and the 404 page
  write('index.html', buildPage({ path: '/' }, render('/')));
  write('404.html', buildPage({ path: '/404' }, render('/__not-found__')));

  // The SSR bundle is only needed during the build
  fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });

  const pruned = pruneUnusedImages();
  console.log(`📝 prerender-seo: rendered ${written} pages + home + 404 into dist/ (${pruned.removed} unused files left out of the upload)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
