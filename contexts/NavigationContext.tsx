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
    url = '/creative-director';
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
  } else if (path === '/creative-director') {
    return { view: 'CREATIVE_DIRECTOR', id: null };
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
      window.history.replaceState({ view: initialState.view, id: initialState.id }, '', 
        initialState.view === 'PROJECT_DETAIL' && initialState.id ? `/project/${encodeURIComponent(initialState.id)}` :
        initialState.view === 'CATEGORY_LISTING' && initialState.id ? `/category/${encodeURIComponent(initialState.id)}` :
        initialState.view === 'CREATIVE_DIRECTOR' ? '/creative-director' : '/'
      );
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

  return (
    <NavigationContext.Provider value={{ currentView, selectedId, navigateToHome, navigateToProject, navigateToCategory, navigateToCreativeDirector, navigateToContact }}>
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