const fs = require('fs');
const path = require('path');

// Map folder names to display names and categories
// This handles various folder name formats
function getCategoryInfo(folderName) {
  const normalized = folderName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  
  const mapping = {
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

  return mapping[normalized] || {
    displayName: folderName.toUpperCase().replace(/-/g, ' '),
    category: folderName,
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

/**
 * Load the existing generated/projects.ts and build a lookup map by "title||category".
 * This lets the generator preserve manually-curated fields (description, credit,
 * isSignature, signatureOrder, categoryOrder, location) across re-runs.
 */
function loadExistingProjectsMap(outputDir) {
  const projectsPath = path.join(outputDir, 'projects.ts');
  if (!fs.existsSync(projectsPath)) return {};

  try {
    const content = fs.readFileSync(projectsPath, 'utf-8');
    // Extract the JSON array from the TS file
    const match = content.match(/export const PROJECTS[^=]*=\s*(\[[\s\S]*\]);[\s\n]*export default/);
    if (!match) return {};
    const existing = JSON.parse(match[1]);
    const map = {};
    for (const p of existing) {
      const key = `${p.title}||${p.category}`;
      map[key] = p;
    }
    console.log(`🔒 Loaded ${Object.keys(map).length} existing project(s) for description/credit preservation`);
    return map;
  } catch (e) {
    console.warn('⚠️  Could not parse existing projects.ts — descriptions will not be preserved this run:', e.message);
    return {};
  }
}

function scanProjectsFolder(existingMap = {}) {
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
      const { description: mdDescription, year: mdYear, location: mdLocation } = readDescriptionFile(projectPath);

      // Get category info
      const categoryInfo = getCategoryInfo(categoryFolder);

      // Check for existing curated data for this project
      const existingKey = `${projectFolder}||${categoryInfo.category}`;
      const existing = existingMap[existingKey] || null;

      // --- DESCRIPTION ---
      // Priority: description.md > existing curated > generic fallback
      const genericFallback = `A ${categoryInfo.category.toLowerCase()} project${mdLocation ? ` in ${mdLocation}` : ''} showcasing innovative design and architectural excellence.`;
      const projectDescription = mdDescription || (existing && existing.description) || genericFallback;

      // --- LOCATION / YEAR ---
      const projectLocation = mdLocation || (existing && existing.location) || extractLocationFromTitle(projectFolder);
      const projectYear     = mdYear     || (existing && existing.year)     || extractYearFromFolder(projectFolder);

      // --- ID --- preserve existing id so URLs/links don't break
      const projectId_str = existing ? existing.id : `p${projectId++}`;
      if (!existing) {} else { /* id reused, don't increment */ }

      // --- CURATED FIELDS --- preserve all manually-set fields from existing data
      const project = {
        id: projectId_str,
        title: projectFolder,
        category: categoryInfo.category,
        year: projectYear,
        location: projectLocation,
        description: projectDescription,
        imageUrl: `/images/projects/${categoryFolder}/${projectFolder}/${main}`,
        gallery: gallery.map(img => `/images/projects/${categoryFolder}/${projectFolder}/${img}`),
        // Preserve manual curation — fall back to auto-detect only for brand-new projects
        isSignature:    existing ? existing.isSignature    : false,
        signatureOrder: existing ? existing.signatureOrder : null,
        categoryOrder:  existing ? existing.categoryOrder  : null,
        ...(existing && existing.credit ? { credit: existing.credit } : {}),
      };

      projects.push(project);
    }
  }

  // Generate services from categories
  const services = Array.from(categorySet)
    .map((categoryFolder) => {
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

  // Output dir needed early so we can load existing data for preservation
  const outputDir = path.join(__dirname, '..', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load existing curated data BEFORE scanning so we can merge it in
  const existingMap = loadExistingProjectsMap(outputDir);

  const { projects, services } = scanProjectsFolder(existingMap);

  console.log(`✅ Found ${projects.length} projects across ${services.length} categories`);

  // Generate TypeScript files for better type safety and Vite compatibility
  const projectsTs = `// Auto-generated file — structural data (images, folders) is managed by scripts/generate-projects.js
// DESCRIPTIONS and CREDITS are manually curated — the generate script preserves them.
// To update descriptions, edit this file directly. To add new projects, run "npm run generate".

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




















