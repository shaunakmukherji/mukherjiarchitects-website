import React, { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Services from './components/Sections/Services';
import Portfolio from './components/Sections/Portfolio';
import Contact from './components/Sections/Contact';
import SpotlightBackground from './components/ui/SpotlightBackground';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import ProjectDetail from './components/Views/ProjectDetail';
import CategoryListing from './components/Views/CategoryListing';

// Separating the Main Content to handle view logic cleanly
const MainContent = () => {
  const { currentView } = useNavigation();

  if (currentView === 'PROJECT_DETAIL') {
    return <ProjectDetail />;
  }

  if (currentView === 'CATEGORY_LISTING') {
    return <CategoryListing />;
  }

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
};

function App() {
  
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <NavigationProvider>
      <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
        {/* Dynamic Background */}
        <SpotlightBackground />
        
        {/* Navigation */}
        <Navbar />

        <main className="relative z-10 flex flex-col">
          <MainContent />
        </main>

        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default App;