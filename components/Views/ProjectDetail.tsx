import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import Button from '../ui/Button';
import OptimizedImage from '../ui/OptimizedImage';
import ProjectFacts from '../ui/ProjectFacts';
import NavLink from '../ui/NavLink';
import RelatedInsights from '../ui/RelatedInsights';
import { usePageSEO } from '../../lib/usePageSEO';
import { projectSEO } from '../../lib/projectSEO';
import NotFound from './NotFound';
import { webImage } from '../../lib/webImages';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { selectedId, navigateToContact, navigateBack, backLabel, navigateToCreativeDirector, navigateToProjectConstruction } = useNavigation();
  const project = PROJECTS.find(p => p.id === selectedId);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const encodeImageUrl = (url: string): string =>
    url.split('/').map(segment => segment ? encodeURIComponent(segment) : '').join('/');

  // Full-screen view uses the largest web copy (2000px WebP), falling back to the original
  const lightboxSrc = (url: string) => {
    const w = webImage(url);
    return w ? w.variants[w.variants.length - 1].url : encodeImageUrl(url);
  };

  const allImages = project
    ? [project.imageUrl, ...(project.gallery ?? [])]
    : [];

  const openerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openLightbox = (index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    openerRef.current?.focus?.();
  };
  // Gallery images open the lightbox from the keyboard too (Enter or Space)
  const openOnKey = (index: number) => ({
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': `Open image ${index + 1} full screen`,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    },
  });

  // Move focus into the lightbox when it opens
  useEffect(() => {
    if (lightboxIndex !== null) closeButtonRef.current?.focus();
  }, [lightboxIndex === null]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // SEO. Also rendered into the static HTML at build time (see usePageSEO).
  // An unknown slug is noindexed: the host already answers unknown URLs with a real 404, this covers the rest.
  usePageSEO(project ? projectSEO(project) : { title: 'Project not found | Mukherji Architects Milano', description: 'This project could not be found.', noindex: true }, [project]);

  if (!project) return <NotFound />;

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
            <div className="lg:col-span-8 space-y-3 order-2 lg:order-1">
              {/* Hero image — full width, natural aspect ratio */}
              <div
                className="w-full cursor-zoom-in overflow-hidden bg-zinc-900 border border-zinc-800"
                onClick={() => openLightbox(0)}
                {...openOnKey(0)}
              >
                <OptimizedImage
                  src={encodeImageUrl(project.imageUrl)}
                  alt={project.title}
                  priority={true}
                  lazy={false}
                  sizes="(min-width: 1280px) 830px, (min-width: 1024px) 66vw, 100vw"
                  className="w-full h-auto block transition-transform duration-500"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    if (t.src !== project.imageUrl) t.src = project.imageUrl;
                  }}
                />
              </div>

              {/* Gallery — full width stacked, natural ratio */}
              {project.gallery && project.gallery.length > 0 && (
                <>
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full cursor-zoom-in overflow-hidden bg-zinc-900 border border-zinc-800"
                      onClick={() => openLightbox(idx + 1)}
                      {...openOnKey(idx + 1)}
                    >
                      <OptimizedImage
                        src={encodeImageUrl(img)}
                        alt={`${project.title} — ${idx + 2}`}
                        lazy={true}
                        sizes="(min-width: 1280px) 830px, (min-width: 1024px) 66vw, 100vw"
                        className="w-full h-auto block opacity-80 hover:opacity-100 transition-opacity duration-500"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src !== img) t.src = img;
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Right: sticky project info */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-8 order-1 lg:order-2">
              <div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                  {(project.categories ?? [project.category]).map((cat, i) => (
                    <span key={cat} className="text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-3">
                      {i > 0 && <span className="text-zinc-700">·</span>}
                      {cat}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-[1.0]">
                  {project.title}
                </h1>
                <p className="text-zinc-400 leading-relaxed text-sm mb-4">
                  {project.description}
                </p>

                {/* Credit line */}
                {project.credit && (
                  <p className="text-zinc-600 text-xs flex items-center gap-1 flex-wrap mt-3">
                    <span>Project by</span>
                    {project.credit.linkTo === 'CREATIVE_DIRECTOR' ? (
                      <NavLink
                        href={getPathForView('CREATIVE_DIRECTOR', null)}
                        onNavigate={navigateToCreativeDirector}
                        className="text-zinc-500 hover:text-white transition-colors underline underline-offset-2 decoration-zinc-700 hover:decoration-zinc-400"
                      >
                        {project.credit.name}
                      </NavLink>
                    ) : (
                      <span className="text-zinc-500">{project.credit.name}</span>
                    )}
                    {project.credit.institution && (
                      <span>— {project.credit.institution}</span>
                    )}
                  </p>
                )}
              </div>

              <ProjectFacts
                project={project}
                onViewConstructionProgress={
                  project.constructionMedia && project.constructionMedia.length > 0
                    ? () => navigateToProjectConstruction(project.id)
                    : undefined
                }
              />
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={navigateToContact}>
                  Inquire About This Project
                </Button>
              </div>
              <RelatedInsights projectId={project.id} className="pt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title}: image ${lightboxIndex + 1} of ${allImages.length}`}
        >
          {/* Close */}
          <button
            ref={closeButtonRef}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
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
              src={lightboxSrc(allImages[lightboxIndex])}
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
              aria-label="Next image"
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
