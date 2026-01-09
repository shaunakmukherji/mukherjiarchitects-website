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
  } else if (view === 'ARCHITECTURE_AI') {
    url = '/architecture-artificial-intelligence';
  } else if (view === 'ABOUT_STUDIO') {
    url = '/about-mukherji-architects-milano';
  } else if (view === 'BEST_FIT_COMMERCIAL') {
    url = '/best-fit/commercial-design';
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
  } else if (path === '/architecture-artificial-intelligence') {
    return { view: 'ARCHITECTURE_AI', id: null };
  } else if (path === '/about-mukherji-architects-milano' || path === '/about') {
    return { view: 'ABOUT_STUDIO', id: null };
  } else if (path === '/best-fit/commercial-design') {
    return { view: 'BEST_FIT_COMMERCIAL', id: null };
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
  }
  
  return { view: 'HOME', id: null };
};

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from URL
  const initialState = parseURL();
  const [currentView, setCurrentView] = useState<ViewState>(initialState.view);
  const [selectedId, setSelectedId] = useState<string | null>(initialState.id);

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
      } else if (initialState.view === 'ARCHITECTURE_AI') {
        url = '/architecture-artificial-intelligence';
      } else if (initialState.view === 'ABOUT_STUDIO') {
        url = '/about-mukherji-architects-milano';
      } else if (initialState.view === 'BEST_FIT_COMMERCIAL') {
        url = '/best-fit/commercial-design';
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
      }
      window.history.replaceState({ view: initialState.view, id: initialState.id }, '', url);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToHome = () => {
    setCurrentView('HOME');
    setSelectedId(null);
    updateURL('HOME', null);
    window.scrollTo(0, 0);
  };

  const navigateToProject = (id: string) => {
    setSelectedId(id);
    setCurrentView('PROJECT_DETAIL');
    updateURL('PROJECT_DETAIL', id);
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (categoryFilter: string) => {
    setSelectedId(categoryFilter);
    setCurrentView('CATEGORY_LISTING');
    updateURL('CATEGORY_LISTING', categoryFilter);
    window.scrollTo(0, 0);
  };

  const navigateToCreativeDirector = () => {
    setSelectedId(null);
    setCurrentView('CREATIVE_DIRECTOR');
    updateURL('CREATIVE_DIRECTOR', null);
    window.scrollTo(0, 0);
  };

  const navigateToContact = () => {
    // Navigate to home first if not already there
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setSelectedId(null);
      updateURL('HOME', null);
      window.scrollTo(0, 0);
    }
    // Scroll to contact section after ensuring DOM is ready
    // Use requestAnimationFrame to wait for React to render, then scroll
    requestAnimationFrame(() => {
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If element not found, try again after a longer delay
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
    setSelectedId(null);
    setCurrentView('ARCHITECTURE_AI');
    updateURL('ARCHITECTURE_AI', null);
    window.scrollTo(0, 0);
  };

  const navigateToAboutStudio = () => {
    setSelectedId(null);
    setCurrentView('ABOUT_STUDIO');
    updateURL('ABOUT_STUDIO', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitCommercial = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_COMMERCIAL');
    updateURL('BEST_FIT_COMMERCIAL', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitInstitutional = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_INSTITUTIONAL');
    updateURL('BEST_FIT_INSTITUTIONAL', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitMasterPlanning = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_MASTER_PLANNING');
    updateURL('BEST_FIT_MASTER_PLANNING', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitMixedUse = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_MIXED_USE');
    updateURL('BEST_FIT_MIXED_USE', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitResearch = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_RESEARCH');
    updateURL('BEST_FIT_RESEARCH', null);
    window.scrollTo(0, 0);
  };

  const navigateToBestFitResidential = () => {
    setSelectedId(null);
    setCurrentView('BEST_FIT_RESIDENTIAL');
    updateURL('BEST_FIT_RESIDENTIAL', null);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ 
      currentView, 
      selectedId, 
      navigateToHome, 
      navigateToProject, 
      navigateToCategory, 
      navigateToCreativeDirector, 
      navigateToContact, 
      navigateToArchitectureAI, 
      navigateToAboutStudio,
      navigateToBestFitCommercial,
      navigateToBestFitInstitutional,
      navigateToBestFitMasterPlanning,
      navigateToBestFitMixedUse,
      navigateToBestFitResearch,
      navigateToBestFitResidential
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