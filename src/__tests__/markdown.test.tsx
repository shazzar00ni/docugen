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

  it('renders blockquotes', () => {
    const md = '> A quote\n> over multiple lines';
    const html = parseMarkdown(md);
    expect(html).toContain('<blockquote>A quote\nover multiple lines</blockquote>');
  });

  it('renders blockquotes with inline constructs', () => {
    const md = '> See https://example.com and `inline` code.';
    const html = parseMarkdown(md);
    expect(html).toContain(
      '<blockquote>See <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a> and <code>inline</code> code.</blockquote>'
    );
  });

  it('renders simple tables', () => {
    const md = '| Name | Age |\n|------|-----|\n| Alice| 30  |\n| Bob  | 25  |';
    const html = parseMarkdown(md);
    expect(html).toContain('<table>');
    expect(html).toContain('<thead>');
    expect(html).toContain('<th align="left">Name</th>');
    expect(html).toContain('<th align="left">Age</th>');
    expect(html).toContain('<tbody>');
    expect(html).toContain('<td align="left">Alice</td>');
    expect(html).toContain('<td align="left">30</td>');
    expect(html).toContain('<td align="left">Bob</td>');
    expect(html).toContain('<td align="left">25</td>');
    expect(html).toContain('</table>');
  });

  it('renders tables with alignment', () => {
    const md = '| Left | Center | Right |\n|:----|:-----:|----:|\n| A    | B      | C    |';
    const html = parseMarkdown(md);
    expect(html).toContain('<th align="left">Left</th>');
    expect(html).toContain('<th align="center">Center</th>');
    expect(html).toContain('<th align="right">Right</th>');
    expect(html).toContain('<td align="left">A</td>');
    expect(html).toContain('<td align="center">B</td>');
    expect(html).toContain('<td align="right">C</td>');
  });

  it('renders tables with inline constructs inside cells', () => {
    const md = '| Name | Link |\n|------|------|\n| Doc  | https://docugen.com |';
    const html = parseMarkdown(md);
    expect(html).toContain('<td align="left">Doc</td>');
    expect(html).toContain(
      '<td align="left"><a href="https://docugen.com" target="_blank" rel="noopener noreferrer">https://docugen.com</a></td>'
    );
  });

  it('renders images with alt text', () => {
    const md = '![Alt text](https://example.com/image.png)';
    const html = parseMarkdown(md);
    expect(html).toContain('<img src="https://example.com/image.png" alt="Alt text" />');
  });

  it('renders images with title', () => {
    const md = '![Alt](https://example.com/image.png "Image title")';
    const html = parseMarkdown(md);
    expect(html).toContain(
      '<img src="https://example.com/image.png" alt="Alt" title="Image title" />'
    );
  });

  it('renders links with title', () => {
    const md = '[Example](https://example.com "Link title")';
    const html = parseMarkdown(md);
    expect(html).toContain(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer" title="Link title">Example</a>'
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

  it('renders sanitized blockquotes via MarkdownViewer', () => {
    const md = '> A note';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('A note')).toBeInTheDocument();
  });

  it('renders sanitized tables via MarkdownViewer', () => {
    const md = '| A | B |\n|---|---|\n| 1 | 2 |';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders sanitized images via MarkdownViewer', () => {
    const md = '![Logo](https://example.com/logo.png)';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/logo.png');
    expect(img).toHaveAttribute('alt', 'Logo');
  });

  it('renders sanitized links with title via MarkdownViewer', () => {
    const md = '[Example](https://example.com "Link title")';
    const html = parseMarkdown(md);
    render(<MarkdownViewer content={html} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('title', 'Link title');
    expect(link).toHaveTextContent('Example');
  });
});
