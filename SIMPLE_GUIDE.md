# Simple Guide: How to Add/Edit Images and Projects

## The Simplest Way Possible

### Step 1: Add Your Images
1. Open the `public/images/` folder in Windows Explorer
2. Put your images in the right folders:
   - `about/` - About section image
   - `projects/` - All project images
   - `services/` - Service images

### Step 2: Edit `constants.ts`
1. In Cursor, open `constants.ts` (press `Ctrl+P`, type "constants")
2. Find the image path you want to change
3. Replace the filename with YOUR image filename

**Example:**
```typescript
// Before:
imageUrl: '/images/about/about-hero.jpg'

// After (if your image is called "studio-photo.jpg"):
imageUrl: '/images/about/studio-photo.jpg'
```

### Step 3: Save and Refresh
- Save the file (`Ctrl+S`)
- Your browser will auto-refresh
- Done!

---

## Adding a New Project

1. **Add the images:**
   - Put your project images in `public/images/projects/`
   - Name them: `my-project-main.jpg`, `my-project-1.jpg`, etc.

2. **Add to `constants.ts`:**
   - Find the `PROJECTS` array
   - Copy an existing project object
   - Paste it and edit:
   ```typescript
   {
     id: 'p7', // Change this number
     title: 'My New Project', // Your project name
     category: 'Residential', // or 'Commercial' or 'Interior'
     year: '2024',
     location: 'Your City, Country',
     description: 'Your project description here.',
     imageUrl: '/images/projects/my-project-main.jpg', // Your main image
     gallery: ['/images/projects/my-project-1.jpg', '/images/projects/my-project-2.jpg'] // Gallery images
   }
   ```

3. **Save and refresh** - Your new project appears!

---

## Editing Existing Projects

1. Open `constants.ts`
2. Find the project in the `PROJECTS` array
3. Change whatever you want:
   - `title` - Project name
   - `description` - Project description
   - `imageUrl` - Main image path
   - `gallery` - Array of gallery image paths
   - `year`, `location`, `category` - Other details

4. Save and refresh

---

## Changing Service Images

1. Put your image in `public/images/services/`
2. Open `constants.ts`
3. Find `SERVICES` array
4. Update the `imageUrl`:
   ```typescript
   {
     id: 'res',
     title: 'RESIDENTIAL DESIGN',
     imageUrl: '/images/services/your-residential-image.jpg', // Change this
     // ...
   }
   ```

---

## Quick Tips

- **Image names**: Use lowercase, no spaces, use hyphens: `my-image.jpg`
- **File size**: Keep images under 2MB for fast loading
- **Formats**: JPG for photos, PNG if you need transparency
- **Path format**: Always starts with `/images/` then folder name, then filename

---

## That's It!

No database needed. No complicated setup. Just:
1. Put images in folders
2. Edit `constants.ts`
3. Save

You're done! 🎉



















