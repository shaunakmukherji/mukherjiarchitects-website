import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';
import { applySEO, breadcrumb } from '../../lib/seo';

const ArchitectureAI: React.FC = () => {
  const { navigateBack, backLabel } = useNavigation();

  useEffect(() => applySEO({
    title: 'Architecture and Artificial Intelligence | Mukherji Architects Milano',
    description: 'How Mukherji Architects Milano uses AI in architectural work — the case for quality of thinking over the tool itself, written by Shaunak Mukherji from Milan.',
    canonicalPath: '/architecture-artificial-intelligence',
    schemas: [breadcrumb('Architecture and Artificial Intelligence', '/architecture-artificial-intelligence')],
  }), []);

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
          <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Architecture and Artificial Intelligence
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            How we use AI in our architectural work
          </h2>

          {/* Content Sections */}
          <div className="space-y-16">

            {/* Why the input matters */}
            <section>
              <h2 className="font-display text-xl md:text-2xl font-medium text-white mb-5">
                Why the input matters
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  AI is a deterministic process. With the same input, the same model and the same settings, it gives the same result. What changes the result is the input.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  When the brief is spatially resolved and based on sound architectural judgement, we can test more options, work through more constraints and make decisions with more confidence.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  A better input produces a disproportionately better result. That is why the quality of the thinking matters most.
                </p>
              </div>
            </section>

            {/* The tools and how we use them */}
            <section>
              <h2 className="font-display text-xl md:text-2xl font-medium text-white mb-5">
                The tools and how we use them
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  AI work in architecture ranges from simple to complex. Some workflows use a single off-the-shelf application. Others connect several specialist tools into a custom process. These take longer to learn but give much more control over the result.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  We use the most advanced tools available and pay for the current state of the art. When something better appears, we move to it. Part of the team is always testing new methods, so each project uses the best approach we know at the time.
                </p>
              </div>
            </section>

            {/* Creativity */}
            <section>
              <h2 className="font-display text-xl md:text-2xl font-medium text-white mb-5">
                Creativity
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Creative judgement is a major part of the input. The ideas still come from the designer. What has changed is how quickly an idea can be developed, and how many ideas can be developed and tested in a short time.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  A spatial idea can now be revised dozens of times in one session and tested against material, light and proportion. It can also be shown to others clearly at a much earlier stage.
                </p>
              </div>
            </section>

            {/* The compounding effect */}
            <section>
              <h2 className="font-display text-xl md:text-2xl font-medium text-white mb-5">
                The compounding effect
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Using the best available tool at each stage gives the next stage a better starting point. Better information at concept stage gives a better brief for design development. A better-resolved design causes fewer problems in technical coordination, and fewer coordination problems mean fewer surprises on site.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The gain at each step can be modest. Across a whole project, it is substantial.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The same approach drives{' '}
                  <a
                    href="https://mukherjigroup.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors font-medium"
                  >
                    Mukherji Group
                  </a>
                  , our real estate development company. Every important decision is based on data and analysis and weighed against the value it adds. Using the best AI and systems at every step has the same compounding effect there.
                </p>
              </div>
            </section>

            {/* Our training */}
            <section>
              <h2 className="font-display text-xl md:text-2xl font-medium text-white mb-5">
                Our training
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The studio is in Milan. Our architects trained at the Politecnico di Milano, Italy's highest-ranked university for architecture and design. Italy has one of the world's strongest design cultures, and Milan is one of Europe's strongest talent pools for architecture and design.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  This is the studio's philosophy: exceptional creative talent combined with state-of-the-art technology.
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
