import React, { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Services from './components/Sections/Services';
import Portfolio from './components/Sections/Portfolio';
import Contact from './components/Sections/Contact';
import SpotlightBackground from './components/ui/SpotlightBackground';
import ScrollWheelIndicator from './components/ui/ScrollWheelIndicator';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import ProjectDetail from './components/Views/ProjectDetail';
import CategoryListing from './components/Views/CategoryListing';
import CreativeDirector from './components/Views/CreativeDirector';
import ArchitectureAI from './components/Views/ArchitectureAI';

// Separating the Main Content to handle view logic cleanly
const MainContent = () => {
  const { currentView } = useNavigation();

  // Restore home page meta tags when on home view
  useEffect(() => {
    if (currentView === 'HOME') {
      // Restore original home page title and meta description
      document.title = 'Mukherji Architects Milano';
      
      const homeDescription = 'Mukherji Architects Milano - High-performance architecture studio in Milan, Italy. Specializing in residential, commercial, institutional, and mixed-use design. AI-driven architectural solutions for intelligent buildings.';
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', homeDescription);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'Mukherji Architects Milano');
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', 'Mukherji Architects Milano - High-performance architecture studio in Milan, Italy. Specializing in residential, commercial, institutional, and mixed-use design.');
      }
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', 'Mukherji Architects Milano');
      }
      
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', 'Mukherji Architects Milano - High-performance architecture studio in Milan, Italy. Specializing in residential, commercial, institutional, and mixed-use design.');
      }
    }
  }, [currentView]);

  if (currentView === 'PROJECT_DETAIL') {
    return <ProjectDetail />;
  }

  if (currentView === 'CATEGORY_LISTING') {
    return <CategoryListing />;
  }

  if (currentView === 'CREATIVE_DIRECTOR') {
    return <CreativeDirector />;
  }

  if (currentView === 'ARCHITECTURE_AI') {
    return <ArchitectureAI />;
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

        {/* Scroll depth / section indicator */}
        <ScrollWheelIndicator />

        <main className="relative z-10 flex flex-col">
          <MainContent />
        </main>

        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default App;