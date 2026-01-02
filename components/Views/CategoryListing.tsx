import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
  };

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
          >
            <img 
              src={encodeImageUrl(filteredProjects[0].imageUrl)} 
              alt={filteredProjects[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
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
            {filteredProjects.slice(1).map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => navigateToProject(project.id)}
                    className="group cursor-pointer relative"
                >
                    <div className="aspect-square w-full bg-zinc-900 mb-6 overflow-hidden border border-zinc-800 group-hover:border-accent transition-colors duration-300">
                        <img 
                            src={encodeImageUrl(project.imageUrl)} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
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
            ))}
            
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