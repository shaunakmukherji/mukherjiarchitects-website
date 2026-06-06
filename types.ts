export interface ProjectCredit {
  name: string;
  linkTo?: 'CREATIVE_DIRECTOR'; // navigates to Shaunak Mukherji page
  institution?: string;          // e.g. "Politecnico di Milano"
}

export interface Project {
  id: string;
  title: string;
  category: string; // Should match Service titles loosely or be mapped
  year: string;
  location: string;
  imageUrl: string;
  description: string;
  gallery?: string[];
  isSignature?: boolean; // Mark projects to show in signature projects section
  signatureOrder?: number | null; // Order for signature projects (lower = first)
  categoryOrder?: number | null; // Within category: 0 = hero/cover. Set by `_hero/` folder, folder prefix "0. Name", or project.json.
  credit?: ProjectCredit;        // Optional individual authorship credit
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryFilter: string; // To link to project categories
}

export interface NavItem {
  label: string;
  href: string;
}

export interface AboutContent {
  imageUrl: string;
  imageAlt: string;
  heading: string;
  headingHighlight: string;
  description: string;
  philosophy: string;
}

export type ViewState = 'HOME' | 'PROJECT_DETAIL' | 'CATEGORY_LISTING' | 'CREATIVE_DIRECTOR' | 'BOBBY_MUKHERJI' | 'ARCHITECTURE_AI' | 'ABOUT_STUDIO' | 'BEST_FIT_COMMERCIAL' | 'BEST_FIT_HOSPITALITY' | 'BEST_FIT_INSTITUTIONAL' | 'BEST_FIT_MASTER_PLANNING' | 'BEST_FIT_MIXED_USE' | 'BEST_FIT_RESEARCH' | 'BEST_FIT_RESIDENTIAL' | 'PORTFOLIO_FEED' | 'TEAM';

export interface NavigationContextType {
  currentView: ViewState;
  selectedId: string | null;
  canGoBack: boolean;
  previousView: ViewState | null;
  previousSelectedId: string | null;
  backLabel: string;
  navigateBack: () => void;
  navigateToHome: () => void;
  navigateToProject: (id: string) => void;
  navigateToCategory: (categoryId: string) => void;
  navigateToCreativeDirector: () => void;
  navigateToBobbyMukherji: () => void;
  navigateToContact: () => void;
  navigateToArchitectureAI: () => void;
  navigateToAboutStudio: () => void;
  navigateToBestFitCommercial: () => void;
  navigateToBestFitHospitality: () => void;
  navigateToBestFitInstitutional: () => void;
  navigateToBestFitMasterPlanning: () => void;
  navigateToBestFitMixedUse: () => void;
  navigateToBestFitResearch: () => void;
  navigateToBestFitResidential: () => void;
  navigateToPortfolioFeed: () => void;
  navigateToTeam: () => void;
}