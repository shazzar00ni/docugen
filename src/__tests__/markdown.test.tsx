import { describe, it, expect, vi } from 'vitest';
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

  it('escapes HTML inside paragraphs', () => {
    const md = 'Paragraph with <strong>bold</strong> text';
    const html = parseMarkdown(md);
    expect(html).toContain('Paragraph with &lt;strong&gt;bold&lt;/strong&gt; text');
  });

  it('renders unordered lists', () => {
    const md = '- First\n- Second\n- Third';
    const html = parseMarkdown(md);
    expect(html).toContain('<ul><li>First</li></ul>');
    expect(html).toContain('<ul><li>Second</li></ul>');
    expect(html).toContain('<ul><li>Third</li></ul>');
  });

  it('renders ordered lists', () => {
    const md = '1. One\n2. Two\n3. Three';
    const html = parseMarkdown(md);
    expect(html).toContain('<ol><li>One</li></ol>');
    expect(html).toContain('<ol><li>Two</li></ol>');
    expect(html).toContain('<ol><li>Three</li></ol>');
  });

  it('renders fenced code blocks', () => {
    const md = '```\nconsole.log("hi");\n```';
    const html = parseMarkdown(md);
    expect(html).toContain('<pre><code>console.log("hi");</code></pre>');
  });

  it('renders indented code blocks', () => {
    const md = '    const x = 1;\n    console.log(x);';
    const html = parseMarkdown(md);
    expect(html).toContain('<pre><code>const x = 1;\nconsole.log(x);</code></pre>');
  });

  it('renders inline code', () => {
    const md = 'Use `const x = 1` to declare.';
    const html = parseMarkdown(md);
    expect(html).toContain('<p>Use <code>const x = 1</code> to declare.</p>');
  });

  it('detects autolinks', () => {
    const md = 'Visit https://example.com for more.';
    const html = parseMarkdown(md);
    expect(html).toContain(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>'
    );
  });
});

describe('MarkdownViewer with new constructs', () => {
  beforeEach(() => {
    vi.stubGlobal('DOMPurify', {
      sanitize: vi.fn((html: string) => html),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders sanitized lists via MarkdownViewer', () => {
    const md = '- Item';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders sanitized code blocks via MarkdownViewer', () => {
    const md = '```js\nconsole.log(1);\n```';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('console.log(1);')).toBeInTheDocument();
  });

  it('renders sanitized inline code via MarkdownViewer', () => {
    const md = 'Here is `inline` code.';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('inline')).toBeInTheDocument();
  });

  it('renders sanitized autolinks via MarkdownViewer', () => {
    const md = 'See https://docugen.com';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://docugen.com');
    expect(link).toHaveTextContent('https://docugen.com');
  });
});
