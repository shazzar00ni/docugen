import { Component, ErrorInfo, ReactNode } from 'react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

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

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dark-100 mb-4">
              Something went wrong
            </h2>
            <p className="text-dark-300 mb-6">
              We encountered an unexpected error. Please try again.
            </p>
            {this.state.error && (
              <p className="text-sm text-dark-500 mb-6 font-mono">
                {this.state.error.message}
              </p>
            )}
            <Button onClick={this.handleRetry}>
              Try Again
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
