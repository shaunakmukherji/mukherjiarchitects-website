# How to Update Images in constants.ts

## Quick Steps

1. **Put your image** in the correct folder (e.g., `public/images/about/`)
2. **Open `constants.ts`** in Cursor
3. **Find the image path** you want to change
4. **Replace the filename** with YOUR image filename
5. **Save** (Ctrl+S)

---

## Example: About Section Image

### Step 1: You put an image in the about folder
- Let's say you added: `my-studio-photo.jpg` to `public/images/about/`

### Step 2: Open constants.ts
- Press `Ctrl+P` (or `Cmd+P` on Mac)
- Type "constants" and press Enter

### Step 3: Find the About section
Look for this code (around line 15):

```typescript
export const ABOUT_CONTENT: AboutContent = {
  imageUrl: '/images/about/about-hero.jpg', // ← Change this filename
  imageAlt: 'Architectural Detail',
  // ... rest of the code
};
```

### Step 4: Change the filename
Replace `about-hero.jpg` with YOUR filename:

```typescript
export const ABOUT_CONTENT: AboutContent = {
  imageUrl: '/images/about/my-studio-photo.jpg', // ← Changed to your filename
  imageAlt: 'Architectural Detail',
  // ... rest of the code
};
```

### Step 5: Save
- Press `Ctrl+S` to save
- Your browser will auto-refresh
- Done! ✅

---

## Other Examples

### Hero/Cover Image
```typescript
// Find this (around line 5):
export const HERO_IMAGE_URL = '/images/hero/hero-cover.jpg';

// Change to your filename:
export const HERO_IMAGE_URL = '/images/hero/my-hero-image.jpg';
```

### Logo
```typescript
// Find this (around line 8):
export const LOGO_URL = '/images/logo/logo.png';

// Change to your filename:
export const LOGO_URL = '/images/logo/my-logo.png';
```

### Projects
```typescript
// Find a project in the PROJECTS array:
{
  id: 'p1',
  title: 'The Vertex Loft',
  // ...
  imageUrl: '/images/projects/vertex-loft-main.jpg', // ← Change this
  gallery: ['/images/projects/vertex-loft-1.jpg', '/images/projects/vertex-loft-2.jpg'] // ← Change these too
}
```

### Services
```typescript
// Find a service in the SERVICES array:
{
  id: 'res',
  title: 'RESIDENTIAL DESIGN',
  // ...
  imageUrl: '/images/services/residential.jpg', // ← Change this
}
```

---

## Important Rules

1. **Path always starts with `/images/`** - Don't change this part
2. **Folder name** - Must match the folder (about, projects, services, hero, logo)
3. **Filename** - Must match EXACTLY (case-sensitive, including extension)
4. **No spaces** - Use hyphens: `my-image.jpg` ✅ (not `my image.jpg` ❌)

---

## Quick Reference

| What You Want to Change | Find This in constants.ts | Change This Part |
|------------------------|---------------------------|------------------|
| About section image | `ABOUT_CONTENT.imageUrl` | `/images/about/YOUR-FILENAME.jpg` |
| Hero/cover image | `HERO_IMAGE_URL` | `/images/hero/YOUR-FILENAME.jpg` |
| Logo | `LOGO_URL` | `/images/logo/YOUR-FILENAME.png` |
| Project image | `PROJECTS[].imageUrl` | `/images/projects/YOUR-FILENAME.jpg` |
| Service image | `SERVICES[].imageUrl` | `/images/services/YOUR-FILENAME.jpg` |

---

## Troubleshooting

**Image not showing?**
- Check the filename matches exactly (case-sensitive)
- Check the file extension (.jpg, .png, etc.)
- Make sure the image is in the correct folder
- Check the path starts with `/images/`

**Still not working?**
- Save the file (Ctrl+S)
- Refresh your browser
- Check the browser console for errors (F12)

---

## Visual Example

**Before:**
```typescript
imageUrl: '/images/about/about-hero.jpg'
```

**After (if your file is called `studio-photo.jpg`):**
```typescript
imageUrl: '/images/about/studio-photo.jpg'
```

That's it! Just change the filename part. 🎉



















