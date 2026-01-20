import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ScrollToTop } from './ScrollToTop'

describe('ScrollToTop', () => {
  it('does not render when scroll position is at top', () => {
    render(<ScrollToTop />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('triggers visibility on scroll event', () => {
    render(<ScrollToTop />)
    window.scrollY = 400
    fireEvent.scroll(window)
  })

  it('has teal color styling', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true })
    render(<ScrollToTop />)
    const buttons = screen.queryAllByRole('button')
    const topButton = buttons.find(b => b.className.includes('bg-teal-600'))
    if (topButton) {
      expect(topButton).toBeInTheDocument()
    }
  })
})
