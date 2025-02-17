import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

export const SentryTest = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (import.meta.env.MODE === 'development') {
    // Show debug panel with keyboard shortcut (Ctrl + Shift + D)
    React.useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'D') {
          setIsVisible(prev => !prev);
        }
      };
      
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    if (!isVisible) return null;

    return (
      <div className="fixed bottom-4 right-4 space-y-2 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white text-sm font-medium">Sentry Debug Panel</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <button
          onClick={() => {
            throw new Error('Test Sentry Error');
          }}
          className="block w-full bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600 transition-colors"
        >
          Test Error
        </button>
        <button
          onClick={() => {
            const transaction = Sentry.startTransaction({
              name: 'Test Transaction'
            });
            Sentry.configureScope((scope: Sentry.Scope) => {
              scope.setSpan(transaction);
            });
            
            setTimeout(() => {
              transaction.finish();
            }, 2000);
          }}
          className="block w-full bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Test Transaction
        </button>
      </div>
    );
  }
  return null;
}; 