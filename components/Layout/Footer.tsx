import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-zinc-900 bg-black text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-600">
        <p>&copy; 2024 Mukherji Architects. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;