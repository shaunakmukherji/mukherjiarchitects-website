const SITE = 'https://www.mukherjiarchitects.com';

/**
 * Applies page-level SEO: title, meta description, OG/Twitter tags,
 * og:image, canonical URL, and JSON-LD schemas.
 * Returns a cleanup function — call it from useEffect's return.
 */
export function applySEO({
  title,
  description,
  image,
  canonicalPath,
  schemas = [],
}: {
  title: string;
  description: string;
  image?: string;       // absolute URL — used for og:image / twitter:image
  canonicalPath?: string; // e.g. '/the-studio/people' → sets <link rel="canonical">
  schemas?: object[];
}): () => void {
  const get = (sel: string) => document.querySelector(sel)?.getAttribute('content') ?? null;
  const set = (sel: string, val: string) => document.querySelector(sel)?.setAttribute('content', val);

  const orig = {
    title: document.title,
    desc:    get('meta[name="description"]'),
    ogTitle: get('meta[property="og:title"]'),
    ogDesc:  get('meta[property="og:description"]'),
    ogImage: get('meta[property="og:image"]'),
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

  const absoluteImage = image
    ? (image.startsWith('http') ? image : `${SITE}${image}`)
    : null;
  if (absoluteImage) {
    set('meta[property="og:image"]',   absoluteImage);
    set('meta[name="twitter:image"]',  absoluteImage);
  }

  // Canonical link
  let canonicalEl: HTMLLinkElement | null = null;
  if (canonicalPath) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    canonicalEl.href = `${SITE}${canonicalPath}`;
    document.head.appendChild(canonicalEl);
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

  return () => {
    document.title = orig.title;
    if (orig.desc    !== null) set('meta[name="description"]',         orig.desc);
    if (orig.ogTitle !== null) set('meta[property="og:title"]',        orig.ogTitle);
    if (orig.ogDesc  !== null) set('meta[property="og:description"]',  orig.ogDesc);
    if (orig.ogImage !== null) set('meta[property="og:image"]',        orig.ogImage);
    if (orig.twTitle !== null) set('meta[name="twitter:title"]',       orig.twTitle);
    if (orig.twDesc  !== null) set('meta[name="twitter:description"]', orig.twDesc);
    if (orig.twImage !== null) set('meta[name="twitter:image"]',       orig.twImage);
    canonicalEl?.remove();
    scriptIds.forEach(id => document.getElementById(id)?.remove());
  };
}

/** Standard BreadcrumbList schema for a single-level subpage. */
export function breadcrumb(pageName: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mukherji Architects Milano', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: pageName, item: `${SITE}${pageUrl}` },
    ],
  };
}
