import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies placeholder', () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('applies default type as text', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('applies email type', () => {
    render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('applies custom value', () => {
    render(<Input value="test value" />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies disabled styles', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toHaveClass('opacity-50');
    expect(screen.getByRole('textbox')).toHaveClass('cursor-not-allowed');
  });
});
