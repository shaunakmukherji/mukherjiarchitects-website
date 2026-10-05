// People pages: portraits -> responsive web images, Person structured data, crawler-readable HTML.
//
// Used by generate-projects.cjs. For every person it:
//   - turns the portrait into compressed WebP variants with a descriptive, hashed file name
//     (/images/people/<slug>/<slug>-<role>-<hash>-<width>.webp) plus a social/structured-data crop
//   - builds ProfilePage + Person JSON-LD (with ImageObject, so Google Images can tie the photo to the name)
//   - builds the static HTML (name, role, bio, <img> with alt) that prerender-seo.cjs bakes into each page,
//     so crawlers see the portrait and the name together without having to run the app's JavaScript
//   - lists the image URLs for the image sitemap
// One person = one canonical image URL, used identically on the page, in og:image, in JSON-LD and in the sitemap.
const fs = require('fs');
const path = require('path');
const { processImagesSync } = require('./web-images.cjs');

const ROOT = path.join(__dirname, '..');
const SITE_NAME = 'Mukherji Architects Milano';

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// The People page (components/Views/Team.tsx reads these from generated/people.ts)
const LISTING = {
  path: '/the-studio/people',
  title: 'People | Mukherji Architects Milano',
  description: "The team at Mukherji Architects Milano — architects and designers trained at Italy's leading institutions, working across international markets from our studio in Milan.",
};

// Hand-built pages (components/Views/CreativeDirector.tsx, BobbyMukherji.tsx). The page text stays in the
// component; the facts every consumer needs (title, description, portrait, schema) live here once.
const BESPOKE = [
  {
    slug: 'shaunak-mukherji',
    path: '/shaunak-mukherji',
    name: 'Shaunak Mukherji',
    role: 'Founder & Creative Director',
    jobTitle: 'Founder and Creative Director',
    roleLine: `Founder & Creative Director, ${SITE_NAME}`,
    title: 'Shaunak Mukherji — Founder & Creative Director | Mukherji Architects Milano',
    description: 'Shaunak Mukherji is Founder & Creative Director of Mukherji Architects Milano, a high-performance architecture studio in Milan, Italy. AI-first approach, Politecnico di Milano graduate.',
    portrait: '/images/about/creative-director.jpg',
    alt: 'Shaunak Mukherji, Founder & Creative Director of Mukherji Architects Milano',
    teamSlug: 'shaunak-mukherji', // person.json in the team folder can add sameAs links
    person: {
      affiliation: { '@type': 'Organization', name: 'Bobby Mukherji Architects', url: 'https://bobbymukherji.com/' },
      alumniOf: { '@type': 'EducationalOrganization', name: 'Politecnico di Milano' },
    },
  },
  {
    slug: 'bobby-mukherji',
    path: '/bobby-mukherji',
    name: 'Bobby Mukherji',
    role: 'Principal',
    jobTitle: 'Principal',
    roleLine: 'Principal, Bobby Mukherji Architects',
    title: 'Bobby Mukherji — Principal | Mukherji Architects Milano',
    description: 'Bobby Mukherji is founder of Bobby Mukherji Architects and the institutional backbone of Mukherji Architects Milano — 30+ years of experience across hospitality, commercial, and mixed-use projects worldwide.',
    portrait: '/images/about/bobby-mukherji.png',
    alt: 'Bobby Mukherji, Principal of Bobby Mukherji Architects',
    sameAs: ['https://in.linkedin.com/in/bobby-mukherji-690557228'], // no team folder, so his profile links live here
    person: {
      worksFor: { '@type': 'Organization', name: 'Bobby Mukherji Architects', url: 'https://bobbymukherji.com/' },
    },
  },
];

