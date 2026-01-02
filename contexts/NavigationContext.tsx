import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavigationContextType, ViewState } from '../types';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigateToHome = () => {
    setCurrentView('HOME');
    setSelectedId(null);
    window.scrollTo(0, 0);
  };

  const navigateToProject = (id: string) => {
    setSelectedId(id);
    setCurrentView('PROJECT_DETAIL');
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (categoryFilter: string) => {
    setSelectedId(categoryFilter);
    setCurrentView('CATEGORY_LISTING');
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentView, selectedId, navigateToHome, navigateToProject, navigateToCategory }}>
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