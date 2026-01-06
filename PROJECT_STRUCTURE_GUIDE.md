# Project Folder Structure Guide

## Overview

A complete folder structure has been created for organizing your architecture projects by category. Each project folder is ready to receive images and descriptions.

## Complete Folder Structure

```
public/images/projects/
│
├── README.md                    ← Main guide for projects folder
│
├── commercial/                  ← Commercial Projects (3 template projects)
│   ├── project-alpha/
│   │   ├── render-01.jpg       ← Place your 3 renders here (4:3 ratio)
│   │   ├── render-02.jpg
│   │   ├── render-03.jpg
│   │   ├── description.md      ← Project write-up template
│   │   └── README.md           ← Instructions for this folder
│   ├── confidential-development-a/
│   └── client-project-2024-001/
│
├── residential/                 ← Residential Projects (3 template projects)
│   ├── nda-residential-alpha/
│   ├── confidential-residence-beta/
│   └── project-gamma-residential/
│
├── master-planning/             ← Master Planning Projects (3 template projects)
│   ├── master-plan-alpha/
│   ├── confidential-planning-001/
│   └── planning-project-gamma/
│
├── mixed-use/                   ← Mixed-Use Projects (3 template projects)
│   ├── mixed-use-alpha/
│   ├── confidential-mixed-beta/
│   └── development-project-001/
│
└── explorations/                ← Exploratory/Concept Projects (3 template projects)
    ├── exploration-alpha/
    ├── concept-study-beta/
    └── research-project-gamma/
```

## Total Projects Created

- **15 template project folders** across 5 categories
- Each folder contains:
  - `description.md` - Template for project write-up
  - `README.md` - Instructions for adding images

## Categories

1. **Commercial** - Office buildings, retail spaces, commercial developments
2. **Residential** - Houses, apartments, residential complexes
3. **Master Planning** - Large-scale master planning projects
4. **Mixed Use** - Projects combining multiple uses
5. **Explorations** - Concept studies, research projects, experimental designs

## How to Use

### Step 1: Add Images
Place your 3 render images in each project folder:
- `render-01.jpg` - Main/preview image
- `render-02.jpg` - Second render
- `render-03.jpg` - Third render

**Critical:** All images must be in **4:3 aspect ratio** (e.g., 1600x1200px, 1920x1440px, 2400x1800px)

### Step 2: Edit Description
Open `description.md` in each project folder and add your project write-up.

### Step 3: Update constants.ts
Add projects to the `PROJECTS` array in `constants.ts`:

```typescript
{
  id: 'p7',
  title: 'Project Alpha',  // Or your actual project name
  category: 'Commercial',
  year: '2024',
  location: 'Location',
  description: 'Brief description...',
  imageUrl: '/images/projects/commercial/project-alpha/render-01.jpg',
  gallery: [
    '/images/projects/commercial/project-alpha/render-02.jpg',
    '/images/projects/commercial/project-alpha/render-03.jpg'
  ],
  isSignature: true  // Set to true to show in signature projects section
}
```

## NDA Project Naming

The template folders use NDA-appropriate naming conventions:
- `confidential-[category]-[identifier]`
- `client-project-[year]-[number]`
- `nda-[category]-[identifier]`
- `project-[code]`

You can rename folders to match your actual project names when ready.

## Image Specifications

- **Aspect Ratio:** 4:3 (required)
- **Format:** JPG (recommended) or PNG
- **File Size:** Under 2MB per image
- **Naming:** `render-01.jpg`, `render-02.jpg`, `render-03.jpg`

## Next Steps

1. Replace template project folders with your actual project names (or rename them)
2. Add your render images to each project folder
3. Edit the `description.md` files with your project write-ups
4. Update `constants.ts` to include your projects in the website

## Notes

- You can create additional project folders in any category as needed
- Each project folder is self-contained with its own images and description
- The website will display projects based on the `PROJECTS` array in `constants.ts`
- All paths should start with `/images/projects/[category]/[project-folder]/`

















