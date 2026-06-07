import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { TEAM_IMAGES } from '../../generated/teamImages';
import OptimizedImage from '../ui/OptimizedImage';
import { applySEO, breadcrumb } from '../../lib/seo';

const TEAM_VIDEO = '/images/about/People/Video.mp4';

// Same grid class used on both rows so columns are pixel-perfect aligned
const GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';

const Team: React.FC = () => {
  const { navigateBack, backLabel } = useNavigation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => applySEO({
    title: 'People | Mukherji Architects Milano',
    description: "The team at Mukherji Architects Milano — architects and designers trained at Italy's leading institutions, working across international markets from our studio in Milan.",
    schemas: [breadcrumb('People', '/the-studio/people')],
  }), []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-16 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> {backLabel}
        </button>

        {/* ── Row 1: video + text ──
            Same grid template as row 2, so column edges align exactly. */}
        <div className={`${GRID} mb-3`}>

          {/* Video — col 1, red border, below text on mobile */}
          <div className="order-2 sm:order-1 aspect-[9/16] overflow-hidden bg-zinc-900 border-[3px] border-white">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/about/People/1.jpg"
              className="w-full h-full object-cover"
            >
              <source src={TEAM_VIDEO} type="video/mp4" />
            </video>
          </div>

          {/* Text — cols 2–3 on desktop, first on mobile */}
          <div className="order-1 sm:order-2 lg:col-span-2 flex flex-col justify-center sm:pl-6 lg:pl-10 py-4 sm:py-0">
            <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
              People
            </h1>
            <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-10">
              The team behind the work
            </h2>
            <div className="space-y-6 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                We hire for genuine creative instinct and the technical capability to use the tools at a high level. Both in the same person. That is what determines the quality of the work.
              </p>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                The team is deliberately international. Different nationalities, different training backgrounds. Architecture is a global business, and a team that approaches problems from different directions consistently produces better answers — and works more naturally across different markets and client contexts.
              </p>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Everyone here graduated from the leading institutions in Italy. AI rewards quality of thinking disproportionately.
              </p>
            </div>
          </div>

        </div>

        {/* ── Row 2: photo grid ──
            Identical grid template — columns align with row above. */}
        <div className={GRID}>
          {TEAM_IMAGES.map((src, i) => (
            <div
              key={src}
              className="aspect-[9/14.4] overflow-hidden bg-zinc-900 border border-zinc-800"
            >
              <OptimizedImage
                src={src}
                alt={`Studio — ${i + 1}`}
                lazy={i > 2}
                priority={i <= 2}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Team;
