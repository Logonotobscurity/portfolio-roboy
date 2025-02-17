import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.MODE === 'development') {
    console.log('Sentry initialized in development mode');
  }

  Sentry.init({
    dsn: "https://383f8e37ec8d86ef660c2c8f28ab6dbf@o4508800704643072.ingest.us.sentry.io/4508830575558656",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Code path mapping configuration
    release: 'portfolio-roboy@' + import.meta.env.VITE_APP_VERSION,
    dist: import.meta.env.VITE_COMMIT_SHA,
    normalizeDepth: 10,
    // Repository configuration
    repos: {
      'Logonotobscurity/portfolio-roboy': {
        name: 'portfolio-roboy',
        url: 'https://github.com/Logonotobscurity/portfolio-roboy'
      }
    },
    // Stack trace configuration
    stackParser: Sentry.defaultStackParser,
    attachStacktrace: true,
    // Source maps configuration
    debug: import.meta.env.MODE === 'development',
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/.*\.netlify\.app/,
      /^https:\/\/yourserver\.io\/api/
    ],
    // Session Replay configuration
    replaysSessionSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    // Environment and release tracking
    environment: import.meta.env.MODE,
    enabled: import.meta.env.VITE_ENABLE_SENTRY === 'true',
    beforeSend(event) {
      // Add repository and release information to events
      event.tags = {
        ...event.tags,
        repository: 'Logonotobscurity/portfolio-roboy',
        branch: 'master'
      };
      
      if (import.meta.env.MODE === 'development') {
        console.log('Sentry Event:', event);
      }
      return event;
    },
  });
}; 