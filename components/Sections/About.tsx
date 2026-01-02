import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
                 <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
                    Architecture for a <br />
                    <span className="text-zinc-600">world that refuses</span> <br/>
                    to stand still.
                </h2>
            </div>
            <div className="flex flex-col justify-end items-end text-zinc-500 text-sm font-mono text-right">
                <p>(01) About Us</p>
            </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Image */}
            <div className="md:col-span-5 relative group overflow-hidden sticky top-32">
                 <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                    <img 
                        src={ABOUT_CONTENT.imageUrl} 
                        alt={ABOUT_CONTENT.imageAlt} 
                        className="w-full h-full object-cover transition-[transform,opacity,filter] duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                 </div>
                 {/* Decorative Overlay */}
                 <div className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm border border-white/10 group-hover:border-accent/50 transition-colors">
                     <ArrowUpRight className="text-white w-4 h-4" />
                 </div>
            </div>

            {/* Text & Philosophy */}
            <div className="md:col-span-7 flex flex-col h-full pl-0 md:pl-12">
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                        Mukherji Architects operates at the intersection of intelligent design and intelligent technology. We refine how we work continuously — not yearly, not monthly — because better decisions come from better systems.
                    </p>
                    <div className="h-px w-full bg-zinc-900" />
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                        We don’t rely on intuition or guesswork. We interrogate ideas, test more options, and design with a level of precision that reduces risk and improves performance across the entire project lifecycle.
                    </p>
                </div>

                {/* Minimal graphic element */}
                <div className="mt-24 opacity-60">
                     <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60V0H60" stroke="#DC2626" strokeWidth="2"/>
                        <path d="M60 0L0 60" stroke="#DC2626" strokeWidth="2"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;