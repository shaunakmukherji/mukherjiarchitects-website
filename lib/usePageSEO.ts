import { createContext, useContext, useEffect } from 'react';
import { applySEO, SEOConfig } from './seo';

/**
 * At build time each page is rendered to static HTML (entry-server.tsx). Effects don't run there,
 * so pages report their SEO config to this collector during render instead, and the prerender
 * step writes it into the page's <head>. In the browser there is no collector and the effect
 * applies the same config. One source of truth for title, description, canonical and JSON-LD.
 */
export interface SeoCollector {
  page: SEOConfig | null;
}

export const SeoCollectorContext = createContext<SeoCollector | null>(null);

export function usePageSEO(config: SEOConfig | null, deps: unknown[] = []): void {
  const collector = useContext(SeoCollectorContext);
  if (collector && config) collector.page = config;
  useEffect(() => (config ? applySEO(config) : undefined), deps); // eslint-disable-line react-hooks/exhaustive-deps
}
