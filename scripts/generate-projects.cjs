const fs = require('fs');
const path = require('path');

// Map folder names to display names and categories
// Each folder gets its own unique category name for proper filtering
// This handles various folder name formats
function getCategoryInfo(folderName) {
  const normalized = folderName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  
  const mapping = {
    'commercial': {
      displayName: 'COMMERCIAL DESIGN',
      category: 'Commercial Design', // Unique category name
      description: 'Functional, inspiring environments for businesses to thrive. We design spaces that embody brand identity.'
    },
    'commercial-design': {
      displayName: 'COMMERCIAL DESIGN',
      category: 'Commercial Design', // Unique category name
      description: 'Functional, inspiring environments for businesses to thrive. We design spaces that embody brand identity.'
    },
    'residential': {
      displayName: 'RESIDENTIAL DESIGN',
      category: 'Residential Design', // Unique category name
      description: 'Custom homes that reflect your lifestyle and aspirations. We blend modern aesthetics with functional living spaces.'
    },
    'residential-design': {
      displayName: 'RESIDENTIAL DESIGN',
      category: 'Residential Design', // Unique category name
      description: 'Custom homes that reflect your lifestyle and aspirations. We blend modern aesthetics with functional living spaces.'
    },
    'mixed-use': {
      displayName: 'MIXED-USE DESIGN',
      category: 'Mixed-use Design', // Unique category name
      description: 'Integrated developments combining multiple uses into cohesive urban experiences that enhance community living.'
    },
    'mixed-use-design': {
      displayName: 'MIXED-USE DESIGN',
      category: 'Mixed-use Design', // Unique category name
      description: 'Integrated developments combining multiple uses into cohesive urban experiences that enhance community living.'
    },
    'master-planning': {
      displayName: 'MASTER PLANNING',
      category: 'Master Planning', // Unique category name
      description: 'Comprehensive master planning projects that create sustainable and integrated community developments.'
    },
    'explorations': {
      displayName: 'EXPLORATIONS',
      category: 'Explorations', // Unique category name
      description: 'Conceptual studies and experimental designs that push the boundaries of architectural innovation.'
    }
  };

  // If not found in mapping, create a unique category from folder name
  if (!mapping[normalized]) {
    // Convert folder name to a proper category name
    const categoryName = folderName
      .split(/[\s_-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return {
      displayName: folderName.toUpperCase().replace(/-/g, ' '),
      category: categoryName, // Unique category based on folder name
      description: `Projects in ${folderName} category.`
    };
  }

  return mapping[normalized];
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
  // First check for known locations in title
  if (title.includes('Mumbai')) return 'Mumbai, India';
  if (title.includes('Guwahati')) return 'Guwahati, India';
  if (title.includes('Vrindavan')) return 'Vrindavan, India';
  if (title.includes('Maldives')) return 'Maldives';
  if (title.includes('UAQ') || title.includes('Umm Al Quwain')) return 'Umm Al Quwain, UAE';
  if (title.includes('Cambridge')) return 'West Cambridge, UK';
  if (title.includes('Bresso')) return 'Bresso, Italy';
  if (title.includes('Kelavali')) return 'India';
  if (title.includes('Raheja')) return 'Mumbai, India';

  // Extract location from title patterns
  // Pattern: "Project Name, Location" or "Project Name — Location"
  const commaMatch = title.match(/,\s*([^,]+)$/);
  const dashMatch = title.match(/—\s*([^—]+)$/);
  
  let extracted = null;
  if (commaMatch) {
    extracted = commaMatch[1].trim();
  } else if (dashMatch) {
    extracted = dashMatch[1].trim();
  }
  
  // If we extracted a location, check if it needs a country
  if (extracted) {
    // If it already has a comma, it probably has country info
    if (extracted.includes(',')) {
      return extracted;
    }
    
    // Common Indian cities - add India
    const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Amritsar', 'Guwahati', 'Vrindavan'];
    if (indianCities.some(city => extracted.includes(city) || city.includes(extracted))) {
      return `${extracted}, India`;
    }
    // Default: assume India if no country specified
    return `${extracted}, India`;
  }

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

function readProjectConfig(folderPath) {
  const configPath = path.join(folderPath, 'project.json');
  if (!fs.existsSync(configPath)) {
    return {
      isSignature: false,
      signatureOrder: null,
      categoryOrder: null
    };
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(content);
    return {
      isSignature: config.isSignature === true,
      signatureOrder: typeof config.signatureOrder === 'number' ? config.signatureOrder : null,
      categoryOrder: typeof config.categoryOrder === 'number' ? config.categoryOrder : null
    };
  } catch (error) {
    console.warn(`Error reading project.json in ${folderPath}:`, error);
    return {
      isSignature: false,
      signatureOrder: null,
      categoryOrder: null
    };
  }
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
    // Parse line by line for more reliable extraction
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Extract location - must be on a line starting with "- **Location:**"
      if (trimmedLine.startsWith('- **Location:**')) {
        // SIMPLE: Just extract everything after "**Location:**" until end of THIS line only
        // Remove the prefix and take the rest
        location = trimmedLine.replace(/^-\s*\*\*Location:\*\*\s*/, '').trim();
        
        // CRITICAL: If location contains any markdown or next field indicators, stop immediately
        // Check for contamination markers
        if (location.includes('**') || 
            location.includes('Year') || 
            location.includes('Category') || 
            location.includes('##') ||
            location.includes('[') ||
            location.includes('Notes') ||
            location.includes('\n') ||
            location.length > 100) {
          // Extract only alphanumeric, spaces, commas, periods, hyphens - nothing else
          const cleanMatch = trimmedLine.match(/\*\*Location:\*\*\s*([A-Za-z0-9\s,.-]+)/);
          if (cleanMatch) {
            location = cleanMatch[1].trim();
          } else {
            location = null;
          }
        }
      }
      
      // Extract year (supports both "Year:" and "Year of Commission:" for backwards compatibility)
      // Must be on a line starting with "- **Year"
      if (trimmedLine.startsWith('- **Year') && !year) {
        const yearMatch = trimmedLine.match(/\*\*Year(?:\s+of\s+Commission)?:\*\*\s*\[?(\d{4})\]?/);
        if (yearMatch) {
          year = yearMatch[1];
        }
      }
    }

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
    });

  // Sort render images numerically (render-01, render-02, render-03, etc.)
  // This ensures proper ordering regardless of file extension
  const sortRenderImages = (a, b) => {
    const aMatch = a.match(/render-(\d+)/i);
    const bMatch = b.match(/render-(\d+)/i);
    
    if (aMatch && bMatch) {
      // Both are render images, sort by number
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    if (aMatch) return -1; // render images come first
    if (bMatch) return 1;
    return a.localeCompare(b); // Alphabetical for non-render images
  };

  const sortedImages = images.sort(sortRenderImages);

  // Find render-01 (or main/cover/hero) as main image
  const render01 = sortedImages.find(img => /render-01|main|cover|hero/i.test(img));
  const mainImage = render01 || sortedImages[0] || 'render-01.jpg';

  // Get gallery images (render-02, render-03, etc.) - sorted numerically
  const galleryImages = sortedImages
    .filter(img => {
      // Exclude main image and only include render-02, render-03, etc.
      if (img === mainImage) return false;
      const renderMatch = img.match(/render-(\d+)/i);
      if (renderMatch) {
        const num = parseInt(renderMatch[1]);
        return num >= 2; // Only render-02 and above
      }
      // Also include gallery/img named files
      return /gallery|img/i.test(img);
    })
    .slice(0, 10); // Allow up to 10 gallery images

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
      const { isSignature, signatureOrder, categoryOrder } = readProjectConfig(projectPath);

      // Get category info
      const categoryInfo = getCategoryInfo(categoryFolder);

      // Extract location and year
      let projectLocation = location;
      if (!projectLocation || projectLocation === '[Location]' || projectLocation.toLowerCase() === 'location') {
        projectLocation = extractLocationFromTitle(projectFolder);
        // Ensure location has country if it's a known city
        if (projectLocation && !projectLocation.includes(',')) {
          const knownCities = {
            'Guwahati': 'Guwahati, India',
            'Vrindavan': 'Vrindavan, India',
            'Mumbai': 'Mumbai, India'
          };
          if (knownCities[projectLocation]) {
            projectLocation = knownCities[projectLocation];
          } else if (projectLocation !== 'India' && projectLocation !== 'Maldives') {
            projectLocation = `${projectLocation}, India`;
          }
        }
      }
      
      const projectYear = year || extractYearFromFolder(projectFolder);

      // Generate description if not found or if it's a template
      let projectDescription = description;
      if (!projectDescription || 
          projectDescription.includes('[Add a brief') || 
          projectDescription.includes('[Describe') ||
          projectDescription.trim() === '') {
        projectDescription = `A ${categoryInfo.category.toLowerCase()} project${projectLocation ? ` in ${projectLocation}` : ''} showcasing innovative design and architectural excellence.`;
      }

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
        isSignature: isSignature,
        signatureOrder: signatureOrder,
        categoryOrder: categoryOrder
      };

      projects.push(project);
    }
  }

  // Generate services from categories
  // Use the actual category names from projects to ensure matching
  const categoryMap = new Map();
  
  // First, collect all unique categories from projects
  projects.forEach(project => {
    if (!categoryMap.has(project.category)) {
      // Find the folder that corresponds to this category
      const matchingFolder = categoryFolders.find(folder => {
        const info = getCategoryInfo(folder);
        return info.category === project.category;
      });
      
      if (matchingFolder) {
        const categoryInfo = getCategoryInfo(matchingFolder);
        categoryMap.set(project.category, {
          id: toCamelCase(matchingFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')),
          title: categoryInfo.displayName,
          categoryFilter: categoryInfo.category, // This must match project.category
          description: categoryInfo.description,
          imageUrl: `/images/services/${matchingFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')}.jpg`
        });
      }
    }
  });

  // Sort projects within each category by categoryOrder, then alphabetically
  const projectsByCategory = {};
  projects.forEach(project => {
    if (!projectsByCategory[project.category]) {
      projectsByCategory[project.category] = [];
    }
    projectsByCategory[project.category].push(project);
  });

  // Sort each category's projects
  Object.keys(projectsByCategory).forEach(category => {
    projectsByCategory[category].sort((a, b) => {
      // First sort by categoryOrder (if specified)
      if (a.categoryOrder !== null && b.categoryOrder !== null) {
        return a.categoryOrder - b.categoryOrder;
      }
      if (a.categoryOrder !== null) return -1;
      if (b.categoryOrder !== null) return 1;
      // Then alphabetically by title
      return a.title.localeCompare(b.title);
    });
  });

  // Flatten back to array, maintaining category order
  const sortedProjects = [];
  Object.keys(projectsByCategory).forEach(category => {
    sortedProjects.push(...projectsByCategory[category]);
  });

  // Sort signature projects by signatureOrder, then by title
  const signatureProjects = sortedProjects.filter(p => p.isSignature);
  const nonSignatureProjects = sortedProjects.filter(p => !p.isSignature);
  
  signatureProjects.sort((a, b) => {
    if (a.signatureOrder !== null && b.signatureOrder !== null) {
      return a.signatureOrder - b.signatureOrder;
    }
    if (a.signatureOrder !== null) return -1;
    if (b.signatureOrder !== null) return 1;
    return a.title.localeCompare(b.title);
  });

  // Convert map to array and sort
  const services = Array.from(categoryMap.values())
    .sort((a, b) => a.title.localeCompare(b.title));

  // Return projects with signature projects first (for homepage), then others
  return { 
    projects: [...signatureProjects, ...nonSignatureProjects], 
    services 
  };
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

// Watch mode for automatic regeneration
function watchProjects() {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  
  console.log('👀 Watching for changes in projects folder...');
  console.log('   Press Ctrl+C to stop watching\n');
  
  // Initial generation
  generateProjectsData();
  
  // Debounce timer to avoid multiple rapid regenerations
  let regenerateTimer = null;
  const debounceDelay = 500; // 500ms delay
  
  // Watch the projects directory recursively
  fs.watch(projectsDir, { recursive: true }, (eventType, filename) => {
    // Watch for ANY changes in the directory structure (including folder renames)
    if (filename) {
      // Clear existing timer
      if (regenerateTimer) {
        clearTimeout(regenerateTimer);
      }
      
      // Set new timer to debounce rapid changes
      regenerateTimer = setTimeout(() => {
        console.log(`\n🔄 Detected change: ${filename} (${eventType})`);
        console.log('   Regenerating projects data...\n');
        generateProjectsData();
      }, debounceDelay);
    }
  });
}

// Run if called directly
if (require.main === module) {
  // Check if --watch flag is passed
  const args = process.argv.slice(2);
  if (args.includes('--watch') || args.includes('-w')) {
    watchProjects();
  } else {
    generateProjectsData();
  }
}

module.exports = { generateProjectsData, watchProjects };
