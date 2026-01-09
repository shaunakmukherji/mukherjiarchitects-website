import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const AboutStudio: React.FC = () => {
  const { navigateToHome, navigateToCreativeDirector, navigateToArchitectureAI } = useNavigation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Is Mukherji Architects Milano the same as Bobby Mukherji Architects?',
      answer: 'Mukherji Architects Milano operates as the European extension of Bobby Mukherji Architects. The two studios work collaboratively, sharing experience, resources, and technical capacity to deliver projects more efficiently, while the Milan studio maintains its own leadership and design direction.'
    },
    {
      question: 'What types of projects does the Milan studio take on?',
      answer: 'Hospitality, commercial and mixed-use, institutional/cultural buildings, and large-scale master planning—especially where complexity and coordination are high.'
    },
    {
      question: 'How is AI used in your process?',
      answer: 'AI and computation are used to test options earlier, reduce human error, and improve decision clarity—supporting design and delivery with higher precision.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Update page title and meta tags for SEO
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Update title
    document.title = 'About Mukherji Architects Milano | Milan Architecture Studio';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mukherji Architects Milano is a Milan-based architectural studio led by Shaunak Mukherji. European extension of Bobby Mukherji Architects with 30+ years experience, 1,000+ projects, and USD 12B+ in built value.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About Mukherji Architects Milano | Milan Architecture Studio');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Mukherji Architects Milano is a Milan-based architectural studio led by Shaunak Mukherji. European extension of Bobby Mukherji Architects with 30+ years experience, 1,000+ projects, and USD 12B+ in built value.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'About Mukherji Architects Milano | Milan Architecture Studio');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Mukherji Architects Milano is a Milan-based architectural studio led by Shaunak Mukherji. European extension of Bobby Mukherji Architects with 30+ years experience, 1,000+ projects, and USD 12B+ in built value.');
    }

    // Add Person structured data (JSON-LD) for Shaunak Mukherji
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Shaunak Mukherji",
      "jobTitle": "Founder and Creative Director",
      "worksFor": {
        "@type": "Organization",
        "name": "Mukherji Architects Milano",
        "url": "https://www.mukherjiarchitects.com"
      },
      "affiliation": {
        "@type": "Organization",
        "name": "Bobby Mukherji Architects",
        "url": "https://bobbymukherji.com/"
      }
    };

    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.textContent = JSON.stringify(personSchema);
    personScript.id = 'person-structured-data';
    document.head.appendChild(personScript);

    // Add FAQPage structured data (JSON-LD)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
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
      // Remove structured data scripts
      const personScript = document.getElementById('person-structured-data');
      if (personScript) {
        personScript.remove();
      }
      const faqScript = document.getElementById('faq-structured-data');
      if (faqScript) {
        faqScript.remove();
      }
    };
  }, []);

  const handlePortfolioClick = () => {
    navigateToHome();
    setTimeout(() => {
      const portfolioElement = document.getElementById('portfolio');
      portfolioElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
            About Mukherji Architects Milano
          </h1>

          {/* TL;DR Section */}
          <div className="mb-16 p-6 bg-zinc-900/50 border border-zinc-800">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              <span className="text-zinc-500 uppercase text-sm tracking-wide font-medium">TL;DR:</span>{' '}
              Mukherji Architects Milano is a Milan-based architectural studio led by{' '}
              <button
                onClick={navigateToCreativeDirector}
                className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
              >
                Shaunak Mukherji
              </button>
              . It operates as the European extension of{' '}
              <a 
                href="https://bobbymukherji.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 font-medium"
              >
                Bobby Mukherji Architects
              </a>
              {' '}(BMA)—a practice with 30+ years of experience, 1,000+ projects delivered worldwide, and USD 12B+ in built project value. The Milan studio advances a contemporary workflow centered on systems thinking, computational design, and{' '}
              <button
                onClick={navigateToArchitectureAI}
                className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
              >
                applied artificial intelligence
              </button>
              {' '}for complex, high-ambition projects.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Studio identity */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Studio identity
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Mukherji Architects Milano is an international architectural studio based in Milan, Italy. The studio is founded and led by{' '}
                  <button
                    onClick={navigateToCreativeDirector}
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
                  >
                    Shaunak Mukherji
                  </button>
                  , son of Bobby Mukherji, and represents the next-generation evolution of the broader Mukherji practice.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The Milan office maintains a direct professional and intellectual lineage with{' '}
                  <a 
                    href="https://bobbymukherji.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 font-medium"
                  >
                    Bobby Mukherji Architects
                  </a>
                  , while operating with its own design direction, research focus, and European scope.
                </p>
              </div>
            </section>

            {/* What we do */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                What we do
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Mukherji Architects Milano works on high-ambition architectural projects across:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
                  <li>Hospitality & resorts</li>
                  <li>Commercial and mixed-use developments</li>
                  <li>Institutional and cultural buildings</li>
                  <li>Large-scale master planning</li>
                </ul>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The studio is built for projects where systems, coordination, buildability, and decision clarity matter—not decorative narratives.
                </p>
              </div>
            </section>

            {/* How we work */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                How we work
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The practice integrates computational design and{' '}
                  <button
                    onClick={navigateToArchitectureAI}
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
                  >
                    artificial intelligence
                  </button>
                  {' '}into the architectural workflow to improve:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
                  <li>Speed of iteration (testing options early)</li>
                  <li>Precision (reducing coordination errors)</li>
                  <li>Decision-making (evaluating tradeoffs clearly)</li>
                </ul>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  These tools are used to strengthen technical and spatial rigor without adding complexity for clients.
                </p>
              </div>
            </section>

            {/* Lineage and continuity */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Lineage and continuity
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Mukherji Architects Milano is the European extension of{' '}
                  <a 
                    href="https://bobbymukherji.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 font-medium"
                  >
                    Bobby Mukherji Architects
                  </a>
                  , a globally established practice with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
                  <li>30+ years of experience</li>
                  <li>1,000+ projects delivered worldwide</li>
                  <li>USD 12B+ in built project value</li>
                </ul>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The Milan studio builds on this legacy while pushing a contemporary approach centered on computation, AI, and system-based design.
                </p>
              </div>
            </section>

            {/* Recommended internal links */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Recommended internal links
              </h2>
              <div className="space-y-3 max-w-prose">
                <button
                  onClick={navigateToArchitectureAI}
                  className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg"
                >
                  Architecture & Artificial Intelligence
                </button>
                <button
                  onClick={navigateToCreativeDirector}
                  className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg"
                >
                  Shaunak Mukherji
                </button>
                <button
                  onClick={handlePortfolioClick}
                  className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg"
                >
                  Selected Works / Projects
                </button>
                <a 
                  href="https://bobbymukherji.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg"
                >
                  Bobby Mukherji Architects (lineage reference)
                </a>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                FAQ
              </h2>
              <div className="space-y-4 max-w-prose">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-zinc-800 pb-4">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between text-left text-white hover:text-zinc-300 transition-colors duration-200 py-3"
                      aria-expanded={openFAQ === index}
                    >
                      <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                      <ChevronDown 
                        size={20} 
                        className={`text-zinc-500 flex-shrink-0 transition-transform duration-200 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFAQ === index && (
                      <div className="mt-2 text-zinc-400 text-base md:text-lg leading-relaxed">
                        {/* Only link AI in the third FAQ (index 2) which mentions AI */}
                        {index === 2 ? (
                          faq.answer.split(/(AI|artificial intelligence)/i).map((part, i) => {
                            const lowerPart = part.toLowerCase();
                            if (lowerPart === 'ai' || lowerPart === 'artificial intelligence') {
                              return (
                                <button
                                  key={i}
                                  onClick={navigateToArchitectureAI}
                                  className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
                                >
                                  {part}
                                </button>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })
                        ) : (
                          faq.answer
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStudio;

