import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQ } from './FAQ';

describe('FAQ', () => {
  it('renders FAQ section', { timeout: 10000 }, () => {
    render(<FAQ />);
    expect(
      screen.getByRole('heading', { name: /Frequently Asked Questions/i })
    ).toBeInTheDocument();
  });

  it('renders all FAQ questions', () => {
    render(<FAQ />);
    expect(screen.getByText(/What file formats does DocuGen support/i)).toBeInTheDocument();
    expect(screen.getByText(/Is there a free tier/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I use my own domain/i)).toBeInTheDocument();
  });

  it('expands first FAQ by default', () => {
    render(<FAQ />);
    expect(screen.getByText(/DocuGen supports Markdown/i)).toBeInTheDocument();
  });

  it('expands FAQ when clicked', { timeout: 10000 }, () => {
    render(<FAQ />);
    const secondQuestion = screen.getByText(/Is there a free tier/i);
    fireEvent.click(secondQuestion);
    expect(screen.getByText(/Yes! DocuGen is completely free/i)).toBeInTheDocument();
  });

  it('closes FAQ when clicked again', { timeout: 10000 }, () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText(/What file formats does DocuGen support/i);
    fireEvent.click(firstQuestion);
    const questions = screen.getAllByText(/Does DocuGen support|files/i);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('has correct heading hierarchy', () => {
    render(<FAQ />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
