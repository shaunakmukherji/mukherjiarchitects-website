import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { TEAM_IMAGES } from '../../generated/teamImages';
import OptimizedImage from '../ui/OptimizedImage';
import { applySEO, breadcrumb } from '../../lib/seo';

const Team: React.FC = () => {
  const { navigateBack, backLabel } = useNavigation();

  useEffect(() => applySEO({
    title: 'People | Mukherji Architects Milano',
    description: 'The team at Mukherji Architects Milano — architects and designers trained at Italy\'s leading institutions, working across international markets from our studio in Milan.',
    schemas: [breadcrumb('People', '/the-studio/people')],
  }), []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-16 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> {backLabel}
        </button>

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            People
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-12">
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

        {/* Photo grid — uniform 9:16 with 10% height crop = aspect-[9/14.4] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
