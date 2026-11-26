import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import { usePageSEO } from '../../lib/usePageSEO';
import { breadcrumb, truncateDescription } from '../../lib/seo';
import NavLink from '../ui/NavLink';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitResearch: React.FC = () => {
  const { navigateBack, backLabel, navigateToContact, navigateToArchitectureAI } = useNavigation();

  // Update page title and meta tags for SEO
  usePageSEO({
    title: 'Best-Fit Research & Exploration | Mukherji Architects Milano',
    description: truncateDescription('Mukherji Architects Milano uses research to build repeatable systems: faster design cycles, clearer decisions, and higher production efficiency. Best-fit for clients who want an edge through smart workflows, not vague tech talk.'),
    canonicalPath: '/best-fit/research-exploration',
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does AI replace design?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No—AI supports decisions, coordination, and speed; design leadership stays human."
            }
          },
          {
            "@type": "Question",
            "name": "What's the real benefit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Faster options, fewer errors, cleaner delivery."
            }
          }
        ]
      },
      breadcrumb('Best-Fit Research & Exploration', '/best-fit/research-exploration'),
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
            05 — Best-Fit Research & Exploration
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Studio for AI-Enabled Architectural Systems and Future-Proof Delivery
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano uses research to build repeatable systems: faster design cycles, clearer decisions, and higher production efficiency. This is best-fit for clients who want an edge through smart workflows, not vague tech talk. We apply computation and AI where it improves outcomes—option testing, coordination, precision, and decision-making. Best when you care about speed, accuracy, and scalable quality.
              </p>
            </div>
          </section>

          {/* What clients actually need from "innovation" */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What clients actually need from "innovation"
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Faster iteration without quality loss</li>
              <li>Fewer errors in coordination and documentation</li>
              <li>Decision clarity: tradeoffs made early with evidence</li>
              <li>Scalable systems that perform across project types and teams</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Applied AI, not hype: tools used to reduce error and increase speed</li>
              <li>Systems thinking: repeatable workflows that improve predictability</li>
              <li>Computational rigor: structured testing and clearer alternatives</li>
              <li>Collaborative leverage: access to broader Mukherji resources to maximize production efficiency</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want "AI aesthetic" or gimmicks</li>
              <li>You want unstructured creativity with no accountability to results</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              If you want architecture delivered with smart systems and measurable efficiency:
            </p>
            <div className="flex flex-wrap gap-4">
              <NavLink href={getPathForView('ARCHITECTURE_AI', null)} onNavigate={navigateToArchitectureAI} className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base">
                Architecture & AI <ArrowUpRight size={16} />
              </NavLink>
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Does AI replace design?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">No—AI supports decisions, coordination, and speed; design leadership stays human.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">What's the real benefit?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Faster options, fewer errors, cleaner delivery.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitResearch;

