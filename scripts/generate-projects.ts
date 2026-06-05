import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  isSignature: boolean;
}

interface ServiceData {
  id: string;
  title: string;
  categoryFilter: string;
  description: string;
  imageUrl: string;
}

// Map folder names to display names and categories
const categoryMapping: Record<string, { displayName: string; category: string; description: string }> = {
  'commercial': {
    displayName: 'COMMERCIAL DESIGN',
    category: 'Commercial Design',
    description: 'Commercial architecture is built around maximizing value — sellable area, revenue per square metre, return on investment. Every design decision is evaluated against those outcomes.'
  },
  'commercial-design': {
    displayName: 'COMMERCIAL DESIGN',
    category: 'Commercial Design',
    description: 'Commercial architecture is built around maximizing value — sellable area, revenue per square metre, return on investment. Every design decision is evaluated against those outcomes.'
  },
  'residential': {
    displayName: 'RESIDENTIAL DESIGN',
    category: 'Residential Design',
    description: 'We approach housing through modularity, construction efficiency, and economies of scale. Every project carries a strong concept and a distinct architectural identity — which is what gives a developer a real market advantage.'
  },
  'residential-design': {
    displayName: 'RESIDENTIAL DESIGN',
    category: 'Residential Design',
    description: 'We approach housing through modularity, construction efficiency, and economies of scale. Every project carries a strong concept and a distinct architectural identity — which is what gives a developer a real market advantage.'
  },
  'mixed-use': {
    displayName: 'MIXED-USE DESIGN',
    category: 'Mixed-use Design',
    description: 'Projects that span multiple typologies or resist easy classification. Whatever the brief, every project receives a strong concept and a clear architectural identity.'
  },
  'mixed-use-design': {
    displayName: 'MIXED-USE DESIGN',
    category: 'Mixed-use Design',
    description: 'Projects that span multiple typologies or resist easy classification. Whatever the brief, every project receives a strong concept and a clear architectural identity.'
  },
  'master-planning': {
    displayName: 'MASTER PLANNING',
    category: 'Master Planning',
    description: 'A master plan requires one strong concept capable of driving the entire development. We work macro to micro — establishing the system and logic first, then letting every subsequent decision follow from it.'
  },
  'explorations': {
    displayName: 'EXPLORATIONS',
    category: 'Explorations',
    description: 'Exploratory and academic work by Shaunak Mukherji. Projects built around ideas and positions rather than client briefs, communicating what the studio believes architecture should look like.'
  },
  'hospitality': {
    displayName: 'HOSPITALITY DESIGN',
    category: 'Hospitality Design',
    description: 'Through our connection with Bobby Mukherji Architects, we bring decades of institutional hospitality knowledge to every project — room count, brand standards, operator requirements, profitability. This is a technically demanding sector and we know it well.'
  },
  'hospitality-design': {
    displayName: 'HOSPITALITY DESIGN',
    category: 'Hospitality Design',
    description: 'Through our connection with Bobby Mukherji Architects, we bring decades of institutional hospitality knowledge to every project — room count, brand standards, operator requirements, profitability. This is a technically demanding sector and we know it well.'
  },
  'research-&-exploration': {
    displayName: 'RESEARCH & EXPLORATION',
    category: 'Research & Exploration',
    description: 'Exploratory and academic work by Shaunak Mukherji. Projects built around ideas and positions rather than client briefs, communicating what the studio believes architecture should look like.'
  },
  'research-exploration': {
    displayName: 'RESEARCH & EXPLORATION',
    category: 'Research & Exploration',
    description: 'Exploratory and academic work by Shaunak Mukherji. Projects built around ideas and positions rather than client briefs, communicating what the studio believes architecture should look like.'
  }
};

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function extractLocationFromTitle(title: string): string {
  // Try to extract location from common patterns
  const locationPatterns = [
    /,\s*([^,]+)$/, // "Project Name, Location"
    /—\s*([^—]+)$/, // "Project Name — Location"
    /in\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i, // "Project in Location"
  ];

  for (const pattern of locationPatterns) {
    const match = title.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // Default locations based on common patterns
  if (title.includes('Mumbai')) return 'Mumbai, India';
  if (title.includes('Guwahati')) return 'Guwahati, India';
  if (title.includes('Vrindavan')) return 'Vrindavan, India';
  if (title.includes('Maldives')) return 'Maldives';
  if (title.includes('UAQ') || title.includes('Umm Al Quwain')) return 'Umm Al Quwain, UAE';
  if (title.includes('Cambridge')) return 'West Cambridge, UK';
  if (title.includes('Bresso')) return 'Bresso, Italy';

  return 'India';
}

function extractYearFromFolder(folderName: string): string {
  // Try to extract year from folder name or default to current year
  const yearMatch = folderName.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return yearMatch[1];
  }
  return new Date().getFullYear().toString();
}

