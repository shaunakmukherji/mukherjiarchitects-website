import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, LOGO_URL } from '../../constants';
import { useNavigation } from '../../contexts/NavigationContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateToHome, currentView } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (currentView !== 'HOME') {
        e.preventDefault();
        navigateToHome();
        // Allow state update then scroll
        setTimeout(() => {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    // If we are home, default anchor behavior works fine
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-black/70 backdrop-blur-md border-zinc-800 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button onClick={navigateToHome} className="z-50 group">
          <img 
            src={LOGO_URL} 
            alt="Mukherji Architects Milano" 
            className="h-10 md:h-12 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ml-4 px-4 py-2 text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors">
            CONTACT US
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-display font-bold text-white hover:text-zinc-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            {/* Explicit Contact Link for Mobile */}
            <a
                href="#contact"
                onClick={(e) => {
                    handleNavClick(e, '#contact');
                    setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-display font-bold text-white hover:text-zinc-400 transition-colors"
              >
                Contact
              </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;