import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';

const ArchitectureAI: React.FC = () => {
  const { navigateToHome } = useNavigation();

  // Update page title and meta tags for SEO
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOGTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOGDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

    // Update title
    document.title = 'Architecture and Artificial Intelligence | Shaunak Mukherji | Mukherji Architects Milano';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'A direct view on AI in architecture from Shaunak Mukherji at Mukherji Architects Milano—why it matters, what changes, and how we use it in real architectural work.');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Architecture and Artificial Intelligence | Shaunak Mukherji | Mukherji Architects Milano');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'A direct view on AI in architecture from Shaunak Mukherji at Mukherji Architects Milano—why it matters, what changes, and how we use it in real architectural work.');
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Architecture and Artificial Intelligence | Shaunak Mukherji | Mukherji Architects Milano');
    }
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'A direct view on AI in architecture from Shaunak Mukherji at Mukherji Architects Milano—why it matters, what changes, and how we use it in real architectural work.');
    }

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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-16">
            Architecture and Artificial Intelligence
          </h1>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* The reality */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                The reality
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Most work today happens on a computer.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  When that's the case, it can be done faster, cheaper, and with fewer mistakes by machines.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Architecture is no different.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  This doesn't change what gets built.
                  It changes how reliably, efficiently, and clearly decisions are made before anything is built.
                </p>
              </div>
            </section>

            {/* What actually changes in practice */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                What actually changes in practice
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Artificial intelligence removes friction from the design process.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  It allows more options to be tested.
                  More constraints to be checked.
                  More decisions to be validated early.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  This reduces rework, coordination errors, and avoidable mistakes later in construction.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The result is control.
                </p>
              </div>
            </section>

            {/* What this means for clients */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                What this means for clients
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Anyone can generate images of buildings today.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  That does not mean they understand architecture.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  AI renders are easy to produce.
                  Buildable projects are not.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  A convincing image does not explain:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 text-base md:text-lg leading-relaxed ml-4">
                  <li>how space works</li>
                  <li>how geometry is resolved</li>
                  <li>how systems integrate</li>
                  <li>how the building actually gets built</li>
                </ul>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  That is why we show process.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Sketches.
                  Drawings.
                  Plans.
                  Sections.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Not as decoration, but as proof that what you see is the result of architectural thinking—not another meaningless image generated and passed off as authorship.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Buildings are systems.
                  Images are not.
                </p>
              </div>
            </section>

            {/* The people behind the tools */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                The people behind the tools
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Artificial intelligence does not replace ability.
                  It amplifies what already exists.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  If the thinking is weak, AI makes it obvious.
                  If the thinking is strong, AI multiplies it.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We believe in hiring the best people first.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Our team includes graduates from Politecnico di Milano, the leading technical architecture and design university in Italy.
                  The studio is led by an alumnus of the same institution.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We are obsessed with technology, but equally obsessed with design quality.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  For us, artistry does not disappear.
                  It gets amplified.
                </p>
              </div>
            </section>

            {/* How we use artificial intelligence */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                How we use artificial intelligence
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We use AI to remove repetitive work, test options faster, and challenge assumptions early.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  If a tool improves the outcome, we use it.
                  If a better one appears, we move on.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  There is no attachment to tools.
                  There is only commitment to results.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Creativity is not something we protect for its own sake.
                  If a system can do something better, we let it.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  What matters is maximum clarity, maximum efficiency, and maximum return on effort.
                </p>
              </div>
            </section>

            {/* Why this matters now */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Why this matters now
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The speed at which technology is evolving is unprecedented.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Entire tools become obsolete overnight.
                  Workflows collapse overnight.
                  Fields that rely on digital processes are being restructured in real time.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Architecture has been slow to respond.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Not because it is immune, but because it is comfortable.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The architects who will remain are not the ones who wait to adapt later.
                  They are the ones who reorganize early—around tools, systems, and ways of working that reflect how the world actually operates now.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Most will cope.
                  A few will move first.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We choose to move first.
                </p>
                <p className="text-red-500 text-base md:text-lg leading-relaxed font-medium">
                  That is the AI advantage.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureAI;

