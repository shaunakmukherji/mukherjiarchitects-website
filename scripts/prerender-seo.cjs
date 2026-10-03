// Runs after "vite build". Writes a real static index.html per route (from
// generated/seo-manifest.json) into dist/, each with the correct <title>,
// description, and og:image/twitter:image baked in — so social crawlers
// (which never run this SPA's JS) see the right link-preview thumbnail
// instead of the generic homepage one. The JS bundle reference is left
// untouched, so real visitors still get the normal client-rendered app.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');
const manifestPath = path.join(__dirname, '..', 'generated', 'seo-manifest.json');

if (!fs.existsSync(templatePath)) {
  console.error(`prerender-seo: ${templatePath} not found — run "vite build" first.`);
  process.exit(1);
}
if (!fs.existsSync(manifestPath)) {
  console.error(`prerender-seo: ${manifestPath} not found — run "npm run generate" first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
const routes = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setContent(html, selectorRegex, value) {
  if (selectorRegex.test(html)) {
    return html.replace(selectorRegex, `$1${escapeHtml(value)}$2`);
  }
  return html; // tag not found in template — leave untouched rather than error
}

let written = 0;
for (const route of routes) {
  const title = `${route.title} `.trim();
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = setContent(html, /(<meta name="description" content=")[^"]*(")/, route.description);
  html = setContent(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = setContent(html, /(<meta property="og:description" content=")[^"]*(")/, route.description);
  html = setContent(html, /(<meta property="og:image" content=")[^"]*(")/, route.image);
  html = setContent(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = setContent(html, /(<meta name="twitter:description" content=")[^"]*(")/, route.description);
  html = setContent(html, /(<meta name="twitter:image" content=")[^"]*(")/, route.image);

  // Insights pages: canonical, article type, structured data and the full body text,
  // so crawlers that don't run JS can read the article. React replaces #root's contents
  // when the app mounts; the data-prerender tags are removed then (see App.tsx) because
  // the app re-adds its own canonical and JSON-LD.
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
    // The page already has a generic keywords tag; replace it rather than add a second one
    if (m.key === 'keywords') {
      html = setContent(html, /(<meta name="keywords" content=")[^"]*(")/, m.content);
      continue;
    }
    headExtras.push(`<meta ${m.attr}="${escapeHtml(m.key)}" content="${escapeHtml(m.content)}" data-prerender />`);
  }
  for (const l of route.links ?? []) {
    headExtras.push(`<link rel="${escapeHtml(l.rel)}" type="${escapeHtml(l.type)}" title="${escapeHtml(l.title)}" href="${escapeHtml(l.href)}" data-prerender />`);
  }
  // Start fetching the cover image before the JS bundle has even loaded (it is the LCP element)
  if (route.preload) {
    headExtras.push(`<link rel="preload" as="image" href="${escapeHtml(route.preload.href)}" imagesrcset="${escapeHtml(route.preload.srcSet)}" imagesizes="${escapeHtml(route.preload.sizes)}" fetchpriority="high" data-prerender />`);
  }
  if (route.canonical) headExtras.push(`<link rel="canonical" href="${escapeHtml(route.canonical)}" data-prerender />`);
  for (const ld of route.jsonLd ?? []) {
    // "<" is escaped so article text can never close the script tag early
    headExtras.push(`<script type="application/ld+json" data-prerender>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  if (headExtras.length) html = html.replace('</head>', () => `    ${headExtras.join('\n    ')}\n  </head>`);
  if (route.bodyHtml) html = html.replace('<div id="root"></div>', () => `<div id="root">${route.bodyHtml}</div>`);

  // Write both a directory form (dist/project/x/index.html) and a flat-file form
  // (dist/project/x.html) — different static hosts resolve clean URLs differently,
  // and this covers both without needing to know which one the host picks.
  const relPath = route.path.replace(/^\//, '');
  const outDir = path.join(distDir, relPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  fs.writeFileSync(path.join(distDir, `${relPath}.html`), html, 'utf-8');
  written++;
}

console.log(`📝 prerender-seo: wrote ${written} route-specific index.html files into dist/`);
