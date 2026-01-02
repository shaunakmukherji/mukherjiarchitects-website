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
  categoryOrder?: number | null; // Order within category (lower = first, determines cover project)
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

export type ViewState = 'HOME' | 'PROJECT_DETAIL' | 'CATEGORY_LISTING';

export interface NavigationContextType {
  currentView: ViewState;
  selectedId: string | null;
  navigateToHome: () => void;
  navigateToProject: (id: string) => void;
  navigateToCategory: (categoryId: string) => void;
}