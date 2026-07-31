import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { webpPlugin } from './vite-plugin-webp';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    watch: {
      ignored: ['!**/generated/**'],
    },
  },
  plugins: [react(), tailwindcss(), webpPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