function readDescriptionFile(folderPath: string): { description: string; year?: string; location?: string } {
  const descPath = path.join(folderPath, 'description.md');
  if (!fs.existsSync(descPath)) {
    return { description: '' };
  }

  try {
    const content = fs.readFileSync(descPath, 'utf-8');
    const lines = content.split('\n');
    
    let description = '';
    let year: string | undefined;
    let location: string | undefined;

    // Extract overview/description
    let inOverview = false;
    for (const line of lines) {
      if (line.startsWith('## Overview')) {
        inOverview = true;
        continue;
      }
      if (line.startsWith('##') && inOverview) {
        break;
      }
      if (inOverview && line.trim() && !line.startsWith('[')) {
        description += line.trim() + ' ';
      }
    }

    // Extract year and location from Technical Details
    const yearMatch = content.match(/\*\*Year:\*\*\s*\[?(\d{4})\]?/);
    const locationMatch = content.match(/\*\*Location:\*\*\s*\[?([^\]]+)\]?/);

    if (yearMatch) year = yearMatch[1];
    if (locationMatch) location = locationMatch[1].trim();

    return {
      description: description.trim() || '',
      year,
      location
    };
  } catch (error) {
    console.warn(`Error reading description.md in ${folderPath}:`, error);
    return { description: '' };
  }
}

function findImages(folderPath: string): { main: string; gallery: string[] } {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = fs.readdirSync(folderPath);
  
  const images = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .sort();

  // Look for render-01.jpg, render-02.jpg, etc. or any numbered pattern
  const render01 = images.find(img => /render-01|main|cover|hero/i.test(img));
  const mainImage = render01 || images[0] || 'render-01.jpg';

  // Get gallery images (render-02, render-03, etc.)
  const galleryImages = images
    .filter(img => img !== mainImage && /render-(0[2-9]|[1-9]\d)|gallery|img/i.test(img))
    .slice(0, 5); // Limit to 5 gallery images

  return {
    main: mainImage,
    gallery: galleryImages
  };
}

function scanProjectsFolder(): { projects: ProjectData[]; services: ServiceData[] } {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  const projects: ProjectData[] = [];
  const categorySet = new Set<string>();

  if (!fs.existsSync(projectsDir)) {
    console.warn(`Projects directory not found: ${projectsDir}`);
    return { projects: [], services: [] };
  }

  // Get all category folders
  const categoryFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules')
    .map(dirent => dirent.name);

  let projectId = 1;

  // Scan each category folder
  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(projectsDir, categoryFolder);
    const categoryKey = categoryFolder.toLowerCase().replace(/\s+/g, '-');
    
    // Track this category
    categorySet.add(categoryKey);

    // Get all project folders within this category
    const projectFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const projectFolder of projectFolders) {
      const projectPath = path.join(categoryPath, projectFolder);
      const { main, gallery } = findImages(projectPath);
      const { description, year, location } = readDescriptionFile(projectPath);

      // Get category info
      const categoryInfo = categoryMapping[categoryKey] || {
        displayName: categoryFolder.toUpperCase().replace(/-/g, ' '),
        category: 'Commercial',
        description: `Projects in ${categoryFolder} category.`
      };

      // Extract location and year
      const projectLocation = location || extractLocationFromTitle(projectFolder);
      const projectYear = year || extractYearFromFolder(projectFolder);

      // Generate description if not found
      const projectDescription = description || 
        `A ${categoryInfo.category.toLowerCase()} project${projectLocation ? ` in ${projectLocation}` : ''} showcasing innovative design and architectural excellence.`;

      // Create project data
      const project: ProjectData = {
        id: `p${projectId++}`,
        title: projectFolder,
        category: categoryInfo.category,
        year: projectYear,
        location: projectLocation,
        description: projectDescription,
        imageUrl: `/images/projects/${categoryFolder}/${projectFolder}/${main}`,
        gallery: gallery.map(img => `/images/projects/${categoryFolder}/${projectFolder}/${img}`),
        isSignature: projectId <= 5 // First 4 projects are signature (after increment)
      };

      projects.push(project);
    }
  }

  // Generate services from categories
  const services: ServiceData[] = Array.from(categorySet)
    .map((categoryKey, index) => {
      const categoryInfo = categoryMapping[categoryKey] || {
        displayName: categoryKey.toUpperCase().replace(/-/g, ' '),
        category: 'Commercial',
        description: `Projects in ${categoryKey} category.`
      };

      return {
        id: toCamelCase(categoryKey),
        title: categoryInfo.displayName,
        categoryFilter: categoryInfo.category,
        description: categoryInfo.description,
        imageUrl: `/images/services/${categoryKey}.jpg`
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return { projects, services };
}

// Main execution
function generateProjectsData() {
  console.log('🔍 Scanning projects folder structure...');
  
  const { projects, services } = scanProjectsFolder();
  
  console.log(`✅ Found ${projects.length} projects across ${services.length} categories`);
  
  // Write projects data
  const outputDir = path.join(__dirname, '..', 'src', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const projectsPath = path.join(outputDir, 'projects.json');
  const servicesPath = path.join(outputDir, 'services.json');

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
  fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2), 'utf-8');

  console.log(`📝 Generated ${projectsPath}`);
  console.log(`📝 Generated ${servicesPath}`);
  console.log('✨ Done!');
}

generateProjectsData();




















