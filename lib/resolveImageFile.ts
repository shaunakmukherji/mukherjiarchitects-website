import { existsSync } from 'fs';
import { join } from 'path';
import { stripImageExtension } from './imageExtensions';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export function resolvePublicImagePath(publicDir: string, url: string): string | null {
  const pathname = decodeURIComponent(url.split('?')[0]);
  const direct = join(publicDir, pathname);
  if (existsSync(direct)) {
    return direct;
  }

  const base = stripImageExtension(pathname);
  if (!base) {
    return null;
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = join(publicDir, `${base}${ext}`);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function mimeTypeForPath(filePath: string): string {
  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  };
  return types[ext] ?? 'application/octet-stream';
}
