import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import Button from '../ui/Button';
import OptimizedImage from '../ui/OptimizedImage';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { selectedId, navigateToHome, navigateToContact } = useNavigation();
  const project = PROJECTS.find(p => p.id === selectedId);

  // Helper function to encode image URLs with spaces
  const encodeImageUrl = (url: string): string => {
    return url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');
  };

  // Update page title and meta tags for SEO
  useEffect(() => {
    if (!project) return;

    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Create descriptive title
    const pageTitle = `${project.title} - ${project.category} Project | Mukherji Architects Milano`;
    document.title = pageTitle;

    // Create descriptive meta description
    const metaDescriptionText = project.description 
      ? `${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}`
      : `${project.title} - ${project.category} architecture project by Mukherji Architects Milano. Located in ${project.location}, completed in ${project.year}.`;

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

    // Add Project structured data (JSON-LD)
    const projectSchema: any = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `https://www.mukherjiarchitects.com/projects/${selectedId}`,
      "name": project.title,
      "description": project.description || `${project.title} - ${project.category} architecture project by Mukherji Architects Milano.`,
      "creator": {
        "@type": "Organization",
        "name": "Mukherji Architects Milano",
        "url": "https://www.mukherjiarchitects.com"
      },
      "about": {
        "@type": "Thing",
        "name": project.category
      },
      "keywords": `${project.category}, architecture, ${project.location || ''}`
    };

    // Add optional properties only if they exist
    if (project.year) {
      projectSchema.dateCreated = `${project.year}`;
    }
    if (project.location) {
      projectSchema.locationCreated = {
        "@type": "Place",
        "name": project.location
      };
    }
    if (project.imageUrl) {
      projectSchema.image = `https://www.mukherjiarchitects.com${project.imageUrl}`;
    }

    const projectScript = document.createElement('script');
    projectScript.type = 'application/ld+json';
    projectScript.textContent = JSON.stringify(projectSchema);
    projectScript.id = 'project-structured-data';
    document.head.appendChild(projectScript);

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
      // Remove structured data script
      const projectScript = document.getElementById('project-structured-data');
      if (projectScript) {
        projectScript.remove();
      }
    };
  }, [project, selectedId]);

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
                <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.9]">
                    {project.title}
                </h1>
                
                {/* Description at the top */}
                <div className="mb-12">
                    <p className="text-zinc-400 leading-relaxed text-lg">
                        {project.description}
                    </p>
                </div>

                {/* Hero Image - Large */}
                <div className="mb-8">
                    <div className="group w-full bg-zinc-900 overflow-hidden border border-zinc-800 aspect-square">
                        <OptimizedImage 
                            src={encodeImageUrl(project.imageUrl)} 
                            alt={project.title}
                            priority={true}
                            lazy={false}
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
                
                {/* Gallery Images - Smaller */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {project.gallery.map((img, idx) => (
                             <div 
                               key={idx}
                               className="group cursor-pointer relative overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square"
                             >
                                 <OptimizedImage 
                                   src={encodeImageUrl(img)} 
                                   alt={`Gallery ${idx + 2}`}
                                   lazy={true}
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
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Year</span>
                    <span className="text-xl text-white">{project.year}</span>
                </div>
                <div className="border-t border-zinc-800 pt-6">
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Category</span>
                    <span className="text-xl text-white">{project.category}</span>
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