/**
 * Applies page-level SEO: title, meta description, OG/Twitter tags, JSON-LD schemas.
 * Returns a cleanup function that restores original values — call it from useEffect's return.
 *
 * Usage:
 *   useEffect(() => applySEO({ title: '...', description: '...', schemas: [...] }), []);
 */
export function applySEO({
  title,
  description,
  schemas = [],
}: {
  title: string;
  description: string;
  schemas?: object[];
}): () => void {
  const orig = {
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? null,
    ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? null,
    twTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? null,
    twDesc: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? null,
  };

  document.title = title;

  const set = (sel: string, val: string) =>
    document.querySelector(sel)?.setAttribute('content', val);

  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', description);

  const scriptIds: string[] = [];
  schemas.forEach((schema, i) => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema);
    const id = `seo-schema-${i}`;
    el.id = id;
    scriptIds.push(id);
    document.head.appendChild(el);
  });

  return () => {
    document.title = orig.title;
    if (orig.desc !== null) set('meta[name="description"]', orig.desc);
    if (orig.ogTitle !== null) set('meta[property="og:title"]', orig.ogTitle);
    if (orig.ogDesc !== null) set('meta[property="og:description"]', orig.ogDesc);
    if (orig.twTitle !== null) set('meta[name="twitter:title"]', orig.twTitle);
    if (orig.twDesc !== null) set('meta[name="twitter:description"]', orig.twDesc);
    scriptIds.forEach(id => document.getElementById(id)?.remove());
  };
}

/** Standard BreadcrumbList schema for a single-level subpage. */
export function breadcrumb(pageName: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mukherji Architects Milano', item: 'https://www.mukherjiarchitects.com/' },
      { '@type': 'ListItem', position: 2, name: pageName, item: `https://www.mukherjiarchitects.com${pageUrl}` },
    ],
  };
}
