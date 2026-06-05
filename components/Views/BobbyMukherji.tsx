import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

const BobbyMukherji: React.FC = () => {
  const { navigateBack, backLabel, navigateToCreativeDirector } = useNavigation();

  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    document.title = 'Bobby Mukherji - Principal | Mukherji Architects Milano';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Bobby Mukherji is Principal of Bobby Mukherji Architects and a foundational link to Mukherji Architects Milano—decades of experience in hospitality, commercial, and mixed-use work.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Bobby Mukherji - Principal | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Established architect and founder of Bobby Mukherji Architects. Legacy and practical strength behind Mukherji Architects Milano.'
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Bobby Mukherji - Principal | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        'Established architect and founder of Bobby Mukherji Architects. Legacy and practical strength behind Mukherji Architects Milano.'
      );
    }

    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Bobby Mukherji',
      jobTitle: 'Principal',
      image: 'https://www.mukherjiarchitects.com/images/about/bobby-mukherji.png',
      url: 'https://www.mukherjiarchitects.com/bobby-mukherji',
      worksFor: {
        '@type': 'Organization',
        name: 'Bobby Mukherji Architects',
        url: 'https://bobbymukherji.com/',
      },
      description:
        'Established architect with decades of experience across hospitality, commercial, and mixed-use projects; founder of Bobby Mukherji Architects.',
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(personSchema);
    script.id = 'person-structured-data-bobby';
    document.head.appendChild(script);

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
      const personScript = document.getElementById('person-structured-data-bobby');
      if (personScript) {
        personScript.remove();
      }
    };
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5 space-y-6">
            <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <OptimizedImage
                src="/images/about/bobby-mukherji.png"
                alt="Bobby Mukherji"
                skipOptimization
                priority
                lazy={false}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0.4';
                }}
              />
            </div>
            <p className="text-zinc-500 text-sm italic leading-relaxed">
              Proven judgment, deeper resources, and a network built over time.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-3">
                Bobby Mukherji
              </h1>

              <p className="text-zinc-400 text-lg uppercase tracking-wide mb-8 leading-snug max-w-xl">
                <span className="block sm:inline">Principal,</span>{' '}
                <span className="sm:whitespace-nowrap">Bobby Mukherji Architects</span>
              </p>

              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Bobby Mukherji is an established architect with decades of experience across hospitality, commercial,
                  and mixed-use projects. As founder of{' '}
                  <a
                    href="https://bobbymukherji.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors font-medium whitespace-normal sm:whitespace-nowrap"
                  >
                    Bobby Mukherji Architects
                  </a>{' '}
                  and father of{' '}
                  <button
                    type="button"
                    onClick={navigateToCreativeDirector}
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors font-medium text-left"
                  >
                    Shaunak Mukherji
                  </button>
                  , his connection to Mukherji Architects Milano brings both legacy and practical strength to the studio.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  That connection gives the practice a clear competitive advantage: the agility and forward-thinking
                  approach of a new-generation studio, supported by proven judgment, deeper resources, and a wider
                  professional network built over time.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  For clients, this means less risk, better decisions, and greater confidence in delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BobbyMukherji;
