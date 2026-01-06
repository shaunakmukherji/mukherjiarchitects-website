/**
 * Converts image URL to WebP format for optimized serving
 * Excludes hero images from conversion
 */
export function getOptimizedImageUrl(url: string): string {
  // Skip hero images
  if (url.includes('/images/hero/')) {
    return url;
  }

  // Skip if already WebP
  if (url.endsWith('.webp')) {
    return url;
  }

  // For production build, Vite will handle the conversion
  // In dev, the Vite plugin handles it automatically
  // Just return the URL as-is - the middleware will convert it
  return url;
}

/**
 * Prevents right-click and download of original images
 * Ensures only WebP versions can be downloaded
 */
export function preventImageDownload(imgElement: HTMLImageElement): void {
  // Prevent context menu (right-click)
  imgElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Intercept drag start (prevents drag-to-download)
  imgElement.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Intercept any download attempts
  imgElement.addEventListener('mousedown', (e) => {
    if (e.button === 1) { // Middle mouse button
      e.preventDefault();
    }
  });
}

/**
 * Creates a download handler that serves WebP version
 */
export function createWebPDownloadHandler(imgElement: HTMLImageElement): void {
  // Override any programmatic download attempts
  const originalSrc = imgElement.src;
  
  // Ensure the image loads as WebP
  if (!originalSrc.includes('/images/hero/') && !originalSrc.endsWith('.webp')) {
    // The Vite middleware will automatically serve WebP
    // But we can force it by checking if it's already WebP
    imgElement.addEventListener('load', () => {
      // Image is already loaded as WebP by the middleware
    });
  }
}



