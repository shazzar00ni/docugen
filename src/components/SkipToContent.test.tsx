import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipToContent } from './SkipToContent';

describe('SkipToContent', () => {
  it('renders with correct link text', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to main content');
    expect(link).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('is hidden from visual users by default (sr-only class)', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveClass('sr-only');
  });

  it('becomes visible when focused', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveClass('focus:not-sr-only');
  });
});
