import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (props: { error: Error; resetError: () => void }) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  override render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.resetError,
        });
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 rounded-lg bg-red-50 max-w-md">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-red-600 mb-4">
              {this.state.error.message}
            </p>
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 