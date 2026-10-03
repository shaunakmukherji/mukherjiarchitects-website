// Insights articles: content/insights/<slug>/article.md (+ images/) -> HTML + metadata.
// Used by generate-projects.cjs to emit generated/insights.ts, sitemap entries and SEO
// manifest entries (title, canonical, Article JSON-LD, cover preload and the full article
// body, which prerender-seo.cjs bakes into the static HTML so crawlers can read it without
// running JS). See content/insights/_template/article.md for the authoring format.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const INSIGHTS_DIR = path.join(ROOT, 'content', 'insights');
const SITE_NAME = 'Mukherji Architects Milano';
const WORDS_PER_MINUTE = 220;
const COVER_ASPECT = 16 / 9;
const GALLERY_ASPECT = 4 / 3;

// `sizes` hints per layout, matching the CSS widths in index.css (.article-prose figures)
const SIZES = {
  cover: '(min-width: 1100px) 1088px, 100vw',
  inline: '(min-width: 720px) 640px, calc(100vw - 32px)',
  wide: '(min-width: 1100px) 1056px, calc(100vw - 32px)',
  tile: '(min-width: 1100px) 520px, (min-width: 720px) 50vw, calc(100vw - 32px)',
};

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const plainText = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
}

// "key: value" lines, one per field. Used for the front matter and for figure blocks.
function parseKeyValues(text, where) {
  const data = {};
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 1) throw new Error(`${where}: cannot read line "${line}" (expected "key: value")`);
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^(["'])([\s\S]*)\1$/, '$2');
  }
  return data;
}

function parseFrontMatter(raw, where) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${where}: missing front matter block (--- ... ---) at the top`);
  return { data: parseKeyValues(m[1], where), body: m[2] };
}

// ── Images ────────────────────────────────────────────────────────────────────

// "images/cover.jpg" is relative to the article folder; "/images/projects/..." is a file
// already on the site (reused as-is, nothing is copied).
function resolveImageFile(src, articleDir, where) {
  const file = src.startsWith('/') ? path.join(ROOT, 'public', decodeURIComponent(src)) : path.join(articleDir, src);
  if (!fs.existsSync(file)) throw new Error(`${where}: image not found: ${src}`);
  return file;
}

function parseAspect(value, fallback, where) {
  if (!value) return fallback;
  const m = value.match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  if (!m) throw new Error(`${where}: "aspect" must look like 16:9 or 4:3`);
  return Number(m[1]) / Number(m[2]);
}

// sharp is async, this generator is not: run the image worker as a child process.
function processImagesSync(jobs) {
  if (!jobs.length) return {};
  const out = execFileSync(process.execPath, [path.join(__dirname, 'insight-images.cjs')], {
    input: JSON.stringify(jobs),
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  return JSON.parse(out.toString('utf-8'));
}

function imgTag(res, { alt, sizes, eager }) {
  const v = res.variants;
  const largest = v[v.length - 1];
  const mid = v.find((x) => x.w >= 800) || largest;
  return `<img src="${mid.url}" srcset="${v.map((x) => `${x.url} ${x.w}w`).join(', ')}" sizes="${sizes}" width="${largest.w}" height="${largest.h}" alt="${escapeHtml(alt)}"${eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"'}>`;
}

function captionHtml(spec) {
  const credits = [];
  if (spec.project) {
    const [name, url] = spec.project.split('|').map((s) => s.trim());
    const external = url && /^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
    credits.push(url ? `Project: <a href="${escapeHtml(url)}"${external}>${escapeHtml(name)}</a>` : `Project: ${escapeHtml(name)}`);
  }
  if (spec.photographer) credits.push(`Photography: ${escapeHtml(spec.photographer)}`);
  if (spec.credit) credits.push(escapeHtml(spec.credit));
  if (!spec.caption && !credits.length) return '';
  return `<figcaption>${spec.caption ? `<span class="fig-caption">${escapeHtml(spec.caption)}</span>` : ''}${credits.length ? `<span class="fig-credit">${credits.join(' · ')}</span>` : ''}</figcaption>`;
}

function figureHtml(spec, res, cls, sizes) {
  return `<figure class="fig ${cls}">${imgTag(res, { alt: spec.alt, sizes })}${captionHtml(spec)}</figure>`;
}

// ── Article parsing ───────────────────────────────────────────────────────────

