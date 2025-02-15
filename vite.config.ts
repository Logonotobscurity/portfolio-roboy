/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance budgets
const CHUNK_SIZE_WARNING = 500; // KB
const CHUNK_SIZE_ERROR = 1000; // KB

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          babelrc: false,
          configFile: false
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
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './public/assets')
      }
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      minify: mode === 'production' ? 'esbuild' : false,
      cssMinify: mode === 'production',
      modulePreload: {
        polyfill: true
      },
      rollupOptions: {
        external: [/@rollup\/rollup-linux-.*-gnu/],
        output: {
          manualChunks: (id) => {
            // Core dependencies
            if (id.includes('node_modules/react/') || 
                id.includes('node_modules/react-dom/') ||
                id.includes('node_modules/scheduler/')) {
              return 'core';
            }
            
            // Routing and data management
            if (id.includes('node_modules/@tanstack/')) {
              if (id.includes('react-query')) {
                return 'data-management';
              }
              if (id.includes('react-router')) {
                return 'routing';
              }
            }
            
            // UI and animations
            if (id.includes('node_modules/framer-motion/') || 
                id.includes('node_modules/popmotion/')) {
              return 'animations';
            }
            
            // UI utilities
            if (id.includes('node_modules/lucide-react/') ||
                id.includes('node_modules/clsx/') ||
                id.includes('node_modules/tailwind-merge/')) {
              return 'ui-utils';
            }

            // Route-based code splitting
            if (id.includes('/src/pages/')) {
              const segments = id.split('/');
              const pageName = segments[segments.length - 2];
              return `page-${pageName}`;
            }

            // Feature-based code splitting
            if (id.includes('/src/components/')) {
              if (id.includes('Section')) {
                const segments = id.split('/');
                const sectionName = segments[segments.length - 1].replace('.tsx', '');
                return `section-${sectionName}`;
              }
              if (id.includes('/ui/')) {
                return 'ui-components';
              }
            }

            // Utilities and hooks
            if (id.includes('/src/utils/') || 
                id.includes('/src/lib/') || 
                id.includes('/src/hooks/')) {
              return 'utils';
            }

            return 'vendor';
          },
          format: 'es',
          assetFileNames: (assetInfo) => {
            if (!assetInfo?.name) return 'assets/[name]-[hash][extname]';
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|ttf|eot/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name.includes('page-')) {
              return 'js/pages/[name]-[hash].js';
            }
            if (chunkInfo.name.includes('section-')) {
              return 'js/sections/[name]-[hash].js';
            }
            return 'js/[name]-[hash].js';
          },
          entryFileNames: 'js/[name]-[hash].js'
        }
      },
      sourcemap: mode !== 'production',
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: CHUNK_SIZE_WARNING,
      emptyOutDir: true,
      reportCompressedSize: true,
      copyPublicDir: true,
      outDir: 'dist'
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@tanstack/react-query',
        '@tanstack/react-router',
        'framer-motion',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom/client',
        'lucide-react',
        'clsx',
        'tailwind-merge'
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
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
  };
});
