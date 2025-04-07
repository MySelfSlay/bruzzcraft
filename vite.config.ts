import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512,
      deleteOriginFile: false
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true
      },
      png: {
        quality: 80,
        progressive: true,
        optimizationLevel: 7
      },
      webp: {
        lossless: true,
        quality: 85
      }
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'icons': ['lucide-react', 'react-icons', '@iconify/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    reportCompressedSize: false,
    sourcemap: false,
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
    target: 'esnext'
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif', '**/*.webp'],
});