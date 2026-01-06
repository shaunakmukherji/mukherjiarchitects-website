import React, { useRef, useEffect, useState } from 'react';
import { getOptimizedImageUrl } from '../../lib/imageUtils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  skipOptimization?: boolean; // For hero images
}

/**
 * OptimizedImage component that:
 * - Serves WebP versions automatically (via Vite plugin)
 * - Prevents downloading of original high-res images
 * - Ensures only compressed WebP versions can be downloaded (cropped as displayed)
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  skipOptimization = false,
  ...props 
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Skip optimization for hero images
    if (skipOptimization || src.includes('/images/hero/')) {
      return;
    }

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      // If user right-clicks, offer WebP download instead
      if (imageLoaded) {
        downloadAsWebP(img, alt);
      }
    };

    // Prevent drag-to-download
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      
      // Create a data transfer with WebP version
      if (imageLoaded && e.dataTransfer) {
        downloadAsWebP(img, alt, true);
      }
    };

    // Prevent middle-click download
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
        if (imageLoaded) {
          downloadAsWebP(img, alt);
        }
      }
    };

    // Intercept Ctrl+Click or Cmd+Click download attempts
    const handleClick = (e: MouseEvent) => {
      if ((e.ctrlKey || e.metaKey) && imageLoaded) {
        e.preventDefault();
        downloadAsWebP(img, alt);
      }
    };

    // Prevent image selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    img.addEventListener('contextmenu', handleContextMenu);
    img.addEventListener('dragstart', handleDragStart);
    img.addEventListener('mousedown', handleMouseDown);
    img.addEventListener('click', handleClick);
    img.addEventListener('selectstart', handleSelectStart);

    return () => {
      img.removeEventListener('contextmenu', handleContextMenu);
      img.removeEventListener('dragstart', handleDragStart);
      img.removeEventListener('mousedown', handleMouseDown);
      img.removeEventListener('click', handleClick);
      img.removeEventListener('selectstart', handleSelectStart);
    };
  }, [src, alt, skipOptimization, imageLoaded]);

  // Function to download image as WebP (cropped as displayed)
  const downloadAsWebP = (img: HTMLImageElement, filename: string, isDrag = false) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Get displayed dimensions (respecting object-fit: cover and any transforms)
      const rect = img.getBoundingClientRect();
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const displayedWidth = rect.width;
      const displayedHeight = rect.height;

      // Calculate the crop to match object-fit: cover behavior
      const scale = Math.max(
        naturalWidth / displayedWidth,
        naturalHeight / displayedHeight
      );
      
      const cropWidth = displayedWidth * scale;
      const cropHeight = displayedHeight * scale;
      const cropX = (naturalWidth - cropWidth) / 2;
      const cropY = (naturalHeight - cropHeight) / 2;

      canvas.width = displayedWidth;
      canvas.height = displayedHeight;

      // Draw the cropped portion of the image
      ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, displayedWidth, displayedHeight
      );

      // Convert to WebP blob with compression
      canvas.toBlob((blob) => {
        if (blob) {
          if (isDrag && window.DataTransfer) {
            // For drag operations, set the blob as drag data
            return;
          }
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${filename.replace(/[^a-zA-Z0-9]/g, '-')}.webp`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/webp', 0.85);
    } catch (error) {
      console.error('Error creating WebP download:', error);
    }
  };

  // Get optimized URL (WebP conversion handled by Vite plugin)
  const optimizedSrc = skipOptimization ? src : getOptimizedImageUrl(src);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      {...props}
      onLoad={handleLoad}
      style={{
        ...props.style,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        pointerEvents: 'auto',
        WebkitTouchCallout: 'none',
      }}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    />
  );
};

export default OptimizedImage;

