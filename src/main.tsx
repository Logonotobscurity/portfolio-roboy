import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { LoadingProvider } from '@/providers/LoadingProvider';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/react';
import { initSentry } from './utils/sentry';

// Initialize Sentry as early as possible
initSentry();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

// Create error boundary component
const SentryErrorBoundary = Sentry.withErrorBoundary(({ children }) => {
  return (
    <div>
      {children}
      {import.meta.env.MODE === 'development' && (
        <button
          onClick={() => {
            throw new Error('Test Sentry Error');
          }}
          className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Test Error
        </button>
      )}
    </div>
  );
}, {
  fallback: (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2">We've been notified and will fix this issue soon.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reload Page
        </button>
      </div>
    </div>
  ),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SentryErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <App />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid rgba(45, 0, 247, 0.2)'
                }
              }}
            />
          </LoadingProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </SentryErrorBoundary>
  </React.StrictMode>
);
