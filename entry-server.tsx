// Build-time renderer: turns each page into real HTML so search engines, AI assistants and
// link previews can read the content without running JavaScript. Used by scripts/prerender-seo.cjs
// (built with `vite build --ssr entry-server.tsx`). Visitors' browsers then attach to that HTML.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { SeoCollector, SeoCollectorContext } from './lib/usePageSEO';
import { PROJECTS } from './constants';
import { getPathForView } from './contexts/NavigationContext';

export function render(path: string) {
  const collector: SeoCollector = { page: null };
  const html = renderToString(
    <React.StrictMode>
      <SeoCollectorContext.Provider value={collector}>
        <App initialPath={path} />
      </SeoCollectorContext.Provider>
    </React.StrictMode>
  );
  return { html, seo: collector.page };
}

/** Pages that exist but have no entry in the SEO manifest (construction progress galleries). */
export function extraPaths(): string[] {
  return PROJECTS.filter((p) => (p.constructionMedia ?? []).length > 0).map((p) => getPathForView('PROJECT_CONSTRUCTION', p.id));
}
