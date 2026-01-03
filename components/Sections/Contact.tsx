import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Copy */}
        <div className="flex flex-col justify-center">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
                LET'S BUILD <br/> 
                <span className="text-zinc-600">SOMETHING</span> <br/>
                EXTRAORDINARY
            </h2>
            <p className="text-zinc-400 max-w-md mb-12">
                Ready to start your project? Get in touch with our team to discuss your vision.
            </p>

            <div className="space-y-4 font-mono text-sm text-zinc-500">
                <p>MUKHERJI ARCHITECTS MILANO</p>
                <p>Via Privata Giovanni Ventura, 20134 Milano MI</p>
                <a href="tel:+393343059860" className="text-white hover:text-zinc-400 transition-colors block">
                    +39 3343059860
                </a>
                <a href="mailto:admin@mukherjiarchitects.com" className="text-white hover:text-zinc-400 transition-colors block">
                    admin@mukherjiarchitects.com
                </a>
            </div>
        </div>

        {/* Right Side: Social Links */}
        <div className="bg-zinc-900/30 p-8 md:p-12 border border-zinc-800 backdrop-blur-sm relative aspect-square min-h-[400px]">
            {/* Diagonal Line - Doesn't touch bubbles */}
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
            >
                <line 
                    x1="75%" 
                    y1="25%" 
                    x2="25%" 
                    y2="75%" 
                    stroke="#3f3f46" 
                    strokeWidth="1"
                />
            </svg>

            {/* CONNECT Text - Positioned along diagonal */}
            <div 
                className="absolute text-xs font-mono text-zinc-600"
                style={{
                    left: '258px',
                    top: '250px',
                    transform: 'rotate(-45deg) translate(-50%, -50%)',
                    transformOrigin: 'center',
                    zIndex: 2
                }}
            >
                CONNECT
            </div>

            {/* Instagram Bubble - Top Right */}
            <a 
                href="https://www.instagram.com/mukherjiarchitects?igsh=MWhiOGdscHNvMHZtZg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute group"
                style={{
                    top: '10%',
                    right: '10%',
                    zIndex: 3
                }}
            >
                <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center group-hover:bg-red-600/50 group-active:bg-red-600 transition-all duration-300 group-hover:scale-110">
                    <Instagram className="w-8 h-8 text-zinc-400 group-hover:text-red-500 group-active:text-red-500 transition-colors duration-300" />
                </div>
            </a>
            
            {/* LinkedIn Bubble - Bottom Left */}
            <a 
                href="https://www.linkedin.com/company/mukherimukherji-architects-milano/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute group"
                style={{
                    bottom: '10%',
                    left: '10%',
                    zIndex: 3
                }}
            >
                <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center group-hover:bg-red-600/50 group-active:bg-red-600 transition-all duration-300 group-hover:scale-110">
                    <Linkedin className="w-8 h-8 text-zinc-400 group-hover:text-red-500 group-active:text-red-500 transition-colors duration-300" />
                </div>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;