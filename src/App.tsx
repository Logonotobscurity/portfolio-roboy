import React, { Suspense, lazy, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Toaster } from 'sonner';
import { LoadingProvider } from './providers/LoadingProvider';

// Lazy load pages with proper types
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.default })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.default })));
const Gallery = lazy(() => import('./pages/Gallery').then(module => ({ default: module.default })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.default })));

// Memoized loading component with proper types
const PageLoader: React.FC = memo(() => (
  <div className="min-h-screen bg-retro-black flex items-center justify-center">
    <div className="animate-pulse text-primary font-display text-2xl">
      Loading...
    </div>
  </div>
));
PageLoader.displayName = 'PageLoader';

// Memoized routes component with proper types
const AppRoutes: React.FC = memo(() => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
));
AppRoutes.displayName = 'AppRoutes';

export default function App(): JSX.Element {
  return (
    <LoadingProvider>
      <Toaster 
        position="top-right" 
        closeButton
        theme="dark"
        richColors
      />
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </LoadingProvider>
  );
}