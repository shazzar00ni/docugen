import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonFeature } from './Skeleton'

describe('Skeleton', () => {
  it('renders skeleton element', () => {
    render(<Skeleton />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('applies base styles', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('bg-dark-800')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies variant styles', () => {
    render(<Skeleton variant="circular" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full')
  })

  it('applies rectangular variant', () => {
    render(<Skeleton variant="rectangular" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg')
  })

  it('applies custom width and height', () => {
    render(<Skeleton width={100} height={50} />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton.style.width).toBe('100px')
    expect(skeleton.style.height).toBe('50px')
  })

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class')
  })
})

describe('SkeletonCard', () => {
  it('renders multiple skeleton elements', () => {
    render(<SkeletonCard />)
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(1)
  })
})

describe('SkeletonButton', () => {
  it('renders skeleton button', () => {
    render(<SkeletonButton />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})

describe('SkeletonInput', () => {
  it('renders skeleton input', () => {
    render(<SkeletonInput />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})

describe('SkeletonFeature', () => {
  it('renders multiple skeleton elements', () => {
    render(<SkeletonFeature />)
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(1)
  })
})
