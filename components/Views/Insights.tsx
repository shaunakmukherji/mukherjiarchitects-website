import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { INSIGHTS } from '../../generated/insights';
import { Insight } from '../../types';
import NavLink from '../ui/NavLink';
import { applySEO, breadcrumb } from '../../lib/seo';
import { formatDate } from '../../lib/formatDate';

// Image-led card. `featured` is the large full-width treatment used for the newest article.
const ArticleCard: React.FC<{ article: Insight; featured?: boolean; priority?: boolean }> = ({ article, featured, priority }) => {
  const { navigateToInsight } = useNavigation();
  const { cover } = article;

  const image = (
    <div className={`overflow-hidden bg-zinc-900 aspect-[16/9] ${featured ? 'lg:aspect-[21/9]' : ''}`}>
      {cover && (
        <img
          src={cover.src}
          srcSet={cover.srcSet}
          sizes={featured ? '(min-width: 1280px) 1216px, calc(100vw - 32px)' : '(min-width: 1024px) 380px, (min-width: 768px) 45vw, calc(100vw - 32px)'}
          width={cover.width}
          height={cover.height}
          alt={cover.alt}
          loading={priority ? undefined : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );

  const meta = (
    <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-4">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      {article.tag && <span> · {article.tag}</span>}
    </p>
  );

  const readMore = (
    <span className="inline-flex items-center gap-2 text-zinc-300 group-hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
      Read article <ArrowUpRight size={14} />
    </span>
  );

  return (
    <NavLink
      href={getPathForView('INSIGHT_DETAIL', article.slug)}
      onNavigate={() => navigateToInsight(article.slug)}
      className="group block"
    >
      {image}
      {featured ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-7">
            {meta}
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-[1.08] group-hover:text-zinc-300 transition-colors">
              {article.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-9">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">{article.description}</p>
            {readMore}
          </div>
        </div>
      ) : (
        <div className="pt-6">
          {meta}
          <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight mb-3 group-hover:text-zinc-300 transition-colors">
            {article.title}
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed mb-6">{article.description}</p>
          {readMore}
        </div>
      )}
    </NavLink>
  );
};

const Insights: React.FC = () => {
  useEffect(() => applySEO({
    title: 'Insights | Mukherji Architects Milano',
    description: 'Articles on architecture and design from Mukherji Architects Milano, with sources and links to the projects they draw on.',
    image: '/images/og-default.png',
    canonicalPath: '/insights',
    schemas: [breadcrumb('Insights', '/insights')],
  }), []);

  const [featured, ...rest] = INSIGHTS;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6">
            Insights
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
            Articles on architecture and design, with sources and links to the projects they draw on.
          </p>
        </div>

        {featured && <ArticleCard article={featured} featured priority />}

        {rest.length > 0 && (
          <div className="mt-20 md:mt-28 pt-12 border-t border-zinc-800">
            <h2 className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-10">More articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
