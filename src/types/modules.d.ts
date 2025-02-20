declare module 'node:path' {
  export * from 'path';
}

declare module 'node:url' {
  export * from 'url';
}

declare module '@sentry/vite-plugin' {
  import { Plugin } from 'vite';

  interface SentryVitePluginOptions {
    org: string;
    project: string;
    authToken?: string;
    url?: string;
    release?: string;
    deploy?: {
      env: string;
    };
    sourcemaps?: {
      assets: string[];
    };
    telemetry?: boolean;
    debug?: boolean;
  }

  export default function sentryVitePlugin(options: SentryVitePluginOptions): Plugin;
}

declare module 'rollup-plugin-visualizer' {
  import { Plugin } from 'rollup';

  interface VisualizerOptions {
    filename?: string;
    title?: string;
    open?: boolean;
    template?: 'sunburst' | 'treemap' | 'network';
    gzipSize?: boolean;
    brotliSize?: boolean;
  }

  export function visualizer(options?: VisualizerOptions): Plugin;
}
