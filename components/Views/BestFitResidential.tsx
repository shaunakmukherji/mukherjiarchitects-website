import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { usePageSEO } from '../../lib/usePageSEO';
import { breadcrumb, truncateDescription } from '../../lib/seo';
import NavLink from '../ui/NavLink';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitResidential: React.FC = () => {
  const { navigateBack, backLabel, navigateToContact, navigateToCategory } = useNavigation();

  // Update page title and meta tags for SEO
  usePageSEO({
    title: 'Best-Fit Residential Architects | Mukherji Architects Milano',
    description: truncateDescription('Mukherji Architects Milano is best-fit for residential clients who want clarity, control, and long-term value—not just "a look." We design homes where complexity is real: large programs, high performance expectations, and demanding execution.'),
    canonicalPath: '/best-fit/residential-design',
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you work globally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes—process and collaboration are built for international projects."
            }
          },
          {
            "@type": "Question",
            "name": "How do you protect value?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Buildability, precision, and early decision discipline."
            }
          }
        ]
      },
      breadcrumb('Best-Fit Residential Design', '/best-fit/residential-design'),
    ],
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={navigateBack} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-16 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> {backLabel}
        </button>

        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="font-display max-[360px]:text-[8vw] text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            06 — Best-Fit Residential Design
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Residential Architects for High-Budget, Complex Homes and Long-Term Value
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano is best-fit for residential clients who want clarity, control, and long-term value—not just "a look." We design homes where complexity is real: large programs, high performance expectations, and demanding execution. Our workflow emphasizes buildability, precision, and decision clarity, supported by computational and AI-assisted methods. Best when you want fewer surprises and a home that holds value.
              </p>
            </div>
          </section>

          {/* What residential clients actually need */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What residential clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>A house that works daily: planning logic, light, privacy, circulation</li>
              <li>Buildability: details that contractors can execute without distortion</li>
              <li>Cost discipline: decisions early, fewer late surprises</li>
              <li>Long-life value: timeless systems, maintainability, performance</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Systems-led design: planning and detailing built for real life</li>
              <li>Decision clarity: structured process that reduces uncertainty</li>
              <li>AI + computation: faster testing, fewer errors, higher precision</li>
              <li>Collaborative capacity: Milan studio + broader Mukherji resources for speed and depth</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want a quick decorative refresh</li>
              <li>You want constant late changes without cost/timeline accountability</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              If your home is a major investment and you want control + value:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <NavLink href={getPathForView('CATEGORY_LISTING', 'Residential Design')} onNavigate={() => navigateToCategory('Residential Design')} className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base">
                Selected Works <ArrowUpRight size={16} />
              </NavLink>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Do you work globally?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Yes—process and collaboration are built for international projects.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">How do you protect value?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Buildability, precision, and early decision discipline.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitResidential;

