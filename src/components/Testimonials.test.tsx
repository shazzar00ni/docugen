import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders testimonials section', () => {
    render(<Testimonials />);
    expect(screen.getByRole('heading', { name: /Loved by developers/i })).toBeInTheDocument();
  });

  it('renders all testimonial cards', () => {
    render(<Testimonials />);
    expect(screen.getByText(/DocuGen saved me hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Finally, a docs tool/i)).toBeInTheDocument();
    expect(screen.getByText(/The output quality is professional/i)).toBeInTheDocument();
  });

  it('renders author names', () => {
    render(<Testimonials />);
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument();
    expect(screen.getByText(/Marcus Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Elena Rodriguez/i)).toBeInTheDocument();
  });

  it('renders company names', () => {
    render(<Testimonials />);
    expect(screen.getByText(/Vercel/i)).toBeInTheDocument();
    expect(screen.getByText(/Stripe/i)).toBeInTheDocument();
    expect(screen.getByText(/Linear/i)).toBeInTheDocument();
  });
});
