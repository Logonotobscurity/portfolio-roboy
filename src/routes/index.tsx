import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';

// Route types
export type Route = RouteObject & {
  label: string;
  exact?: boolean;
};

// Lazy load components with proper directory structure
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/about/About'));
const Gallery = lazy(() => import('../pages/gallery/Gallery'));
const Contact = lazy(() => import('../pages/contact/Contact'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));

// Wrapper component for lazy-loaded routes
const LazyComponent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

// Define routes
export const routes: Route[] = [
  {
    path: '/',
    element: <LazyComponent><Home /></LazyComponent>,
    label: 'Home',
    exact: true,
  },
  {
    path: '/about',
    element: <LazyComponent><About /></LazyComponent>,
    label: 'About',
  },
  {
    path: '/gallery',
    element: <LazyComponent><Gallery /></LazyComponent>,
    label: 'Gallery',
  },
  {
    path: '/contact',
    element: <LazyComponent><Contact /></LazyComponent>,
    label: 'Contact',
  },
  {
    path: '*',
    element: <LazyComponent><NotFound /></LazyComponent>,
    label: 'Not Found',
  },
];

// Export individual routes for direct access with type safety
export const [HOME_ROUTE, ABOUT_ROUTE, GALLERY_ROUTE, CONTACT_ROUTE, NOT_FOUND_ROUTE] = routes; 