function buildPeople({ siteUrl, teamMembers }) {
  const orgId = `${siteUrl}/#organization`;
  const abs = (u) => `${siteUrl}${u}`;
  const publicFile = (u) => path.join(ROOT, 'public', decodeURIComponent(u));

  // ── Images ──────────────────────────────────────────────────────────────────
  const jobs = [];
  const need = (file, what) => {
    if (!fs.existsSync(file)) throw new Error(`${what}: image not found: ${file}`);
    return file;
  };
  for (const m of teamMembers) {
    if (!m.headshotUrl) continue;
    jobs.push({ id: `member:${m.slug}`, group: 'people', slug: m.slug, file: need(publicFile(m.headshotUrl), `People: ${m.name}`), name: `${m.slug}-${slugify(m.role || 'architect')}`, extras: ['r1x1'], position: 'north' });
  }
  for (const b of BESPOKE) {
    jobs.push({ id: `page:${b.slug}`, group: 'people', slug: b.slug, file: need(publicFile(b.portrait), `People: ${b.name} (scripts/people.cjs)`), name: `${b.slug}-portrait`, extras: ['r1x1'], position: 'north' });
  }
  const res = processImagesSync(jobs);

  const toImage = (r, alt) => {
    const v = r.variants;
    const largest = v[v.length - 1];
    const card = v.find((x) => x.w >= 800) || largest;
    return { alt, src: card.url, srcSet: v.map((x) => `${x.url} ${x.w}w`).join(', '), width: largest.w, height: largest.h };
  };
  const memberAlt = (m) => `${m.name}, ${m.role} at ${SITE_NAME}`;
  const members = teamMembers.map((m) => (m.headshotUrl ? { ...m, image: toImage(res[`member:${m.slug}`], memberAlt(m)) } : m));

  // ── Structured data ─────────────────────────────────────────────────────────
  const crumbs = (name, url) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'People', item: `${siteUrl}/the-studio/people` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  });

  const profileJsonLd = ({ pagePath, title, name, jobTitle, description, r, alt, person = {}, sameAs = [], alumniOf }) => {
    const url = abs(pagePath);
    const square = r.r1x1;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: title,
        url,
        mainEntity: {
          '@type': 'Person',
          '@id': `${url}#person`,
          name,
          jobTitle,
          description,
          url,
          image: { '@type': 'ImageObject', url: abs(square.url), contentUrl: abs(square.url), width: square.width, height: square.height, caption: alt },
          worksFor: { '@id': orgId },
          ...person,
          ...(alumniOf && !person.alumniOf ? { alumniOf: [].concat(alumniOf).map((a) => ({ '@type': 'EducationalOrganization', name: a })) } : {}),
          ...(sameAs.length ? { sameAs } : {}),
        },
      },
      crumbs(name, url),
    ];
  };

  // ── Static HTML ─────────────────────────────────────────────────────────────
  const imgHtml = (img, sizes, eager) => `<img src="${img.src}" srcset="${img.srcSet}" sizes="${sizes}" width="${img.width}" height="${img.height}" alt="${escapeHtml(img.alt)}"${eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"'}>`;
  const PORTRAIT_SIZES = '(min-width: 768px) 480px, calc(100vw - 48px)';
  const CARD_SIZES = '(min-width: 1280px) 296px, (min-width: 768px) 24vw, 46vw';
  const personBody = ({ name, roleLine, image, paragraphs }) => `<article>
<p><a href="/the-studio/people">People</a></p>
<h1>${escapeHtml(name)}</h1>
<p>${escapeHtml(roleLine)}</p>
${imgHtml(image, PORTRAIT_SIZES, true)}
${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')}
</article>`;

  const route = ({ pagePath, title, description, name, roleLine, r, alt, image, paragraphs, jsonLd }) => {
    const url = abs(pagePath);
    const [first, ...rest] = name.split(' ');
    return {
      path: pagePath,
      title,
      description,
      image: abs(r.r1x1.url),
      imageMeta: { width: r.r1x1.width, height: r.r1x1.height, alt },
      twitterCard: 'summary', // a portrait is square: the large 2:1 card would crop the face
      preload: { href: image.src, srcSet: image.srcSet, sizes: PORTRAIT_SIZES },
      canonical: url,
      ogType: 'profile',
      jsonLd,
      meta: [
        { attr: 'property', key: 'og:url', content: url },
        { attr: 'property', key: 'og:site_name', content: SITE_NAME },
        { attr: 'property', key: 'profile:first_name', content: first },
        { attr: 'property', key: 'profile:last_name', content: rest.join(' ') },
      ],
      bodyHtml: personBody({ name, roleLine, image, paragraphs }),
    };
  };

  const pages = {};      // slug -> data for the React pages (generated/people.ts)
  const routes = [];     // SEO manifest entries (prerender-seo.cjs)
  const sitemapImages = {}; // path -> absolute image URLs
  const sameAsFor = (slug) => (members.find((m) => m.slug === slug) || {}).sameAs || [];

  for (const b of BESPOKE) {
    const r = res[`page:${b.slug}`];
    const image = toImage(r, b.alt);
    const jsonLd = profileJsonLd({ pagePath: b.path, title: b.title, name: b.name, jobTitle: b.jobTitle, description: b.description, r, alt: b.alt, person: b.person, sameAs: [...(b.sameAs || []), ...(b.teamSlug ? sameAsFor(b.teamSlug) : [])] });
    pages[b.slug] = { title: b.title, description: b.description, image, ogImage: abs(r.r1x1.url), jsonLd };
    routes.push(route({ pagePath: b.path, title: b.title, description: b.description, name: b.name, roleLine: b.roleLine, r, alt: b.alt, image, paragraphs: [b.description], jsonLd }));
    sitemapImages[b.path] = [abs(r.variants[r.variants.length - 1].url)];
  }

  for (const m of members) {
    if (!m.image) continue;
    const r = res[`member:${m.slug}`];
    const title = `${m.name} — ${m.role} | ${SITE_NAME}`;
    const description = m.description
      ? `${m.description.slice(0, 150)}${m.description.length > 150 ? '...' : ''}`
      : `${m.name}, ${m.role} at ${SITE_NAME}.`;
    const pagePath = `/the-studio/people/${m.slug}`;
    const jsonLd = profileJsonLd({ pagePath, title, name: m.name, jobTitle: m.role, description: (m.description || description).split(/\n\n+/)[0], r, alt: m.image.alt, sameAs: m.sameAs || [], alumniOf: m.alumniOf });
    // Bespoke people (linkTo) already have their page data above, built from their page portrait; only the
    // other members get a generic page here (and only when they have a description.md)
    if (m.description && !m.linkTo) {
      pages[m.slug] = { title, description, image: m.image, ogImage: abs(r.r1x1.url), jsonLd };
      routes.push(route({ pagePath, title, description, name: m.name, roleLine: `${m.role}, ${SITE_NAME}`, r, alt: m.image.alt, image: m.image, paragraphs: m.description.split(/\n\n+/).filter(Boolean), jsonLd }));
      sitemapImages[pagePath] = [abs(r.variants[r.variants.length - 1].url)];
    }
  }

  // /the-studio/people: every portrait, each next to the name it belongs to
  const withImage = members.filter((m) => m.image);
  const pageUrlFor = (m) => (m.linkTo === 'CREATIVE_DIRECTOR' ? '/shaunak-mukherji' : m.linkTo === 'BOBBY_MUKHERJI' ? '/bobby-mukherji' : m.description ? `/the-studio/people/${m.slug}` : null);
  sitemapImages[LISTING.path] = withImage.map((m) => abs(res[`member:${m.slug}`].variants.slice(-1)[0].url));

  const listingUrl = abs(LISTING.path);
  const listingJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: LISTING.title,
      description: LISTING.description,
      url: listingUrl,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${siteUrl}/` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: withImage.filter(pageUrlFor).map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m.name, url: abs(pageUrlFor(m)) })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'People', item: listingUrl },
      ],
    },
  ];
  const listingItems = withImage.map((m) => {
    const href = pageUrlFor(m);
    const card = `${imgHtml(m.image, CARD_SIZES, false)}<h2>${escapeHtml(m.name)}</h2><p>${escapeHtml(m.role)}</p>`;
    return `<li>${href ? `<a href="${href}">${card}</a>` : card}</li>`;
  });
  routes.push({
    path: LISTING.path,
    title: LISTING.title,
    description: LISTING.description,
    image: abs('/images/og-default.png'), // no single photo represents the whole team: use the studio card
    canonical: listingUrl,
    meta: [
      { attr: 'property', key: 'og:url', content: listingUrl },
      { attr: 'property', key: 'og:site_name', content: SITE_NAME },
    ],
    jsonLd: listingJsonLd,
    bodyHtml: `<section>\n<h1>People</h1>\n<p>${escapeHtml(LISTING.description)}</p>\n<ul>\n${listingItems.join('\n')}\n</ul>\n</section>`,
  });

  const listing = { title: LISTING.title, description: LISTING.description, jsonLd: listingJsonLd };
  return { members, pages, listing, routes, sitemapImages };
}

module.exports = { buildPeople };
