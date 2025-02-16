import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4 text-center">
          <h1 className="text-2xl font-bold text-retro-red">Something went wrong</h1>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="rounded bg-retro-green px-4 py-2 font-medium text-retro-black transition-colors hover:bg-retro-green-bright"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 