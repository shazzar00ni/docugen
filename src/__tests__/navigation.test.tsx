import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { extractNavFromHtml } from '../lib/nav';
import { Navigation } from '../components/navigation/Navigation';
import { TableOfContents } from '../components/navigation/TableOfContents';

// Mock IntersectionObserver for tests
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockImplementation((callback: IntersectionObserverCallback) => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

describe('extractNavFromHtml', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('extracts simple headings', () => {
    const html = '<h1>Title</h1><p>Para</p><h2>Subtitle</h2>';
    const nav = extractNavFromHtml(html);
    expect(nav).toEqual([
      { id: 'title', title: 'Title', level: 1, children: [] },
      { id: 'subtitle', title: 'Subtitle', level: 2, children: [] },
    ]);
  });

  it('extracts nested heading hierarchy', () => {
    const html = '<h1>Top</h1><h2>Child 1</h2><h2>Child 2</h2><h3>Grandchild</h3>';
    const nav = extractNavFromHtml(html);
    expect(nav).toEqual([
      {
        id: 'top',
        title: 'Top',
        level: 1,
        children: [
          { id: 'child-1', title: 'Child 1', level: 2, children: [] },
          {
            id: 'child-2',
            title: 'Child 2',
            level: 2,
            children: [{ id: 'grandchild', title: 'Grandchild', level: 3, children: [] }],
          },
        ],
      },
    ]);
  });

  it('decodes HTML entities in titles', () => {
    const html = '<h1>API &amp; Reference</h1>';
    const nav = extractNavFromHtml(html);
    expect(nav[0].title).toBe('API & Reference');
  });

  it('generates unique IDs by cleaning non-alphanumerics', () => {
    const html = '<h1>Hello World!</h1>';
    const nav = extractNavFromHtml(html);
    expect(nav[0].id).toBe('hello-world');
  });
});

describe('Navigation', () => {
  it('renders navigation tree', () => {
    const items = [
      { id: 'a', title: 'A', level: 1, children: [] },
      {
        id: 'b',
        title: 'B',
        level: 1,
        children: [{ id: 'c', title: 'C', level: 2, children: [] }],
      },
    ];
    render(<Navigation items={items} activeId="c" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'C' })).toHaveAttribute('href', '#c');
  });

  it('applies active and descendant styles', () => {
    const items = [{ id: 'a', title: 'A', level: 1, children: [] }];
    const { rerender } = render(<Navigation items={items} activeId="a" />);
    expect(screen.getByText('A')).toHaveClass('text-teal-400');

    rerender(<Navigation items={items} activeId="other" />);
    expect(screen.getByText('A')).not.toHaveClass('text-teal-400');
  });
});

describe('TableOfContents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders TOC tree', () => {
    const items = [
      { id: 'a', title: 'A', level: 1, children: [] },
      { id: 'b', title: 'B', level: 1, children: [] },
    ];
    render(<TableOfContents items={items} />);
    expect(screen.getByText('On this page')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'A' })).toHaveAttribute('href', '#a');
  });

  it('highlights active item', () => {
    const items = [{ id: 'a', title: 'A', level: 1, children: [] }];
    const { rerender } = render(<TableOfContents items={items} />);
    expect(screen.getByText('A')).not.toHaveClass('text-teal-400');

    rerender(<TableOfContents items={items} activeId="a" />);
    expect(screen.getByText('A')).toHaveClass('text-teal-400');
  });
});
