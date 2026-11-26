import { Project } from '../types';
import { getPathForView } from '../contexts/NavigationContext';
import { breadcrumb2, SEOConfig, SITE, SITE_NAME, truncateDescription, absoluteUrl } from './seo';
import { ogImageFor } from './webImages';

/** "Novotel, Vrindavan — Hospitality Design | Mukherji Architects Milano", dropping the category when the title runs long. */
export function projectPageTitle(p: Project): string {
  const full = `${p.title} — ${p.category} | ${SITE_NAME}`;
  return full.length <= 65 ? full : `${p.title} | ${SITE_NAME}`;
}

export function projectDescription(p: Project): string {
  return p.description
    ? truncateDescription(p.description)
    : `${p.title}: ${p.category.toLowerCase()} project by ${SITE_NAME}${p.location ? ` in ${p.location}` : ''}.`;
}

/** Title, description, share image, canonical and structured data for a project page. */
export function projectSEO(p: Project): SEOConfig {
  const pagePath = getPathForView('PROJECT_DETAIL', p.id);
  const url = `${SITE}${pagePath}`;
  const categoryPath = getPathForView('CATEGORY_LISTING', p.category);
  const images = [ogImageFor(p.imageUrl), p.imageUrl, ...(p.gallery ?? [])].map(absoluteUrl);

  const work: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: p.title,
    url,
    description: p.description || projectDescription(p),
    image: [...new Set(images)],
    creator: { '@id': `${SITE}/#organization` },
    genre: p.category,
    keywords: [...(p.categories ?? [p.category]), 'architecture', p.location].filter(Boolean).join(', '),
    isPartOf: { '@id': `${SITE}/#website` },
  };
  if (p.year) work.dateCreated = String(p.year);
  if (p.location) work.locationCreated = { '@type': 'Place', name: p.location };
  if (p.client) work.sponsor = { '@type': 'Organization', name: p.client };
  if (p.status) work.creativeWorkStatus = p.status;

  return {
    title: projectPageTitle(p),
    description: projectDescription(p),
    image: ogImageFor(p.imageUrl),
    canonicalPath: pagePath,
    schemas: [work, breadcrumb2(`${p.category} Projects`, categoryPath, p.title, pagePath)],
  };
}
