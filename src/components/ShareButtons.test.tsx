import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ShareButtons } from './ShareButtons';

describe('ShareButtons', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders share button', () => {
    render(<ShareButtons />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('opens share menu when button is clicked', () => {
    render(<ShareButtons />);
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);
    expect(screen.getByText(/Share via/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('toggles menu open and closed', () => {
    render(<ShareButtons />);
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);
    expect(screen.getByText(/Share via/i)).toBeInTheDocument();
  });

  it('shows copy link option', () => {
    render(<ShareButtons />);
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
  });

  it('includes Twitter share link with correct URL', () => {
    render(<ShareButtons url="https://example.com" title="Test Title" />);
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('example.com'));
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('Test%20Title'));
  });

  it('includes LinkedIn share link', () => {
    render(<ShareButtons />);
    const button = screen.getByRole('button', { name: /share/i });
    fireEvent.click(button);
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute('href', expect.stringContaining('docugen.ai'));
  });
});
