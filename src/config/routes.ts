import { lazy } from 'react';

// Define route types
interface RouteConfig {
  path: RoutePath;
  component: React.LazyExoticComponent<() => JSX.Element>;
  preload?: () => void;
  children?: RouteConfig[];
}

// Map of route paths to their module paths
const ROUTE_MODULE_MAP = {
  '/': 'home/Home',
  '/about': 'about/About',
  '/gallery': 'gallery/Gallery',
  '/contact': 'contact/Contact',
} as const;

export type RoutePath = keyof typeof ROUTE_MODULE_MAP;

const Home = lazy(() => import('@/pages/home/Home'));
const Gallery = lazy(() => import('@/pages/gallery/Gallery'));
const About = lazy(() => import('@/pages/about/About'));
const Contact = lazy(() => import('@/pages/contact/Contact'));

// Define routes with preloading capability
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/gallery',
    component: Gallery,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/contact',
    component: Contact,
  },
];

// Preload utilities
export function preloadRoute(path: RoutePath): void {
  const route = routes.find(r => r.path === path);
  route?.preload?.();
}

export function preloadRoutes(): void {
  routes.forEach(route => route.preload?.());
}

// Type guard for route existence
export function isValidRoute(path: string): path is RoutePath {
  return routes.some(route => route.path === path);
}

// Get route configuration by path
export function getRouteByPath(path: RoutePath): RouteConfig | undefined {
  return routes.find(route => route.path === path);
}