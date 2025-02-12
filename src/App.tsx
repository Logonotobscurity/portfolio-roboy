import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Toaster } from 'sonner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen bg-retro-black flex items-center justify-center">
      <div className="animate-pulse text-primary font-display text-2xl">
        Loading...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}