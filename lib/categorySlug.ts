import { SERVICES } from '../generated/services';

/** Same slugify rule used for project ids: lowercase, non-alphanumeric runs → single hyphen. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** categoryFilter (e.g. "Commercial Design") → clean URL slug (e.g. "commercial-design") */
export const CATEGORY_NAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => [s.categoryFilter, slugify(s.categoryFilter)])
);

/** Reverse lookup: slug → categoryFilter, used to parse incoming URLs. */
export const CATEGORY_SLUG_TO_NAME: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => [slugify(s.categoryFilter), s.categoryFilter])
);