// Pull :::figure and ::::gallery blocks out of the markdown, leaving a placeholder paragraph
// for each so marked never has to understand them. Returns the figure specs found.
function extractFigures(markdown, where) {
  const figs = [];
  const parseFigure = (srcLine, block, defaultAspect) => {
    const spec = parseKeyValues(block, `${where} figure "${srcLine}"`);
    spec.src = srcLine.trim();
    if (!spec.alt) throw new Error(`${where}: figure "${spec.src}" needs an "alt:" line (describe the image for screen readers and search)`);
    spec.size = spec.size || 'wide';
    if (!['inline', 'wide'].includes(spec.size)) throw new Error(`${where}: figure "${spec.src}" size must be inline or wide`);
    spec.aspectRatio = parseAspect(spec.aspect, defaultAspect, `${where} figure "${spec.src}"`);
    return spec;
  };

  let text = markdown.replace(/^::::gallery[ \t]*\n([\s\S]*?)^::::[ \t]*$/gm, (_, inner) => {
    const tiles = [];
    inner.replace(/^:::figure[ \t]+(.+)\n([\s\S]*?)^:::[ \t]*$/gm, (__, srcLine, block) => {
      const spec = parseFigure(srcLine, block, GALLERY_ASPECT);
      spec.size = 'tile';
      tiles.push(figs.push(spec) - 1);
      return '';
    });
    if (!tiles.length) throw new Error(`${where}: a ::::gallery block has no :::figure blocks inside`);
    return `\n@@GALLERY:${tiles.join(',')}@@\n`;
  });
  text = text.replace(/^:::figure[ \t]+(.+)\n([\s\S]*?)^:::[ \t]*$/gm, (_, srcLine, block) => `\n@@FIG:${figs.push(parseFigure(srcLine, block, null)) - 1}@@\n`);
  return { text, figs };
}

