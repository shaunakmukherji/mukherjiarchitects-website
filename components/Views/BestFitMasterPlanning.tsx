import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitMasterPlanning: React.FC = () => {
  const { navigateToHome, navigateToContact, navigateToCategory } = useNavigation();

  // Update page title and meta tags for SEO
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Update title
    document.title = 'Best-Fit Master Planners | Mukherji Architects Milano';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mukherji Architects Milano delivers master plans built for phasing, feasibility, infrastructure logic, and investor reality. Best-fit when the project must work commercially, politically, and operationally—not just look good in renderings.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Best-Fit Master Planners | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Mukherji Architects Milano delivers master plans built for phasing, feasibility, infrastructure logic, and investor reality. Best-fit when the project must work commercially, politically, and operationally—not just look good in renderings.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Best-Fit Master Planners | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Mukherji Architects Milano delivers master plans built for phasing, feasibility, infrastructure logic, and investor reality. Best-fit when the project must work commercially, politically, and operationally—not just look good in renderings.');
    }

    // Add FAQPage structured data (JSON-LD)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you plan internationally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes—frameworks are built to adapt to local codes and delivery ecosystems."
          }
        },
        {
          "@type": "Question",
          "name": "Do you optimize for ROI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We prioritize phasing, feasibility, and value creation as core design drivers."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(faqSchema);
    faqScript.id = 'faq-structured-data';
    document.head.appendChild(faqScript);

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
      // Remove structured data script
      const faqScript = document.getElementById('faq-structured-data');
      if (faqScript) {
        faqScript.remove();
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

        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            03 — Best-Fit Master Planning
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Master Planners for High-Stakes Developments and Measurable Outcomes
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano delivers master plans built for phasing, feasibility, infrastructure logic, and investor reality. We are best-fit when the project must work commercially, politically, and operationally—not just look good in renderings. Our approach uses systems thinking, scenario testing, and computational methods to increase decision confidence. Best for developers, institutions, and governments who need plans that can actually be executed.
              </p>
            </div>
          </section>

          {/* What master planning clients actually need */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What master planning clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Phasing and feasibility that match funding and market absorption</li>
              <li>Infrastructure and mobility logic that prevents future bottlenecks</li>
              <li>Regulatory resilience: plans that survive approvals and stakeholder shifts</li>
              <li>Place value: a coherent identity that increases land value and long-term demand</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Profit-aware planning: density, mix, connectivity, and amenities aligned with value creation</li>
              <li>Scenario-based decisions: test options early; don't gamble late</li>
              <li>Computational planning: evaluate patterns, access, flows, and land-use logic faster</li>
              <li>Collaborative resources: broader Mukherji capacity supports scale and delivery efficiency</li>
              <li>Execution bias: the plan is designed for contractors, phasing, and procurement reality</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want a "vision plan" with no delivery strategy</li>
              <li>You have no appetite for tradeoffs, phasing discipline, or feasibility truth</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              If your master plan must raise value and get built, not just win meetings:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => navigateToCategory('Master Planning')}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Selected Works <ArrowUpRight size={16} />
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
                <h4 className="text-white text-lg font-semibold mb-2">Can you plan internationally?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Yes—frameworks are built to adapt to local codes and delivery ecosystems.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Do you optimize for ROI?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">We prioritize phasing, feasibility, and value creation as core design drivers.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitMasterPlanning;

