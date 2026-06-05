import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const BestFitHospitality: React.FC = () => {
  const { navigateBack, backLabel, navigateToContact, navigateToCategory } = useNavigation();

  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    document.title = 'Best-Fit Hospitality Architects | Mukherji Architects Milano';

    const metaDesc = 'Through decades of hospitality experience via Bobby Mukherji Architects, Mukherji Architects Milano delivers hotel and resort architecture that aligns with brand standards, operator requirements, and financial performance. Best-fit for developers and operators who need both creative quality and deep sector knowledge.';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', metaDesc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Best-Fit Hospitality Architects | Mukherji Architects Milano');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', metaDesc);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', 'Best-Fit Hospitality Architects | Mukherji Architects Milano');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', metaDesc);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you have experience with international hotel brands?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Through Bobby Mukherji Architects, the practice has delivered hospitality projects across multiple international brand standards and operator frameworks over 30+ years."
          }
        },
        {
          "@type": "Question",
          "name": "Can you work directly with operators and brand consultants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — aligning with operators, brand standards consultants, and management companies is a core part of our hospitality process."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(faqSchema);
    faqScript.id = 'faq-structured-data';
    document.head.appendChild(faqScript);

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) metaDescription.setAttribute('content', originalDescription);
      if (ogTitle && originalOGTitle) ogTitle.setAttribute('content', originalOGTitle);
      if (ogDescription && originalOGDescription) ogDescription.setAttribute('content', originalOGDescription);
      if (twitterTitle && originalTwitterTitle) twitterTitle.setAttribute('content', originalTwitterTitle);
      if (twitterDescription && originalTwitterDescription) twitterDescription.setAttribute('content', originalTwitterDescription);
      const script = document.getElementById('faq-structured-data');
      if (script) script.remove();
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

        <div className="max-w-4xl">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            Best-Fit Hospitality Design
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            Who should hire us for Hospitality Architecture?
          </h2>

          <section className="mb-16">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-6">
              TL;DR
            </h3>
            <div className="space-y-4 max-w-prose">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Hospitality architecture is one of the most technically demanding sectors to work in. Room count, brand standards, operator requirements, FF&E coordination, back-of-house logistics, and profitability targets all have to be resolved simultaneously — and they all affect each other. Through our deep connection with Bobby Mukherji Architects, we bring over 30 years of delivered hospitality experience to every project. That institutional knowledge is not something you can replicate quickly. We are best-fit for developers and operators who understand that sector experience directly affects outcomes.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              What hospitality clients actually need
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Room count and key mix optimized for the financial model</li>
              <li>Brand standard compliance — across PIP requirements, brand design guidelines, and operator expectations</li>
              <li>Back-of-house logic that actually works: kitchen, laundry, loading, staff circulation</li>
              <li>Guest journey sequencing that produces the experience the brand promises</li>
              <li>Coordination-ready documentation: hospitality projects involve more consultants than almost any other typology</li>
            </ul>
          </section>

          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Why Mukherji Architects Milano is the best-fit
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>Institutional depth: direct access to 30+ years of hospitality delivery through Bobby Mukherji Architects, across hotels, resorts, and mixed hospitality developments worldwide</li>
              <li>Operator and brand alignment: we understand how to work within brand standards frameworks and alongside management companies from day one</li>
              <li>Financial discipline: every spatial decision is evaluated against room count, yield, and operational efficiency — not just appearance</li>
              <li>Systems-driven coordination: AI-assisted workflows reduce errors in a typology where coordination failures are expensive</li>
              <li>Creative quality: the technical rigor does not come at the cost of design. The projects have to be genuinely excellent to compete in premium hospitality markets</li>
            </ul>
          </section>

          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              When not to choose us
            </h3>
            <ul className="list-disc list-inside space-y-3 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
              <li>You want a purely image-driven designer with no operator experience</li>
              <li>Your project has no defined operator or brand framework and you are not planning to engage one</li>
              <li>You want to minimize design fees at the cost of coordination quality</li>
            </ul>
          </section>

          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              Next step
            </h3>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              If your hospitality project requires both sector knowledge and strong design, start here:
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={navigateToContact}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Contact <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => navigateToCategory('Hospitality Design')}
                className="flex items-center gap-2 text-accent hover:text-white transition-colors text-base"
              >
                Selected Works <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Do you have experience with international hotel brands?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Yes. Through Bobby Mukherji Architects, the practice has delivered hospitality projects across multiple international brand standards and operator frameworks over 30+ years.</p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold mb-2">Can you work directly with operators and brand consultants?</h4>
                <p className="text-zinc-400 text-base leading-relaxed">Yes — aligning with operators, brand standards consultants, and management companies is a core part of our hospitality process.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BestFitHospitality;
