import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies default variant and size', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-teal-600')
    expect(button).toHaveClass('px-6')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-dark-800')
  })

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('text-dark-300')
  })

  it('applies small size', () => {
    render(<Button size="sm">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-4')
    expect(button).toHaveClass('text-sm')
  })

  it('applies large size', () => {
    render(<Button size="lg">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-8')
    expect(button).toHaveClass('text-base')
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('renders as submit type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
