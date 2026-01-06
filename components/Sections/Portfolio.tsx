import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PROJECTS } from '../../constants';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import OptimizedImage from '../ui/OptimizedImage';

const Portfolio: React.FC = () => {
  const { navigateToProject } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewStates, setInViewStates] = useState<boolean[]>(() => new Array(PROJECTS.length).fill(false));
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollableRatio, setScrollableRatio] = useState(1);

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    // Split by '/' and encode each segment (except empty ones), then rejoin
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
  };

  // Group all projects into slides (3 projects per slide: 1 large + 2 small)
  const slides = useMemo(() => {
    const allProjects = PROJECTS;
    const grouped: typeof PROJECTS[] = [];
    
    for (let i = 0; i < allProjects.length; i += 3) {
      grouped.push(allProjects.slice(i, i + 3));
    }
    
    return grouped;
  }, []);

  const totalSlides = slides.length;
  const currentProjects = slides[currentSlide] || [];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Observe the three visible project images and highlight whichever
  // is approximately centered in the viewport (for desktop grid layout)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInViewStates((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const indexAttr = entry.target.getAttribute('data-portfolio-index');
            if (indexAttr == null) return;
            const idx = parseInt(indexAttr, 10);
            if (Number.isNaN(idx)) return;

            const inCenter = entry.isIntersecting && entry.intersectionRatio > 0.5;
            next[idx] = inCenter;
          });
          return next;
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    imageContainersRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentSlide, isMobile]);

  // Track horizontal scroll progress (for mobile)
  useEffect(() => {
    if (!isMobile) return;

    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    const updateScrollProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = scrollLeft / maxScroll;
        setScrollProgress(progress);
        // Calculate how much of the content is visible (thumb size)
        const ratio = clientWidth / scrollWidth;
        setScrollableRatio(ratio);
      } else {
        setScrollProgress(0);
        setScrollableRatio(1);
      }
    };

    updateScrollProgress();
    scrollContainer.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // Also update on resize
    const resizeObserver = new ResizeObserver(updateScrollProgress);
    resizeObserver.observe(scrollContainer);
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // Observe projects in horizontal scroll (for mobile)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute('data-portfolio-index');
          if (indexAttr == null) return;
          const idx = parseInt(indexAttr, 10);
          if (Number.isNaN(idx)) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setInViewStates((prev) => {
              const next = new Array(PROJECTS.length).fill(false);
              next[idx] = true;
              return next;
            });
          }
        });
      },
      {
        rootMargin: '0px -10% 0px -10%',
        threshold: [0.3, 0.5, 0.7],
      }
    );

    const scrollContainer = horizontalScrollRef.current;
    if (scrollContainer) {
      const projectCards = scrollContainer.querySelectorAll('[data-portfolio-index]');
      projectCards.forEach((card) => observer.observe(card));
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Render a single project card
  const renderProjectCard = (project: typeof PROJECTS[0], index: number, isLarge = false) => {
    const globalIndex = PROJECTS.findIndex(p => p.id === project.id);
    return (
      <div 
        key={project.id}
        onClick={() => navigateToProject(project.id)}
        className={`${isLarge ? 'lg:col-span-8' : 'flex-1'} aspect-square group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0`}
        style={isMobile ? { width: '85vw', minWidth: '85vw' } : {}}
        ref={(el) => {
          if (!isMobile) {
            imageContainersRef.current[index] = el;
          }
        }}
        data-portfolio-index={globalIndex}
      >
        <OptimizedImage 
          src={encodeImageUrl(project.imageUrl)} 
          alt={project.title}
          className={
            `w-full h-full object-cover transition-transform duration-700 ` +
            (inViewStates[globalIndex]
              ? 'scale-105 opacity-100 grayscale-0 '
              : 'opacity-70 grayscale ') +
            'group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0'
          }
          onError={(e) => {
            console.error('Failed to load image:', project.imageUrl);
            const target = e.target as HTMLImageElement;
            if (target.src !== project.imageUrl) {
              target.src = project.imageUrl;
            }
          }}
        />
        
        {/* Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
        
        <div className={`absolute bottom-0 left-0 w-full ${isLarge ? 'p-6 md:p-8' : 'p-6'} flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300`}>
          <div>
            <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
              {project.category} — {project.year}
            </span>
            <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-display font-bold text-white`}>
              {project.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            <ArrowUpRight size={20} />
          </div>
        </div>

        {/* Subtle Numbering */}
        <div className="absolute top-6 right-6 text-xs font-mono text-zinc-500">
          {String(globalIndex + 1).padStart(2, '0')}
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6 border-b border-zinc-900 pb-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white max-w-lg">
            Our Signature Projects
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600 font-mono text-xs">(03) Portfolio</span>
            {/* Hide navigation buttons on mobile */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={goToPrevious}
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Scrollable Gallery */}
        <div className="md:hidden relative -mx-6 px-6">
          <div 
            ref={horizontalScrollRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {PROJECTS.map((project, index) => (
              <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
                {renderProjectCard(project, index)}
              </div>
            ))}
          </div>
          
          {/* Minimal Scroll Indicator */}
          <div className="mt-6 px-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-zinc-700 text-[9px] font-mono uppercase tracking-widest">
                Swipe
              </span>
            </div>
            <div className="relative h-1 bg-zinc-900 rounded-full overflow-hidden">
              {/* Scrollbar thumb */}
              <div 
                className="absolute top-0 h-full bg-white/80 rounded-full transition-all duration-150 ease-out"
                style={{ 
                  width: `${Math.max(10, Math.min(100, scrollableRatio * 100))}%`,
                  left: `${Math.max(0, Math.min(100 - (scrollableRatio * 100), scrollProgress * (100 - (scrollableRatio * 100))))}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Desktop: Grid Slideshow Layout */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 min-h-[600px]">
            
            {/* Large image on the left */}
            {currentProjects[0] && renderProjectCard(currentProjects[0], 0, true)}

            {/* Two smaller images on the right */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {currentProjects[1] && renderProjectCard(currentProjects[1], 1)}
              {currentProjects[2] && renderProjectCard(currentProjects[2], 2)}
            </div>

          </div>
        </div>

        {/* Carousel Indicators - Desktop only */}
        {totalSlides > 1 && (
          <div className="hidden md:flex justify-center mt-12 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-zinc-800 hover:bg-zinc-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;