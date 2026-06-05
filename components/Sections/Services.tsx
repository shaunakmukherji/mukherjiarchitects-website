import React, { useEffect, useRef, useState } from 'react';
import { SERVICES, PROJECTS } from '../../constants';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { encodeImageUrl } from '../../lib/imageUrl';
import { getCategoryHeroProject } from '../../lib/projectSort';
import OptimizedImage from '../ui/OptimizedImage';

const Services: React.FC = () => {
  const { navigateToCategory } = useNavigation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cardInView, setCardInView] = useState<boolean[]>([]);

  const getMainProjectImage = (categoryFilter: string): string => {
    const hero = getCategoryHeroProject(PROJECTS, categoryFilter);
    if (hero?.imageUrl) return hero.imageUrl;

    const service = SERVICES.find((s) => s.categoryFilter === categoryFilter);
    return service?.imageUrl || '';
  };

  // Scroll-based zoom highlight (images stay full color; one card scales up at a time)
  // through the Services section, so cards are highlighted in order.
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const viewportCenter = viewportHeight / 2;

      // If the whole section is out of view, clear highlights
      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        setCardInView([]);
        return;
      }

      const sectionTop = rect.top;
      const sectionHeight = rect.height || 1;

      // Position of viewport center within the section (0 at top, 1 at bottom)
      const relativeCenter = viewportCenter - sectionTop;
      let progress = relativeCenter / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));

      const count = SERVICES.length;
      if (count === 0) {
        setCardInView([]);
        return;
      }

      // Avoid highlighting right at the very start/end of the section.
      // Smaller margin = longer scroll range where cards can be highlighted,
      // which makes the transitions feel slower and more gradual.
      const edgeMargin = 0.02;
      if (progress < edgeMargin || progress > 1 - edgeMargin) {
        setCardInView([]);
        return;
      }

      let index = Math.floor(progress * count);
      if (index >= count) index = count - 1;

      const next = SERVICES.map((_, i) => i === index);
      setCardInView(next);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="services"
      className="py-24 border-b border-zinc-900 bg-black relative"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-zinc-900 pb-8">
          <h2 className="font-display text-4xl font-bold text-white uppercase tracking-tight">
            Our Expertise
          </h2>
          <span className="text-zinc-600 font-mono text-xs">(02) Services</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 relative">
            {/* Vertical Dividers for Desktop */}
            <div className="absolute inset-y-0 left-1/3 w-px bg-zinc-900 hidden md:block"></div>
            <div className="absolute inset-y-0 left-2/3 w-px bg-zinc-900 hidden md:block"></div>

            {SERVICES.map((service, index) => (
                <div 
                    key={service.id} 
                    onClick={() => navigateToCategory(service.categoryFilter)}
                    className="group relative p-6 md:p-8 transition-all duration-300 hover:bg-zinc-900/30 border border-zinc-900 md:border-none cursor-pointer"
                >
                    {/* Hover Top Border Beam - RED ACCENT */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    
                    {/* Meta Data */}
                    <div className="flex justify-between items-start mb-8 opacity-60 text-[10px] uppercase tracking-wider font-mono">
                        <span className="border border-zinc-700 px-2 py-1 rounded-full group-hover:border-accent group-hover:text-accent transition-colors">0{index + 1}</span>
                        <span>Design Service</span>
                    </div>

                    {/* Image Area — taller frame so imagery reads larger on the grid */}
                    <div className="aspect-square w-full mb-8 overflow-hidden bg-zinc-900 relative border border-zinc-800">
                         <OptimizedImage 
                            src={encodeImageUrl(getMainProjectImage(service.categoryFilter))} 
                            alt={service.title} 
                            className={
                              'w-full h-full object-cover transition-transform duration-1000 ease-out opacity-100 ' +
                              (cardInView[index] ? 'scale-105 ' : 'scale-100 ') +
                              'group-hover:scale-110'
                            } 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-zinc-200">
                        {(() => {
                            const words = service.title.split(' ');
                            const lines: string[] = [];
                            
                            for (let i = 0; i < words.length; i++) {
                                // If current word is "&", combine it with the next word
                                if (words[i] === '&' && i < words.length - 1) {
                                    lines.push(`& ${words[i + 1]}`);
                                    i++; // Skip the next word since we've combined it
                                } else {
                                    lines.push(words[i]);
                                }
                            }
                            
                            return lines.map((line, i) => (
                                <span key={i} className="block">{line}</span>
                            ));
                        })()}
                    </h3>
                    
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 group-hover:text-zinc-400 transition-colors">
                        {service.description}
                    </p>

                    <div 
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 group-hover:text-accent pointer-events-none"
                    >
                        View Projects <ArrowRight className="w-3 h-3" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;