/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/portfolio-roboy/' : '/',
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          '@babel/plugin-transform-runtime'
        ],
        babelrc: false,
        configFile: false,
      }
    }),
    mode === 'production' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    minify: mode === 'production' ? 'esbuild' : false,
    cssMinify: mode === 'production',
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      external: [/@rollup\/rollup-linux-.*-gnu/],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        format: 'es',
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    sourcemap: mode !== 'production',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    reportCompressedSize: true,
    copyPublicDir: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom/client',
      'lucide-react'
    ],
    exclude: [],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      },
      legalComments: 'none',
      jsx: 'automatic',
      treeShaking: true,
      minify: true,
      mainFields: ['module', 'main'],
      conditions: ['import', 'module', 'default']
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: false,
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
    open: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
      ],
    },
    css: true,
  },
}));
