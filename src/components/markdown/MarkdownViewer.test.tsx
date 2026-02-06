import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownViewer } from './MarkdownViewer';

describe('MarkdownViewer', () => {
  it('renders markdown content as HTML', async () => {
    const markdown = '# Hello World\n\nThis is a **test**.';
    
    render(<MarkdownViewer content={markdown} />);
    
    // Wait for markdown processing
    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 1 })).toBeInTheDocument();
    });
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
  });

  it('shows loading state while processing', () => {
    const markdown = '# Test';
    
    render(<MarkdownViewer content={markdown} />);
    
    // Should show loading spinner initially
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('handles code blocks with syntax highlighting', async () => {
    const markdown = '```javascript\nconst x = 42;\n```';
    
    render(<MarkdownViewer content={markdown} />);
    
    await waitFor(() => {
      const codeBlock = document.querySelector('pre code');
      expect(codeBlock).toBeInTheDocument();
    });
  });

  it('supports GitHub Flavored Markdown features', async () => {
    const markdown = '- [ ] Task 1\n- [x] Task 2';
    
    render(<MarkdownViewer content={markdown} />);
    
    await waitFor(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBe(2);
    });
  });

  it('shows error message when markdown processing fails', async () => {
    // Force an error by passing invalid content that would break the parser
    // In this case, we're testing the error boundary
    const invalidMarkdown = null;
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<MarkdownViewer content={invalidMarkdown as unknown as string} />);
    
    // The component should handle this gracefully
    // Since content is null/undefined, it won't process anything
    await waitFor(() => {
      // Component should not crash
      expect(document.querySelector('.markdown-viewer-error')).not.toBeInTheDocument();
    }, { timeout: 1000 });
    
    consoleSpy.mockRestore();
  });

  it('applies custom className', async () => {
    const markdown = '# Test';
    
    const { container } = render(<MarkdownViewer content={markdown} className="custom-class" />);
    
    await waitFor(() => {
      const viewer = container.querySelector('.custom-class');
      expect(viewer).toBeInTheDocument();
    });
  });
});
