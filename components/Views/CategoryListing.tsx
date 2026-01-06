import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

const CategoryListing: React.FC = () => {
  const { selectedId, navigateToHome, navigateToProject } = useNavigation();
  // selectedId here represents the categoryFilter string (e.g., 'Residential')
  const filteredProjects = PROJECTS
    .filter(p => p.category === selectedId)
    .sort((a, b) => {
      // Sort by categoryOrder if specified
      if (a.categoryOrder !== null && a.categoryOrder !== undefined && 
          b.categoryOrder !== null && b.categoryOrder !== undefined) {
        return a.categoryOrder - b.categoryOrder;
      }
      if (a.categoryOrder !== null && a.categoryOrder !== undefined) return -1;
      if (b.categoryOrder !== null && b.categoryOrder !== undefined) return 1;
      // Fallback to alphabetical
      return a.title.localeCompare(b.title);
    });

  // Update page title and meta tags for SEO
  useEffect(() => {
    if (!selectedId) return;

    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Create descriptive title
    const pageTitle = `${selectedId} Architecture Projects | Mukherji Architects Milano`;
    document.title = pageTitle;

    // Create descriptive meta description
    const projectCount = filteredProjects.length;
    const metaDescriptionText = `Explore ${projectCount} ${selectedId.toLowerCase()} architecture projects by Mukherji Architects Milano. View our portfolio of ${selectedId.toLowerCase()} design work, including commercial, residential, and institutional projects.`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metaDescriptionText);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', metaDescriptionText);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', pageTitle);
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', metaDescriptionText);
    }

    // Cleanup: restore original values when component unmounts
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      if (ogTitle && originalOGTitle) {
        ogTitle.setAttribute('content', originalOGTitle);
      }
      if (ogDescription && originalOGDescription) {
        ogDescription.setAttribute('content', originalOGDescription);
      }
      if (twitterTitle && originalTwitterTitle) {
        twitterTitle.setAttribute('content', originalTwitterTitle);
      }
      if (twitterDescription && originalTwitterDescription) {
        twitterDescription.setAttribute('content', originalTwitterDescription);
      }
    };
  }, [selectedId, filteredProjects.length]);

  // Track which projects are in the viewport center for scroll highlight effect
  const imageContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewStates, setInViewStates] = useState<boolean[]>(() => 
    new Array(filteredProjects.length).fill(false)
  );

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
  };

  // Update inViewStates when filteredProjects changes
  useEffect(() => {
    const newLength = filteredProjects.length;
    setInViewStates(new Array(newLength).fill(false));
    imageContainersRef.current = new Array(newLength).fill(null);
  }, [filteredProjects.length, selectedId]);

  // Observe project images and highlight whichever is approximately centered in the viewport
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || filteredProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInViewStates((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const indexAttr = entry.target.getAttribute('data-project-index');
            if (indexAttr == null) return;
            const idx = parseInt(indexAttr, 10);
            if (Number.isNaN(idx) || idx < 0 || idx >= filteredProjects.length) return;

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

    // Observe elements by querying the DOM directly - more reliable than refs
    const observeElements = () => {
      const elements = document.querySelectorAll('[data-project-index]');
      elements.forEach((el) => {
        observer.observe(el as Element);
      });
      
      // Initial check: highlight the first visible element near the top
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = -1;
      let closestDistance = Infinity;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        
        if (distance < closestDistance && rect.top < viewportCenter + 200) {
          const indexAttr = el.getAttribute('data-project-index');
          if (indexAttr) {
            const idx = parseInt(indexAttr, 10);
            if (!Number.isNaN(idx)) {
              closestDistance = distance;
              closestIdx = idx;
            }
          }
        }
      });
      
      if (closestIdx >= 0) {
        setInViewStates((prev) => {
          const next = [...prev];
          next[closestIdx] = true;
          return next;
        });
      }
    };

    // Use double RAF to ensure DOM is ready
    let rafId1: number;
    let rafId2: number;
    
    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(observeElements);
    });

    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      observer.disconnect();
    };
  }, [filteredProjects.length, selectedId]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
            <button 
            onClick={navigateToHome} 
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
            <ArrowLeft size={16} /> Back to Overview
            </button>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 uppercase">
            {selectedId} Projects
        </h1>
        <p className="text-zinc-500 mb-16 max-w-2xl">
            Selected works demonstrating our approach to {selectedId?.toLowerCase()} architecture.
        </p>

        {/* Featured/Cover Project (First Project) */}
        {filteredProjects.length > 0 && (
          <div 
            className="mb-16 group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square"
            onClick={() => navigateToProject(filteredProjects[0].id)}
            ref={(el) => {
              imageContainersRef.current[0] = el;
            }}
            data-project-index={0}
          >
            <OptimizedImage 
              src={encodeImageUrl(filteredProjects[0].imageUrl)} 
              alt={filteredProjects[0].title}
              priority={true}
              lazy={false}
              className={
                `w-full h-full object-cover transition-[transform,opacity,filter] duration-700 ` +
                (inViewStates[0]
                  ? 'scale-105 opacity-100 grayscale-0 '
                  : 'opacity-60 grayscale ') +
                'group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0'
              }
              onError={(e) => {
                console.error('Failed to load cover image:', filteredProjects[0].imageUrl);
                const target = e.target as HTMLImageElement;
                if (target.src !== filteredProjects[0].imageUrl) {
                  target.src = filteredProjects[0].imageUrl;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8">
              <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
                {filteredProjects[0].category} — {filteredProjects[0].year}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                {filteredProjects[0].title}
              </h2>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.slice(1).map((project, index) => {
              const projectIndex = index + 1; // +1 because index 0 is the featured project
              return (
                <div 
                    key={project.id} 
                    onClick={() => navigateToProject(project.id)}
                    className="group cursor-pointer relative"
                >
                    <div 
                      className="aspect-square w-full bg-zinc-900 mb-6 overflow-hidden border border-zinc-800 group-hover:border-accent transition-colors duration-300"
                      ref={(el) => {
                        imageContainersRef.current[projectIndex] = el;
                      }}
                      data-project-index={projectIndex}
                    >
                        <OptimizedImage 
                            src={encodeImageUrl(project.imageUrl)} 
                            alt={project.title}
                            lazy={true}
                            className={
                              `w-full h-full object-cover transition-[transform,opacity,filter] duration-700 ` +
                              (inViewStates[projectIndex]
                                ? 'scale-105 opacity-100 grayscale-0 '
                                : 'opacity-60 grayscale ') +
                              'group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0'
                            }
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src !== project.imageUrl) {
                                target.src = project.imageUrl;
                              }
                            }}
                        />
                         {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                <ArrowUpRight size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-zinc-500 text-sm font-mono mt-1 block">
                                {project.location} — {project.year}
                            </span>
                        </div>
                    </div>
                </div>
              );
            })}
            
            {filteredProjects.length === 0 && (
                <div className="col-span-full py-20 text-center text-zinc-600 font-mono">
                    No projects found in this category.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;