import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';
import { applySEO, breadcrumb } from '../../lib/seo';

const ArchitectureAI: React.FC = () => {
  const { navigateBack, backLabel } = useNavigation();

  useEffect(() => applySEO({
    title: 'Architecture and Artificial Intelligence | Mukherji Architects Milano',
    description: 'How Mukherji Architects Milano uses AI in architectural work — the case for quality of thinking over the tool itself, written by Shaunak Mukherji from Milan.',
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            Architecture and Artificial Intelligence
          </h1>
          <h2 className="font-display text-xl md:text-2xl font-normal text-zinc-400 mb-16">
            On amplification, input quality, and why the machine is only half the equation
          </h2>

          {/* Content Sections */}
          <div className="space-y-16">

            {/* The machine is constant */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                The machine is constant. The input is everything.
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  AI is a deterministic process. It takes an input and produces an output. The technology is the same for everyone who uses it.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  What varies — entirely — is the quality of what goes in.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  A spatially resolved, architecturally intelligent input produces something disproportionately better than the input itself: more options tested, more constraints resolved, more decisions made with precision. The return on a well-crafted input is not linear. It is multiplied.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  This is what amplification means in practice. The ceiling for strong input is far higher than any manual process could reach.
                </p>
              </div>
            </section>

            {/* Creativity is the other input */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Creativity is the other input
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Technical intelligence is one kind of input. Creative intelligence is another — and it scales the same way.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  A designer with genuine artistic vision has always had that vision. What has changed is the ability to act on it at speed. To iterate on a spatial idea dozens of times in a session. To test a formal concept against material, light, proportion. To communicate what previously took far longer to communicate — clearly, precisely, and fast.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The creative act itself — the original idea, the spatial instinct, the compositional judgment — remains entirely human. What AI gives is the ability to pursue that idea further than was previously possible in the time available.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  When real creativity meets that kind of iteration velocity, the compounding effect is significant. Each refined version becomes the input for the next. Each cycle produces something more resolved. Over a project, this accumulates into a quality of output that a slower process simply cannot reach.
                </p>
              </div>
            </section>

            {/* The compounding effect */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                The compounding effect
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Using the most capable tool at every stage of a project means each decision creates a stronger foundation for the next. Better information at concept stage produces a better brief for design development. A better-resolved design produces fewer problems in technical coordination. Fewer problems in coordination produce fewer surprises in construction.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The advantage at each step is modest. Across an entire project, it is substantial.
                </p>
              </div>
            </section>

            {/* Why the input quality here is different */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
                Why the input quality here is different
              </h2>
              <div className="space-y-5 max-w-prose">
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The studio operates out of Milan. Our team are top graduates of Politecnico di Milano — the highest-ranked architecture and design university in Italy. Italy is the Mecca of design, and Milan sits at its centre. The design culture here, the standards, the spatial intelligence embedded in the training — this is the input.
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  The purest design thinking, applied through the most capable tools available, produces the strongest possible output. That is how the process works.
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

