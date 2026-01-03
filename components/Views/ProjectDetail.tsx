import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import Button from '../ui/Button';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { selectedId, navigateToHome, navigateToContact } = useNavigation();
  const project = PROJECTS.find(p => p.id === selectedId);

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
  };

  if (!project) return <div>Project not found</div>;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={navigateToHome} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9]">
                    {project.title}
                </h1>
                <div className="flex justify-start mb-8">
                    <div className="group aspect-square w-full max-w-md bg-zinc-900 overflow-hidden border border-zinc-800">
                        <img 
                            src={encodeImageUrl(project.imageUrl)} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100 grayscale group-hover:grayscale-0"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              console.error('Failed to load hero image:', {
                                attempted: target.src,
                                original: project.imageUrl,
                                encoded: encodeImageUrl(project.imageUrl)
                              });
                              // Try original URL if encoded version fails
                              if (target.src !== project.imageUrl && !target.src.endsWith(project.imageUrl)) {
                                target.src = project.imageUrl;
                              }
                            }}
                            onLoad={() => {
                              console.log('Hero image loaded successfully:', project.imageUrl);
                            }}
                        />
                    </div>
                </div>
                
                {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-w-2xl">
                        {project.gallery.map((img, idx) => (
                             <div 
                               key={idx}
                               className="group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square"
                             >
                                 <img 
                                   src={encodeImageUrl(img)} 
                                   alt={`Gallery ${idx + 2}`} 
                                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                   onError={(e) => {
                                     const target = e.target as HTMLImageElement;
                                     if (target.src !== img) {
                                       target.src = img;
                                     }
                                   }}
                                 />
                             </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="border-t border-zinc-800 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Location</span>
                    <span className="text-xl text-white">{project.location}</span>
                </div>
                <div className="border-t border-zinc-800 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Year of Commission</span>
                    <span className="text-xl text-white">{project.year}</span>
                </div>
                <div className="border-t border-zinc-800 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Category</span>
                    <span className="text-xl text-white">{project.category}</span>
                </div>
                <div className="border-t border-zinc-800 pt-6">
                     <p className="text-zinc-400 leading-relaxed">
                        {project.description}
                     </p>
                </div>
                
                <div className="pt-8">
                    <Button variant="outline" className="w-full" onClick={navigateToContact}>
                        Inquire About This Project
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;