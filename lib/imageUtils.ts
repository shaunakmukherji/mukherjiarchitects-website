import { ABOUT_IMAGE_VERSIONS } from '../generated/about-image-versions';
import { splitImageUrl, stripImageExtension } from './imageExtensions';

export function isAboutImage(url: string): boolean {
  return splitImageUrl(url).pathname.startsWith('/images/about/');
}

/**
 * Converts image URL to WebP format for optimized serving.
 * About and hero images are always served as originals.
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

/**
 * Detects if the current device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Prevents right-click and download of original images
 * Ensures only WebP versions can be downloaded
 */
export function preventImageDownload(imgElement: HTMLImageElement): void {
  imgElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  imgElement.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  imgElement.addEventListener('mousedown', (e) => {
    if (e.button === 1) {
      e.preventDefault();
    }
  });
}

/**
 * Creates a download handler that serves WebP version
 */
export function createWebPDownloadHandler(imgElement: HTMLImageElement): void {
  const originalSrc = imgElement.src;

  if (!originalSrc.includes('/images/hero/') && !originalSrc.endsWith('.webp')) {
    imgElement.addEventListener('load', () => {
      // Image is already loaded as WebP by the middleware
    });
  }
}
