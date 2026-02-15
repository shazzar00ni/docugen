import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { useState } from 'react';

describe('ErrorBoundary', () => {
  // Suppress console.error for tests where we expect errors
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('displays error message', () => {
    const ThrowError = () => {
      throw new Error('Specific error message');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Specific error message')).toBeInTheDocument();
  });

  it('resets error state when retry button is clicked', () => {
    let shouldThrow = true;

    const ConditionalError = () => {
      if (shouldThrow) {
        throw new Error('First error');
      }
      return <div>Success after retry</div>;
    };

    render(
      <ErrorBoundary>
        <ConditionalError />
      </ErrorBoundary>
    );

    // Error should be displayed initially
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('First error')).toBeInTheDocument();

    // Stop throwing error before retry
    shouldThrow = false;

    // Click retry button
    const retryButton = screen.getByRole('button', { name: 'Try Again' });
    fireEvent.click(retryButton);

    // Component should render successfully after retry
    expect(screen.getByText('Success after retry')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('logs error to console when caught', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const testError = new Error('Test logging error');

    const ThrowError = () => {
      throw testError;
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error caught by ErrorBoundary:', testError);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Component stack:', expect.any(String));
  });

  it('catches errors in event handlers within children', () => {
    const ButtonWithError = () => {
      const [hasError, setHasError] = useState(false);

      if (hasError) {
        throw new Error('Event handler error');
      }

      return <button onClick={() => setHasError(true)}>Click to error</button>;
    };

    render(
      <ErrorBoundary>
        <ButtonWithError />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: 'Click to error' });
    fireEvent.click(button);

    // Error boundary should catch the error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Event handler error')).toBeInTheDocument();
  });

  it('displays default fallback UI elements correctly', () => {
    const ThrowError = () => {
      throw new Error('UI test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // Check all expected UI elements
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an unexpected error. Please try again.')).toBeInTheDocument();
    expect(screen.getByText('UI test error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  it('renders multiple children correctly when no error', () => {
    render(
      <ErrorBoundary>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('handles null error message gracefully', () => {
    const ThrowNullError = () => {
      const error = new Error();
      error.message = '';
      throw error;
    };

    render(
      <ErrorBoundary>
        <ThrowNullError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('maintains proper component lifecycle after error', () => {
    let renderCount = 0;
    let shouldThrow = true;

    const CountingComponent = () => {
      renderCount++;
      if (shouldThrow) {
        throw new Error('Lifecycle test error');
      }
      return <div>Render count: {renderCount}</div>;
    };

    render(
      <ErrorBoundary>
        <CountingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Reset error state
    shouldThrow = false;
    const retryButton = screen.getByRole('button', { name: 'Try Again' });
    fireEvent.click(retryButton);

    // Component should re-render successfully
    expect(screen.getByText(/Render count:/)).toBeInTheDocument();
  });
});