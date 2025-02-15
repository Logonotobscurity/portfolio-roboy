import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/ui/navigation/Navigation';
import { LoadingProvider } from './providers/LoadingProvider';
import { ErrorBoundary } from '@/components/ui/core/ErrorBoundary';
import { PageLoading } from '@/components/ui/feedback/PageLoading';
import { PageError } from '@/components/ui/feedback/PageError';
import { routes } from './config/routes';

// Memoized error fallback component
const ErrorFallback = React.memo(() => (
  <PageError
    message="We're having trouble loading this page. Please try again."
    onRetry={() => window.location.reload()}
  />
));
ErrorFallback.displayName = 'ErrorFallback';

// Memoized routes component with proper types and preloading
const AppRoutes = React.memo(() => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<PageLoading />}>
                  <route.component />
                </Suspense>
              </ErrorBoundary>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
});
AppRoutes.displayName = 'AppRoutes';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <div className="relative min-h-screen bg-retro-black">
          <Navigation />
          <main className="relative">
            <AppRoutes />
          </main>
        </div>
      </LoadingProvider>
    </ErrorBoundary>
  );
}