import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { CookieConsent } from './CookieConsent';

describe('CookieConsent', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders cookie consent banner', () => {
    render(<CookieConsent />);
    expect(screen.getByText(/We use cookies/i)).toBeInTheDocument();
  });

  it('has working accept button', () => {
    render(<CookieConsent />);
    const acceptButton = screen.getByRole('button', { name: /Accept/i });
    expect(acceptButton).toBeInTheDocument();
    fireEvent.click(acceptButton);
  });

  it('has working decline button', () => {
    render(<CookieConsent />);
    const declineButton = screen.getByRole('button', { name: /Decline/i });
    expect(declineButton).toBeInTheDocument();
    fireEvent.click(declineButton);
  });

  it('has correct heading hierarchy', () => {
    render(<CookieConsent />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-label', 'Cookie consent');
  });

  it('includes link to privacy policy', () => {
    render(<CookieConsent />);
    const link = screen.getByRole('link', { name: /Learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/privacy');
  });

  it('shows both accept and decline buttons', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('button', { name: /Accept/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Decline/i })).toBeInTheDocument();
  });
});
