import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { usePageSEO } from '../../lib/usePageSEO';
import { breadcrumb, truncateDescription } from '../../lib/seo';
import NavLink from '../ui/NavLink';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitMixedUse: React.FC = () => {
  const { navigateBack, backLabel, navigateToContact, navigateToCategory } = useNavigation();

  // Update page title and meta tags for SEO
  usePageSEO({
    title: 'Best-Fit Mixed-Use Architects | Mukherji Architects Milano',
    description: truncateDescription('Mukherji Architects Milano is best-fit for mixed-use developments where success is measured in leasing, absorption, operations, and margin. We focus on stack logic, circulation, servicing, and buildable systems—the parts that determine profit.'),
    canonicalPath: '/best-fit/mixed-use-design',
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you design for ROI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes—planning efficiency, buildability, and operational performance are explicit drivers."
            }
          },
          {
            "@type": "Question",
            "name": "How do you reduce risk?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early systems resolution + AI-assisted coordination to cut rework."
            }
          }
        ]
      },
      breadcrumb('Best-Fit Mixed-Use Design', '/best-fit/mixed-use-design'),
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
            04 — Best-Fit Mixed-Use Design
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Mixed-Use Architects for Developer ROI, Buildability, and Market Performance
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano is best-fit for mixed-use developments where success is measured in leasing, absorption, operations, and margin. We focus on stack logic, circulation, servicing, and buildable systems—the parts that determine profit. AI-assisted coordination improves precision and reduces rework. Best when you need a coherent concept that survives value engineering and still performs in the market.
              </p>
            </div>
          </section>

          {/* What mixed-use clients actually need */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What mixed-use clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Efficient stacking and cores: rentable area, vertical transport, safety logic</li>
              <li>Servicing that works: loading, BOH, waste, security, fire strategy integration</li>
              <li>Clear identity + market fit across multiple user groups</li>
              <li>Buildability + speed to protect financing and timelines</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Developer-first logic: maximize usable area without breaking operations</li>
              <li>Systems clarity: cores, servicing, and circulation designed early and cleanly</li>
              <li>AI + computation: faster iterations, fewer coordination errors, better decision confidence</li>
              <li>Collaborative delivery capacity: Milan studio working with wider Mukherji resources to scale output</li>
              <li>Value-engineering resilience: design intent built to survive cost pressure</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want novelty with no discipline in cost, servicing, or operations</li>
              <li>You want to decide everything late and hope drawings catch up</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              For mixed-use that must lease, operate, and profit, start here:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <NavLink href={getPathForView('CATEGORY_LISTING', 'Mixed-use Design')} onNavigate={() => navigateToCategory('Mixed-use Design')} className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base">
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
                <h4 className="text-white text-lg font-semibold mb-2">Do you design for ROI?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Yes—planning efficiency, buildability, and operational performance are explicit drivers.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">How do you reduce risk?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Early systems resolution + AI-assisted coordination to cut rework.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitMixedUse;

