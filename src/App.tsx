import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/ui/navigation/Navigation';
import { ErrorBoundary } from '@/components/ui/core/ErrorBoundary';
import { PageError } from '@/components/PageError';
import { Suspense, lazy } from 'react';
import { PageLoading } from '@/components/ui/feedback/PageLoading';

// Lazy load pages
const Home = lazy(() => import('@/pages/home/Home'));
const Gallery = lazy(() => import('@/pages/gallery/Gallery'));
const About = lazy(() => import('@/pages/about/About'));
const Contact = lazy(() => import('@/pages/contact/Contact'));

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary fallback={<PageError message="Something went wrong" />}>
      <div className="flex min-h-screen flex-col bg-retro-black">
        <Navigation />
        
        <main className="flex-1">
          <Suspense fallback={<PageLoading />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}