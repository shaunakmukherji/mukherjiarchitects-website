import React from 'react';
import { PROJECTS } from '../../constants';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

const Portfolio: React.FC = () => {
  const { navigateToProject } = useNavigation();

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    // Split by '/' and encode each segment (except empty ones), then rejoin
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
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
                 <span className="text-zinc-600 font-mono text-xs">(03) Portfolio</span>
                 <div className="flex gap-2">
                    <button className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        ←
                    </button>
                    <button className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        →
                    </button>
                 </div>
            </div>
        </div>

        {/* Project Gallery - Bento Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {PROJECTS.filter(p => p.isSignature).slice(0, 4).map((project, idx) => ( // Only show signature projects
                <div 
                    key={project.id} 
                    onClick={() => navigateToProject(project.id)}
                    className={`group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800 ${
                        idx === 0 ? 'lg:col-span-8 aspect-square' : 
                        idx === 1 ? 'lg:col-span-4 aspect-square' : 
                        'lg:col-span-6 aspect-square'
                    }`}
                >
                    <img 
                        src={encodeImageUrl(project.imageUrl)} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          console.error('Failed to load image:', project.imageUrl);
                          // Fallback: try the original URL without encoding
                          const target = e.target as HTMLImageElement;
                          if (target.src !== project.imageUrl) {
                            target.src = project.imageUrl;
                          }
                        }}
                    />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div>
                            <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2 block">
                                {project.category} — {project.year}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                                {project.title}
                            </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>

                    {/* Subtle Numbering */}
                    <div className="absolute top-6 right-6 text-xs font-mono text-zinc-500">
                        0{idx + 1}
                    </div>
                </div>
            ))}

        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-12 gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;