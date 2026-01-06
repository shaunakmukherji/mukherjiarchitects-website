import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';

const SECTION_IDS = ['hero', 'about', 'services', 'portfolio', 'contact'] as const;

const ScrollWheelIndicator: React.FC = () => {
  const { currentView } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentView !== 'HOME') return;

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight || 1;
      const p = Math.max(0, Math.min(1, scrollTop / scrollHeight));
      setProgress(p);

      const viewportHeight = window.innerHeight || 0;
      const viewportCenter = viewportHeight / 2;

      let bestIndex = 0;
      let bestDistance = Infinity;

      SECTION_IDS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setActiveIndex(bestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentView]);

  // Only show on home view
  if (currentView !== 'HOME') {
    return null;
  }

  return (
    <div
      className="
        pointer-events-none
        fixed right-3 md:right-6 top-1/2 -translate-y-1/2
        z-30
        flex flex-col items-center gap-3
      "
    >
      {/* Vertical progress bar */}
      <div className="w-[2px] h-24 md:h-32 rounded-full bg-zinc-900 overflow-hidden">
        <div
          className="w-full bg-zinc-300/80 md:bg-zinc-100 transition-all duration-500 ease-out"
          style={{ height: `${Math.max(4, progress * 100)}%` }}
        />
      </div>

      {/* Section dots */}
      <div className="flex flex-col gap-2 mt-1">
        {SECTION_IDS.map((id, index) => {
          const isActive = index === activeIndex;
          return (
            <span
              key={id}
              className={`
                block rounded-full transition-all duration-300
                ${isActive ? 'w-2.5 h-2.5 bg-accent' : 'w-1.5 h-1.5 bg-zinc-700/70'}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScrollWheelIndicator;


