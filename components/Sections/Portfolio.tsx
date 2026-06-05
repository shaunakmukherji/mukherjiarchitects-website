import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { PROJECTS } from '../../constants';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import OptimizedImage from '../ui/OptimizedImage';
import { encodeImageUrl } from '../../lib/imageUrl';

const LOOP_COPIES = 3;

const Portfolio: React.FC = () => {
  const { navigateToProject, navigateToPortfolioFeed } = useNavigation();
  const [inViewStates, setInViewStates] = useState<boolean[]>(() => new Array(PROJECTS.length).fill(false));
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollableRatio, setScrollableRatio] = useState(1);
  const loopWidthRef = useRef(0);
  const didInitLoopScroll = useRef(false);
  const infiniteEnabled = PROJECTS.length >= 2;

  const measureLoopWidth = useCallback((): number => {
    const el = horizontalScrollRef.current;
    if (!el) return 0;
    const markers = el.querySelectorAll<HTMLElement>('[data-loop-start]');
    if (markers.length < 2) return 0;
    const w = markers[1].offsetLeft - markers[0].offsetLeft;
    return w > 0 ? w : 0;
  }, []);

  /** Normalize scroll into the middle copy and update progress bar (one full loop = 0…1). */
  const updateInfiniteScrollUi = useCallback(() => {
    const el = horizontalScrollRef.current;
    const loopW = loopWidthRef.current;
    if (!el) return;

    if (!infiniteEnabled || loopW <= 0) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
        setScrollableRatio(clientWidth / scrollWidth);
      } else {
        setScrollProgress(0);
        setScrollableRatio(1);
      }
      return;
    }

    const cw = el.clientWidth;
    const sl = el.scrollLeft;
    const buffer = Math.max(24, Math.min(80, loopW * 0.02));

    if (sl < buffer) {
      el.scrollLeft = sl + loopW;
    } else if (sl > 2 * loopW - cw - buffer) {
      el.scrollLeft = sl - loopW;
    }

    const denom = Math.max(1, loopW - cw);
    const numer = el.scrollLeft - loopW;
    setScrollProgress(Math.max(0, Math.min(1, numer / denom)));
    setScrollableRatio(Math.min(1, cw / loopW));
  }, [infiniteEnabled]);

  const scrollByOneCard = useCallback((direction: -1 | 1) => {
    const el = horizontalScrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-portfolio-card]');
    const step = (firstCard?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  useLayoutEffect(() => {
    const el = horizontalScrollRef.current;
    if (!el || !infiniteEnabled) return;

    const init = () => {
      const w = measureLoopWidth();
      if (w <= 0) return;
      loopWidthRef.current = w;
      if (!didInitLoopScroll.current) {
        el.scrollLeft = w;
        didInitLoopScroll.current = true;
      }
      updateInfiniteScrollUi();
    };

    init();
    const ro = new ResizeObserver(() => {
      const w = measureLoopWidth();
      if (w > 0) loopWidthRef.current = w;
      updateInfiniteScrollUi();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [infiniteEnabled, measureLoopWidth, updateInfiniteScrollUi]);

  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    updateInfiniteScrollUi();
    scrollContainer.addEventListener('scroll', updateInfiniteScrollUi, { passive: true });
    const resizeObserver = new ResizeObserver(updateInfiniteScrollUi);
    resizeObserver.observe(scrollContainer);
    window.addEventListener('resize', updateInfiniteScrollUi, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', updateInfiniteScrollUi);
      window.removeEventListener('resize', updateInfiniteScrollUi);
      resizeObserver.disconnect();
    };
  }, [updateInfiniteScrollUi]);

  useEffect(() => {
    const el = horizontalScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    let raf = 0;
    const updateCenteredCard = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rail = scrollContainer.getBoundingClientRect();
        const railCenter = rail.left + rail.width / 2;
        let bestIdx = -1;
        let bestDist = Infinity;
        scrollContainer.querySelectorAll<HTMLElement>('[data-portfolio-index]').forEach((node) => {
          const r = node.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;
          const d = Math.abs(cardCenter - railCenter);
          if (d < bestDist) {
            bestDist = d;
            const attr = node.getAttribute('data-portfolio-index');
            if (attr != null) {
              const idx = parseInt(attr, 10);
              if (!Number.isNaN(idx)) bestIdx = idx;
            }
          }
        });
        if (bestIdx < 0) return;
        setInViewStates((prev) => {
          if (prev[bestIdx]) return prev;
          const next = new Array(PROJECTS.length).fill(false);
          next[bestIdx] = true;
          return next;
        });
      });
    };

    updateCenteredCard();
    scrollContainer.addEventListener('scroll', updateCenteredCard, { passive: true });
    window.addEventListener('resize', updateCenteredCard, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', updateCenteredCard);
      window.removeEventListener('resize', updateCenteredCard);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const renderProjectCard = (project: (typeof PROJECTS)[0], loopIndex: number, indexInLoop: number) => {
    const globalIndex = PROJECTS.findIndex((p) => p.id === project.id);
    return (
      <div
        key={`${loopIndex}-${project.id}`}
        data-portfolio-card
        {...(indexInLoop === 0 ? { 'data-loop-start': String(loopIndex) } : {})}
        onClick={() => navigateToProject(project.id)}
        className="group aspect-square cursor-pointer relative overflow-hidden bg-pure-grey-light border border-pure-grey-medium flex-shrink-0 w-[min(85vw,22rem)] sm:w-[min(80vw,24rem)] md:w-[min(48vw,20rem)] lg:w-[min(40vw,22rem)] xl:w-[min(34vw,24rem)]"
        data-portfolio-index={globalIndex}
      >
        <OptimizedImage
          src={encodeImageUrl(project.imageUrl)}
          alt={project.title}
          lazy={globalIndex > 2}
          priority={globalIndex <= 2}
          className={
            'w-full h-full object-cover transition-transform duration-700 opacity-100 ' +
            (inViewStates[globalIndex] ? 'scale-105 ' : 'scale-100 ') +
            'group-hover:scale-110'
          }
          onError={(e) => {
            console.error('Failed to load image:', project.imageUrl);
            const target = e.target as HTMLImageElement;
            if (target.src !== project.imageUrl) {
              target.src = project.imageUrl;
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="min-w-0 pr-2">
            <span className="text-zinc-300 text-xs font-mono uppercase tracking-widest mb-2 block">
              {project.category} — {project.year}
            </span>
            <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 shrink-0">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="absolute top-6 right-6 text-xs font-mono text-zinc-400">
          {String(globalIndex + 1).padStart(2, '0')}
        </div>
      </div>
    );
  };

  const loopsToRender = infiniteEnabled    ? Array.from({ length: LOOP_COPIES }, (_, i) => i)
    : [0];

  return (
    <section id="portfolio" className="py-16 md:py-24 border-b border-zinc-900 bg-pure-grey text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-zinc-400 pb-8 mb-10 md:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black max-w-lg">
            Selected Works
          </h2>
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={navigateToPortfolioFeed}
              className="text-zinc-700 hover:text-black text-xs uppercase tracking-widest transition-colors flex items-center gap-1 group"
            >
              View All <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="text-zinc-700 font-mono text-xs">(03) Portfolio</span>
          </div>
        </div>

        <div className="relative -mx-6 px-6">
          <div
            ref={horizontalScrollRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar pb-2 snap-x snap-mandatory [scroll-behavior:auto]"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
            tabIndex={0}
            aria-label="Signature projects — use the wheel, drag, or arrows to move horizontally"
          >
            {loopsToRender.map((loopIndex) =>
              PROJECTS.map((project, indexInLoop) => (
                <div key={`${loopIndex}-${project.id}`} className="snap-start snap-always">
                  {renderProjectCard(project, loopIndex, indexInLoop)}
                </div>
              ))
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="flex items-center justify-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => scrollByOneCard(-1)}
                className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-500 text-black hover:bg-black hover:text-white transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-center mb-2 sm:hidden">
                  <span className="text-zinc-600 text-[9px] uppercase tracking-widest">
                    Swipe
                  </span>
                </div>
                <div className="relative h-[2px] bg-zinc-600/60 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-700/70 rounded-full" />
                  <div
                    className="absolute top-0 h-full bg-black rounded-full transition-all duration-150 ease-out"
                    style={{
                      width: `${Math.max(8, Math.min(100, scrollableRatio * 100))}%`,
                      left: `${Math.max(0, Math.min(100 - scrollableRatio * 100, scrollProgress * (100 - scrollableRatio * 100)))}%`,
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollByOneCard(1)}
                className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-500 text-black hover:bg-black hover:text-white transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
