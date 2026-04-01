import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkipToContent } from 'src/components/SkipToContent';
import { SKIP_TO_CONTENT_TEXT } from 'src/data/content';

describe('SkipToContent', () => {
  it('renders with correct link text', () => {
    render(<SkipToContent />);
    const link = screen.getByText(SKIP_TO_CONTENT_TEXT);
    expect(link).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<SkipToContent />);
    const link = screen.getByText(SKIP_TO_CONTENT_TEXT);
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('is hidden from visual users by default (sr-only class)', () => {
    render(<SkipToContent />);
    const link = screen.getByText(SKIP_TO_CONTENT_TEXT);
    expect(link).toHaveClass('sr-only');
  });

  it('becomes visible when focused', () => {
    render(<SkipToContent />);
    const link = screen.getByText(SKIP_TO_CONTENT_TEXT);
    fireEvent.focus(link);
    expect(link).toHaveClass('focus:not-sr-only');
  });
});
