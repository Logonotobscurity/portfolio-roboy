/// <reference types="vitest" />
import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import type { ManualChunksFunction, OutputOptions } from 'rollup';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance budgets
const CHUNK_SIZE_WARNING = 500; // KB
const CHUNK_SIZE_ERROR = 1000; // KB

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }): UserConfig => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const isGitHubPages = env.GITHUB_PAGES === 'true';
  
  return {
    base: isGitHubPages ? '/portfolioRoboy/' : '/',
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          babelrc: false,
          configFile: false
        }
      }),
      mode === 'production' && visualizer({
        filename: 'stats.html',
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
      },
      dedupe: ['react', 'react-dom', 'lucide-react', '@tanstack/react-query', '@tanstack/react-router'],
      mainFields: ['module', 'jsnext:main', 'jsnext', 'main']
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
          manualChunks: ((id: string) => {
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

            // Sentry
            if (id.includes('node_modules/@sentry/')) {
              return 'monitoring';
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
          }) as ManualChunksFunction,
          format: 'es',
          assetFileNames: (assetInfo: { name?: string }) => {
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
            if (chunkInfo.name?.includes('page-')) {
              return 'js/pages/[name]-[hash].js';
            }
            if (chunkInfo.name?.includes('section-')) {
              return 'js/sections/[name]-[hash].js';
            }
            return 'js/[name]-[hash].js';
          },
          entryFileNames: 'js/[name]-[hash].js',
          compact: true,
          generatedCode: {
            arrowFunctions: true,
            constBindings: true,
            objectShorthand: true
          }
        } as OutputOptions
      },
      sourcemap: mode !== 'production',
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: CHUNK_SIZE_WARNING,
      emptyOutDir: true,
      reportCompressedSize: true,
      copyPublicDir: true,
      outDir: 'dist',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : []
        },
        mangle: true
      },
      brotliSize: true
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
        conditions: ['import', 'module', 'default'],
        resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
