import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { PROJECTS } from '../../constants';
import { encodeImageUrl } from '../../lib/imageUrl';
import OptimizedImage from '../ui/OptimizedImage';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const ProjectConstruction: React.FC = () => {
  const { selectedId, navigateBack, backLabel } = useNavigation();
  const project = PROJECTS.find((p) => p.id === selectedId);
  const media = project?.constructionMedia ?? [];
  const images = media.filter((item) => item.type === 'image');

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (!project) return;
    const originalTitle = document.title;
    document.title = `${project.title} — Construction Progress | Mukherji Architects Milano`;
    return () => {
      document.title = originalTitle;
    };
  }, [project]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, prev, next]);

  if (!project || media.length === 0) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-24 pb-24 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 mb-12">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-3">
            {project.title}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-[1.0]">
            Construction Progress
          </h1>
          {project.constructionNote && (
            <p className="text-zinc-400 leading-relaxed text-sm">
              {project.constructionNote}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-3">
          {media.map((item, idx) => {
            const imageIndex = item.type === 'image' ? images.indexOf(item) : -1;
            return item.type === 'video' ? (
              <video
                key={idx}
                src={encodeImageUrl(item.url)}
                controls
                playsInline
                className="w-full h-auto block bg-zinc-900 border border-zinc-800"
              />
            ) : (
              <button
                key={idx}
                onClick={() => setLightboxIndex(imageIndex)}
                className="w-full cursor-zoom-in overflow-hidden bg-zinc-900 border border-zinc-800 block"
              >
                <OptimizedImage
                  src={encodeImageUrl(item.url)}
                  alt={`${project.title} — construction progress ${idx + 1}`}
                  lazy={idx > 3}
                  className="w-full h-auto block"
                />
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ArrowLeft size={32} />
            </button>
          )}

          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={encodeImageUrl(images[lightboxIndex].url)}
              alt={`${project.title} — construction progress ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ArrowRight size={32} />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-zinc-500 text-sm tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectConstruction;
