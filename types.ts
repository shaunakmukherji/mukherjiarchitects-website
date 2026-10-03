export interface ProjectCredit {
  name: string;
  linkTo?: 'CREATIVE_DIRECTOR'; // navigates to Shaunak Mukherji page
  institution?: string;          // e.g. "Politecnico di Milano"
}

export interface ConstructionMediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string; // Primary category — used for breadcrumbs, meta tags, and the canonical folder location
  categories: string[]; // All categories this project should be listed under (always includes `category`)
  year: string; // Design Year — when the design/project started, not completion
  location: string;
  imageUrl: string;
  description: string;
  gallery?: string[];
  isSignature?: boolean; // Mark projects to show in signature projects section
  signatureOrder?: number | null; // Order for signature projects (lower = first)
  categoryOrder?: number | null; // Within category: 0 = hero/cover. Set by `_hero/` folder, folder prefix "0. Name", or project.json.
  credit?: ProjectCredit;        // Optional individual authorship credit
  // Structured project facts — sourced from project.json, shown by the shared facts component.
  // Each is optional and independent; omit rather than inventing a value.
  client?: string;
  status?: string;      // Displayed as "Status" (maps from Notion's "Public Status")
  siteArea?: string;    // Exact units/wording preserved as recorded
  builtUpArea?: string; // Exact units/wording preserved as recorded
  scope?: string;
  // Construction progress — populated only when a project has a `_construction/` media folder.
  constructionMedia?: ConstructionMediaItem[];
  constructionNote?: string; // Short intro text shown at the top of the progress gallery
}

export interface TeamMember {
  name: string;
  slug: string; // URL slug for the generic /the-studio/people/<slug> subpage
  role: string;
  order: number;
  linkTo?: string; // ViewState key of an existing BESPOKE subpage, e.g. 'CREATIVE_DIRECTOR' — takes priority over the generic page
  headshotUrl?: string;
  description?: string;
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

// Insights article — generated from content/insights/<slug>/article.md (see scripts/insights.cjs)
export interface InsightCover {
  alt: string;
  src: string;      // mid-size variant, for cards
  srcSet: string;   // responsive WebP variants
  width: number;    // intrinsic size of the largest variant (stable layout, no shift)
  height: number;
}

export interface Insight {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  author: string;
  authorType: 'Person' | 'Organization';
  date: string;      // YYYY-MM-DD, publication date
  updated?: string;  // YYYY-MM-DD, only set after a substantive change
  tag?: string;
  disclosure?: string;
  numberedSections: boolean;
  image: string;     // absolute URL for social previews
  cover: InsightCover | null;
  coverHtml: string; // cover <figure> with caption and credits
  readingMinutes: number;
  introHtml: string; // first paragraph, shown in the page header
  headings: { id: string; text: string }[]; // ## sections, for the contents list
  html: string;      // article body, rendered from markdown at build time
  jsonLd: object[];  // Article + BreadcrumbList structured data
}

export type ViewState = 'HOME' | 'INSIGHTS' | 'INSIGHT_DETAIL' |'PROJECT_DETAIL' | 'PROJECT_CONSTRUCTION' | 'CATEGORY_LISTING' | 'CREATIVE_DIRECTOR' | 'BOBBY_MUKHERJI' | 'ARCHITECTURE_AI' | 'ABOUT_STUDIO' | 'BEST_FIT_COMMERCIAL' | 'BEST_FIT_HOSPITALITY' | 'BEST_FIT_INSTITUTIONAL' | 'BEST_FIT_MASTER_PLANNING' | 'BEST_FIT_MIXED_USE' | 'BEST_FIT_RESEARCH' | 'BEST_FIT_RESIDENTIAL' | 'PORTFOLIO_FEED' | 'TEAM' | 'TEAM_MEMBER_DETAIL';

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
  navigateToProjectConstruction: (id: string) => void;
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
  navigateToTeamMember: (slug: string) => void;
  navigateToInsights: () => void;
  navigateToInsight: (slug: string) => void;
  navigateToPath: (path: string) => void; // any internal URL, e.g. a link inside article text
}