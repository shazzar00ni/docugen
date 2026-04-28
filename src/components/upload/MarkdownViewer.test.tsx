import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MarkdownViewer } from './MarkdownViewer';
import { extractHeadings } from './markdownUtils';

// rehype-highlight requires a DOM environment; highlight.js CSS import is handled by Vite
vi.mock('highlight.js/styles/github-dark.css', () => ({}));

describe('extractHeadings', () => {
  it('extracts h1 through h6 headings', () => {
    const md = '# Title\n## Section\n### Sub\n#### Deep\n##### Deeper\n###### Deepest';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(6);
    expect(headings[0]).toEqual({ id: 'title', text: 'Title', level: 1 });
    expect(headings[1]).toEqual({ id: 'section', text: 'Section', level: 2 });
    expect(headings[2]).toEqual({ id: 'sub', text: 'Sub', level: 3 });
  });

  it('slugifies heading text correctly', () => {
    const headings = extractHeadings('# Hello World!\n## API Reference (v2)');
    expect(headings[0].id).toBe('hello-world');
    expect(headings[1].id).toBe('api-reference-v2');
  });

  it('deduplicates repeated headings', () => {
    const headings = extractHeadings('## Setup\n## Setup\n## Setup');
    expect(headings[0].id).toBe('setup');
    expect(headings[1].id).toBe('setup-1');
    expect(headings[2].id).toBe('setup-2');
  });

  it('ignores non-heading lines', () => {
    const md = 'Some paragraph\n\n> blockquote\n\n```code```\n\n# Real Heading';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Real Heading');
  });

  it('returns empty array for empty content', () => {
    expect(extractHeadings('')).toEqual([]);
  });
});

describe('MarkdownViewer', () => {
  it('renders the file name', () => {
    render(<MarkdownViewer content="# Hello" fileName="README.md" />);
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('renders heading content', () => {
    render(<MarkdownViewer content="# My Document" fileName="test.md" />);
    expect(screen.getByText('My Document')).toBeInTheDocument();
  });

  it('renders paragraph content', () => {
    render(<MarkdownViewer content="Some text here." fileName="test.md" />);
    expect(screen.getByText('Some text here.')).toBeInTheDocument();
  });

  it('calls onHeadingsExtracted with parsed headings', () => {
    const onHeadings = vi.fn();
    render(
      <MarkdownViewer
        content={'# Introduction\n## Usage'}
        fileName="guide.md"
        onHeadingsExtracted={onHeadings}
      />
    );
    expect(onHeadings).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ text: 'Introduction', level: 1 }),
        expect.objectContaining({ text: 'Usage', level: 2 }),
      ])
    );
  });

  it('renders inline code with distinct styling', () => {
    render(<MarkdownViewer content="Use `npm install` to start." fileName="test.md" />);
    const codeEl = screen.getByText('npm install');
    expect(codeEl.tagName.toLowerCase()).toBe('code');
  });

  it('renders a link', () => {
    render(<MarkdownViewer content="[GitHub](https://github.com)" fileName="test.md" />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com');
  });

  it('renders GFM tables', () => {
    const md = '| Name | Value |\n| --- | --- |\n| foo | bar |';
    render(<MarkdownViewer content={md} fileName="test.md" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});

describe('MarkdownViewer - fireEvent interactions', () => {
  it('renders without crashing on empty content', () => {
    const { container } = render(<MarkdownViewer content="" fileName="empty.md" />);
    expect(container).toBeTruthy();
  });

  it('renders heading with an id attribute for anchor navigation', () => {
    const { container } = render(
      <MarkdownViewer content="# Overview\nSome text" fileName="doc.md" />
    );
    const heading = container.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.getAttribute('id')).toBeTruthy();
  });

  it('allows selecting text in rendered content', () => {
    render(<MarkdownViewer content="Selectable text" fileName="test.md" />);
    const p = screen.getByText('Selectable text');
    fireEvent.mouseDown(p);
    fireEvent.mouseUp(p);
    // No errors thrown is sufficient
  });
});
