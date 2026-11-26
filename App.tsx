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
import CustomCursor from './components/ui/CustomCursor';
import { NavigationProvider, useNavigation, getPathForView } from './contexts/NavigationContext';
import NavLink from './components/ui/NavLink';
import ProjectDetail from './components/Views/ProjectDetail';
import ProjectConstruction from './components/Views/ProjectConstruction';
import CategoryListing from './components/Views/CategoryListing';
import CreativeDirector from './components/Views/CreativeDirector';
import BobbyMukherji from './components/Views/BobbyMukherji';
import ArchitectureAI from './components/Views/ArchitectureAI';
import AboutStudio from './components/Views/AboutStudio';
import BestFitCommercial from './components/Views/BestFitCommercial';
import BestFitHospitality from './components/Views/BestFitHospitality';
import BestFitInstitutional from './components/Views/BestFitInstitutional';
import BestFitMasterPlanning from './components/Views/BestFitMasterPlanning';
import BestFitMixedUse from './components/Views/BestFitMixedUse';
import BestFitResearch from './components/Views/BestFitResearch';
import BestFitResidential from './components/Views/BestFitResidential';
import PortfolioFeed from './components/Views/PortfolioFeed';
import Team from './components/Views/Team';
import TeamMemberDetail from './components/Views/TeamMemberDetail';
import Insights from './components/Views/Insights';
import InsightDetail from './components/Views/InsightDetail';
import NotFound from './components/Views/NotFound';
import { usePageSEO } from './lib/usePageSEO';
import { HOME_SEO } from './lib/homeSEO';

// Floating "Work" shortcut — hidden when already in portfolio views
const FloatingWorkButton: React.FC = () => {
  const { currentView, navigateToPortfolioFeed } = useNavigation();
  const hidden = currentView === 'PORTFOLIO_FEED' || currentView === 'PROJECT_DETAIL' || currentView === 'PROJECT_CONSTRUCTION' || currentView === 'INSIGHT_DETAIL';
  if (hidden) return null;
  return (
    <NavLink
      href={getPathForView('PORTFOLIO_FEED', null)}
      onNavigate={navigateToPortfolioFeed}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 hover:border-zinc-400 text-white text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-zinc-800/80"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-70" />
      Work
    </NavLink>
  );
};

// Separating the Main Content to handle view logic cleanly
const MainContent = () => {
  const { currentView } = useNavigation();

  // The static HTML for some routes (Insights) ships a canonical link and JSON-LD of its own
  // for crawlers that don't run JS. The page component re-adds both via applySEO, so drop
  // the static copies once the app has mounted to avoid duplicates. Child effects run first.
  useEffect(() => {
    document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());
  }, []);

  // Home page SEO (also written into the static HTML at build time)
  usePageSEO(currentView === 'HOME' ? HOME_SEO : null, [currentView]);

  if (currentView === 'NOT_FOUND') {
    return <NotFound />;
  }

  if (currentView === 'PROJECT_DETAIL') {
    return <ProjectDetail />;
  }

  if (currentView === 'PROJECT_CONSTRUCTION') {
    return <ProjectConstruction />;
  }

  if (currentView === 'CATEGORY_LISTING') {
    return <CategoryListing />;
  }

  if (currentView === 'CREATIVE_DIRECTOR') {
    return <CreativeDirector />;
  }

  if (currentView === 'BOBBY_MUKHERJI') {
    return <BobbyMukherji />;
  }

  if (currentView === 'ARCHITECTURE_AI') {
    return <ArchitectureAI />;
  }

  if (currentView === 'ABOUT_STUDIO') {
    return <AboutStudio />;
  }

  if (currentView === 'BEST_FIT_COMMERCIAL') {
    return <BestFitCommercial />;
  }

  if (currentView === 'BEST_FIT_HOSPITALITY') {
    return <BestFitHospitality />;
  }

  if (currentView === 'BEST_FIT_INSTITUTIONAL') {
    return <BestFitInstitutional />;
  }

  if (currentView === 'BEST_FIT_MASTER_PLANNING') {
    return <BestFitMasterPlanning />;
  }

  if (currentView === 'BEST_FIT_MIXED_USE') {
    return <BestFitMixedUse />;
  }

  if (currentView === 'BEST_FIT_RESEARCH') {
    return <BestFitResearch />;
  }

  if (currentView === 'BEST_FIT_RESIDENTIAL') {
    return <BestFitResidential />;
  }

  if (currentView === 'PORTFOLIO_FEED') {
    return <PortfolioFeed />;
  }

  if (currentView === 'TEAM') {
    return <Team />;
  }

  if (currentView === 'TEAM_MEMBER_DETAIL') {
    return <TeamMemberDetail />;
  }

  if (currentView === 'INSIGHTS') {
    return <Insights />;
  }

  if (currentView === 'INSIGHT_DETAIL') {
    return <InsightDetail />;
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

function App({ initialPath }: { initialPath?: string }) {
  
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <NavigationProvider initialPath={initialPath}>
      <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
        <CustomCursor />
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

        {/* Floating portfolio shortcut */}
        <FloatingWorkButton />
      </div>
    </NavigationProvider>
  );
}

export default App;