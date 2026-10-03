import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { INSIGHTS } from '../../generated/insights';
import NavLink from '../ui/NavLink';
import { applySEO, applyNoIndex } from '../../lib/seo';
import { formatDate } from '../../lib/formatDate';

const InsightDetail: React.FC = () => {
  const { selectedId, navigateToInsights, navigateToPortfolioFeed, navigateToPath } = useNavigation();
  const article = INSIGHTS.find((a) => a.slug === selectedId);

  // Invalid slug — noindex it (see applyNoIndex for why, same as ProjectDetail).
  useEffect(() => {
    if (article) return;
    return applyNoIndex();
  }, [article]);

  useEffect(() => {
    if (!article) return;
    return applySEO({
      title: article.seoTitle,
      description: article.description,
      image: article.image,
      canonicalPath: article.path,
      schemas: article.jsonLd,
    });
  }, [article]);

  // Links written as plain paths in the markdown ("/project/...") navigate inside the app
  // like every other internal link; external links and modified clicks behave normally.
  const handleArticleClick = (e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateToPath(href);
  };

  const backLink = (
    <NavLink
      href={getPathForView('INSIGHTS', null)}
      onNavigate={navigateToInsights}
      className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
    >
      <ArrowLeft size={16} /> Insights
    </NavLink>
  );

  if (!article) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">{backLink}</div>
      </div>
    );
  }

  // Jump to a section without a URL change (a hash change would also fire the router's popstate handler)
  const jumpTo = (e: React.MouseEvent, id: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-28 md:pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-[68rem] mx-auto px-4 sm:px-6">
        <div className="article-col mb-10 md:mb-14">{backLink}</div>

        <article onClick={handleArticleClick}>
          <header className="article-col">
            {article.tag && (
              <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-5">{article.tag}</p>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-7">
              {article.title}
            </h1>
            <p
              className="article-intro text-zinc-200 text-xl md:text-2xl leading-snug mb-8"
              dangerouslySetInnerHTML={{ __html: article.introHtml }}
            />
            <p className="text-zinc-400 text-sm">
              By {article.author}
              <span aria-hidden="true"> · </span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updated && (
                <>
                  <span aria-hidden="true"> · </span>
                  Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                </>
              )}
              <span aria-hidden="true"> · </span>
              {article.readingMinutes} min read
            </p>
            {article.disclosure && (
              <p className="mt-4 text-zinc-400 text-sm italic leading-relaxed">{article.disclosure}</p>
            )}
          </header>

          {article.coverHtml && (
            <div className="mt-10 md:mt-14" dangerouslySetInnerHTML={{ __html: article.coverHtml }} />
          )}

          {article.headings.length > 2 && (
            <nav aria-label="In this article" className="article-col mt-14">
              <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-4">In this article</p>
              <ol className="border-t border-zinc-800">
                {article.headings.map((h, i) => (
                  <li key={h.id} className="border-b border-zinc-800">
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => jumpTo(e, h.id)}
                      className="group flex items-baseline gap-4 py-3.5 text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="text-xs tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base leading-snug">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className={`article-prose mt-14${article.numberedSections ? ' numbered' : ''}`}
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <footer className="article-col mt-20 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            {backLink}
            <NavLink
              href={getPathForView('PORTFOLIO_FEED', null)}
              onNavigate={navigateToPortfolioFeed}
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              View our projects <ArrowUpRight size={16} />
            </NavLink>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default InsightDetail;
