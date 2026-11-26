import React, { useEffect, useRef, useState } from 'react';
import { getNextAlternateImageUrl } from '../../lib/imageExtensions';
import { getOptimizedImageUrl } from '../../lib/imageUtils';
import { fallbackVariant, srcSetFor, webImage } from '../../lib/webImages';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  skipOptimization?: boolean; // Serve the original file as-is
  lazy?: boolean; // Enable lazy loading (default: true for below-fold images)
  priority?: boolean; // High priority loading (for above-fold images)
}

/**
 * Project images:
 * - Serves the web-sized WebP copies made at build time (scripts/project-images.cjs) with a srcset,
 *   so phones download a small file and large screens a sharp one. Falls back to the original file.
 * - Gives the browser the image's size up front so the page doesn't jump while images load.
 * - Lazy-loads below-the-fold images.
 * - Discourages casual saving: no dragging, and no right-click menu on images that aren't links
 *   (on project cards the menu stays, so "Open in new tab" still works).
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  skipOptimization = false,
  lazy = true,
  priority = false,
  sizes,
  ...props
}) => {
  const triedSrcs = useRef<string[]>([]);
  const web = skipOptimization ? null : webImage(src);
  const [useOriginal, setUseOriginal] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    triedSrcs.current = [];
    setUseOriginal(false);
    setResolvedSrc(src);
  }, [src]);

  const showWeb = !!web && !useOriginal;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // A web copy failed: use the original instead
    if (showWeb) {
      setUseOriginal(true);
      return;
    }
    if (!triedSrcs.current.includes(resolvedSrc)) triedSrcs.current.push(resolvedSrc);
    const nextSrc = getNextAlternateImageUrl(src, triedSrcs.current);
    if (nextSrc) {
      triedSrcs.current.push(nextSrc);
      setResolvedSrc(nextSrc);
      return;
    }
    props.onError?.(e);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!(e.currentTarget as HTMLElement).closest('a')) e.preventDefault();
    props.onContextMenu?.(e);
  };

  const loadingAttr = lazy && !priority ? 'lazy' : priority ? 'eager' : undefined;

  return (
    <img
      src={showWeb ? fallbackVariant(web!).url : getOptimizedImageUrl(resolvedSrc)}
      srcSet={showWeb ? srcSetFor(web!) : undefined}
      sizes={showWeb ? sizes ?? '100vw' : undefined}
      width={showWeb ? web!.w : undefined}
      height={showWeb ? web!.h : undefined}
      alt={alt}
      loading={loadingAttr}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...props}
      onError={handleError}
      onContextMenu={handleContextMenu}
      style={{
        ...props.style,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    />
  );
};

export default OptimizedImage;
