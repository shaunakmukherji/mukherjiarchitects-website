import React, { useState } from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import NavLink from '../ui/NavLink';
import { usePageSEO } from '../../lib/usePageSEO';
import { breadcrumb, SITE } from '../../lib/seo';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const AboutStudio: React.FC = () => {
  const { navigateBack, backLabel, navigateToCreativeDirector, navigateToBobbyMukherji, navigateToArchitectureAI } = useNavigation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Is Mukherji Architects Milano the same as Bobby Mukherji Architects?',
      answer: 'They are separate brands. Mukherji Architects Milano is the European extension of Bobby Mukherji Architects, founded and led by Shaunak Mukherji. The two studios work together, sharing experience, resources, and technical capacity to deliver projects more efficiently, while the Milan studio keeps its own leadership and design direction.'
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

  usePageSEO({
    title: 'About Mukherji Architects Milano | Milan Architecture Studio',
    description: 'Mukherji Architects Milano is a Milan-based architectural studio founded and led by Shaunak Mukherji, and the European extension of Bobby Mukherji Architects.',
    canonicalPath: '/about-mukherji-architects-milano',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: `${SITE}/about-mukherji-architects-milano`,
        name: 'About Mukherji Architects Milano',
        mainEntity: { '@id': `${SITE}/#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      breadcrumb('About', '/about-mukherji-architects-milano'),
    ],
  });

  const handlePortfolioClick = () => {
    navigateBack();
    setTimeout(() => {
      const portfolioElement = document.getElementById('portfolio');
      portfolioElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
            About Mukherji Architects Milano
          </h1>

          {/* TL;DR Section */}
          <div className="mb-16 p-6 bg-zinc-900/50 border border-zinc-800">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              <span className="text-zinc-500 uppercase text-sm tracking-wide font-medium">TL;DR:</span>{' '}
              Mukherji Architects Milano is a Milan-based architectural studio led by{' '}
              <NavLink href={getPathForView('CREATIVE_DIRECTOR', null)} onNavigate={navigateToCreativeDirector} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium">
                Shaunak Mukherji
              </NavLink>
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
              <NavLink href={getPathForView('ARCHITECTURE_AI', null)} onNavigate={navigateToArchitectureAI} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium">
                applied artificial intelligence
              </NavLink>
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
                  <NavLink href={getPathForView('CREATIVE_DIRECTOR', null)} onNavigate={navigateToCreativeDirector} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium">
                    Shaunak Mukherji
                  </NavLink>
                  , son of{' '}
                  <NavLink href={getPathForView('BOBBY_MUKHERJI', null)} onNavigate={navigateToBobbyMukherji} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium">
                    Bobby Mukherji
                  </NavLink>
                  , and represents the next generation of the Mukherji family's work in architecture.
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
                  <NavLink href={getPathForView('ARCHITECTURE_AI', null)} onNavigate={navigateToArchitectureAI} className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium">
                    artificial intelligence
                  </NavLink>
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
                <NavLink href={getPathForView('ARCHITECTURE_AI', null)} onNavigate={navigateToArchitectureAI} className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg">
                  Architecture & Artificial Intelligence
                </NavLink>
                <NavLink href={getPathForView('CREATIVE_DIRECTOR', null)} onNavigate={navigateToCreativeDirector} className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg">
                  Shaunak Mukherji
                </NavLink>
                <NavLink href={getPathForView('BOBBY_MUKHERJI', null)} onNavigate={navigateToBobbyMukherji} className="block text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 text-base md:text-lg text-left">
                  Bobby Mukherji
                </NavLink>
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
                    {(
                      <div className="mt-2 text-zinc-400 text-base md:text-lg leading-relaxed" hidden={openFAQ !== index}>
                        {/* Only link AI in the third FAQ (index 2) which mentions AI */}
                        {index === 2 ? (
                          faq.answer.split(/(AI|artificial intelligence)/i).map((part, i) => {
                            const lowerPart = part.toLowerCase();
                            if (lowerPart === 'ai' || lowerPart === 'artificial intelligence') {
                              return (
                                <NavLink
                                  key={i}
                                  href={getPathForView('ARCHITECTURE_AI', null)}
                                  onNavigate={navigateToArchitectureAI}
                                  className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors duration-300 cursor-pointer font-medium"
                                >
                                  {part}
                                </NavLink>
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

