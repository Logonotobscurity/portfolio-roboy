/// <reference types="vitest" />
import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import type { OutputOptions } from 'rollup';
import { sentryVitePlugin } from "@sentry/vite-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance budgets
const CHUNK_SIZE_WARNING = 300; // Reduced from 500KB
const CHUNK_SIZE_ERROR = 500;   // Reduced from 1MB

export default defineConfig(({ mode }: { mode: string }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  
  return {
    base: env.GITHUB_PAGES === 'true' ? '/portfolioRoboy/' : '/',
    plugins: [
      isProd && sentryVitePlugin({
        org: "rooboy",
        project: "portfolio-roboy",
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: "./dist/**",
          ignore: ['node_modules/**', '**/*.css'],
          filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
        release: {
          name: `portfolio-roboy@${env.VITE_APP_VERSION}`,
          setCommits: {
            auto: true,
            ignoreMissing: true,
          },
        },
        telemetry: false,
      }),
      react({
        jsxImportSource: '@emotion/react',
        plugins: [['@swc/plugin-emotion', {}]],
      }),
      isProd && visualizer({
        filename: 'dist/bundle-stats.html',
        template: 'network',
        gzipSize: true,
        brotliSize: true,
        open: false
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './public/assets')
      },
      dedupe: ['react', 'react-dom'],
    },
    build: {
      target: 'es2022',
      minify: isProd ? 'terser' : false,
      cssCodeSplit: true,
      cssMinify: isProd,
      modulePreload: { polyfill: false },
      rollupOptions: {
        external: [/@rollup\/rollup-linux-.*-gnu/],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@sentry')) return 'vendor-sentry';
              if (id.includes('@radix-ui')) return 'vendor-radix';
              if (id.includes('framer-motion')) return 'vendor-motion';
              if (id.includes('@tanstack')) return 'vendor-query';
              return 'vendor';
            }
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          compact: true,
          generatedCode: 'es2015',
          sourcemapPathTransform: (relativePath) => 
            `/~/${relativePath.replace('../', '')}`,
        } as OutputOptions,
        treeshake: {
          preset: 'recommended',
          moduleSideEffects: false,
        },
      },
      sourcemap: isProd ? 'hidden' : false,
      assetsInlineLimit: 8192,
      chunkSizeWarningLimit: CHUNK_SIZE_WARNING,
      reportCompressedSize: false,
      terserOptions: {
        compress: {
          drop_console: true,
          passes: 2,
          ecma: 2020,
        },
        format: {
          comments: false,
          ecma: 2020,
        },
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      esbuildOptions: {
        target: 'es2022',
        legalComments: 'none',
        minifyIdentifiers: isProd,
        minifySyntax: isProd,
        minifyWhitespace: isProd,
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      hmr: { overlay: false },
      fs: { strict: true },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        exclude: ['**/__mocks__/**', '**/*.d.ts'],
      },
      css: false,
    },
  };
});
