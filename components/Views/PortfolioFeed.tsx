import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS, SERVICES } from '../../constants';
import { encodeImageUrl } from '../../lib/imageUrl';
import OptimizedImage from '../ui/OptimizedImage';

const ALL = 'All';

const PortfolioFeed: React.FC = () => {
  const { navigateBack, backLabel, navigateToProject } = useNavigation();
  const [active, setActive] = useState(ALL);

  const categories = Array.from(new Set(PROJECTS.map((p) => p.category))).sort();

  const categoryLabel = (cat: string) =>
    SERVICES.find((s) => s.categoryFilter === cat)?.title ?? cat;

  const projects = active === ALL
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-black text-white pt-20">

      {/* ── Header ── */}
      <header className="sticky top-20 z-40 bg-black border-b border-zinc-900">
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </button>

          {/* Filter */}
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar flex-1 min-w-0 px-3">
            {[ALL, ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={
                  'whitespace-nowrap text-sm transition-colors ' +
                  (active === cat
                    ? 'text-white border-b border-white pb-0.5'
                    : 'text-zinc-500 hover:text-zinc-200')
                }
              >
                {cat === ALL ? 'All Work' : categoryLabel(cat)}
              </button>
            ))}
          </nav>

          <span className="text-zinc-600 text-sm tabular-nums shrink-0">
            {projects.length}
          </span>
        </div>
      </header>

      {/* ── Feed ── */}
      <div>
        {projects.map((project, i) => {
          const secondImage = project.gallery[0] ?? null;

          return (
            <div
              key={project.id}
              className="border-b border-zinc-900 cursor-pointer group"
              onClick={() => navigateToProject(project.id)}
            >
              {/* Image row */}
              <div className={`grid ${secondImage ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-zinc-900`}>
                {/* Main image */}
                <div className="aspect-[4/3] overflow-hidden bg-zinc-950 relative">
                  <OptimizedImage
                    src={encodeImageUrl(project.imageUrl)}
                    alt={project.title}
                    lazy={i > 3}
                    priority={i <= 1}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Second image */}
                {secondImage && (
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-950 relative">
                    <OptimizedImage
                      src={encodeImageUrl(secondImage)}
                      alt={`${project.title} — view 2`}
                      lazy={i > 3}
                      priority={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="flex items-baseline justify-between px-6 md:px-10 py-5">
                <div className="flex items-baseline gap-6">
                  <span className="text-zinc-600 text-sm tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-zinc-500 text-sm hidden sm:block">
                    {project.category} · {project.year}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="px-6 md:px-10 py-12 flex items-center justify-between border-t border-zinc-900">
        <span className="text-zinc-700 text-sm">Mukherji Architects Milano</span>
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-zinc-600 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
      </div>
    </div>
  );
};

export default PortfolioFeed;
