import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import NavLink from '../ui/NavLink';
import { usePageSEO } from '../../lib/usePageSEO';

/** Shown for URLs the site doesn't know. The host serves these with a real 404 status (dist/404.html). */
const NotFound: React.FC = () => {
  const { navigateToHome, navigateToPortfolioFeed } = useNavigation();

  usePageSEO({
    title: 'Page not found | Mukherji Architects Milano',
    description: 'This page could not be found.',
    noindex: true,
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">404</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6">
          Page not found
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-prose mb-10">
          The page may have moved, or the address may be mistyped.
        </p>
        <div className="flex flex-wrap gap-6 text-sm uppercase tracking-widest">
          <NavLink href={getPathForView('HOME', null)} onNavigate={navigateToHome} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors">
            Home
          </NavLink>
          <NavLink href={getPathForView('PORTFOLIO_FEED', null)} onNavigate={navigateToPortfolioFeed} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors">
            All projects
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
