import { useRef, useEffect } from 'react';
import { RoutePath } from '@/config/routes';

interface PreloadOptions {
  threshold?: number;
  rootMargin?: string;
}

export function usePreloadOnVisible(
  route: RoutePath,
  options: PreloadOptions = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Implement your preloading logic here
            // For example:
            // preloadRoute(route);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [route, options.threshold, options.rootMargin]);

  return ref;
} 