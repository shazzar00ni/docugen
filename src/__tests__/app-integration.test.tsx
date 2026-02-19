import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('renders initial upload view', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    expect(screen.getByText('Drop your Markdown files here')).toBeInTheDocument();
  });

  it('renders docs viewer after upload', async () => {
    const { container } = render(<App />);
    const file = new File(['# Test\n## Subsection'], 'test.md', { type: 'text/markdown' });
    const input = screen.getByTestId('doc-upload-input');
    // Simulate file upload
    const uploader = container.querySelector('UploadArea') as any;
    await uploader.props.onUpload('# Test\n## Subsection', 'test.md');

    // Verify navigation/TOC/Viewer are rendered
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Subsection')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument();
  });
});
