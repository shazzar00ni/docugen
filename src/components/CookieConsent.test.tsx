import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { CookieConsent } from './CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    // Mock localStorage to start fresh for each test
    const mockLocalStorage = {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] || null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
      clear() {
        this.store = {};
      },
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders cookie consent banner when no consent stored', async () => {
    render(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });
  });

  it('has working accept button', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    const acceptButton = screen.getByText('Accept');
    expect(acceptButton).toBeInTheDocument();
    fireEvent.click(acceptButton);
    
    // After clicking, banner should disappear
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
    });
  });

  it('has working decline button', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    const declineButton = screen.getByText('Decline');
    expect(declineButton).toBeInTheDocument();
    fireEvent.click(declineButton);
    
    // After clicking, banner should disappear
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
    });
  });

  it('has correct heading hierarchy', async () => {
    render(<CookieConsent />);
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-label', 'Cookie consent');
    });
  });

  it('includes link to privacy policy', async () => {
    render(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    const link = screen.getByRole('link', { name: /Learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/privacy');
  });

  it('shows both accept and decline buttons', async () => {
    render(<CookieConsent />);
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();
  });

  it('does not render when consent already stored', () => {
    localStorage.setItem('docugen-cookie-consent', 'accepted');
    render(<CookieConsent />);
    expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
  });

  it('stores acceptance in localStorage', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('docugen-cookie-consent')).toBe('accepted');
    });
  });

  it('stores decline in localStorage', async () => {
    render(<CookieConsent />);
    
    await waitFor(() => {
      expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
    });

    const declineButton = screen.getByText('Decline');
    fireEvent.click(declineButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('docugen-cookie-consent')).toBe('declined');
    });
  });
});