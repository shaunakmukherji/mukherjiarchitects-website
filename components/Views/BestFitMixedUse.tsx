import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitMixedUse: React.FC = () => {
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
    document.title = 'Best-Fit Mixed-Use Architects | Mukherji Architects Milano';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for mixed-use developments where success is measured in leasing, absorption, operations, and margin. We focus on stack logic, circulation, servicing, and buildable systems—the parts that determine profit.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Best-Fit Mixed-Use Architects | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for mixed-use developments where success is measured in leasing, absorption, operations, and margin. We focus on stack logic, circulation, servicing, and buildable systems—the parts that determine profit.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Best-Fit Mixed-Use Architects | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for mixed-use developments where success is measured in leasing, absorption, operations, and margin. We focus on stack logic, circulation, servicing, and buildable systems—the parts that determine profit.');
    }

    // Add FAQPage structured data (JSON-LD)
    const faqSchema = {
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
              <button
                onClick={() => navigateToCategory('Mixed-use Design')}
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

