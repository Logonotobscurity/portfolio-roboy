/// <reference types="vitest" />
import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import type { OutputOptions } from 'rollup';

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
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
        open: true
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
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion', 'sonner'],
          },
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
      }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@tanstack/react-query',
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
      port: 3001,
      strictPort: true,
      host: true,
      open: true,
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
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/setup.ts',
        ]
      },
      css: true,
    },
  };
});
