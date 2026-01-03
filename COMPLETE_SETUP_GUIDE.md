# Complete Setup Guide - Your Architecture Website

## ✅ What's Been Set Up

1. ✅ **Hero/Cover Image** - Background image behind main text
2. ✅ **Logo** - PNG logo replaces text in navbar
3. ✅ **Project Categories** - Projects linked to Services (Residential, Commercial, Interior)
4. ✅ **Signature Projects** - Choose which projects appear in "Our Signature Projects"
5. ✅ **Contact Form** - Ready to receive submissions (see setup below)

---

## 📁 Folder Structure

```
public/images/
├── hero/           ← Put your cover page image here
│   └── hero-cover.jpg
├── logo/           ← Put your logo PNG here
│   └── logo.png
├── about/          ← About section images
├── projects/       ← All project images
└── services/       ← Service images
```

---

## 🖼️ Adding Your Images

### 1. Hero/Cover Image
- **Location**: `public/images/hero/`
- **Filename**: `hero-cover.jpg` (or update `constants.ts`)
- **What it is**: The background image behind "INTELLIGENT DESIGN MEETS INTELLIGENT ARCHITECTURE"
- **Recommended**: 1920x1080px or larger, landscape orientation

### 2. Logo
- **Location**: `public/images/logo/`
- **Filename**: `logo.png` (or update `constants.ts`)
- **What it is**: Replaces "MUKHERJI ARCHITECTS MILANO" text in navbar
- **Recommended**: PNG with transparent background, 200-400px wide

### 3. Projects
- **Location**: `public/images/projects/`
- **Naming**: `project-name-main.jpg`, `project-name-1.jpg`, etc.
- **In `constants.ts`**: Set `isSignature: true` to show in "Our Signature Projects"

### 4. Services
- **Location**: `public/images/services/`
- **Files**: `residential.jpg`, `commercial.jpg`, `interior.jpg`
- **These match**: The categories in "Our Expertise" section

---

## ✏️ Editing Content

### Choose Signature Projects

In `constants.ts`, find the `PROJECTS` array:

```typescript
{
  id: 'p1',
  title: 'The Vertex Loft',
  category: 'Residential',  // Must match: 'Residential', 'Commercial', or 'Interior'
  // ... other fields
  isSignature: true  // ← Set to true to show in "Our Signature Projects"
}
```

**Important**: 
- Projects with `isSignature: true` appear in "Our Signature Projects"
- Projects with `isSignature: false` are still available when clicking services
- The `category` must match the service categories: 'Residential', 'Commercial', or 'Interior'

### Link Projects to Services

Projects are automatically linked to services by category:
- `category: 'Residential'` → Shows when clicking "RESIDENTIAL DESIGN"
- `category: 'Commercial'` → Shows when clicking "COMMERCIAL SPACES"
- `category: 'Interior'` → Shows when clicking "INTERIOR ARCHITECTURE"

---

## 📧 Contact Form Setup

The contact form is ready! You have 4 options:

### Option 1: EmailJS (Recommended - Free)
1. Sign up at https://www.emailjs.com (200 emails/month free)
2. Connect your email
3. Get your keys
4. Add to `.env` file
5. See `CONTACT_FORM_SETUP.md` for detailed steps

### Option 2: Formspree (Easiest)
1. Sign up at https://formspree.io (50 submissions/month free)
2. Get your form endpoint
3. Update form action

### Option 3: Current Setup (Mailto)
- Currently opens email client with form data
- Works but requires user to have email configured

### Option 4: Backend API
- If you have a server, create an endpoint
- Use SendGrid, Mailgun, or Nodemailer

**See `CONTACT_FORM_SETUP.md` for complete instructions!**

---

## 🎯 Quick Checklist

- [ ] Add `hero-cover.jpg` to `public/images/hero/`
- [ ] Add `logo.png` to `public/images/logo/`
- [ ] Add project images to `public/images/projects/`
- [ ] Add service images to `public/images/services/`
- [ ] Update image paths in `constants.ts`
- [ ] Set `isSignature: true` for projects you want featured
- [ ] Set up contact form (EmailJS recommended)
- [ ] Test everything!

---

## 📝 Example: Adding a New Project

1. **Add images** to `public/images/projects/`:
   - `my-house-main.jpg`
   - `my-house-1.jpg`
   - `my-house-2.jpg`

2. **Add to `constants.ts`** → `PROJECTS` array:
```typescript
{
  id: 'p7',
  title: 'My New House',
  category: 'Residential',  // Links to "RESIDENTIAL DESIGN" service
  year: '2024',
  location: 'Your City',
  description: 'Description of your project.',
  imageUrl: '/images/projects/my-house-main.jpg',
  gallery: ['/images/projects/my-house-1.jpg', '/images/projects/my-house-2.jpg'],
  isSignature: true  // Shows in "Our Signature Projects"
}
```

3. **Save** - Your project appears!

---

## 🔧 Constants.ts Reference

### Hero Image
```typescript
export const HERO_IMAGE_URL = '/images/hero/hero-cover.jpg';
```

### Logo
```typescript
export const LOGO_URL = '/images/logo/logo.png';
```

### Projects
```typescript
{
  // ... project fields
  isSignature: true  // true = shows in signature projects
}
```

---

## 💡 Tips

- **Image sizes**: Keep under 2MB for fast loading
- **Formats**: JPG for photos, PNG for logos
- **Naming**: Use lowercase, no spaces: `my-project.jpg`
- **Categories**: Must exactly match: 'Residential', 'Commercial', or 'Interior'

---

## 🆘 Need Help?

- **Images not showing?** Check the path in `constants.ts` matches your filename
- **Projects not appearing?** Make sure `isSignature: true` is set
- **Contact form not working?** See `CONTACT_FORM_SETUP.md`
- **Categories not linking?** Make sure project `category` matches service `categoryFilter`

---

**You're all set!** Just add your images and update `constants.ts`. 🚀










