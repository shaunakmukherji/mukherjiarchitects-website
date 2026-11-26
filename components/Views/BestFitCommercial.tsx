import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { usePageSEO } from '../../lib/usePageSEO';
import { breadcrumb, truncateDescription } from '../../lib/seo';
import NavLink from '../ui/NavLink';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitCommercial: React.FC = () => {
  const { navigateBack, backLabel, navigateToContact, navigateToCategory, navigateToArchitectureAI } = useNavigation();

  // Update page title and meta tags for SEO
  usePageSEO({
    title: 'Best-Fit Commercial Architects | Mukherji Architects Milano',
    description: truncateDescription('Mukherji Architects Milano designs commercial environments where brand clarity, operational performance, and buildability are non-negotiable. Best-fit for clients who measure success in revenue, efficiency, and longevity.'),
    canonicalPath: '/best-fit/commercial-design',
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
              "text": "Yes—projects and collaboration are structured for international delivery."
            }
          },
          {
            "@type": "Question",
            "name": "How do you protect ROI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By forcing early decisions, reducing rework, and designing for operations and buildability."
            }
          }
        ]
      },
      breadcrumb('Best-Fit Commercial Design', '/best-fit/commercial-design'),
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            01 — Best-Fit Commercial Design
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Commercial Architects for Brand, Performance, and ROI
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano designs commercial environments where brand clarity, operational performance, and buildability are non-negotiable. We are best-fit for clients who measure success in revenue, efficiency, and longevity, not just visuals. Our workflow uses systems thinking, computation, and AI-assisted coordination to reduce error and accelerate decisions. We collaborate with the wider Mukherji practice to mobilize experience and resources quickly. Best when complexity is high and time matters.
              </p>
            </div>
          </section>

          {/* What commercial clients actually need */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What commercial clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>A space that sells: brand expression that converts into footfall, dwell time, and repeat use</li>
              <li>Operational logic: circulation, servicing, safety, and maintenance planned upfront</li>
              <li>Cost and timeline control: fewer surprises, fewer reworks, clearer decisions</li>
              <li>Buildability: details that survive value engineering without collapsing the concept</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Business-first design: every move must justify itself in performance, cost, or revenue impact</li>
              <li>High-clarity systems: layouts, adjacencies, and servicing designed to reduce operational friction</li>
              <li>AI + computational workflow: faster option testing, early clash detection, cleaner coordination</li>
              <li>Collaborative capacity: Milan studio + resources and lineage from Bobby Mukherji Architects to scale delivery efficiently</li>
              <li>Global mindset: designed to work across markets, contractors, and stakeholder cultures</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want "just interiors" with no operational or technical depth</li>
              <li>You want a purely stylistic designer and will decide late, often, without cost discipline</li>
              <li>You want the cheapest bid and accept predictable quality loss</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              If your commercial project is judged on margin, speed, and performance, start here:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <NavLink href={getPathForView('CATEGORY_LISTING', 'Commercial Design')} onNavigate={() => navigateToCategory('Commercial Design')} className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base">
                Selected Works <ArrowUpRight size={16} />
              </NavLink>
              <NavLink href={getPathForView('ARCHITECTURE_AI', null)} onNavigate={navigateToArchitectureAI} className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base">
                Architecture & AI <ArrowUpRight size={16} />
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
                <p className="text-zinc-400 text-base leading-relaxed">Yes—projects and collaboration are structured for international delivery.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">How do you protect ROI?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">By forcing early decisions, reducing rework, and designing for operations and buildability.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitCommercial;

