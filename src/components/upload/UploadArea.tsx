import { useState, useRef, useCallback } from 'react';

export type UploadAreaProps = {
  onUpload: (content: string, fileName?: string) => void;
  onUploadError?: (error: string) => void;
};

/**
 * Render an interactive dropzone and file picker for uploading Markdown (.md/.mdx) files.
 *
 * Validates file extension and MIME type, reads the selected file as text, and forwards the file content
 * and name to `onUpload`. When validation or read failures occur, the component displays an error banner
 * and invokes `onUploadError` if provided; errors are cleared automatically after 5 seconds.
 *
 * @param onUpload - Callback invoked with the file text and optional file name after a successful upload
 * @param onUploadError - Optional callback invoked with an error message when upload validation or reading fails
 * @returns The UploadArea React element
 */
export function UploadArea({ onUpload, onUploadError }: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isValidMarkdownFile = (file: File): boolean => {
    // Extension check
    const hasValidExtension = file.name.endsWith('.md') || file.name.endsWith('.mdx');
    if (!hasValidExtension) return false;
    // Some browsers/OS report empty MIME for .md files — allow if extension is valid
    if (!file.type) return true;
    // MIME type check for text files
    const validMimeTypes = ['text/markdown', 'text/plain', 'text/x-markdown'];
    return validMimeTypes.includes(file.type);
  };

  const readFileAsText = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(f);
    });
  };

  const handleError = useCallback(
    (message: string) => {
      setError(message);
      onUploadError?.(message);
      setTimeout(() => setError(null), 5000); // Auto-clear after 5s
    },
    [onUploadError]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);
  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      setError(null);
      const f = e.dataTransfer?.files?.[0];
      if (!f) return;
      if (!isValidMarkdownFile(f)) {
        handleError('Only .md and .mdx files are supported');
        return;
      }
      try {
        const content = await readFileAsText(f);
        onUpload(content, f.name);
      } catch (err) {
        handleError(`Failed to read file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onUpload, onUploadError, handleError]
  );
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const f = e.target.files?.[0];
      if (!f) return;
      if (!isValidMarkdownFile(f)) {
        handleError('Only .md and .mdx files are supported');
        return;
      }
      try {
        const content = await readFileAsText(f);
        onUpload(content, f.name);
      } catch (err) {
        handleError(`Failed to read file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onUpload, onUploadError, handleError]
  );

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          ${dragOver ? 'border-teal-500 bg-teal-500/10' : 'border-dark-700 hover:border-teal-500/50 bg-dark-900/50'}`}
      >
        <input
          ref={el => (fileInputRef.current = el)}
          type="file"
          accept=".md,.mdx"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload documentation file"
          data-testid="doc-upload-input"
        />
        <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-dark-200 font-medium mb-2">Drop your Markdown files here</p>
        <p className="text-dark-500 text-sm mb-4">or click to browse (.md, .mdx)</p>
        <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
          <span className="px-2 py-1 bg-dark-800 rounded">README.md</span>
          <span className="px-2 py-1 bg-dark-800 rounded">guide.mdx</span>
          <span className="px-2 py-1 bg-dark-800 rounded">+ more</span>
        </div>
      </div>
    </div>
  );
}
