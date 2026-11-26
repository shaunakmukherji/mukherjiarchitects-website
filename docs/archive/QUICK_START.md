# Quick Start: Your Architecture Website

## ✅ What's Already Set Up

- ✅ Image folders created: `public/images/about/`, `public/images/projects/`, `public/images/services/`
- ✅ All image paths updated to use local files
- ✅ Simple editing system ready

## 🚀 How to Add Your Images (3 Steps)

### 1. Add Images to Folders
Drag and drop your images into:
- `public/images/about/` - For the About section
- `public/images/projects/` - For all your projects  
- `public/images/services/` - For service images

### 2. Update `constants.ts`
Open `constants.ts` and change the filenames to match YOUR images:

**Example - About Section:**
```typescript
imageUrl: '/images/about/about-hero.jpg'  // Change "about-hero.jpg" to YOUR filename
```

**Example - Project:**
```typescript
imageUrl: '/images/projects/vertex-loft-main.jpg'  // Change to YOUR project image name
```

### 3. Save and Refresh
- Press `Ctrl+S` to save
- Your browser auto-refreshes
- Done! 🎉

---

## 📝 Adding a New Project

1. **Add images** to `public/images/projects/` (e.g., `my-house-main.jpg`)

2. **Open `constants.ts`** and add to the `PROJECTS` array:
```typescript
{
  id: 'p7',
  title: 'My New House',
  category: 'Residential',
  year: '2024',
  location: 'Your City',
  description: 'Description of your project.',
  imageUrl: '/images/projects/my-house-main.jpg',
  gallery: ['/images/projects/my-house-1.jpg', '/images/projects/my-house-2.jpg']
}
```

3. **Save** - Your new project appears!

---

## ✏️ Editing Existing Content

Just edit `constants.ts`:
- Change `title` - Project/service name
- Change `description` - Text content
- Change `imageUrl` - Image path
- Change `gallery` - Array of gallery images
- Change `year`, `location`, `category` - Other details

**Save and refresh** - Changes appear instantly!

---

## 📁 Folder Structure

```
Website/
├── public/
│   └── images/
│       ├── about/          ← About section images
│       ├── projects/       ← All project images
│       └── services/       ← Service images
└── constants.ts            ← Edit this file to change content
```

---

## 💡 Tips

- **Image names**: Use lowercase, no spaces: `my-project.jpg` ✅ (not `My Project.jpg` ❌)
- **File size**: Keep under 2MB for fast loading
- **Formats**: JPG for photos, PNG for graphics with transparency
- **Path format**: Always `/images/folder-name/your-image.jpg`

---

## 🎯 That's It!

No database. No complicated setup. Just:
1. Put images in folders
2. Edit `constants.ts`  
3. Save

**You're in control!** 🚀





















