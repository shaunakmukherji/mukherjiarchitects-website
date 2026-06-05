import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { NavigationContextType, ViewState } from '../types';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Helper function to update URL without triggering navigation
const updateURL = (view: ViewState, id: string | null) => {
  let url = '/';
  if (view === 'PROJECT_DETAIL' && id) {
    url = `/project/${encodeURIComponent(id)}`;
  } else if (view === 'CATEGORY_LISTING' && id) {
    url = `/category/${encodeURIComponent(id)}`;
  } else if (view === 'CREATIVE_DIRECTOR') {
    url = '/shaunak-mukherji';
  } else if (view === 'BOBBY_MUKHERJI') {
    url = '/bobby-mukherji';
  } else if (view === 'ARCHITECTURE_AI') {
    url = '/architecture-artificial-intelligence';
  } else if (view === 'ABOUT_STUDIO') {
    url = '/about-mukherji-architects-milano';
  } else if (view === 'BEST_FIT_COMMERCIAL') {
    url = '/best-fit/commercial-design';
  } else if (view === 'BEST_FIT_HOSPITALITY') {
    url = '/best-fit/hospitality-design';
  } else if (view === 'BEST_FIT_INSTITUTIONAL') {
    url = '/best-fit/institutional-design';
  } else if (view === 'BEST_FIT_MASTER_PLANNING') {
    url = '/best-fit/master-planning';
  } else if (view === 'BEST_FIT_MIXED_USE') {
    url = '/best-fit/mixed-use-design';
  } else if (view === 'BEST_FIT_RESEARCH') {
    url = '/best-fit/research-exploration';
  } else if (view === 'BEST_FIT_RESIDENTIAL') {
    url = '/best-fit/residential-design';
  } else if (view === 'PORTFOLIO_FEED') {
    url = '/portfolio';
  }

  window.history.pushState({ view, id }, '', url);
};

// Helper function to parse URL and return view state
const parseURL = (): { view: ViewState; id: string | null } => {
  const path = window.location.pathname;
  
  if (path.startsWith('/project/')) {
    const id = decodeURIComponent(path.split('/project/')[1]);
    return { view: 'PROJECT_DETAIL', id };
  } else if (path.startsWith('/category/')) {
    const id = decodeURIComponent(path.split('/category/')[1]);
    return { view: 'CATEGORY_LISTING', id };
  } else if (path === '/shaunak-mukherji' || path === '/creative-director') {
    // Redirect old URL to new URL
    if (path === '/creative-director') {
      window.history.replaceState({ view: 'CREATIVE_DIRECTOR', id: null }, '', '/shaunak-mukherji');
    }
    return { view: 'CREATIVE_DIRECTOR', id: null };
  } else if (path === '/bobby-mukherji') {
    return { view: 'BOBBY_MUKHERJI', id: null };
  } else if (path === '/architecture-artificial-intelligence') {
    return { view: 'ARCHITECTURE_AI', id: null };
  } else if (path === '/about-mukherji-architects-milano' || path === '/about') {
    return { view: 'ABOUT_STUDIO', id: null };
  } else if (path === '/best-fit/commercial-design') {
    return { view: 'BEST_FIT_COMMERCIAL', id: null };
  } else if (path === '/best-fit/hospitality-design') {
    return { view: 'BEST_FIT_HOSPITALITY', id: null };
  } else if (path === '/best-fit/institutional-design') {
    return { view: 'BEST_FIT_INSTITUTIONAL', id: null };
  } else if (path === '/best-fit/master-planning') {
    return { view: 'BEST_FIT_MASTER_PLANNING', id: null };
  } else if (path === '/best-fit/mixed-use-design') {
    return { view: 'BEST_FIT_MIXED_USE', id: null };
  } else if (path === '/best-fit/research-exploration') {
    return { view: 'BEST_FIT_RESEARCH', id: null };
  } else if (path === '/best-fit/residential-design') {
    return { view: 'BEST_FIT_RESIDENTIAL', id: null };
  } else if (path === '/portfolio') {
    return { view: 'PORTFOLIO_FEED', id: null };
  }

  return { view: 'HOME', id: null };
};

