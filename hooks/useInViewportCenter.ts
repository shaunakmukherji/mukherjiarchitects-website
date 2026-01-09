import { useEffect, useRef, useState } from 'react';

/**
 * Hook to detect when an element is roughly in the vertical center of the viewport.
 * Returns a ref to attach to the element and a boolean flag.
 */
export const useInViewportCenter = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInCenter, setIsInCenter] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Treat as "centered" when a good portion is visible
          const inCenter = entry.isIntersecting && entry.intersectionRatio > 0.5;
          setIsInCenter(inCenter);
        });
      },
      {
        // Shrink the top/bottom so "center" is more likely when the element
        // is around the middle of the screen
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isInCenter };
};






