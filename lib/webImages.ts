import { WEB_IMAGES, WebImage } from '../generated/web-images';

/**
 * Web-sized copies of the project and hero images, made at build time by scripts/web-images.cjs
 * into public/images/web/ (git-ignored). The originals in public/images/projects are never changed;
 * pages show the WebP copies and fall back to the original if a copy is missing.
 */
export function webImage(src: string): WebImage | null {
  if (!src) return null;
  let p = src.split(/[?#]/)[0];
  if (p.startsWith('http')) p = p.replace(/^https?:\/\/[^/]+/, '');
  try {
    p = decodeURIComponent(p);
  } catch {
    // already decoded
  }
  return WEB_IMAGES[p] ?? null;
}

/** srcset string for a web image, e.g. "/images/web/x-640.webp 640w, …" */
export function srcSetFor(img: WebImage): string {
  return img.variants.map((v) => `${v.url} ${v.w}w`).join(', ');
}

/** The variant to use as plain src: the largest one up to ~1600px wide. */
export function fallbackVariant(img: WebImage) {
  const fitting = img.variants.filter((v) => v.w <= 1600);
  return fitting.length ? fitting[fitting.length - 1] : img.variants[0];
}

/** 1200×630 social-preview crop of an image (falls back to the image itself). */
export function ogImageFor(src: string): string {
  return webImage(src)?.og ?? src;
}
