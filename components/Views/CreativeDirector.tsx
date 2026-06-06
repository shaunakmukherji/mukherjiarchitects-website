import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import { applySEO, breadcrumb } from '../../lib/seo';

const CreativeDirector: React.FC = () => {
  const { navigateBack, backLabel, navigateToBobbyMukherji } = useNavigation();

  useEffect(() => applySEO({
    title: 'Shaunak Mukherji — Creative Director | Mukherji Architects Milano',
    description: 'Shaunak Mukherji is Creative Director of Mukherji Architects Milano, a high-performance architecture studio in Milan, Italy. AI-first approach, Politecnico di Milano graduate.',
    schemas: [
      breadcrumb('Shaunak Mukherji', '/shaunak-mukherji'),
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shaunak Mukherji',
        jobTitle: 'Founder and Creative Director',
        image: 'https://www.mukherjiarchitects.com/images/about/creative-director.png',
        url: 'https://www.mukherjiarchitects.com/shaunak-mukherji',
        worksFor: { '@type': 'Organization', name: 'Mukherji Architects Milano', url: 'https://www.mukherjiarchitects.com' },
        affiliation: { '@type': 'Organization', name: 'Bobby Mukherji Architects', url: 'https://bobbymukherji.com/' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Politecnico di Milano' },
      },
    ],
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column — image, below text on mobile */}
          <div className="md:col-span-5 space-y-6 order-2 md:order-1">
            <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <OptimizedImage
                src="/images/about/creative-director.png"
                alt="Shaunak Mukherji"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-zinc-500 text-sm italic leading-relaxed">
              "Every problem has a best way to solve it."
            </p>
          </div>

          {/* Right Column — name/title/bio first on mobile */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="max-w-2xl">
              {/* Main Title */}
              <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-3">
                Shaunak Mukherji
              </h1>

              {/* Subtitle */}
              <p className="text-zinc-400 text-lg uppercase tracking-wide mb-8">
                Creative Director
              </p>
              
              {/* Body Text - Constrained reading width */}
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Shaunak Mukherji is an architect focused on finding the best way to solve problems. He believes architecture must continuously evolve to remain efficient, relevant, and precise.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  His work sits in continuity with his father,{' '}
                  <button
                    type="button"
                    onClick={navigateToBobbyMukherji}
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors font-medium"
                  >
                    Bobby Mukherji
                  </button>
                  , Principal of Bobby Mukherji Architects.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  His approach is AI-first and system-driven, centered on building workflows that prioritize speed, clarity, and efficiency. He is interested in how strong systems scale and survive over time.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Shaunak studied architecture at Politecnico di Milano, and works at the intersection of architecture, technology, and artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeDirector;

