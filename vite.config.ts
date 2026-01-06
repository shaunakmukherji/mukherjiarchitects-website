import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { webpPlugin } from './vite-plugin-webp';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), webpPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
