import { useState, useEffect } from 'react';

interface PageStateOptions<T> {
  loadingFn?: () => Promise<T>;
  initialData?: T | null;
  onError?: (error: Error) => void;
}

interface PageState<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  setPageData: (data: T) => void;
  resetError: () => void;
  startLoading: () => void;
  endLoading: () => void;
}

export function usePageState<T>({ 
  loadingFn, 
  initialData = null, 
  onError 
}: PageStateOptions<T> = {}): PageState<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(initialData);

  useEffect(() => {
    if (loadingFn) {
      setIsLoading(true);
      loadingFn()
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => {
          setError(err);
          onError?.(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loadingFn]);

  return {
    isLoading,
    error,
    data,
    setPageData: setData,
    resetError: () => setError(null),
    startLoading: () => setIsLoading(true),
    endLoading: () => setIsLoading(false),
  };
} 