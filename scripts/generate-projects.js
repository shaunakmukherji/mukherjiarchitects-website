const fs = require('fs');
const path = require('path');

// Map folder names to display names and categories
// This handles various folder name formats
function getCategoryInfo(folderName) {
  const normalized = folderName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  
  const mapping = {
    'commercial': {
      displayName: 'COMMERCIAL DESIGN',
      category: 'Commercial',
      description: 'Functional, inspiring environments for businesses to thrive. We design spaces that embody brand identity.'
    },
    'commercial-design': {
      displayName: 'COMMERCIAL DESIGN',
      category: 'Commercial',
      description: 'Functional, inspiring environments for businesses to thrive. We design spaces that embody brand identity.'
    },
    'residential': {
      displayName: 'RESIDENTIAL DESIGN',
      category: 'Residential',
      description: 'Custom homes that reflect your lifestyle and aspirations. We blend modern aesthetics with functional living spaces.'
    },
    'residential-design': {
      displayName: 'RESIDENTIAL DESIGN',
      category: 'Residential',
      description: 'Custom homes that reflect your lifestyle and aspirations. We blend modern aesthetics with functional living spaces.'
    },
    'mixed-use': {
      displayName: 'MIXED-USE DESIGN',
      category: 'Commercial',
      description: 'Integrated developments combining multiple uses into cohesive urban experiences that enhance community living.'
    },
    'mixed-use-design': {
      displayName: 'MIXED-USE DESIGN',
      category: 'Commercial',
      description: 'Integrated developments combining multiple uses into cohesive urban experiences that enhance community living.'
    },
    'master-planning': {
      displayName: 'MASTER PLANNING',
      category: 'Commercial',
      description: 'Comprehensive master planning projects that create sustainable and integrated community developments.'
    },
    'master-planning': {
      displayName: 'MASTER PLANNING',
      category: 'Commercial',
      description: 'Comprehensive master planning projects that create sustainable and integrated community developments.'
    },
    'explorations': {
      displayName: 'EXPLORATIONS',
      category: 'Commercial',
      description: 'Conceptual studies and experimental designs that push the boundaries of architectural innovation.'
    }
  };

  return mapping[normalized] || {
    displayName: folderName.toUpperCase().replace(/-/g, ' '),
    category: 'Commercial',
    description: `Projects in ${folderName} category.`
  };
}

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/-/g, '');
}

function extractLocationFromTitle(title) {
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
  if (title.includes('Kelavali')) return 'India';

  return 'India';
}

function extractYearFromFolder(folderName) {
  // Try to extract year from folder name or default to current year
  const yearMatch = folderName.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return yearMatch[1];
  }
  return new Date().getFullYear().toString();
}

function readDescriptionFile(folderPath) {
  const descPath = path.join(folderPath, 'description.md');
  if (!fs.existsSync(descPath)) {
    return { description: '', year: null, location: null };
  }

  try {
    const content = fs.readFileSync(descPath, 'utf-8');
    const lines = content.split('\n');
    
    let description = '';
    let year = null;
    let location = null;

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
      if (inOverview && line.trim() && !line.startsWith('[') && !line.startsWith('-')) {
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
    return { description: '', year: null, location: null };
  }
}

function findImages(folderPath) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  let files = [];
  
  try {
    files = fs.readdirSync(folderPath);
  } catch (error) {
    console.warn(`Error reading directory ${folderPath}:`, error);
    return { main: 'render-01.jpg', gallery: [] };
  }
  
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

function scanProjectsFolder() {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  const projects = [];
  const categorySet = new Set();

  if (!fs.existsSync(projectsDir)) {
    console.warn(`Projects directory not found: ${projectsDir}`);
    return { projects: [], services: [] };
  }

  // Get all category folders
  const categoryFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name);

  let projectId = 1;

  // Scan each category folder
  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(projectsDir, categoryFolder);
    const categoryKey = categoryFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
    
    // Track this category (store original folder name for reference)
    categorySet.add(categoryFolder);

    // Get all project folders within this category
    let projectFolders = [];
    try {
      projectFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (error) {
      console.warn(`Error reading category folder ${categoryPath}:`, error);
      continue;
    }

    for (const projectFolder of projectFolders) {
      const projectPath = path.join(categoryPath, projectFolder);
      const { main, gallery } = findImages(projectPath);
      const { description, year, location } = readDescriptionFile(projectPath);

      // Get category info
      const categoryInfo = getCategoryInfo(categoryFolder);

      // Extract location and year
      const projectLocation = location || extractLocationFromTitle(projectFolder);
      const projectYear = year || extractYearFromFolder(projectFolder);

      // Generate description if not found
      const projectDescription = description || 
        `A ${categoryInfo.category.toLowerCase()} project${projectLocation ? ` in ${projectLocation}` : ''} showcasing innovative design and architectural excellence.`;

      // Create project data
      const project = {
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
  const services = Array.from(categorySet)
    .map((categoryFolder, index) => {
      const categoryKey = categoryFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
      const categoryInfo = getCategoryInfo(categoryFolder);

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
  
  // Write projects data to generated folder (at root level for easier imports)
  const outputDir = path.join(__dirname, '..', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate TypeScript files for better type safety and Vite compatibility
  const projectsTs = `// Auto-generated file - do not edit manually
// This file is generated by scripts/generate-projects.js
// Run "npm run generate" to regenerate

import { Project } from '../types';

export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export default PROJECTS;
`;

  const servicesTs = `// Auto-generated file - do not edit manually
// This file is generated by scripts/generate-projects.js
// Run "npm run generate" to regenerate

import { Service } from '../types';

export const SERVICES: Service[] = ${JSON.stringify(services, null, 2)};

export default SERVICES;
`;

  const projectsPath = path.join(outputDir, 'projects.ts');
  const servicesPath = path.join(outputDir, 'services.ts');

  fs.writeFileSync(projectsPath, projectsTs, 'utf-8');
  fs.writeFileSync(servicesPath, servicesTs, 'utf-8');

  console.log(`📝 Generated ${projectsPath}`);
  console.log(`📝 Generated ${servicesPath}`);
  console.log('✨ Done!');
  
  return { projects, services };
}

// Run if called directly
if (require.main === module) {
  generateProjectsData();
}

module.exports = { generateProjectsData };


















