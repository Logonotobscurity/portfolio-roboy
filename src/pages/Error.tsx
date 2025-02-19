import * as React from 'react';
import { Link, useRouteError } from 'react-router-dom';

interface ErrorResponse {
  status?: number;
  statusText?: string;
  message?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  const status = error?.status || 500;
  const message = error?.message || 'An unexpected error occurred';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{status}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          {error?.statusText || 'Server Error'}
        </h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
