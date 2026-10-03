import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { INSIGHTS } from '../../generated/insights';
import NavLink from './NavLink';

/**
 * "Featured in" links from a page to the Insights articles that mention it. Gives each
 * article real internal links from relevant pages (project pages, the hospitality pages),
 * and gives readers a way into the journal without it being a nav item.
 * Pass projectId to match articles that link to that project, or tag to match an article tag.
 */
const RelatedInsights: React.FC<{ projectId?: string; tag?: string; className?: string }> = ({ projectId, tag, className = '' }) => {
  const { navigateToInsight } = useNavigation();
  const articles = INSIGHTS.filter((a) => (projectId && a.projects.includes(projectId)) || (tag && a.tag === tag));
  if (articles.length === 0) return null;

  return (
    <div className={className}>
      <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-3">Featured in Insights</p>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.slug}>
            <NavLink
              href={getPathForView('INSIGHT_DETAIL', a.slug)}
              onNavigate={() => navigateToInsight(a.slug)}
              className="inline-flex items-start gap-2 text-zinc-300 hover:text-white transition-colors text-sm leading-snug"
            >
              <span>{a.title}</span>
              <ArrowUpRight size={14} className="mt-0.5 shrink-0" />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedInsights;
