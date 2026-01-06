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

  // Prevent body scroll when mobile menu is open (preserve scroll position)
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scroll while preserving position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        {/* Logo */}
        <button onClick={navigateToHome} className="relative z-50 group flex-shrink-0">
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
          className="md:hidden relative z-[60] flex items-center justify-center w-11 h-11 rounded-lg bg-black/50 backdrop-blur-sm border border-zinc-800/50 text-white hover:bg-black/70 hover:border-zinc-700 transition-all duration-200 active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          {isMobileMenuOpen ? (
            <X size={22} className="stroke-[2.5]" />
          ) : (
            <Menu size={22} className="stroke-[2.5]" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu - Outside nav container for proper z-index and full coverage */}
      <div 
        className={`fixed inset-0 bg-black z-[55] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        aria-hidden={!isMobileMenuOpen}
        onClick={(e) => {
          // Close menu if clicking on backdrop (not on menu items)
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full gap-8 px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsMobileMenuOpen(false);
              }}
              className="text-2xl font-display font-bold text-white hover:text-zinc-400 transition-colors py-2"
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
              className="text-2xl font-display font-bold text-white hover:text-zinc-400 transition-colors py-2"
            >
              Contact
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;