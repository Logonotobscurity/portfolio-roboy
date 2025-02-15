import { lazy } from 'react';

// Route types
export interface Route {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  label: string;
  exact?: boolean;
}

// Lazy load components with proper directory structure
const Home = lazy(() => import('../pages/home').then(module => ({ default: module.default })));
const About = lazy(() => import('../pages/about').then(module => ({ default: module.default })));
const Gallery = lazy(() => import('../pages/gallery').then(module => ({ default: module.default })));
const Contact = lazy(() => import('../pages/contact').then(module => ({ default: module.default })));
const NotFound = lazy(() => import('../pages/not-found').then(module => ({ default: module.default })));

// Define routes
export const routes = [
  {
    path: '/',
    component: Home,
    label: 'Home',
    exact: true,
  },
  {
    path: '/about',
    component: About,
    label: 'About',
  },
  {
    path: '/gallery',
    component: Gallery,
    label: 'Gallery',
  },
  {
    path: '/contact',
    component: Contact,
    label: 'Contact',
  },
  {
    path: '*',
    component: NotFound,
    label: '404',
  },
] as const;

// Export individual routes for direct access with type safety
export const [HOME_ROUTE, ABOUT_ROUTE, GALLERY_ROUTE, CONTACT_ROUTE, NOT_FOUND_ROUTE] = routes; 