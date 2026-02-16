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

/**
 * Error boundary component for catching React errors.
 * Provides fallback UI and error logging functionality.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  /**
   * Updates state when error boundary catches an error.
   *
   * @param error - The error that was thrown
   * @returns Error boundary state with error information
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Catches errors in child components and logs them.
   *
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information from React
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  /**
   * Resets error boundary state for retry attempt.
   */
  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Renders error boundary UI.
   * Shows error message with retry button when error occurs.
   *
   * @returns Error UI with fallback or default error message
   */
  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Something went wrong</h2>
            <p className="text-slate-300 mb-6">
              We encountered an unexpected error. Please try again.
            </p>
            {this.state.error && (
              <p className="text-sm text-slate-500 mb-6 font-mono">{this.state.error.message}</p>
            )}
            <Button onClick={this.handleRetry}>Try Again</Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
