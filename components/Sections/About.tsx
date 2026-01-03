import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants';
import { useNavigation } from '../../contexts/NavigationContext';

const About: React.FC = () => {
  const { navigateToCreativeDirector } = useNavigation();
  
  return (
    <section id="about" className="relative py-16 md:py-24 border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
            <div>
                 <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 md:mb-6">
                    Intelligent design <br />
                    <span className="text-zinc-600">meets intelligent</span> <br/>
                    <span className="text-zinc-600">technology.</span>
                </h2>
            </div>
            <div className="flex flex-col justify-start md:justify-end items-start md:items-end text-zinc-500 text-xs md:text-sm font-mono">
                <p>(01) About Us</p>
            </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
            
            {/* Image */}
            <div className="md:col-span-5 relative group overflow-hidden md:sticky md:top-32 order-2 md:order-1">
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
            <div className="md:col-span-7 flex flex-col h-full md:pl-8 lg:pl-12 order-1 md:order-2">
                <div className="space-y-10 md:space-y-14">
                    <p className="text-lg md:text-xl text-zinc-200 leading-[1.7] md:leading-[1.75] font-normal tracking-tight">
                        Mukherji Architects Milano is an international extension of{' '}
                        <a 
                            href="https://bobbymukherji.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors duration-300"
                        >
                            Bobby Mukherji Architects
                        </a>
                        {' '}— a globally recognized architecture and design practice with{' '}
                        <span className="text-white font-medium">30+ years of experience</span>
                        ,{' '}
                        <span className="text-white font-medium">1,000+ projects completed globally</span>
                        , and more than{' '}
                        <span className="text-white font-medium">USD 12B+ in built project value</span>
                        , delivering complex hospitality, commercial, and mixed-use projects across global markets.
                    </p>
                    <div className="h-px w-full bg-zinc-900" />
                    <p className="text-zinc-400 text-lg md:text-xl leading-[1.7] md:leading-[1.75] font-normal tracking-tight max-w-2xl">
                        Founded and creatively directed by{' '}
                        <button
                            onClick={navigateToCreativeDirector}
                            className="text-white underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors duration-300 cursor-pointer font-normal"
                        >
                            Shaunak Mukherji
                        </button>
                        , son of Bobby Mukherji, the studio represents a generational evolution of practice. Building on a legacy of large-scale, award-winning architecture, the Milan office advances a contemporary approach rooted in computational design, artificial intelligence, and system-based thinking.
                    </p>
                </div>

                {/* Minimal graphic element */}
                <div className="mt-12 md:mt-24 opacity-60">
                     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: 'unset', background: 'unset' }}>
                        <circle cx="20" cy="20" r="18" stroke="#DC2626" strokeWidth="2"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;