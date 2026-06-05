import { createRequire } from 'module';
import type { ServerResponse } from 'http';
import type { Plugin, Connect, ViteDevServer } from 'vite';
import {
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  statSync,
  readdirSync,
  unlinkSync,
  watch,
} from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { stripImageExtension } from './lib/imageExtensions';
import { mimeTypeForPath, resolvePublicImagePath } from './lib/resolveImageFile';

const HERO_IMAGE_PATH = '/images/hero/hero-cover.jpg.jpeg';
const ABOUT_IMAGE_PREFIX = '/images/about/';

function isCacheFresh(sourcePath: string, cachePath: string): boolean {
  if (!existsSync(cachePath)) return false;
  if (!existsSync(sourcePath)) return false; // source deleted — cache is stale
  const sourceMtime = statSync(sourcePath).mtimeMs;
  const cacheMtime = statSync(cachePath).mtimeMs;
  return cacheMtime >= sourceMtime;
}

function clearAboutWebpCache(cacheDir: string) {
  if (!existsSync(cacheDir)) return;

  for (const file of readdirSync(cacheDir)) {
    if (file.includes('_images_about_')) {
      unlinkSync(join(cacheDir, file));
    }
  }
}

function syncAboutImageVersions() {
  try {
    const _require = createRequire(import.meta.url);
    const mod = _require('./scripts/generate-projects.cjs');
    mod.generateAboutImageVersions?.();
  } catch (e) {
    console.warn('syncAboutImageVersions skipped:', e);
  }
}

function createAboutImageMiddleware(publicDir: string) {
  return (req: Connect.IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    const url = req.url || '';
    const baseUrl = url.split('?')[0];

    if (!baseUrl.startsWith(ABOUT_IMAGE_PREFIX)) {
      return next();
    }

    if (!baseUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
      return next();
    }

    const resolvedPath = resolvePublicImagePath(publicDir, url);
    if (!resolvedPath) {
      return next();
    }

    const buffer = readFileSync(resolvedPath);
    res.setHeader('Content-Type', mimeTypeForPath(resolvedPath));
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('X-Image-Source', resolvedPath);
    res.end(buffer);
  };
}

async function serveWebP(
  req: Connect.IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
  cacheDir: string
) {
  const url = req.url || '';
  const baseUrl = url.split('?')[0];

  if (!url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i)) {
    return next();
  }

  if (url.includes(HERO_IMAGE_PATH) || url.includes('/images/hero/')) {
    return next();
  }

  if (baseUrl.startsWith(ABOUT_IMAGE_PREFIX)) {
    return next();
  }

  if (url.endsWith('.webp')) {
    return next();
  }

  const publicDir = join(process.cwd(), 'public');
  const resolvedPath = resolvePublicImagePath(publicDir, url);

  if (!resolvedPath) {
    return next();
  }

  try {
    const isMobile =
      url.includes('mobile=true') ||
      (req.headers['user-agent'] &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          req.headers['user-agent'] as string
        ));

    const cacheBase = stripImageExtension(baseUrl) ?? baseUrl;
    const cacheKey =
      cacheBase.replace(/[^a-zA-Z0-9]/g, '_') +
      (isMobile ? '_mobile' : '_desktop') +
      '.webp';
    const cachePath = join(cacheDir, cacheKey);

    if (isCacheFresh(resolvedPath, cachePath)) {
      const cachedWebP = readFileSync(cachePath);
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('X-Image-Format', 'webp-cached');
      return res.end(cachedWebP);
    }

    if (existsSync(cachePath)) {
      unlinkSync(cachePath);
    }

    const originalBuffer = readFileSync(resolvedPath);
    const quality = isMobile ? 60 : 85;

    let sharpInstance = sharp(originalBuffer);
    if (isMobile) {
      const metadata = await sharpInstance.metadata();
      if (metadata.width && metadata.width > 1200) {
        sharpInstance = sharpInstance.resize(1200, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });
      }
    }

    const webpBuffer = await sharpInstance
      .webp({
        quality,
        effort: 4,
      })
      .toBuffer();

    writeFileSync(cachePath, webpBuffer);

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Image-Format', 'webp-converted');
    res.end(webpBuffer);
  } catch (error) {
    console.error('WebP conversion error:', error);
    next();
  }
}

function watchAboutImages(server: ViteDevServer, cacheDir: string) {
  const aboutDir = join(process.cwd(), 'public', 'images', 'about');
  if (!existsSync(aboutDir)) return;

  let reloadTimer: ReturnType<typeof setTimeout> | null = null;

  watch(aboutDir, () => {
    if (reloadTimer) {
      clearTimeout(reloadTimer);
    }

    reloadTimer = setTimeout(() => {
      console.log('\n🖼️  About image changed — refreshing versions and cache...');
      syncAboutImageVersions();
      clearAboutWebpCache(cacheDir);
      server.ws.send({ type: 'full-reload' });
    }, 300);
  });
}

export function webpPlugin(): Plugin {
  const cacheDir = join(process.cwd(), 'node_modules', '.vite-webp-cache');

  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }

  const aboutMiddleware = createAboutImageMiddleware(join(process.cwd(), 'public'));
  const webpMiddleware = (
    req: Connect.IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction
  ) => serveWebP(req, res, next, cacheDir);

  const attachMiddleware = (server: ViteDevServer) => {
    server.middlewares.stack.unshift({ route: '', handle: aboutMiddleware as Connect.NextHandleFunction });
    server.middlewares.use(webpMiddleware);
    clearAboutWebpCache(cacheDir);
    syncAboutImageVersions();
    watchAboutImages(server, cacheDir);
  };

  return {
    name: 'vite-plugin-webp',
    enforce: 'pre',
    configureServer(server) {
      attachMiddleware(server);
    },
    configurePreviewServer(server) {
      attachMiddleware(server as ViteDevServer);
    },
  };
}
