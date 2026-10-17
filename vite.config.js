import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      disable: !!process.env.VITE_HASH_ROUTER,
      registerType: 'autoUpdate',
      includeAssets: ['icons/favicon.png', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Hangul Gil — Tự học tiếng Hàn',
        short_name: 'Hangul Gil',
        description: 'Học tiếng Hàn đủ nghe, nói, đọc, viết từ bảng chữ cái đến TOPIK 6.',
        lang: 'vi',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F3F4F6',
        theme_color: '#3B6EF6',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
        globIgnores: ['audio/**'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          { urlPattern: ({ url }) => url.pathname.startsWith('/audio/') && url.pathname.endsWith('.mp3'), handler: 'CacheFirst', options: { cacheName: 'audio', expiration: { maxEntries: 3000 }, rangeRequests: true } },
          { urlPattern: ({ url }) => url.pathname.startsWith('/video/'), handler: 'CacheFirst', options: { cacheName: 'video', expiration: { maxEntries: 60 }, rangeRequests: true } },
          { urlPattern: ({ url }) => url.pathname === '/audio/manifest.json', handler: 'NetworkFirst', options: { cacheName: 'audio-manifest' } },
          { urlPattern: ({ url }) => url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com'), handler: 'StaleWhileRevalidate', options: { cacheName: 'fonts' } }
        ]
      }
    })
  ]
});
