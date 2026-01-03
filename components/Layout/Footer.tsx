import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-zinc-900 bg-black text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-600">
        <p>&copy; 2024 Mukherji Architects. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a 
              href="https://www.instagram.com/mukherjiarchitects?igsh=MWhiOGdscHNvMHZtZg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/company/mukherimukherji-architects-milano/about/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;