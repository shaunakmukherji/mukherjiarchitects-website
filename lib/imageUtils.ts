import { ABOUT_IMAGE_VERSIONS } from '../generated/about-image-versions';
import { splitImageUrl, stripImageExtension } from './imageExtensions';

/**
 * Original-image URL with a cache-busting version for replaced About images.
 * (Project and hero images use the web copies in lib/webImages.ts instead.)
 */
export function getOptimizedImageUrl(
  url: string,
  options?: { mobile?: boolean; width?: number }
): string {
  if (url.endsWith('.webp')) {
    return url;
  }

  let optimized = withImageCacheBust(url);

  if (options?.mobile) {
    const separator = optimized.includes('?') ? '&' : '?';
    optimized = `${optimized}${separator}mobile=true`;
  }

  return optimized;
}

/** Append file mtime so replaced images with the same name bust browser cache. */
export function withImageCacheBust(url: string): string {
  const { pathname, search } = splitImageUrl(url);
  const base = stripImageExtension(pathname) ?? pathname;
  const version = ABOUT_IMAGE_VERSIONS[base] ?? ABOUT_IMAGE_VERSIONS[pathname];

  if (!version) {
    return url;
  }

  const params = new URLSearchParams(search.replace(/^\?/, ''));
  params.set('v', String(version));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
