export const SITE = 'https://www.mukherjiarchitects.com';
export const SITE_NAME = 'Mukherji Architects Milano';
export const DEFAULT_OG_IMAGE = `${SITE}/images/og-default.png`;

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;         // absolute or site-relative URL — used for og:image / twitter:image
  canonicalPath?: string; // e.g. '/the-studio/people' → <link rel="canonical"> and og:url
  schemas?: object[];
  noindex?: boolean;      // "not found" states: see applyNoIndex
}

/**
 * Applies page-level SEO: title, meta description, OG/Twitter tags,
 * og:image, canonical URL, og:url and JSON-LD schemas.
 * Returns a cleanup function — call it from useEffect's return.
 * The same config is rendered into the static HTML at build time (see usePageSEO and
 * scripts/prerender-seo.cjs), so what crawlers read and what the app sets always match.
 */
export function applySEO({ title, description, image, canonicalPath, schemas = [], noindex }: SEOConfig): () => void {
  const get = (sel: string) => document.querySelector(sel)?.getAttribute('content') ?? null;
  const set = (sel: string, val: string) => document.querySelector(sel)?.setAttribute('content', val);

  const orig = {
    title: document.title,
    desc:    get('meta[name="description"]'),
    ogTitle: get('meta[property="og:title"]'),
    ogDesc:  get('meta[property="og:description"]'),
    ogImage: get('meta[property="og:image"]'),
    ogUrl:   get('meta[property="og:url"]'),
    twTitle: get('meta[name="twitter:title"]'),
    twDesc:  get('meta[name="twitter:description"]'),
    twImage: get('meta[name="twitter:image"]'),
  };

  document.title = title;
  set('meta[name="description"]',       description);
  set('meta[property="og:title"]',      title);
  set('meta[property="og:description"]', description);
  set('meta[name="twitter:title"]',     title);
  set('meta[name="twitter:description"]', description);

  const absoluteImage = image ? absoluteUrl(image) : null;
  if (absoluteImage) {
    set('meta[property="og:image"]',   absoluteImage);
    set('meta[name="twitter:image"]',  absoluteImage);
  }

  // Canonical link + og:url
  let canonicalEl: HTMLLinkElement | null = null;
  if (canonicalPath) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    canonicalEl.href = `${SITE}${canonicalPath}`;
    document.head.appendChild(canonicalEl);
    set('meta[property="og:url"]', `${SITE}${canonicalPath}`);
  }

  // JSON-LD schemas
  const scriptIds: string[] = [];
  schemas.forEach((schema, i) => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema);
    el.id = `seo-schema-${Date.now()}-${i}`;
    scriptIds.push(el.id);
    document.head.appendChild(el);
  });

  const undoNoIndex = noindex ? applyNoIndex() : null;

  return () => {
    document.title = orig.title;
    if (orig.desc    !== null) set('meta[name="description"]',         orig.desc);
    if (orig.ogTitle !== null) set('meta[property="og:title"]',        orig.ogTitle);
    if (orig.ogDesc  !== null) set('meta[property="og:description"]',  orig.ogDesc);
    if (orig.ogImage !== null) set('meta[property="og:image"]',        orig.ogImage);
    if (orig.ogUrl   !== null) set('meta[property="og:url"]',          orig.ogUrl);
    if (orig.twTitle !== null) set('meta[name="twitter:title"]',       orig.twTitle);
    if (orig.twDesc  !== null) set('meta[name="twitter:description"]', orig.twDesc);
    if (orig.twImage !== null) set('meta[name="twitter:image"]',       orig.twImage);
    canonicalEl?.remove();
    scriptIds.forEach(id => document.getElementById(id)?.remove());
    undoNoIndex?.();
  };
}

/** Site-relative image path → absolute URL, with each path segment encoded (folder names have spaces and commas). */
export function absoluteUrl(url: string): string {
  if (url.startsWith('http')) return url;
  const encoded = /%[0-9A-F]{2}/i.test(url) ? url : url.split('/').map((seg) => (seg ? encodeURIComponent(seg) : '')).join('/');
  return `${SITE}${encoded}`;
}

/**
 * Marks the current page noindex — for "not found" states (invalid project/person slug, etc).
 * Unknown URLs get a real 404 from the host (see vercel.json); this covers the app-level states,
 * e.g. a project slug that matches the URL pattern but no project.
 */
export function applyNoIndex(): () => void {
  const el = document.querySelector('meta[name="robots"]');
  const orig = el?.getAttribute('content') ?? null;
  el?.setAttribute('content', 'noindex, follow');
  return () => {
    if (orig !== null) el?.setAttribute('content', orig);
  };
}

/** Standard BreadcrumbList schema for a single-level subpage. */
export function breadcrumb(pageName: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: pageName, item: `${SITE}${pageUrl}` },
    ],
  };
}

/** Two-level BreadcrumbList, e.g. Home › Hospitality Design › Novotel, Vrindavan. */
export function breadcrumb2(parentName: string, parentUrl: string, pageName: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: parentName, item: `${SITE}${parentUrl}` },
      { '@type': 'ListItem', position: 3, name: pageName, item: `${SITE}${pageUrl}` },
    ],
  };
}

/**
 * Shortens text for a meta description without cutting a word in half: ends at the last full
 * sentence that fits, otherwise at the last whole word with an ellipsis.
 */
export function truncateDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const sentenceEnd = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
  if (sentenceEnd > max * 0.5) return slice.slice(0, sentenceEnd + 1);
  const wordEnd = slice.lastIndexOf(' ');
  return `${slice.slice(0, wordEnd > 0 ? wordEnd : max).replace(/[,;:—–-]+$/, '')}…`;
}

export { ogImageFor } from './webImages';
