# Favicon Setup Guide

## Current Setup

A temporary SVG favicon has been added to your site. It's located at:
- `/public/favicon.svg`

The favicon is referenced in `index.html` with these lines:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.ico" />
```

## How to Replace with Your Own Favicon

### Option 1: Using a PNG/JPEG Image

1. **Prepare your image:**
   - Recommended size: 32x32px, 64x64px, or 128x128px (square)
   - Formats: PNG (preferred) or JPEG
   - Name it `favicon.png` or `favicon.jpg`

2. **Convert to ICO format (for better browser compatibility):**
   - Use an online converter like [favicon.io](https://favicon.io/favicon-converter/) or [convertio.co](https://convertio.co/png-ico/)
   - Upload your PNG/JPEG
   - Download the generated `favicon.ico`

3. **Place the file:**
   - Copy your `favicon.ico` file to the `/public` folder
   - The path should be: `/public/favicon.ico`

4. **Update index.html:**
   - Replace the current favicon links with:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   ```

### Option 2: Using PNG Directly (Modern Browsers)

1. **Prepare your image:**
   - Size: 32x32px or 64x64px (square)
   - Format: PNG
   - Name it `favicon.png`

2. **Place the file:**
   - Copy `favicon.png` to `/public/favicon.png`

3. **Update index.html:**
   - Replace the favicon links with:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

### Option 3: Multiple Sizes (Best Practice)

For the best compatibility across all devices and platforms:

1. **Create multiple sizes:**
   - 16x16px (favicon-16x16.png)
   - 32x32px (favicon-32x32.png)
   - 180x180px (apple-touch-icon.png for iOS)
   - 192x192px (android-chrome-192x192.png for Android)
   - 512x512px (android-chrome-512x512.png for Android)

2. **Place all files in `/public` folder**

3. **Update index.html with:**
   ```html
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="manifest" href="/site.webmanifest" />
   ```

### Quick Steps Summary

**Simplest approach (using your PNG/JPEG):**
1. Convert your image to `favicon.ico` using [favicon.io](https://favicon.io/favicon-converter/)
2. Place `favicon.ico` in `/public` folder
3. Update `index.html` line 22 to: `<link rel="icon" type="image/x-icon" href="/favicon.ico" />`
4. Remove or comment out the SVG favicon line (line 23)

**Note:** After making changes, restart your dev server if it's running, and do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to see the new favicon.



