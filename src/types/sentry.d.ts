import { ComponentType, ReactNode } from 'react';

declare module '@sentry/react' {
  export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error) => ReactNode);
  }

  export interface BrowserOptions {
    dsn: string | undefined;
    integrations?: any[];
    tracesSampleRate?: number;
    replaysSessionSampleRate?: number;
    replaysOnErrorSampleRate?: number;
    environment?: string;
    release?: string;
    beforeSend?: (event: any) => any;
  }

  export const init: (options: BrowserOptions) => void;
  export const withErrorBoundary: <P extends object>(
    component: ComponentType<P>,
    options?: Partial<ErrorBoundaryProps>
  ) => ComponentType<P>;
}

declare module '@sentry/vite-plugin' {
  export interface SentryVitePluginOptions {
    org: string;
    project: string;
    authToken?: string;
    release?: string;
    deploy?: {
      env: string;
    };
  }

  const sentryVitePlugin: (options: SentryVitePluginOptions) => any;
  export default sentryVitePlugin;
}

declare module '@sentry/tracing' {
  export class BrowserTracing {
    constructor(options?: any);
  }
} 