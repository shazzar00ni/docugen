import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, testTimeout } from 'vitest'
import { MobileMenu } from './MobileMenu'

describe('MobileMenu', () => {
  it('renders hamburger button by default', { timeout: 10000 }, () => {
    render(<MobileMenu />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('opens menu when button is clicked', () => {
    render(<MobileMenu />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })

  it('shows navigation links when menu is open', () => {
    render(<MobileMenu />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    expect(screen.getByText(/Features/i)).toBeInTheDocument()
    expect(screen.getByText(/How it Works/i)).toBeInTheDocument()
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument()
  })

  it('shows sign in and get early access buttons when menu is open', () => {
    render(<MobileMenu />)
    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Get Early Access/i })).toBeInTheDocument()
  })

  it('toggles between open and close icons', () => {
    render(<MobileMenu />)
    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })
})
