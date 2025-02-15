import { lazy } from 'react';

// Define route types
interface RouteConfig {
  path: string;
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

type RoutePath = keyof typeof ROUTE_MODULE_MAP;

// Helper to create lazy loaded components with proper typing
function lazyLoad(path: RoutePath) {
  const modulePath = ROUTE_MODULE_MAP[path];
  return lazy(() => 
    /* @vite-ignore */
    import(`../pages/${modulePath}`).then(module => ({
      default: module.default
    }))
  );
}

// Define routes with preloading capability
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazyLoad('/'),
    preload: () => import('../pages/home/Home'),
  },
  {
    path: '/about',
    component: lazyLoad('/about'),
    preload: () => import('../pages/about/About'),
  },
  {
    path: '/gallery',
    component: lazyLoad('/gallery'),
    preload: () => import('../pages/gallery/Gallery'),
  },
  {
    path: '/contact',
    component: lazyLoad('/contact'),
    preload: () => import('../pages/contact/Contact'),
  },
];

// Preload utilities
export function preloadRoute(path: string): void {
  const route = routes.find(r => r.path === path);
  route?.preload?.();
}

export function preloadRoutes(): void {
  routes.forEach(route => route.preload?.());
}

// Type guard for route existence
export function isValidRoute(path: string): boolean {
  return routes.some(route => route.path === path);
}

// Get route configuration by path
export function getRouteByPath(path: string): RouteConfig | undefined {
  return routes.find(route => route.path === path);
}