import { useEffect, useRef } from 'react';
import { preloadRoute } from '../config/routes';

interface UsePreloadOnVisibleOptions {
  threshold?: number;
  rootMargin?: string;
}

export function usePreloadOnVisible(
  path: string,
  options: UsePreloadOnVisibleOptions = {}
): (node: Element | null) => void {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const callback = (node: Element | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    if (node) {
      elementRef.current = node;
      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    }
  };

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '50px' } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadRoute(path);
            if (elementRef.current && observerRef.current) {
              observerRef.current.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [path, options]);

  return callback;
} 