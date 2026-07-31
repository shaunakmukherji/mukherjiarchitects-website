import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';

interface FactRow {
  label: string;
  value?: string;
}

interface ProjectFactsProps {
  project: Project;
  onViewConstructionProgress?: () => void;
}

/**
 * Single source of truth for how project facts render across the site.
 * Only fields with an actual value are shown — no blank labels, placeholders, or "N/A".
 */
const ProjectFacts: React.FC<ProjectFactsProps> = ({ project, onViewConstructionProgress }) => {
  const rows: FactRow[] = [
    { label: 'Location', value: project.location },
    { label: 'Client', value: project.client },
    { label: 'Status', value: project.status },
    { label: 'Design Year', value: project.year },
    { label: 'Site Area', value: project.siteArea },
    { label: 'Built-up Area', value: project.builtUpArea },
    { label: 'Scope', value: project.scope },
  ].filter((row): row is FactRow & { value: string } => !!row.value && row.value.trim() !== '');

  if (rows.length === 0) return null;

  return (
    <>
      {rows.map((row) => (
        <div key={row.label} className="border-t border-zinc-800 pt-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">{row.label}</span>
              <span className="text-base text-white">{row.value}</span>
            </div>
            {row.label === 'Status' && onViewConstructionProgress && (
              <button
                onClick={onViewConstructionProgress}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 border border-zinc-700 rounded-full text-xs uppercase tracking-widest text-zinc-300 hover:border-accent hover:text-accent transition-colors"
              >
                Progress <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectFacts;
