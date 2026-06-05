const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;

export function splitImageUrl(url: string): { pathname: string; search: string } {
  const queryIndex = url.indexOf('?');
  if (queryIndex === -1) {
    return { pathname: url, search: '' };
  }
  return { pathname: url.slice(0, queryIndex), search: url.slice(queryIndex) };
}

export function stripImageExtension(pathname: string): string | null {
  const match = pathname.match(/^(.+)\.(jpg|jpeg|png|webp)$/i);
  return match ? match[1] : null;
}

function normalizeExt(ext: string): string {
  const lower = ext.toLowerCase();
  return lower === '.jpeg' ? '.jpg' : lower;
}

/** Alternate URLs to try when the requested extension is missing on disk. */
export function getAlternateImageUrls(url: string): string[] {
  const { pathname, search } = splitImageUrl(url);
  const base = stripImageExtension(pathname);
  if (!base) return [];

  const currentMatch = pathname.match(/\.(jpg|jpeg|png|webp)$/i);
  const current = currentMatch ? normalizeExt(`.${currentMatch[1]}`) : '';

  return IMAGE_EXTENSIONS.filter((ext) => normalizeExt(ext) !== current).map(
    (ext) => `${base}${ext}${search}`
  );
}

export function getNextAlternateImageUrl(url: string, tried: string[]): string | null {
  return getAlternateImageUrls(url).find((alt) => !tried.includes(alt)) ?? null;
}
