import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { TEAM_IMAGES, TEAM_VIDEO_URL, TEAM_MEMBERS } from '../../generated/teamImages';
import OptimizedImage from '../ui/OptimizedImage';
import { applySEO, breadcrumb } from '../../lib/seo';

// Same grid class for every row of the gallery so columns stay pixel-perfect aligned
const GALLERY_GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';

const Team: React.FC = () => {
  const { navigateBack, backLabel, navigateToCreativeDirector, navigateToBobbyMukherji } = useNavigation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const linkHandlers: Record<string, () => void> = {
    CREATIVE_DIRECTOR: navigateToCreativeDirector,
    BOBBY_MUKHERJI: navigateToBobbyMukherji,
  };

  useEffect(() => applySEO({
    title: 'People | Mukherji Architects Milano',
    description: "The team at Mukherji Architects Milano — architects and designers trained at Italy's leading institutions, working across international markets from our studio in Milan.",
    image: '/images/about/People/_gallery/1.jpg',
    canonicalPath: '/the-studio/people',
    schemas: [breadcrumb('People', '/the-studio/people')],
  }), []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="pt-24 min-h-screen">

      {/* ── Core team ── */}
      <section className="bg-pure-grey text-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-600 hover:text-black mb-16 transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>

          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              People
            </h1>
            <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-600 mb-10">
              The team behind the work
            </h2>
            <div className="space-y-6">
              <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                We hire people with genuine creative instinct and the technical ability to use advanced tools, including AI, at a high level. The quality of our work depends on having both.
              </p>
              <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                Our international team brings different perspectives to each problem, leading to stronger solutions across different markets and client contexts.
              </p>
              <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                The studio brings together architects and designers trained at Italy's leading institutions. We see AI as an amplifier of creativity and design thinking, disproportionately rewarding the quality of the thinking behind the work.
              </p>
            </div>
          </div>

          {/* Masthead — core team, equal-sized cards */}
          <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-6">Core Team</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TEAM_MEMBERS.map((member) => {
              const onClick = member.linkTo ? linkHandlers[member.linkTo] : undefined;
              const Wrapper = onClick ? 'button' : 'div';
              return (
                <Wrapper
                  key={member.name}
                  {...(onClick ? { onClick } : {})}
                  className={onClick ? 'group text-left cursor-pointer' : 'text-left'}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-pure-grey-medium mb-4">
                    {member.headshotUrl ? (
                      <OptimizedImage
                        src={member.headshotUrl}
                        alt={member.name}
                        lazy={false}
                        priority
                        className={
                          onClick
                            ? 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                            : 'w-full h-full object-cover'
                        }
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className={`font-display text-lg md:text-xl font-bold text-black ${onClick ? 'group-hover:text-accent transition-colors' : ''}`}>
                      {member.name}
                    </h3>
                    {onClick && (
                      <ArrowUpRight
                        size={16}
                        className="text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all"
                      />
                    )}
                  </div>
                  <p className="text-zinc-600 text-xs md:text-sm mt-1">
                    {member.role}
                  </p>
                </Wrapper>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Studio gallery ── */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-6">The Studio</p>
          <div className={GALLERY_GRID}>
            {TEAM_VIDEO_URL && (
              <div className="aspect-[9/14.4] overflow-hidden bg-zinc-900 border border-zinc-800">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src={TEAM_VIDEO_URL} type="video/mp4" />
                </video>
              </div>
            )}
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
      </section>

    </div>
  );
};

export default Team;
