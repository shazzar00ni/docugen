import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Newsletter } from './Newsletter'

describe('Newsletter', () => {
  it('renders newsletter section', { timeout: 10000 }, () => {
    render(<Newsletter />)
    expect(screen.getByRole('heading', { name: /Stay in the loop/i })).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<Newsletter />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Newsletter />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows success message after submission', () => {
    render(<Newsletter />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument()
  })

  it('does not submit with empty email', () => {
    render(<Newsletter />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(screen.queryByText(/You're on the list!/i)).not.toBeInTheDocument()
  })

  it('hides form after successful submission', () => {
    render(<Newsletter />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
