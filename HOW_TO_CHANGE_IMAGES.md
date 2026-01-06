# How to Change Images in Cursor

## Quick Method (No Database Required)

### Step 1: Open `constants.ts`
- In Cursor, press `Ctrl+P` (or `Cmd+P` on Mac)
- Type `constants.ts` and press Enter

### Step 2: Find the Image You Want to Change

#### For About Section Image:
Look for `ABOUT_CONTENT`:
```typescript
export const ABOUT_CONTENT: AboutContent = {
  imageUrl: 'https://picsum.photos/800/1000?grayscale', // ← Change this URL
  imageAlt: 'Architectural Detail', // ← Change this description
  // ...
};
```

#### For Project Images:
Look for `PROJECTS` array:
```typescript
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'The Vertex Loft',
    imageUrl: 'https://picsum.photos/800/600?grayscale&random=4', // ← Change this
    gallery: ['https://...', 'https://...'], // ← Change gallery images
    // ...
  },
  // ...
];
```

#### For Service Images:
Look for `SERVICES` array:
```typescript
export const SERVICES: Service[] = [
  {
    id: 'res',
    title: 'RESIDENTIAL DESIGN',
    imageUrl: 'https://picsum.photos/600/800?grayscale&random=1', // ← Change this
    // ...
  },
  // ...
];
```

### Step 3: Replace the URL
Replace the `imageUrl` with:
- **Online image URL**: `'https://your-image-host.com/image.jpg'`
- **Local image**: `'/images/your-image.jpg'` (put image in `public/images/` folder)

### Step 4: Save and Refresh
- Save the file (`Ctrl+S`)
- Your dev server will automatically reload
- The new image will appear!

## Using Local Images

1. **Create images folder**:
   - Create `public/images/` folder in your project
   - Add your images there (e.g., `about-hero.jpg`)

2. **Update the URL**:
   ```typescript
   imageUrl: '/images/about-hero.jpg'
   ```

3. **That's it!** The image will load from your local files.

## Image Recommendations

- **Format**: JPG for photos, PNG for graphics with transparency
- **Size**: Optimize images before uploading (use tools like TinyPNG)
- **Dimensions**: 
  - About section: 800x1000px (4:5 aspect ratio)
  - Projects: 800x600px (4:3 aspect ratio)
  - Services: 600x800px (3:4 aspect ratio)

## Using a Database (Advanced)

If you want to update images without touching code, see `DATABASE_SETUP.md` for instructions on setting up Supabase or Firebase.



