function readArticle(dir) {
  const slug = path.basename(dir);
  const where = `content/insights/${slug}/article.md`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`${slug}: folder name must be lowercase letters, numbers and hyphens (it becomes the URL)`);
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(dir, 'article.md'), 'utf-8'), where);
  if (data.draft === 'true') return null;
  for (const k of ['title', 'description', 'date']) if (!data[k]) throw new Error(`${where}: "${k}" is required in the front matter`);
  for (const k of ['date', 'updated']) if (data[k] && !/^\d{4}-\d{2}-\d{2}$/.test(data[k])) throw new Error(`${where}: "${k}" must be YYYY-MM-DD`);
  if (data.cover && !data.coverAlt) throw new Error(`${where}: "coverAlt" is required when there is a cover image`);
  const markdown = stripComments(body).trim();
  // The first paragraph is the introduction; it is shown in the page header
  const firstBreak = markdown.search(/\n\s*\n/);
  const intro = firstBreak === -1 ? markdown : markdown.slice(0, firstBreak);
  if (/^(#|:::|@@)/.test(intro)) throw new Error(`${where}: the article must start with an introduction paragraph`);
  const { text, figs } = extractFigures(markdown.slice(intro.length), where);
  return { slug, dir, where, data, intro, text, figs };
}

function loadInsights(siteUrl, defaultImage) {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  const raws = fs.readdirSync(INSIGHTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && fs.existsSync(path.join(INSIGHTS_DIR, d.name, 'article.md')))
    .map((d) => readArticle(path.join(INSIGHTS_DIR, d.name)))
    .filter(Boolean);

  // One batch of image jobs for every article (cached, so unchanged images are instant)
  const jobs = [];
  for (const r of raws) {
    if (r.data.cover) {
      jobs.push({ id: `${r.slug}#cover`, slug: r.slug, file: resolveImageFile(r.data.cover, r.dir, r.where), name: `${r.slug}-cover`, aspect: COVER_ASPECT, extras: true });
    }
    r.figs.forEach((spec, i) => {
      const file = resolveImageFile(spec.src, r.dir, r.where);
      jobs.push({ id: `${r.slug}#fig${i}`, slug: r.slug, file, name: slugify(spec.name || path.basename(spec.src, path.extname(spec.src))), aspect: spec.aspectRatio });
    });
  }
  const images = processImagesSync(jobs);

  const articles = raws.map((r) => {
    const { data, slug } = r;
    const url = `${siteUrl}/insights/${slug}`;
    const headings = [];
    const used = new Set();
    const renderer = new marked.Renderer();
    renderer.heading = function ({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      let id = slugify(plainText(html)) || 'section';
      for (let n = 2; used.has(id); n++) id = `${slugify(plainText(html))}-${n}`;
      used.add(id);
      if (depth === 2) headings.push({ id, text: plainText(html) });
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    };
    // Internal links (start with "/") navigate inside the app; external links open in a new tab.
    renderer.link = function ({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const t = title ? ` title="${escapeHtml(title)}"` : '';
      if (/^https?:\/\//i.test(href)) return `<a href="${escapeHtml(href)}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`;
      return `<a href="${escapeHtml(href)}"${t}>${text}</a>`;
    };

    let html = marked.parse(r.text, { renderer, gfm: true });
    const renderFig = (i, cls) => figureHtml(r.figs[i], images[`${slug}#fig${i}`], cls, SIZES[r.figs[i].size]);
    html = html
      .replace(/<p>@@FIG:(\d+)@@<\/p>/g, (_, i) => renderFig(Number(i), `fig-${r.figs[i].size}`))
      .replace(/<p>@@GALLERY:([\d,]+)@@<\/p>/g, (_, ids) => {
        const list = ids.split(',').map(Number);
        return `<div class="fig-gallery fig-gallery-${list.length}">${list.map((i) => renderFig(i, 'fig-tile')).join('')}</div>`;
      });

    const introHtml = marked.parseInline(r.intro, { renderer, gfm: true });
    const words = (r.intro + ' ' + r.text).replace(/@@\w+:[\d,]+@@/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').split(/\s+/).filter(Boolean).length;
    const author = data.author || SITE_NAME;
    const authorType = data.authorType === 'Person' ? 'Person' : 'Organization';
    const authorUrl = data.authorUrl || (authorType === 'Organization' ? `${siteUrl}/` : null);

    // Cover: also supplies the social-preview image and the image URLs in the structured data
    let cover = null;
    let socialImage = defaultImage;
    let socialMeta = null;
    let ldImages = [defaultImage];
    let preload = null;
    let coverHtml = '';
    if (data.cover) {
      const res = images[`${slug}#cover`];
      const spec = { alt: data.coverAlt, caption: data.coverCaption, project: data.coverProject, photographer: data.coverPhotographer, credit: data.coverCredit };
      const v = res.variants;
      const largest = v[v.length - 1];
      const card = v.find((x) => x.w >= 800) || largest;
      cover = { alt: spec.alt, src: card.url, srcSet: v.map((x) => `${x.url} ${x.w}w`).join(', '), width: largest.w, height: largest.h };
      coverHtml = `<figure class="fig fig-cover">${imgTag(res, { alt: spec.alt, sizes: SIZES.cover, eager: true })}${captionHtml(spec)}</figure>`;
      socialImage = `${siteUrl}${res.og.url}`;
      socialMeta = { width: res.og.width, height: res.og.height, alt: spec.alt };
      ldImages = [res.og, res.r16x9, res.r4x3, res.r1x1].map((x) => `${siteUrl}${x.url}`);
      preload = { href: card.url, srcSet: cover.srcSet, sizes: SIZES.cover };
    }

    const sitemapImages = [
      ...(cover ? [`${siteUrl}${images[`${slug}#cover`].variants.slice(-1)[0].url}`] : []),
      ...r.figs.map((_, i) => `${siteUrl}${images[`${slug}#fig${i}`].variants.slice(-1)[0].url}`),
    ];

    const article = {
      slug,
      path: `/insights/${slug}`,
      title: data.title,
      seoTitle: data.seoTitle || `${data.title} | ${SITE_NAME}`,
      description: data.description,
      author,
      authorType,
      date: data.date,
      ...(data.updated ? { updated: data.updated } : {}),
      ...(data.tag ? { tag: data.tag } : {}),
      ...(data.disclosure ? { disclosure: data.disclosure } : {}),
      numberedSections: data.numberedSections === 'true',
      image: socialImage,
      ...(socialMeta ? { imageMeta: socialMeta } : {}),
      cover,
      coverHtml,
      preload,
      sitemapImages,
      readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      introHtml,
      headings,
      html,
    };

    article.jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: ldImages,
        datePublished: data.date,
        ...(data.updated ? { dateModified: data.updated } : {}),
        author: { '@type': authorType, name: author, ...(authorUrl ? { url: authorUrl } : {}) },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: `${siteUrl}/`, logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/logo.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(data.tag ? { articleSection: data.tag } : {}),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteUrl}/insights` },
          { '@type': 'ListItem', position: 3, name: data.title, item: url },
        ],
      },
    ];
    return article;
  });
  return articles.sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));
}

// ── Static HTML for the crawler-readable copy of each page (see prerender-seo.cjs) ──

function articleBodyHtml(a) {
  const toc = a.headings.length > 2
    ? `<nav aria-label="In this article"><ol>${a.headings.map((h) => `<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('')}</ol></nav>\n`
    : '';
  return `<article>
<p><a href="/insights">Insights</a></p>
<h1>${escapeHtml(a.title)}</h1>
<p>${a.introHtml}</p>
<p>By ${escapeHtml(a.author)} · <time datetime="${a.date}">${formatDate(a.date)}</time>${a.updated ? ` · Updated <time datetime="${a.updated}">${formatDate(a.updated)}</time>` : ''}</p>
${a.disclosure ? `<p><em>${escapeHtml(a.disclosure)}</em></p>\n` : ''}${a.coverHtml}
${toc}${a.html}
</article>`;
}

function listingBodyHtml(articles) {
  return `<section>
<h1>Insights</h1>
<p>Articles on architecture and design from ${SITE_NAME}.</p>
<ul>
${articles.map((a) => `<li>${a.cover ? `<a href="${a.path}"><img src="${a.cover.src}" srcset="${a.cover.srcSet}" sizes="(min-width: 1024px) 60vw, 100vw" width="${a.cover.width}" height="${a.cover.height}" alt="${escapeHtml(a.cover.alt)}" loading="lazy"></a>` : ''}<h2><a href="${a.path}">${escapeHtml(a.title)}</a></h2><p>${escapeHtml(a.description)}</p><p><time datetime="${a.date}">${formatDate(a.date)}</time></p></li>`).join('\n')}
</ul>
</section>`;
}

module.exports = { loadInsights, articleBodyHtml, listingBodyHtml, INSIGHTS_DIR };