type HistoryEntry = { view: ViewState; id: string | null };

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from URL
  const initialState = parseURL();
  const [currentView, setCurrentView] = useState<ViewState>(initialState.view);
  const [selectedId, setSelectedId] = useState<string | null>(initialState.id);
  // Internal stack for back-button awareness (separate from browser history)
  const [navStack, setNavStack] = useState<HistoryEntry[]>([]);

  const canGoBack = navStack.length > 0;
  const previousView = navStack.length > 0 ? navStack[navStack.length - 1].view : null;
  const previousSelectedId = navStack.length > 0 ? navStack[navStack.length - 1].id : null;

  const backLabel = 'Back';

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setCurrentView(event.state.view);
        setSelectedId(event.state.id);
        window.scrollTo(0, 0);
      } else {
        // Fallback to parsing URL if state is not available
        const { view, id } = parseURL();
        setCurrentView(view);
        setSelectedId(id);
        window.scrollTo(0, 0);
      }
      // Pop internal stack when browser back is used
      setNavStack(prev => prev.slice(0, -1));
    };

    window.addEventListener('popstate', handlePopState);

    // Initialize URL on first load if we're not on the home page
    // Replace state instead of push to avoid adding an extra history entry
    if (initialState.view !== 'HOME' || initialState.id !== null) {
      let url = '/';
      if (initialState.view === 'PROJECT_DETAIL' && initialState.id) {
        url = `/project/${encodeURIComponent(initialState.id)}`;
      } else if (initialState.view === 'CATEGORY_LISTING' && initialState.id) {
        url = `/category/${encodeURIComponent(initialState.id)}`;
      } else if (initialState.view === 'CREATIVE_DIRECTOR') {
        url = '/shaunak-mukherji';
      } else if (initialState.view === 'BOBBY_MUKHERJI') {
        url = '/bobby-mukherji';
      } else if (initialState.view === 'ARCHITECTURE_AI') {
        url = '/architecture-artificial-intelligence';
      } else if (initialState.view === 'ABOUT_STUDIO') {
        url = '/about-mukherji-architects-milano';
      } else if (initialState.view === 'BEST_FIT_COMMERCIAL') {
        url = '/best-fit/commercial-design';
      } else if (initialState.view === 'BEST_FIT_HOSPITALITY') {
        url = '/best-fit/hospitality-design';
      } else if (initialState.view === 'BEST_FIT_INSTITUTIONAL') {
        url = '/best-fit/institutional-design';
      } else if (initialState.view === 'BEST_FIT_MASTER_PLANNING') {
        url = '/best-fit/master-planning';
      } else if (initialState.view === 'BEST_FIT_MIXED_USE') {
        url = '/best-fit/mixed-use-design';
      } else if (initialState.view === 'BEST_FIT_RESEARCH') {
        url = '/best-fit/research-exploration';
      } else if (initialState.view === 'BEST_FIT_RESIDENTIAL') {
        url = '/best-fit/residential-design';
      } else if (initialState.view === 'PORTFOLIO_FEED') {
        url = '/portfolio';
      }
      window.history.replaceState({ view: initialState.view, id: initialState.id }, '', url);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const pushCurrent = () => {
    setNavStack(prev => [...prev, { view: currentView, id: selectedId }]);
  };

  const navigateBack = () => {
    if (navStack.length > 0) {
      window.history.back();
    } else {
      // No internal history (direct URL access or refresh) — go home
      setCurrentView('HOME');
      setSelectedId(null);
      updateURL('HOME', null);
      window.scrollTo(0, 0);
    }
  };

  const navigateToHome = () => {
    pushCurrent();
    setCurrentView('HOME');
    setSelectedId(null);
    updateURL('HOME', null);
    window.scrollTo(0, 0);
  };

  const navigateToProject = (id: string) => {
    pushCurrent();
    setSelectedId(id);
    setCurrentView('PROJECT_DETAIL');
    updateURL('PROJECT_DETAIL', id);
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (categoryFilter: string) => {
    pushCurrent();
    setSelectedId(categoryFilter);
    setCurrentView('CATEGORY_LISTING');
    updateURL('CATEGORY_LISTING', categoryFilter);
    window.scrollTo(0, 0);
  };

  const navigateToCreativeDirector = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('CREATIVE_DIRECTOR');
    updateURL('CREATIVE_DIRECTOR', null);
    window.scrollTo(0, 0);
  };

  const navigateToBobbyMukherji = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BOBBY_MUKHERJI');
    updateURL('BOBBY_MUKHERJI', null);
    window.scrollTo(0, 0);
  };

  const navigateToContact = () => {
    if (currentView !== 'HOME') {
      pushCurrent();
      setCurrentView('HOME');
      setSelectedId(null);
      updateURL('HOME', null);
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          setTimeout(() => {
            const retryElement = document.getElementById('contact');
            if (retryElement) {
              retryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 300);
        }
      }, 150);
    });
  };

  const navigateToArchitectureAI = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('ARCHITECTURE_AI');
    updateURL('ARCHITECTURE_AI', null);
    window.scrollTo(0, 0);
  };

  const navigateToAboutStudio = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('ABOUT_STUDIO');
    updateURL('ABOUT_STUDIO', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitCommercial = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_COMMERCIAL');
    updateURL('BEST_FIT_COMMERCIAL', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitHospitality = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_HOSPITALITY');
    updateURL('BEST_FIT_HOSPITALITY', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitInstitutional = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_INSTITUTIONAL');
    updateURL('BEST_FIT_INSTITUTIONAL', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitMasterPlanning = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_MASTER_PLANNING');
    updateURL('BEST_FIT_MASTER_PLANNING', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitMixedUse = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_MIXED_USE');
    updateURL('BEST_FIT_MIXED_USE', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitResearch = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_RESEARCH');
    updateURL('BEST_FIT_RESEARCH', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitResidential = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('BEST_FIT_RESIDENTIAL');
    updateURL('BEST_FIT_RESIDENTIAL', null);
    window.scrollTo(0, 0);
  };

  const navigateToPortfolioFeed = () => {
    pushCurrent();
    setSelectedId(null);
    setCurrentView('PORTFOLIO_FEED');
    updateURL('PORTFOLIO_FEED', null);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{
      currentView,
      selectedId,
      canGoBack,
      previousView,
      previousSelectedId,
      backLabel,
      navigateBack,
      navigateToHome,
      navigateToProject,
      navigateToCategory,
      navigateToCreativeDirector,
      navigateToBobbyMukherji,
      navigateToContact,
      navigateToArchitectureAI,
      navigateToAboutStudio,
      navigateToBestFitCommercial,
      navigateToBestFitHospitality,
      navigateToBestFitInstitutional,
      navigateToBestFitMasterPlanning,
      navigateToBestFitMixedUse,
      navigateToBestFitResearch,
      navigateToBestFitResidential,
      navigateToPortfolioFeed
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};