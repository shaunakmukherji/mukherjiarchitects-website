import React from 'react';
import { useNavigation, getPathForView } from '../../contexts/NavigationContext';
import NavLink from '../ui/NavLink';

const Footer: React.FC = () => {
  const { navigateToInsights } = useNavigation();
  return (
    <footer className="py-8 border-t border-zinc-900 bg-black text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-600">
        <p>&copy; 2023 Mukherji Architects. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <NavLink
              href={getPathForView('INSIGHTS', null)}
              onNavigate={navigateToInsights}
              className="hover:text-white transition-colors"
            >
              Insights
            </NavLink>
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
