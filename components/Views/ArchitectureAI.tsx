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
                  AI will eventually replace you.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  You already replaced a lawyer the moment you asked AI for legal advice.
                  You already replaced a doctor the moment you asked it about a headache.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  If your job happens on a computer, it will be done faster, cheaper, and better by AI.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Architecture is not an exception.
                </p>
              </div>
            </section>

            {/* AI in architecture: what changes */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                AI in architecture: what changes
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  You might say AI will always need a human.
                  To prompt it.
                  To make the final call.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Maybe for now.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  With agentic AI around the corner, that gap will start to disappear.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The human will no longer be a constant in the productivity equation.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Most architects are still comforting themselves.
                  Trying to believe they'll adapt before it's too late.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  That delay is what decides who's left.
                </p>
              </div>
            </section>

            {/* What clients care about */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                What clients care about
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Anyone can flood Instagram with AI buildings. That doesn't make them an architect.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Clients don't hire you for clicks. They hire you to solve problems. They need to know what you can actually build.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  An AI image doesn't prove you can rationalize complex geometry into functional spaces that obey building codes.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  That's why we show process: sketches, drawings, plans, sections. What you see here can be built—it's not an illusion.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We post real projects we're hired to design. Otherwise, your best work gets lost in the noise of meaningless images that will never leave the screen.
                </p>
              </div>
            </section>

            {/* How we use artificial intelligence in architectural design */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                How we use artificial intelligence in architectural design
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  My name is Shaunak Mukherji.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We are not against AI. We see AI as the biggest opportunity of our generation. But we believe it must be used to solve real problems. To automate repetitive tasks. To design faster. To think deeper.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Last week, I deleted a tool that I spent hundreds of hours mastering, because a new AI made it completely useless overnight.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  And that's just how fast things change.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  So if we find a better way to solve the problem, we move on.
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
                  Your next client won't Google you.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  They'll just ask their AI assistant — find me the best architect for the job.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  And if it doesn't say your name, you don't exist.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  So the only real question is this:
                  Will you be amongst the last architects to ever exist?
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Because there won't be many.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Most will cope.
                  A few will move first.
                </p>
                <p className="text-white text-base md:text-lg leading-relaxed font-medium">
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

