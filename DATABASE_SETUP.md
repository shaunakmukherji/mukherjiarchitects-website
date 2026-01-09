# Database Setup Guide for Architectural Website

This guide explains how to set up a database for your architectural website so you can easily update images and content without modifying code.

## Quick Start: Changing Images

### Option 1: Update `constants.ts` (Current Method)
The easiest way to change images right now is to edit `constants.ts`:

1. Open `constants.ts` in Cursor
2. Find the `ABOUT_CONTENT` object
3. Change the `imageUrl` to your new image URL:
   ```typescript
   export const ABOUT_CONTENT: AboutContent = {
     imageUrl: 'https://your-image-url.com/image.jpg', // Change this
     imageAlt: 'Your Image Description',
     // ... other fields
   };
   ```
4. For projects and services, update the `PROJECTS` and `SERVICES` arrays in the same file

### Option 2: Use Local Images
1. Create an `images` folder in your project: `public/images/`
2. Add your images there (e.g., `public/images/about-image.jpg`)
3. Update `constants.ts`:
   ```typescript
   imageUrl: '/images/about-image.jpg'
   ```

## Database Integration Options

### Recommended: Supabase (Free & Easy)

Supabase is perfect for architectural websites - it's free, has built-in image storage, and provides a real-time database.

#### Setup Steps:

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Create Database Tables**
   In Supabase SQL Editor, run:
   ```sql
   -- About section content
   CREATE TABLE about_content (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     image_url TEXT,
     image_alt TEXT,
     heading TEXT,
     heading_highlight TEXT,
     description TEXT,
     philosophy TEXT,
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Projects
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT,
     category TEXT,
     year TEXT,
     location TEXT,
     description TEXT,
     image_url TEXT,
     gallery TEXT[], -- Array of image URLs
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Services
   CREATE TABLE services (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT,
     description TEXT,
     image_url TEXT,
     category_filter TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Set up Supabase Client**
   - Create `.env` file in project root:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
   - Get these from Supabase Dashboard > Settings > API

5. **Enable Row Level Security (RLS)**
   ```sql
   -- Allow public read access
   ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON about_content FOR SELECT USING (true);

   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);

   ALTER TABLE services ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
   ```

### Alternative: Firebase (Google)

Firebase is another excellent option, especially if you're already using Google services.

#### Setup Steps:

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Create a new project
   - Enable Firestore Database

2. **Install Firebase**
   ```bash
   npm install firebase
   ```

3. **Create Collections**
   - `aboutContent` - single document
   - `projects` - collection of documents
   - `services` - collection of documents

### Alternative: Simple JSON API

For a simpler solution, you can host a JSON file and fetch it:

1. **Create `data.json`** with your content
2. **Host it** on GitHub, Netlify, or your server
3. **Fetch it** in your React app

## Image Storage Options

### Option 1: Supabase Storage (Recommended)
- Free tier: 1GB storage
- Built-in CDN
- Easy image uploads via dashboard

### Option 2: Cloudinary
- Free tier: 25GB storage
- Automatic image optimization
- Transformations on the fly

### Option 3: AWS S3 + CloudFront
- More complex setup
- Pay-as-you-go pricing
- Enterprise-grade

### Option 4: GitHub + CDN
- Free for public repos
- Use GitHub as image storage
- Access via raw.githubusercontent.com

## Next Steps

1. Choose your database solution
2. Follow the setup instructions above
3. Update the code to fetch from database (see example files)
4. Set up image storage
5. Create an admin panel (optional) for easy content management

## Need Help?

- Check the example integration files in this project
- Review Supabase docs: https://supabase.com/docs
- Review Firebase docs: https://firebase.google.com/docs




















