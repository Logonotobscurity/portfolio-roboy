import React, { Suspense as ReactSuspense, lazy as ReactLazy } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route as RouterRoute, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/navigation/Navigation';
import { ErrorBoundary } from '@/components/ui/core/ErrorBoundary';
import { PageError } from '@/components/PageError';
import { PageLoading } from '@/components/ui/feedback/PageLoading';
import { SentryTest } from './components/SentryTest';
import { ThemeProvider } from './providers/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import './styles/theme.css';

// Lazy load pages
const Home = ReactLazy(() => import('@/pages/home/Home'));
const Gallery = ReactLazy(() => import('@/pages/gallery/Gallery'));
const About = ReactLazy(() => import('@/pages/about/About'));
const Contact = ReactLazy(() => import('@/pages/contact/Contact'));

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<PageError message="Something went wrong" />}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          
          <main className="flex-1">
            <ReactSuspense fallback={<PageLoading />}>
              <AnimatePresence mode="wait">
                <RouterRoutes location={location} key={location.pathname}>
                  <RouterRoute path="/" element={<Home />} />
                  <RouterRoute path="/gallery" element={<Gallery />} />
                  <RouterRoute path="/about" element={<About />} />
                  <RouterRoute path="/contact" element={<Contact />} />
                </RouterRoutes>
              </AnimatePresence>
            </ReactSuspense>
          </main>
          <SentryTest />
        </div>
        <ThemeToggle />
      </ErrorBoundary>
    </ThemeProvider>
  );
}