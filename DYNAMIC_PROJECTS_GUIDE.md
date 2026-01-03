# Dynamic Projects System Guide

## Overview

Your website now automatically scans the `public/images/projects` folder structure and generates all projects and categories dynamically. **No manual editing of `constants.ts` required!**

## How It Works

1. **Folder Structure = Website Content**: The website reads directly from your folder structure
2. **Automatic Generation**: A script scans folders and generates TypeScript files
3. **Live Updates**: Add a new folder → Run `npm run generate` → It appears on the website!

## Adding a New Project

### Step 1: Create Project Folder
Create a new folder inside the appropriate category:
```
public/images/projects/
├── Commercial Design/
│   └── Your New Project/          ← Create this folder
│       ├── render-01.jpg          ← Main image (required)
│       ├── render-02.jpg          ← Gallery image (optional)
│       ├── render-03.jpg          ← Gallery image (optional)
│       └── description.md         ← Project description (optional)
```

### Step 2: Add Images
- **Main Image**: Name it `render-01.jpg` (or any image file - first one found will be used)
- **Gallery Images**: Name them `render-02.jpg`, `render-03.jpg`, etc.
- **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Recommended**: 4:3 aspect ratio, under 2MB each

### Step 3: Add Description (Optional)
Create `description.md` in your project folder:

```markdown
# Your Project Name

## Overview
Your project description here. This will appear on the project detail page.

## Technical Details
- **Year:** 2024
- **Location:** Mumbai, India
- **Status:** Completed
```

### Step 4: Regenerate Data
Run the generation script:
```bash
npm run generate
```

Or it will run automatically when you start the dev server:
```bash
npm run dev
```

**That's it!** Your new project will appear on the website.

## Adding a New Category

### Step 1: Create Category Folder
Create a new folder in `public/images/projects/`:
```
public/images/projects/
└── Your New Category/          ← Create this folder
    └── Project 1/
        └── render-01.jpg
```

### Step 2: Regenerate
Run `npm run generate` - the new category will automatically:
- Appear in the Services/Expertise section
- Be available for filtering projects
- Have its own category page

### Step 3: Customize Category Info (Optional)
Edit `scripts/generate-projects.cjs` and add your category to the `getCategoryInfo()` function:

```javascript
'your-category': {
  displayName: 'YOUR CATEGORY NAME',
  category: 'Commercial',  // or 'Residential', 'Interior'
  description: 'Your category description here.'
}
```

## Project Metadata

The system automatically extracts:

- **Title**: From folder name
- **Location**: Extracted from folder name or `description.md`
- **Year**: Extracted from folder name or `description.md`
- **Description**: From `description.md` Overview section, or auto-generated
- **Category**: Based on parent folder
- **Images**: Automatically finds all images in the folder

## Folder Structure Examples

### Commercial Project
```
Commercial Design/
└── Five-Star Hotel, Mumbai/
    ├── render-01.jpg
    ├── render-02.jpg
    ├── render-03.jpg
    └── description.md
```

### Residential Project
```
Residential Design/
└── Modern Villa, Goa/
    ├── render-01.jpg
    └── description.md
```

## Signature Projects

The first 4 projects found are automatically marked as "Signature Projects" (shown in the main portfolio section). To change this, edit `scripts/generate-projects.cjs` and modify the `isSignature` logic.

## Troubleshooting

### Projects Not Appearing?
1. Make sure you ran `npm run generate`
2. Check that images exist in the project folder
3. Verify folder structure matches the pattern above

### Wrong Category?
- Check the parent folder name matches a recognized category
- Or add your category to `getCategoryInfo()` in the script

### Images Not Loading?
- Ensure image files exist in the project folder
- Check file names (case-sensitive on some systems)
- Verify paths in generated `projects.ts` file

## Manual Override

If you need to manually edit a project:
1. Edit `generated/projects.ts` (but it will be overwritten on next generation)
2. Or modify `scripts/generate-projects.cjs` to change generation logic

## Development Workflow

1. **Add/Edit Projects**: Just add folders and images
2. **Regenerate**: Run `npm run generate` (or it runs automatically on `npm run dev`)
3. **View Changes**: Refresh your browser

The generation script runs automatically:
- Before `npm run dev` (via `predev` script)
- Before `npm run build` (via `prebuild` script)

## File Locations

- **Projects Folder**: `public/images/projects/`
- **Generation Script**: `scripts/generate-projects.cjs`
- **Generated Files**: `generated/projects.ts` and `generated/services.ts`
- **Constants**: `constants.ts` (imports from generated files)

## Notes

- The `generated/` folder is auto-created and contains TypeScript files
- These files are imported by `constants.ts`
- Don't manually edit generated files - they'll be overwritten
- The script handles missing images gracefully (uses placeholder paths)









