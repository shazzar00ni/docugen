import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadArea } from './UploadArea';

describe('UploadArea', () => {
  const onUpload = vi.fn();
  const onUploadError = vi.fn();

  beforeEach(() => {
    onUpload.mockClear();
    onUploadError.mockClear();
  });

  it('accepts valid .md file', async () => {
    render(<UploadArea onUpload={onUpload} />);
    const file = new File(['# Test'], 'test.md', { type: 'text/markdown' });
    const input = screen.getByTestId('doc-upload-input');
    await userEvent.upload(input, file);
    expect(onUpload).toHaveBeenCalledWith('# Test', 'test.md');
    expect(onUploadError).not.toHaveBeenCalled();
  });

  it('accepts valid .mdx file', async () => {
    render(<UploadArea onUpload={onUpload} />);
    const file = new File(['export const x = 1;'], 'test.mdx', { type: 'text/markdown' });
    const input = screen.getByTestId('doc-upload-input');
    await userEvent.upload(input, file);
    expect(onUpload).toHaveBeenCalledWith('export const x = 1;', 'test.mdx');
    expect(onUploadError).not.toHaveBeenCalled();
  });

  it('rejects non-markdown file', async () => {
    render(<UploadArea onUpload={onUpload} onUploadError={onUploadError} />);
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByTestId('doc-upload-input');
    await userEvent.upload(input, file);
    expect(onUpload).not.toHaveBeenCalled();
    expect(onUploadError).toHaveBeenCalledWith('Only .md and .mdx files are supported');
    expect(screen.getByText('Only .md and .mdx files are supported')).toBeInTheDocument();
  });

  it('handles file read errors gracefully', async () => {
    class MockFileReader {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      onabort: (() => void) | null = null;
      onloadend: (() => void) | null = null;
      onloadstart: (() => void) | null = null;
      onprogress: (() => void) | null = null;
      result: string | ArrayBuffer | null = null;
      error: Error | null = new Error('Read failed');
      readyState = 0;
      static EMPTY = 0;
      static LOADING = 1;
      static DONE = 2;
      abort(): void {}
      readAsText(_file: File): void {
        setTimeout(() => {
          this.error = new Error('Read failed');
          if (this.onerror) this.onerror();
        }, 0);
      }
      readAsArrayBuffer(_file: File): void {}
      readAsBinaryString(_file: File): void {}
      readAsDataURL(_file: File): void {}
    }
    vi.stubGlobal('FileReader', MockFileReader);
    render(<UploadArea onUpload={onUpload} onUploadError={onUploadError} />);
    const file = new File(['# Test'], 'test.md', { type: 'text/markdown' });
    const input = screen.getByTestId('doc-upload-input');
    await userEvent.upload(input, file);
    await new Promise(resolve => setTimeout(resolve, 0)); // Allow error handler to fire
    expect(onUploadError).toHaveBeenCalledWith('Failed to read file: Read failed');
  });
});
