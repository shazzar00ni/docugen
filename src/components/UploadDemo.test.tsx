import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UploadDemo } from './UploadDemo'

describe('UploadDemo', () => {
  it('renders drag and drop zone initially', () => {
    render(<UploadDemo />)
    expect(screen.getByText(/Drop your Markdown files here/i)).toBeInTheDocument()
  })

  it('shows file input on click', () => {
    render(<UploadDemo />)
    const dropzone = screen.getByText(/Drop your Markdown files here/i).closest('div')
    fireEvent.click(dropzone as Element)
  })

  it('accepts .md file', () => {
    render(<UploadDemo />)
    const file = new File(['# Hello'], 'test.md', { type: 'text/markdown' })
    const dropzone = screen.getByText(/Drop your Markdown files here/i).closest('div')
    
    Object.defineProperty(dropzone, 'contains', { value: () => true })
    
    fireEvent.drop(dropzone as Element, {
      dataTransfer: {
        files: [file],
      },
    })
  })

  it('rejects non-markdown files', () => {
    render(<UploadDemo />)
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' })
    const dropzone = screen.getByText(/Drop your Markdown files here/i).closest('div')
    
    fireEvent.drop(dropzone as Element, {
      dataTransfer: {
        files: [file],
      },
    })

    expect(screen.queryByText(/test.txt/i)).not.toBeInTheDocument()
  })
})
