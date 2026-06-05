import { Project } from '../types';

/** Lower categoryOrder = shown first. Projects in `_hero/` get order 0. */
export function compareProjectsByCategoryOrder(a: Project, b: Project): number {
  const ao = a.categoryOrder ?? 9999;
  const bo = b.categoryOrder ?? 9999;
  if (ao !== bo) return ao - bo;
  return (a.title || '').localeCompare(b.title || '');
}

export function getCategoryHeroProject(
  projects: Project[],
  category: string
): Project | undefined {
  const best = [...projects]
    .filter((p) => p.category === category)
    .sort(compareProjectsByCategoryOrder)[0];
  // Only return the project if it was explicitly placed in _hero/ (categoryOrder === 0)
  return best?.categoryOrder === 0 ? best : undefined;
}
