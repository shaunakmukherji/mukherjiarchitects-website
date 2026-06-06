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

  // If not found in mapping, create a unique category from folder name
  if (!mapping[normalized]) {
    const categoryName = folderName
      .split(/[\s_-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return {
      displayName: folderName.toUpperCase().replace(/-/g, ' '),
      category: categoryName,
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

/** Special folder inside each category — move any project folder here to make it the service hero. */
const CATEGORY_HERO_FOLDER = '_hero';

/** Root-level _hero folder — drop one project folder here to drive the landing page hero image. */
const SITE_HERO_FOLDER = '_hero';

function getSiteHeroImageUrl() {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  const heroDir = path.join(projectsDir, SITE_HERO_FOLDER);

  if (!fs.existsSync(heroDir)) return null;

  const projectFolders = fs.readdirSync(heroDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'));

  if (projectFolders.length === 0) return null;

  // Use the first project folder found
  const projectPath = path.join(heroDir, projectFolders[0].name);
  const { main } = findImages(projectPath);

  if (!main) return null;

  // Build the public URL path
  const rel = path.relative(
    path.join(__dirname, '..', 'public'),
    path.join(projectPath, main)
  ).replace(/\\/g, '/');

  return `/${rel}`;
}

/**
 * Folder names may use "0. Project Name", "1. Other", … for sort + section hero (0 = first/cover).
 * Display title must not show the numeric prefix.
 */
function parseFolderNameMeta(folderName) {
  const m = String(folderName).match(/^(\d+)\.\s+(.+)$/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (!Number.isNaN(n)) {
      return { categoryOrder: n, displayTitle: m[2].trim() };
    }
  }
  return { categoryOrder: null, displayTitle: String(folderName).trim() };
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
    return { description: '', year: null, location: null, credit: null };
  }

  try {
    const content = fs.readFileSync(descPath, 'utf-8');
    const lines = content.split('\n');

    let description = '';
    let year = null;
    let location = null;
    let credit = null;

    let currentSection = null;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Section headers
      if (trimmedLine.startsWith('## ')) {
        currentSection = trimmedLine.replace(/^## /, '').trim();
        continue;
      }

      // ── Overview ──
      if (currentSection === 'Overview') {
        if (trimmedLine && !trimmedLine.startsWith('[') && !trimmedLine.startsWith('-')) {
          description += trimmedLine + ' ';
        }
      }

      // ── Technical Details ──
      if (currentSection === 'Technical Details') {
        if (trimmedLine.startsWith('- **Location:**')) {
          let loc = trimmedLine.replace(/^-\s*\*\*Location:\*\*\s*/, '').trim();
          // Strip any stray markdown or contamination
          if (loc.includes('**') || loc.includes('[') || loc.length > 100) {
            const m = trimmedLine.match(/\*\*Location:\*\*\s*([A-Za-z0-9\s,.\-]+)/);
            loc = m ? m[1].trim() : null;
          }
          if (loc && loc !== '[Location]' && loc.toLowerCase() !== 'location') {
            location = loc;
          }
        }
        if (trimmedLine.startsWith('- **Year') && !year) {
          const m = trimmedLine.match(/\*\*Year(?:\s+of\s+Commission)?:\*\*\s*\[?(\d{4})\]?/);
          if (m) year = m[1];
        }
      }

      // ── Credit ──
      if (currentSection === 'Credit') {
        if (!credit) credit = {};
        if (trimmedLine.startsWith('- **Name:**')) {
          credit.name = trimmedLine.replace(/^-\s*\*\*Name:\*\*\s*/, '').trim();
        }
        if (trimmedLine.startsWith('- **Link:**')) {
          const val = trimmedLine.replace(/^-\s*\*\*Link:\*\*\s*/, '').trim();
          if (val) credit.linkTo = val;
        }
        if (trimmedLine.startsWith('- **Institution:**')) {
          const val = trimmedLine.replace(/^-\s*\*\*Institution:\*\*\s*/, '').trim();
          if (val) credit.institution = val;
        }
      }
    }

    // Discard empty/incomplete credit objects
    if (credit && !credit.name) credit = null;

    return {
      description: description.trim() || '',
      year,
      location,
      credit,
    };
  } catch (error) {
    console.warn(`Error reading description.md in ${folderPath}:`, error);
    return { description: '', year: null, location: null, credit: null };
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

function listCategoryProjectFolders(categoryPath, categoryLabel) {
  const entries = [];
  const heroFolderNames = new Set();

  const heroContainer = path.join(categoryPath, CATEGORY_HERO_FOLDER);
  if (fs.existsSync(heroContainer)) {
    try {
      const heroFolders = fs
        .readdirSync(heroContainer, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'));

      for (const dirent of heroFolders) {
        heroFolderNames.add(dirent.name);
        entries.push({
          folderName: dirent.name,
          storagePath: `${CATEGORY_HERO_FOLDER}/${dirent.name}`,
          isCategoryHero: true,
        });
      }
    } catch (error) {
      console.warn(`Error reading ${heroContainer}:`, error);
    }
  }

  try {
    const rootFolders = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isDirectory() &&
          !dirent.name.startsWith('.') &&
          dirent.name !== CATEGORY_HERO_FOLDER
      );

    for (const dirent of rootFolders) {
      if (heroFolderNames.has(dirent.name)) {
        console.warn(
          `⚠️  Skipping duplicate "${dirent.name}" at category root — it already lives in _hero/. ` +
            `Delete "${path.join(categoryLabel, dirent.name)}" (move, don't copy).`
        );
        continue;
      }

      entries.push({
        folderName: dirent.name,
        storagePath: dirent.name,
        isCategoryHero: false,
      });
    }
  } catch (error) {
    console.warn(`Error reading category folder ${categoryPath}:`, error);
  }

  return entries;
}

function getCategoryHeroImageUrl(projects, category) {
  const sorted = projects
    .filter((project) => project.category === category)
    .sort((a, b) => {
      const ao = a.categoryOrder ?? 9999;
      const bo = b.categoryOrder ?? 9999;
      if (ao !== bo) return ao - bo;
      return (a.title || '').localeCompare(b.title || '');
    });

  const hero = sorted[0];
  // Only return an image if a project was explicitly designated as hero (lives in _hero/ folder)
  if (hero?.categoryOrder === 0) return hero.imageUrl || null;
  return null;
}

/**
 * Load the existing generated/projects.ts and build a lookup map keyed by "title||category".
 * Used to preserve manually-curated fields (description, credit, location, id)
 * across re-runs of the generator.
 */
/**
 * Extract the top-level JSON array from a TypeScript const assignment.
 * Uses bracket counting instead of regex so nested structures don't confuse it.
 */
function extractJsonArray(content) {
  const assignIdx = content.indexOf('export const PROJECTS');
  if (assignIdx === -1) return null;
  const start = content.indexOf('[', assignIdx);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) return content.slice(start, i + 1);
    }
  }
  return null;
}

function loadExistingProjectsMap(outputDir) {
  const projectsPath = path.join(outputDir, 'projects.ts');
  if (!fs.existsSync(projectsPath)) return {};

  try {
    const content = fs.readFileSync(projectsPath, 'utf-8');
    const jsonStr = extractJsonArray(content);
    if (!jsonStr) {
      console.warn('⚠️  Could not locate PROJECTS array in existing projects.ts — descriptions will not be preserved this run');
      return {};
    }
    const existing = JSON.parse(jsonStr);
    const map = {};
    for (const p of existing) {
      const key = `${p.title}||${p.category}`;
      map[key] = p;
    }
    console.log(`🔒 Preserving curated data for ${Object.keys(map).length} existing project(s)`);
    return map;
  } catch (e) {
    console.warn('⚠️  Could not parse existing projects.ts — manual descriptions may not be preserved this run:', e.message);
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
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.startsWith('_') && dirent.name !== 'node_modules')
    .map(dirent => dirent.name);

  let projectId = 1;

  // Scan each category folder
  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(projectsDir, categoryFolder);
    const categoryKey = categoryFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
    
    // Track this category (store original folder name for reference)
    categorySet.add(categoryFolder);

    const projectEntries = listCategoryProjectFolders(categoryPath, categoryFolder);

    for (const entry of projectEntries) {
      const { folderName, storagePath, isCategoryHero } = entry;
      const projectPath = path.join(categoryPath, storagePath);
      const { main, gallery } = findImages(projectPath);
      const { description, year, location, credit: mdCredit } = readDescriptionFile(projectPath);
      const { isSignature, signatureOrder, categoryOrder: configCategoryOrder } = readProjectConfig(projectPath);
      const { categoryOrder: orderFromFolder, displayTitle } = parseFolderNameMeta(folderName);
      // Priority: _hero/ folder (0) → "N. " folder prefix → project.json categoryOrder
      let categoryOrder = null;
      if (isCategoryHero) {
        categoryOrder = 0;
      } else if (orderFromFolder !== null) {
        categoryOrder = orderFromFolder;
      } else if (typeof configCategoryOrder === 'number') {
        categoryOrder = configCategoryOrder;
      }

      // Get category info
      const categoryInfo = getCategoryInfo(categoryFolder);

      // Extract location and year
      let projectLocation = location;
      if (!projectLocation || projectLocation === '[Location]' || projectLocation.toLowerCase() === 'location') {
        projectLocation = extractLocationFromTitle(displayTitle);
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
      
      const projectYear = year || extractYearFromFolder(folderName);

      // --- Check for existing curated data (keyed by displayTitle + category) ---
      const existingKey = `${displayTitle}||${categoryInfo.category}`;
      const existing = existingMap[existingKey] || null;

      // --- DESCRIPTION ---
      // Priority: description.md > existing curated (manually written) > generic fallback
      const genericFallback = `A ${categoryInfo.category.toLowerCase()} project${projectLocation ? ` in ${projectLocation}` : ''} showcasing innovative design and architectural excellence.`;
      let projectDescription = description;
      if (!projectDescription ||
          projectDescription.includes('[Add a brief') ||
          projectDescription.includes('[Describe') ||
          projectDescription.trim() === '') {
        // No description.md — use existing curated description if available
        projectDescription = (existing && existing.description) || genericFallback;
      }

      // --- LOCATION --- prefer manually-curated if description.md didn't supply one
      if (!location && existing && existing.location) {
        projectLocation = existing.location;
      }

      // --- ID --- preserve existing id so links/routes don't break
      const projectIdStr = (existing && existing.id) ? existing.id : `p${projectId++}`;

      // Create project data (title = display only; folder may still use "0. Name" for filesystem ordering)
      const project = {
        id: projectIdStr,
        title: displayTitle,
        category: categoryInfo.category,
        year: projectYear,
        location: projectLocation,
        description: projectDescription,
        imageUrl: `/images/projects/${categoryFolder}/${storagePath}/${main}`,
        gallery: gallery.map(img => `/images/projects/${categoryFolder}/${storagePath}/${img}`),
        isSignature: isSignature,
        signatureOrder: signatureOrder,
        categoryOrder: categoryOrder,
        // Credit: description.md wins, then existing curated, then nothing
        ...(mdCredit ? { credit: mdCredit } : existing && existing.credit ? { credit: existing.credit } : {}),
      };

      projects.push(project);
    }
  }

  // Load descriptions from the external JSON file (source of truth — edit service-descriptions.json to change copy)
  const descriptionsPath = path.join(__dirname, '..', 'service-descriptions.json');
  const serviceDescriptions = fs.existsSync(descriptionsPath)
    ? JSON.parse(fs.readFileSync(descriptionsPath, 'utf-8'))
    : {};

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
        const fallbackServiceImage = `/images/services/${matchingFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')}.jpg`;
        // Use the external descriptions file if available, otherwise fall back to script description
        const description = serviceDescriptions[categoryInfo.category] || categoryInfo.description;

        categoryMap.set(project.category, {
          id: toCamelCase(matchingFolder.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')),
          title: categoryInfo.displayName,
          categoryFilter: categoryInfo.category,
          description,
          imageUrl: fallbackServiceImage,
          matchingFolder,
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

  // Point each service image at the category hero project (if one exists)
  for (const service of categoryMap.values()) {
    const heroImageUrl = getCategoryHeroImageUrl(projects, service.categoryFilter);
    if (heroImageUrl) {
      service.imageUrl = heroImageUrl;
    }
    delete service.matchingFolder;
  }

  // Convert map to array and sort
  const services = Array.from(categoryMap.values())
    .sort((a, b) => a.title.localeCompare(b.title));

  // Return projects with signature projects first (for homepage), then others
  return { 
    projects: [...signatureProjects, ...nonSignatureProjects], 
    services 
  };
}

function scanDirForImages(dirPath, urlBase, versions) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      scanDirForImages(path.join(dirPath, entry.name), `${urlBase}/${entry.name}`, versions);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const filePath = path.join(dirPath, entry.name);
      const mtime = Math.floor(fs.statSync(filePath).mtimeMs);
      const urlPath = `${urlBase}/${entry.name}`;
      const basePath = urlPath.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      versions[urlPath] = mtime;
      versions[basePath] = mtime;
    }
  }
}

function generateAboutImageVersions() {
  const publicDir = path.join(__dirname, '..', 'public');
  const aboutDir = path.join(publicDir, 'images', 'about');
  const projectsDir = path.join(publicDir, 'images', 'projects');
  const outputDir = path.join(__dirname, '..', 'generated');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const versions = {};

  scanDirForImages(aboutDir, '/images/about', versions);
  scanDirForImages(projectsDir, '/images/projects', versions);

  const versionsTs = `// Auto-generated file - do not edit manually
// Regenerated when about or project images change or when you run "npm run generate"

export const ABOUT_IMAGE_VERSIONS: Record<string, number> = ${JSON.stringify(versions, null, 2)};
`;

  const versionsPath = path.join(outputDir, 'about-image-versions.ts');
  fs.writeFileSync(versionsPath, versionsTs, 'utf-8');
  console.log(`📝 Generated ${versionsPath}`);

  return versions;
}

// Main execution
function generateProjectsData() {
  console.log('🔍 Scanning projects folder structure...');

  // Output dir needed early so we can load existing curated data for preservation
  const outputDir = path.join(__dirname, '..', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load existing curated data BEFORE scanning — descriptions and credits are preserved
  const existingMap = loadExistingProjectsMap(outputDir);

  const { projects, services } = scanProjectsFolder(existingMap);

  console.log(`✅ Found ${projects.length} projects across ${services.length} categories`);

  // Generate TypeScript files for better type safety and Vite compatibility
  const projectsTs = `// Auto-generated file — structural data (images, folders) managed by scripts/generate-projects.cjs
// DESCRIPTIONS and CREDITS are manually curated — the generate script preserves them on every run.
// To update descriptions/credits, edit this file directly. To pick up new project images, run "npm run generate".

import { Project } from '../types';

export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export default PROJECTS;
`;

  // Load existing services for description preservation (same principle as projects)
  const existingServicesPath = path.join(outputDir, 'services.ts');
  let existingServiceDescriptions = {};
  if (fs.existsSync(existingServicesPath)) {
    try {
      const existingContent = fs.readFileSync(existingServicesPath, 'utf-8');
      const startIdx = existingContent.indexOf('export const SERVICES');
      const bracketStart = existingContent.indexOf('[', startIdx);
      if (bracketStart !== -1) {
        let depth = 0, endIdx = bracketStart;
        for (let i = bracketStart; i < existingContent.length; i++) {
          if (existingContent[i] === '[') depth++;
          else if (existingContent[i] === ']') { depth--; if (depth === 0) { endIdx = i; break; } }
        }
        const existingServices = JSON.parse(existingContent.slice(bracketStart, endIdx + 1));
        for (const s of existingServices) {
          existingServiceDescriptions[s.categoryFilter] = s.description;
        }
      }
    } catch (e) { /* ignore parse errors, use freshly generated descriptions */ }
  }

  // For each service, prefer: service-descriptions.json > existing curated > generated fallback
  // This means a stale watch process can never overwrite a good description with a generic one
  const GENERIC_PATTERNS = ['Projects in ', 'projects in ', 'showcasing innovative'];
  const isGeneric = (str) => !str || GENERIC_PATTERNS.some(p => str.includes(p));

  const mergedServices = services.map(s => {
    const existing = existingServiceDescriptions[s.categoryFilter];
    // Only use existing if the freshly-generated one is generic/bad
    const finalDesc = isGeneric(s.description) && existing && !isGeneric(existing)
      ? existing
      : s.description;
    return { ...s, description: finalDesc };
  });

  const servicesTs = `// Auto-generated file - do not edit manually
// This file is generated by scripts/generate-projects.cjs
// Category descriptions are sourced from service-descriptions.json — edit that file to change them.

import { Service } from '../types';

export const SERVICES: Service[] = ${JSON.stringify(mergedServices, null, 2)};

export default SERVICES;
`;

  const projectsPath = path.join(outputDir, 'projects.ts');
  const servicesPath = path.join(outputDir, 'services.ts');

  const siteHeroUrl = getSiteHeroImageUrl();
  const siteHeroTs = `// Auto-generated file - do not edit manually
// Drop a project folder inside public/images/projects/_hero/ to set the landing page hero image.
// Run "npm run generate" to regenerate.

export const SITE_HERO_IMAGE_URL: string | null = ${JSON.stringify(siteHeroUrl)};
`;

  // Team images — scan public/images/about/People/, skip archive subfolders
  const peopleDir = path.join(__dirname, '..', 'public', 'images', 'about', 'People');
  const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
  let teamImageUrls = [];
  if (fs.existsSync(peopleDir)) {
    const entries = fs.readdirSync(peopleDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) continue; // skip archive/ and any other subfolder
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;
      teamImageUrls.push(`/images/about/People/${entry.name}`);
    }
    teamImageUrls.sort();
  }
  const teamImagesTs = `// Auto-generated file - do not edit manually
// This file is generated by scripts/generate-projects.cjs
// Add images to public/images/about/People/ and re-run "npm run generate" to update.
// Files inside any "archive" subfolder are ignored.

export const TEAM_IMAGES: string[] = ${JSON.stringify(teamImageUrls, null, 2)};
`;
  const teamImagesPath = path.join(outputDir, 'teamImages.ts');
  fs.writeFileSync(teamImagesPath, teamImagesTs, 'utf-8');

  fs.writeFileSync(projectsPath, projectsTs, 'utf-8');
  fs.writeFileSync(servicesPath, servicesTs, 'utf-8');
  fs.writeFileSync(path.join(outputDir, 'site-hero.ts'), siteHeroTs, 'utf-8');

  console.log(`📝 Generated ${projectsPath}`);
  console.log(`📝 Generated ${servicesPath}`);
  console.log(`📝 Generated ${teamImagesPath} (${teamImageUrls.length} team image(s))`);
  console.log(`📝 Generated ${path.join(outputDir, 'site-hero.ts')}${siteHeroUrl ? ` → ${siteHeroUrl}` : ' (no hero set)'}`);
  generateAboutImageVersions();
  console.log('✨ Done!');
  
  return { projects, services };
}

// Watch mode for automatic regeneration
function watchProjects() {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  const aboutDir = path.join(__dirname, '..', 'public', 'images', 'about');
  
  console.log('👀 Watching for changes in projects and about image folders...');
  console.log('   Press Ctrl+C to stop watching\n');
  
  // Initial generation
  generateProjectsData();
  
  // Debounce timer to avoid multiple rapid regenerations
  let projectsTimer = null;
  let aboutTimer = null;
  const debounceDelay = 500; // 500ms delay
  
  // Watch the projects directory recursively
  fs.watch(projectsDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
      if (projectsTimer) {
        clearTimeout(projectsTimer);
      }
      
      projectsTimer = setTimeout(() => {
        console.log(`\n🔄 Detected project change: ${filename} (${eventType})`);
        console.log('   Regenerating projects data...\n');
        generateProjectsData();
      }, debounceDelay);
    }
  });

  if (fs.existsSync(aboutDir)) {
    fs.watch(aboutDir, { recursive: true }, (eventType, filename) => {
      if (filename) {
        if (aboutTimer) {
          clearTimeout(aboutTimer);
        }

        aboutTimer = setTimeout(() => {
          console.log(`\n🔄 Detected about image change: ${filename} (${eventType})`);
          console.log('   Regenerating...\n');
          generateProjectsData();
        }, debounceDelay);
      }
    });
  }
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

module.exports = { generateProjectsData, generateAboutImageVersions, watchProjects };
