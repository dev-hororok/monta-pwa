import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendors';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['robots.txt', 'sitemap.xml'],
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: '뽀모도로닭',
        short_name: '뽀모닭',
        description: 'pomodoro timer app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
