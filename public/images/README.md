# Images Folder Structure

## Folder Organization

```
public/images/
├── hero/           ← Hero/Cover page background image
├── logo/           ← Your logo PNG file
├── about/          ← About section images
├── projects/       ← All project images
└── services/       ← Service/Expertise section images
```

## How to Add Images

### 1. Hero/Cover Image
- Put your main cover image in `hero/` folder
- Name it: `hero-cover.jpg` (or update path in `constants.ts`)
- Recommended size: 1920x1080px or larger
- This appears behind the main text on the homepage

### 2. Logo
- Put your logo PNG in `logo/` folder
- Name it: `logo.png` (or update path in `constants.ts`)
- Recommended: Transparent background PNG
- Size: Any size (will auto-scale), but 200-400px wide is ideal

### 3. About Section
- Put images in `about/` folder
- Update `constants.ts` → `ABOUT_CONTENT.imageUrl`

### 4. Projects
- Put all project images in `projects/` folder
- Name them descriptively: `project-name-main.jpg`, `project-name-1.jpg`, etc.
- Update `constants.ts` → `PROJECTS` array
- Set `isSignature: true` for projects you want in "Our Signature Projects"

### 5. Services
- Put service images in `services/` folder
- Name them: `residential.jpg`, `commercial.jpg`, `interior.jpg`
- Update `constants.ts` → `SERVICES` array

## Image Tips

- **Format**: JPG for photos, PNG for logos/graphics with transparency
- **Size**: Keep under 2MB each for fast loading
- **Naming**: Use lowercase, no spaces, use hyphens: `my-project.jpg`
- **Path format**: Always starts with `/images/` then folder name, then filename

## Example Paths

```typescript
// Hero image
'/images/hero/hero-cover.jpg'

// Logo
'/images/logo/logo.png'

// Project
'/images/projects/vertex-loft-main.jpg'

// Service
'/images/services/residential.jpg'
```

## Signature Projects

In `constants.ts`, mark projects as signature projects:
```typescript
{
  id: 'p1',
  title: 'My Project',
  // ... other fields
  isSignature: true  // ← This makes it show in "Our Signature Projects"
}
```

Only projects with `isSignature: true` will appear in the Portfolio section on the homepage.


















