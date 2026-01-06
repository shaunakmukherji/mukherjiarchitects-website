import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { HERO_IMAGE_URL } from '../../constants';

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const heroSection = heroRef.current;
      const heroHeight = heroSection.offsetHeight;
      const scrollY = window.scrollY;
      
      // Calculate progress - fade happens in first 25% of hero section (much faster!)
      const rawProgress = Math.min(scrollY / (heroHeight * 0.25), 1);
      // Apply easing for smoother fade
      const progress = Math.pow(rawProgress, 1.2);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text opacity: fades from 1 to 0 much faster (completes by 25% scroll)
  const textOpacity = Math.max(0, 1 - scrollProgress);
  
  // Text translate: moves up as you scroll (faster movement)
  const textTranslateY = scrollProgress * -80; // Moves up 80px max
  
  // Image opacity: increases from 0.2 to 1 as you scroll (becomes much clearer, faster)
  const imageOpacity = 0.2 + (scrollProgress * 0.8);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 flex flex-col justify-end border-b border-zinc-900 overflow-hidden"
    >
      
      {/* Background Image Elements - Cover Page Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
         <div className="relative w-full h-full overflow-hidden">
            <img 
                src={HERO_IMAGE_URL} 
                alt="Architecture Cover" 
                className="w-full h-full object-cover scale-105 transition-opacity duration-500 ease-out"
                style={{ opacity: imageOpacity }}
                loading="eager"
                decoding="async"
                onError={(e) => {
                  console.error('Hero image failed to load:', HERO_IMAGE_URL);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
            {/* Gradient Mask - Lighter overlay to keep text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
        
        {/* Main Content */}
        <div 
          className="md:col-span-8 space-y-6 md:space-y-8 transition-all duration-300 ease-out"
          style={{ 
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`
          }}
        >
          <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
             <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
             Based in Milano — Est. 2023
          </div>
          
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter text-white">
            <span className="whitespace-nowrap">HIGH-PERFORMANCE</span> <span className="text-zinc-500">ARCHITECTURE</span>
          </h1>
          
          <p className="max-w-[703px] text-zinc-400 text-base md:text-lg lg:text-xl font-light leading-relaxed">
            We design buildings as problem-solving systems.<br />
            As the world moves faster, traditional architectural processes remain slow.<br />
            We use artificial intelligence to work faster, reduce human error, and deliver more efficient buildings.
          </p>

          <div className="pt-4 md:pt-8 flex flex-wrap gap-4">
             <a href="#portfolio">
                <Button variant="primary" icon>
                EXPLORE OUR WORK
                </Button>
             </a>
          </div>
        </div>

        {/* Decorative Element */}
        <div 
          className="md:col-span-4 flex flex-col justify-end items-end hidden md:flex transition-all duration-300 ease-out"
          style={{ 
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`
          }}
        >
          <a href="#about" className="w-32 h-32 border border-zinc-800 rounded-full flex items-center justify-center relative group cursor-pointer hover:border-accent transition-colors duration-500">
             <div className="absolute inset-0 rounded-full border border-accent opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
             <span className="text-xs tracking-widest text-center text-zinc-500 group-hover:text-white transition-colors">
               SCROLL <br/> DOWN
             </span>
          </a>
        </div>
      </div>
      
      {/* Grid Lines Overlay */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-zinc-900" />
      <div className="absolute bottom-0 left-1/4 top-0 w-[1px] bg-zinc-900 hidden md:block" />
      <div className="absolute bottom-0 left-2/3 top-0 w-[1px] bg-zinc-900 hidden md:block" />
    </section>
  );
};

export default Hero;