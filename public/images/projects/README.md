# Projects Folder Structure

This folder contains all project images organized by category. Each project has its own folder with renders and a description file.

## Folder Organization

```
projects/
├── commercial/              ← Commercial projects
│   ├── project-alpha/
│   ├── confidential-development-a/
│   └── client-project-2024-001/
├── residential/            ← Residential projects
│   ├── nda-residential-alpha/
│   ├── confidential-residence-beta/
│   └── project-gamma-residential/
├── master-planning/        ← Master planning projects
│   ├── master-plan-alpha/
│   ├── confidential-planning-001/
│   └── planning-project-gamma/
├── mixed-use/              ← Mixed-use development projects
│   ├── mixed-use-alpha/
│   ├── confidential-mixed-beta/
│   └── development-project-001/
└── explorations/           ← Exploratory/concept projects
    ├── exploration-alpha/
    ├── concept-study-beta/
    └── research-project-gamma/
```

## Project Folder Structure

Each project folder contains:

```
project-name/
├── render-01.jpg          ← Main render/preview image (4:3 aspect ratio)
├── render-02.jpg          ← Second render (4:3 aspect ratio)
├── render-03.jpg          ← Third render (4:3 aspect ratio)
├── description.md         ← Project write-up and details
└── README.md              ← Instructions for this project folder
```

## Adding a New Project

1. **Create a new folder** in the appropriate category directory
   - Use lowercase letters and hyphens (e.g., `my-new-project`)
   - For NDA projects, use generic names like `confidential-project-001` or `client-project-2024-002`

2. **Add your images** (3 renders recommended)
   - Name them: `render-01.jpg`, `render-02.jpg`, `render-03.jpg`
   - **Important:** All images must be in **4:3 aspect ratio**
   - Recommended sizes: 1600x1200px, 1920x1440px, or 2400x1800px
   - Keep file sizes under 2MB each for fast loading

3. **Create description.md**
   - Copy the template from any existing project folder
   - Fill in the project details and write-up

4. **Update constants.ts**
   - Add the project to the `PROJECTS` array
   - Use the path format: `/images/projects/[category]/[project-folder]/render-01.jpg`
   - Example: `/images/projects/commercial/project-alpha/render-01.jpg`

## Image Specifications

- **Aspect Ratio:** 4:3 (required for consistent visual appearance)
- **Format:** JPG (recommended) or PNG
- **File Size:** Under 2MB per image
- **Naming Convention:** `render-01.jpg`, `render-02.jpg`, `render-03.jpg`
- **Path Format:** `/images/projects/[category]/[project-folder]/render-01.jpg`

## Categories

- **Commercial** - Office buildings, retail spaces, commercial developments
- **Residential** - Houses, apartments, residential complexes
- **Master Planning** - Large-scale master planning projects
- **Mixed Use** - Projects combining multiple uses (residential + commercial, etc.)
- **Explorations** - Concept studies, research projects, experimental designs

## NDA Projects

For projects under NDA, use generic naming conventions:
- `confidential-[category]-[identifier]`
- `client-project-[year]-[number]`
- `nda-[category]-[identifier]`
- `project-[code]`

Example: `confidential-residential-alpha`, `client-project-2024-001`

## Notes

- You can rename any project folder to match your actual project names
- You can add more than 3 renders if needed (just update the gallery array in constants.ts)
- The description.md file supports Markdown formatting for rich text
- All paths in constants.ts should start with `/images/projects/`









