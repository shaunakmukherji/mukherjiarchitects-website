import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

const CreativeDirector: React.FC = () => {
  const { navigateToHome } = useNavigation();

  // Update page title and meta tags for SEO
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Update title
    document.title = 'Shaunak Mukherji - Creative Director | Mukherji Architects Milano';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shaunak Mukherji is a Creative Director and architect focused on finding the best way to solve problems. Learn about his AI-first, system-driven approach to architecture at Mukherji Architects Milano.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Shaunak Mukherji - Creative Director | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Shaunak Mukherji is a Creative Director and architect focused on finding the best way to solve problems. Learn about his AI-first, system-driven approach to architecture.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Shaunak Mukherji - Creative Director | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Shaunak Mukherji is a Creative Director and architect focused on finding the best way to solve problems. Learn about his AI-first, system-driven approach to architecture.');
    }

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
    };
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={navigateToHome} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-16 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column - Narrow */}
          <div className="md:col-span-3 space-y-8">
            {/* Quote */}
            <p className="text-zinc-500 text-sm italic leading-relaxed">
              "Every problem has a best way to solve it."
            </p>
            
            {/* Portrait Image */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <OptimizedImage 
                src="/images/about/creative-director.png" 
                alt="Shaunak Mukherji" 
                className="w-full h-full object-cover opacity-70 grayscale"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('about-hero')) {
                    target.src = '/images/about/about-hero.jpg';
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column - Dominant */}
          <div className="md:col-span-9">
            <div className="max-w-2xl">
              {/* Main Title */}
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

