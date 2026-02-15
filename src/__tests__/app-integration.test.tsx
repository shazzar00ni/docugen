import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { NavItem } from '../lib/nav';

describe('Breadcrumbs', () => {
  it('renders breadcrumb trail', () => {
    const items: NavItem[] = [
      { id: 'a', title: 'A', level: 1, children: [] },
      { id: 'b', title: 'B', level: 2, children: [] },
    ];
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb navigation' })).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders separators between items', () => {
    const items: NavItem[] = [
      { id: 'a', title: 'A', level: 1, children: [] },
      { id: 'b', title: 'B', level: 2, children: [] },
    ];
    render(<Breadcrumbs items={items} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
  });

  it('returns null for empty items', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('links items to their headings', () => {
    const items: NavItem[] = [{ id: 'section-1', title: 'Section 1', level: 1, children: [] }];
    render(<Breadcrumbs items={items} />);
    const link = screen.getByRole('link', { name: 'Section 1' });
    expect(link).toHaveAttribute('href', '#section-1');
  });
});

describe('App integration', () => {
  beforeEach(() => {
    // Mock DOMPurify for MarkdownViewer
    vi.stubGlobal('DOMPurify', {
      sanitize: vi.fn((html: string) => html),
    });
  });

  it('renders initial upload view', () => {
    render(<App />);
    expect(screen.getByText('Drop your Markdown files here')).toBeInTheDocument();
    expect(screen.getByTestId('doc-upload-input')).toBeInTheDocument();
  });

  it('renders empty state when no file uploaded', () => {
    render(<App />);
    expect(screen.queryByRole('navigation', { name: 'Document navigation' })).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Table of contents' })).not.toBeInTheDocument();
  });

  it('handles file upload without filename gracefully', async () => {
    render(<App />);

    const input = screen.getByTestId('doc-upload-input') as HTMLInputElement;

    // Simulate file with no name
    Object.defineProperty(input, 'files', {
      value: [],
      writable: false,
    });

    fireEvent.change(input);

    // Should remain in upload view since no file
    expect(screen.getByText('Drop your Markdown files here')).toBeInTheDocument();
  });
});