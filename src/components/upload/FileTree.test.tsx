import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileTree } from './FileTree';

function makeFile(name: string, relativePath?: string): File {
  const file = new File(['content'], name, { type: 'text/plain' });
  if (relativePath) {
    Object.defineProperty(file, 'webkitRelativePath', { value: relativePath });
  }
  return file;
}

describe('FileTree', () => {
  it('shows empty state when no files provided', () => {
    render(<FileTree files={[]} activeFile={null} onSelect={() => {}} />);
    expect(screen.getByText('No files uploaded')).toBeInTheDocument();
  });

  it('renders a list of flat files', () => {
    const files = [makeFile('README.md'), makeFile('guide.mdx')];
    render(<FileTree files={files} activeFile={null} onSelect={() => {}} />);
    expect(screen.getByText('README.md')).toBeInTheDocument();
    expect(screen.getByText('guide.mdx')).toBeInTheDocument();
  });

  it('calls onSelect when a file is clicked', () => {
    const onSelect = vi.fn();
    const file = makeFile('README.md');
    render(<FileTree files={[file]} activeFile={null} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('README.md'));
    expect(onSelect).toHaveBeenCalledWith(file);
  });

  it('marks active file with aria-current="page"', () => {
    const file = makeFile('README.md');
    render(<FileTree files={[file]} activeFile={file} onSelect={() => {}} />);
    const btn = screen.getByText('README.md').closest('button');
    expect(btn).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark inactive files with aria-current', () => {
    const file = makeFile('README.md');
    render(<FileTree files={[file]} activeFile={null} onSelect={() => {}} />);
    const btn = screen.getByText('README.md').closest('button');
    expect(btn).not.toHaveAttribute('aria-current');
  });

  it('renders folder nodes from webkitRelativePath', () => {
    const file = makeFile('README.md', 'docs/README.md');
    render(<FileTree files={[file]} activeFile={null} onSelect={() => {}} />);
    expect(screen.getByText('docs')).toBeInTheDocument();
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('toggles folder expand/collapse on click', () => {
    const file = makeFile('README.md', 'docs/README.md');
    render(<FileTree files={[file]} activeFile={null} onSelect={() => {}} />);
    // Initially expanded - file visible
    expect(screen.getByText('README.md')).toBeInTheDocument();
    // Click folder to collapse
    fireEvent.click(screen.getByText('docs'));
    expect(screen.queryByText('README.md')).not.toBeInTheDocument();
    // Click again to expand
    fireEvent.click(screen.getByText('docs'));
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('sorts folders before files', () => {
    const fileA = makeFile('alpha.md');
    const fileB = makeFile('beta.md', 'folder/beta.md');
    render(<FileTree files={[fileA, fileB]} activeFile={null} onSelect={() => {}} />);
    const items = screen.getAllByRole('button');
    // First item should be the folder
    expect(items[0].textContent).toContain('folder');
  });

  it('provides accessible nav label', () => {
    const file = makeFile('README.md');
    render(<FileTree files={[file]} activeFile={null} onSelect={() => {}} />);
    expect(screen.getByRole('navigation', { name: 'File tree' })).toBeInTheDocument();
  });
});
