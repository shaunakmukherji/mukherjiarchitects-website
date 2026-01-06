import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Copy */}
        <div className="flex flex-col justify-center space-y-8 lg:space-y-12">
            <div className="space-y-6">
                <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.1]">
                    LET'S BUILD <br/> 
                    <span className="text-zinc-600">SOMETHING</span> <br/>
                    EXTRAORDINARY
                </h2>
                <p className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed">
                    If you have a project in mind, contact the studio to discuss scope, requirements, and next steps.
                </p>
            </div>

            <div className="space-y-3 font-mono text-sm text-zinc-500">
                <p className="text-zinc-400">MUKHERJI ARCHITECTS MILANO</p>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Via+Lambro,+14,+20129+Milano+MI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-500 hover:text-white hover:underline transition-colors"
                >
                    Via Lambro, 14, 20129 Milano MI
                </a>
                <p>+39 3343059860</p>
                <a 
                    href="mailto:admin@mukherjiarchitects.com"
                    className="block text-white hover:underline transition-colors"
                >
                    admin@mukherjiarchitects.com
                </a>
            </div>
        </div>

        {/* Right Side: Social Links with Cross Design */}
        <div className="flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
            {/* Grey Background Card */}
            <div className="absolute inset-0 bg-zinc-900/20 border border-zinc-700/50 backdrop-blur-sm max-w-[90%] mx-auto"></div>
            
            <div className="relative w-full h-full p-8">
                {/* Minimal Cross - 2 diagonals that don't reach the icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Diagonal from top-left to bottom-right */}
                    <div 
                        className="w-[1px] bg-zinc-600/40 absolute"
                        style={{
                            height: '40%',
                            transform: 'rotate(45deg)',
                            transformOrigin: 'center',
                            top: '30%',
                            left: '50%'
                        }}
                    ></div>
                    {/* Diagonal from top-right to bottom-left */}
                    <div 
                        className="w-[1px] bg-zinc-600/40 absolute"
                        style={{
                            height: '40%',
                            transform: 'rotate(-45deg)',
                            transformOrigin: 'center',
                            top: '30%',
                            left: '50%'
                        }}
                    ></div>
                </div>
                
                {/* Email Icon - Top Left */}
                <a
                    href="mailto:admin@mukherjiarchitects.com"
                    className="absolute top-[15%] left-[15%] w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 active:bg-red-500/30 hover:scale-110 transition-all duration-300 group z-10"
                    aria-label="Email"
                >
                    <Mail 
                        className="w-7 h-7 text-zinc-400 group-hover:text-red-500 group-active:text-red-600 group-hover:scale-110 transition-all duration-300" 
                        strokeWidth={1}
                        fill="none"
                    />
                </a>
                
                {/* Instagram Icon - Top Right */}
                <a
                    href="https://www.instagram.com/mukherjiarchitects?igsh=MWhiOGdscHNvMHZtZg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-[15%] right-[15%] w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 active:bg-red-500/30 hover:scale-110 transition-all duration-300 group z-10"
                    aria-label="Instagram"
                >
                    <Instagram 
                        className="w-7 h-7 text-zinc-400 group-hover:text-red-500 group-active:text-red-600 group-hover:scale-110 transition-all duration-300" 
                        strokeWidth={1}
                        fill="none"
                    />
                </a>
                
                {/* LinkedIn Icon - Bottom Left */}
                <a
                    href="https://www.linkedin.com/company/mukherimukherji-architects-milano/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-[15%] left-[15%] w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 active:bg-red-500/30 hover:scale-110 transition-all duration-300 group z-10"
                    aria-label="LinkedIn"
                >
                    <Linkedin 
                        className="w-7 h-7 text-zinc-400 group-hover:text-red-500 group-active:text-red-600 group-hover:scale-110 transition-all duration-300" 
                        strokeWidth={1}
                        fill="none"
                    />
                </a>
                
                {/* WhatsApp Icon - Bottom Right */}
                <a
                    href="https://wa.me/393343059860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-[15%] right-[15%] w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 active:bg-red-500/30 hover:scale-110 transition-all duration-300 group z-10"
                    aria-label="WhatsApp"
                >
                    <svg 
                        className="w-7 h-7 text-zinc-400 group-hover:text-red-500 group-active:text-red-600 group-hover:scale-110 transition-all duration-300" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;