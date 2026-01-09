import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitInstitutional: React.FC = () => {
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
    document.title = 'Best-Fit Institutional Architects | Mukherji Architects Milano';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for institutional projects that require compliance, stakeholder alignment, and long-life value. We design buildings that must perform for decades—technically, operationally, and culturally.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Best-Fit Institutional Architects | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for institutional projects that require compliance, stakeholder alignment, and long-life value. We design buildings that must perform for decades—technically, operationally, and culturally.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Best-Fit Institutional Architects | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Mukherji Architects Milano is best-fit for institutional projects that require compliance, stakeholder alignment, and long-life value. We design buildings that must perform for decades—technically, operationally, and culturally.');
    }

    // Add FAQPage structured data (JSON-LD)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you handle complex approvals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We structure work to reduce approval risk through early clarity and documentation logic."
          }
        },
        {
          "@type": "Question",
          "name": "What's different about your process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Systems-first planning + AI-assisted coordination to reduce errors."
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
            02 — Best-Fit Institutional Design
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Best-Fit Institutional Architects for Clarity, Compliance, and Long-Term Value
          </h2>

          {/* TL;DR */}
          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Mukherji Architects Milano is best-fit for institutional projects that require compliance, stakeholder alignment, and long-life value. We design buildings that must perform for decades—technically, operationally, and culturally. Our workflow prioritizes decision clarity, risk reduction, and buildable systems. AI-assisted coordination increases precision and reduces errors. Best when accountability is high and complexity is real.
              </p>
            </div>
          </section>

          {/* What institutional clients actually need */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What institutional clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Compliance certainty: codes, safety, accessibility, procurement constraints</li>
              <li>Stakeholder alignment: multiple decision-makers, public accountability, committees</li>
              <li>Operational durability: low lifecycle cost, maintainability, clarity of movement</li>
              <li>Robust identity: dignity and purpose without wasteful gestures</li>
            </ul>
          </section>

          {/* Why Mukherji Architects Milano is the best-fit */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Systems-led planning: adjacencies, flows, servicing, and security resolved early</li>
              <li>Risk discipline: fewer late-stage surprises through structured decision-making</li>
              <li>AI + computation: faster testing, clearer coordination, reduced human error</li>
              <li>Collaborative leverage: Milan studio working with broader Mukherji resources for capacity and speed</li>
              <li>Value over spectacle: long-term performance beats temporary image</li>
            </ul>
          </section>

          {/* When not to choose us */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want a "signature form" regardless of cost, approvals, or operations</li>
              <li>You have no decision structure and prefer improvisation over accountability</li>
            </ul>
          </section>

          {/* Next step */}
          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              For institutions where reliability, compliance, and long-term cost matter:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => navigateToCategory('Institutional Design')}
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
                <h4 className="text-white text-lg font-semibold mb-2">Do you handle complex approvals?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">We structure work to reduce approval risk through early clarity and documentation logic.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">What's different about your process?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Systems-first planning + AI-assisted coordination to reduce errors.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitInstitutional;

