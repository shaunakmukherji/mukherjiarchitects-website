import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../../constants';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

const Portfolio: React.FC = () => {
  const { navigateToProject } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="portfolio" className="py-24 border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white max-w-lg">
                Our Signature Projects
            </h2>
            
            <div className="flex items-center gap-4">
                 <span className="text-zinc-600 font-mono text-xs">({String(totalSlides).padStart(2, '0')}) Portfolio</span>
                 <div className="flex gap-2">
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

        {/* Project Gallery - Slideshow Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 min-h-[600px]">
            
            {/* Large image on the left */}
            {currentProjects[0] && (
              <div 
                key={`${currentSlide}-0`}
                onClick={() => navigateToProject(currentProjects[0].id)}
                className="lg:col-span-8 aspect-square group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800"
              >
                <img 
                  src={encodeImageUrl(currentProjects[0].imageUrl)} 
                  alt={currentProjects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  onError={(e) => {
                    console.error('Failed to load image:', currentProjects[0].imageUrl);
                    const target = e.target as HTMLImageElement;
                    if (target.src !== currentProjects[0].imageUrl) {
                      target.src = currentProjects[0].imageUrl;
                    }
                  }}
                />
                
                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
                      {currentProjects[0].category} — {currentProjects[0].year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                      {currentProjects[0].title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Subtle Numbering */}
                <div className="absolute top-6 right-6 text-xs font-mono text-zinc-500">
                  {String(currentSlide * 3 + 1).padStart(2, '0')}
                </div>
              </div>
            )}

            {/* Two smaller images on the right */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {currentProjects[1] && (
                <div 
                  key={`${currentSlide}-1`}
                  onClick={() => navigateToProject(currentProjects[1].id)}
                  className="flex-1 aspect-square group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800"
                >
                  <img 
                    src={encodeImageUrl(currentProjects[1].imageUrl)} 
                    alt={currentProjects[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      console.error('Failed to load image:', currentProjects[1].imageUrl);
                      const target = e.target as HTMLImageElement;
                      if (target.src !== currentProjects[1].imageUrl) {
                        target.src = currentProjects[1].imageUrl;
                      }
                    }}
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
                        {currentProjects[1].category} — {currentProjects[1].year}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                        {currentProjects[1].title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Subtle Numbering */}
                  <div className="absolute top-6 right-6 text-xs font-mono text-zinc-500">
                    {String(currentSlide * 3 + 2).padStart(2, '0')}
                  </div>
                </div>
              )}

              {currentProjects[2] && (
                <div 
                  key={`${currentSlide}-2`}
                  onClick={() => navigateToProject(currentProjects[2].id)}
                  className="flex-1 aspect-square group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800"
                >
                  <img 
                    src={encodeImageUrl(currentProjects[2].imageUrl)} 
                    alt={currentProjects[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      console.error('Failed to load image:', currentProjects[2].imageUrl);
                      const target = e.target as HTMLImageElement;
                      if (target.src !== currentProjects[2].imageUrl) {
                        target.src = currentProjects[2].imageUrl;
                      }
                    }}
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
                        {currentProjects[2].category} — {currentProjects[2].year}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                        {currentProjects[2].title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Subtle Numbering */}
                  <div className="absolute top-6 right-6 text-xs font-mono text-zinc-500">
                    {String(currentSlide * 3 + 3).padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Carousel Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-12 gap-2">
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