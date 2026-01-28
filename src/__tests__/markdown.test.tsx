import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '../lib/markdown';
import { render, screen } from '@testing-library/react';
import { MarkdownViewer } from '../components/markdown/MarkdownViewer';

describe('parseMarkdown', () => {
  it('generates headings and paragraphs', () => {
    const md = '# Title\n\nThis is a paragraph.\n\n## Subtitle\nMore text.';
    const html = parseMarkdown(md);
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<p>This is a paragraph.</p>');
    expect(html).toContain('<h2>Subtitle</h2>');
  });
});

describe('MarkdownViewer', () => {
  it('renders sanitized content and strips dangerous HTML', () => {
    const dangerous = '<script>alert("xss");</script><h1>Safe</h1>';
    render(<MarkdownViewer content={dangerous} />);
    // script tag should be removed by sanitizer
    expect(document.querySelector('script')).toBeNull();
    // sanitized content should render
    expect(screen.getByText('Safe')).toBeInTheDocument();
  });

  it('renders sample parsed HTML', () => {
    const sampleMd = '# Hello';
    const html = parseMarkdown(sampleMd);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
