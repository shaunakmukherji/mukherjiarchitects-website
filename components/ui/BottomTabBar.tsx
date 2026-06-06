import React from 'react';
import { Home, LayoutGrid } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ViewState } from '../../types';

const WORK_VIEWS: ViewState[] = ['PORTFOLIO_FEED', 'PROJECT_DETAIL'];

const BottomTabBar: React.FC = () => {
  const { currentView, navigateToHome, navigateToPortfolioFeed } = useNavigation();

  const isWork = WORK_VIEWS.includes(currentView);
  const isStudio = !isWork;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-zinc-800">
      <div
        className="flex items-stretch"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Studio tab */}
        <button
          onClick={navigateToHome}
          className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 transition-colors relative ${
            isStudio ? 'text-white' : 'text-zinc-600'
          }`}
        >
          {isStudio && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white" />
          )}
          <Home size={20} strokeWidth={isStudio ? 2 : 1.5} />
          <span className="text-[9px] uppercase tracking-[0.15em]">Studio</span>
        </button>

        {/* Divider */}
        <div className="w-px bg-zinc-800 my-3" />

        {/* Work tab */}
        <button
          onClick={navigateToPortfolioFeed}
          className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 transition-colors relative ${
            isWork ? 'text-white' : 'text-zinc-600'
          }`}
        >
          {isWork && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white" />
          )}
          <LayoutGrid size={20} strokeWidth={isWork ? 2 : 1.5} />
          <span className="text-[9px] uppercase tracking-[0.15em]">Work</span>
        </button>
      </div>
    </div>
  );
};

export default BottomTabBar;
