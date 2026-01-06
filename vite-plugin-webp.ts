import type { Plugin } from 'vite';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const HERO_IMAGE_PATH = '/images/hero/hero-cover.jpg.jpeg';

export function webpPlugin(): Plugin {
  const cacheDir = join(process.cwd(), 'node_modules', '.vite-webp-cache');
  
  // Ensure cache directory exists
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }

  return {
    name: 'vite-plugin-webp',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        
        // Skip non-image requests
        if (!url.match(/\.(jpg|jpeg|png|webp)$/i)) {
          return next();
        }

        // Skip hero image
        if (url === HERO_IMAGE_PATH || url.includes('/images/hero/')) {
          return next();
        }

        // Skip if already WebP
        if (url.endsWith('.webp')) {
          return next();
        }

        // Skip if request is for original (has ?original query param)
        if (url.includes('?original')) {
          return next();
        }

        try {
          const publicPath = join(process.cwd(), 'public', url);
          
          // Check if original file exists
          if (!existsSync(publicPath)) {
            return next();
          }

          // Generate cache key
          const cacheKey = url.replace(/[^a-zA-Z0-9]/g, '_') + '.webp';
          const cachePath = join(cacheDir, cacheKey);

          // Check cache first
          if (existsSync(cachePath)) {
            const cachedWebP = readFileSync(cachePath);
            res.setHeader('Content-Type', 'image/webp');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.setHeader('X-Image-Format', 'webp-cached');
            return res.end(cachedWebP);
          }

          // Convert to WebP
          const originalBuffer = readFileSync(publicPath);
          const webpBuffer = await sharp(originalBuffer)
            .webp({ 
              quality: 85,
              effort: 4
            })
            .toBuffer();

          // Save to cache
          writeFileSync(cachePath, webpBuffer);

          // Serve WebP
          res.setHeader('Content-Type', 'image/webp');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('X-Image-Format', 'webp-converted');
          res.end(webpBuffer);
        } catch (error) {
          console.error('WebP conversion error:', error);
          // Fallback to original
          next();
        }
      });
    },
    configurePreviewServer(server) {
      // Same middleware for preview server
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        
        if (!url.match(/\.(jpg|jpeg|png|webp)$/i)) {
          return next();
        }

        if (url === HERO_IMAGE_PATH || url.includes('/images/hero/')) {
          return next();
        }

        if (url.endsWith('.webp')) {
          return next();
        }

        if (url.includes('?original')) {
          return next();
        }

        try {
          const publicPath = join(process.cwd(), 'public', url);
          
          if (!existsSync(publicPath)) {
            return next();
          }

          const cacheKey = url.replace(/[^a-zA-Z0-9]/g, '_') + '.webp';
          const cachePath = join(cacheDir, cacheKey);

          if (existsSync(cachePath)) {
            const cachedWebP = readFileSync(cachePath);
            res.setHeader('Content-Type', 'image/webp');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.setHeader('X-Image-Format', 'webp-cached');
            return res.end(cachedWebP);
          }

          const originalBuffer = readFileSync(publicPath);
          const webpBuffer = await sharp(originalBuffer)
            .webp({ 
              quality: 85,
              effort: 4
            })
            .toBuffer();

          writeFileSync(cachePath, webpBuffer);

          res.setHeader('Content-Type', 'image/webp');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('X-Image-Format', 'webp-converted');
          res.end(webpBuffer);
        } catch (error) {
          console.error('WebP conversion error:', error);
          next();
        }
      });
    }
  };
}

