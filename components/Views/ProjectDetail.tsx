import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import Button from '../ui/Button';
import OptimizedImage from '../ui/OptimizedImage';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { selectedId, navigateToContact, navigateBack, backLabel, navigateToCreativeDirector } = useNavigation();
  const project = PROJECTS.find(p => p.id === selectedId);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const encodeImageUrl = (url: string): string =>
    url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');

  const allImages = project
    ? [project.imageUrl, ...(project.gallery ?? [])]
    : [];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, [allImages.length]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % allImages.length));
  }, [allImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // SEO
  useEffect(() => {
    if (!project) return;
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    const pageTitle = `${project.title} - ${project.category} Project | Mukherji Architects Milano`;
    document.title = pageTitle;
    const metaDescriptionText = project.description
      ? `${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}`
      : `${project.title} - ${project.category} architecture project by Mukherji Architects Milano. Located in ${project.location}, completed in ${project.year}.`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', metaDescriptionText);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', metaDescriptionText);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', metaDescriptionText);

    const projectSchema: any = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `https://www.mukherjiarchitects.com/projects/${selectedId}`,
      "name": project.title,
      "description": project.description || `${project.title} - ${project.category} architecture project by Mukherji Architects Milano.`,
      "creator": { "@type": "Organization", "name": "Mukherji Architects Milano", "url": "https://www.mukherjiarchitects.com" },
      "about": { "@type": "Thing", "name": project.category },
      "keywords": `${project.category}, architecture, ${project.location || ''}`
    };
    if (project.year) projectSchema.dateCreated = `${project.year}`;
    if (project.location) projectSchema.locationCreated = { "@type": "Place", "name": project.location };
    if (project.imageUrl) projectSchema.image = `https://www.mukherjiarchitects.com${project.imageUrl}`;

    const projectScript = document.createElement('script');
    projectScript.type = 'application/ld+json';
    projectScript.textContent = JSON.stringify(projectSchema);
    projectScript.id = 'project-structured-data';
    document.head.appendChild(projectScript);

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) metaDescription.setAttribute('content', originalDescription);
      if (ogTitle && originalOGTitle) ogTitle.setAttribute('content', originalOGTitle);
      if (ogDescription && originalOGDescription) ogDescription.setAttribute('content', originalOGDescription);
      if (twitterTitle && originalTwitterTitle) twitterTitle.setAttribute('content', originalTwitterTitle);
      if (twitterDescription && originalTwitterDescription) twitterDescription.setAttribute('content', originalTwitterDescription);
      document.getElementById('project-structured-data')?.remove();
    };
  }, [project, selectedId]);

  if (!project) return <div>Project not found</div>;

  return (
    <>
      <div className="pt-24 pb-24 min-h-screen bg-black">
        {/* Nav bar */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: images */}
            <div className="lg:col-span-8">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9]">
                {project.title}
              </h1>
              <p className="text-zinc-400 leading-relaxed text-lg mb-4">
                {project.description}
              </p>

              {/* Credit line */}
              {project.credit && (
                <p className="text-zinc-600 text-sm mb-10 flex items-center gap-1 flex-wrap">
                  <span>Project by</span>
                  {project.credit.linkTo === 'CREATIVE_DIRECTOR' ? (
                    <button
                      onClick={navigateToCreativeDirector}
                      className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2 decoration-zinc-700 hover:decoration-zinc-400"
                    >
                      {project.credit.name}
                    </button>
                  ) : (
                    <span className="text-zinc-400">{project.credit.name}</span>
                  )}
                  {project.credit.institution && (
                    <span>— {project.credit.institution}</span>
                  )}
                </p>
              )}

              {/* Hero image — full width, natural aspect ratio */}
              <div
                className="w-full mb-3 cursor-zoom-in overflow-hidden bg-zinc-900 border border-zinc-800"
                onClick={() => openLightbox(0)}
              >
                <OptimizedImage
                  src={encodeImageUrl(project.imageUrl)}
                  alt={project.title}
                  priority={true}
                  lazy={false}
                  className="w-full h-auto block transition-transform duration-500"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    if (t.src !== project.imageUrl) t.src = project.imageUrl;
                  }}
                />
              </div>

              {/* Gallery — full width stacked, natural ratio */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-3">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full cursor-zoom-in overflow-hidden bg-zinc-900 border border-zinc-800"
                      onClick={() => openLightbox(idx + 1)}
                    >
                      <OptimizedImage
                        src={encodeImageUrl(img)}
                        alt={`${project.title} — ${idx + 2}`}
                        lazy={true}
                        className="w-full h-auto block opacity-80 hover:opacity-100 transition-opacity duration-500"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src !== img) t.src = img;
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: project info */}
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ArrowLeft size={32} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={encodeImageUrl(allImages[lightboxIndex])}
              alt={`${project.title} — ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ArrowRight size={32} />
            </button>
          )}

          {/* Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-zinc-500 text-sm tracking-widest">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
