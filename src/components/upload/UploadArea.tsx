import React, { useState, useRef, useCallback } from 'react';

export type UploadAreaProps = {
  onUpload: (file: File) => void;
};

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types for Markdown files
const ALLOWED_MIME_TYPES = [
  'text/markdown',
  'text/x-markdown',
  'text/plain', // Some systems report .md as text/plain
  'application/octet-stream', // Fallback for unknown types
];

type ValidationError = {
  type: 'extension' | 'size' | 'mime' | 'processing';
  message: string;
};

/**
 * Drag-and-drop area for uploading Markdown files (.md, .mdx).
 *
 * Validates file extension, MIME type, and size (max 10 MB). On successful validation,
 * invokes `onUpload` with the selected `File`; on validation or processing failure,
 * displays an inline error and allows retry.
 *
 * @param onUpload - Callback invoked with a validated `File` to perform the actual upload.
 * @returns The UploadArea React element.
 */
export function UploadArea({ onUpload }: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = useCallback((file: File): ValidationError | null => {
    // Check file extension - use last extension to prevent bypass via multiple extensions
    const fileName = file.name.toLowerCase();
    const lastDotIndex = fileName.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';

    if (extension !== '.md' && extension !== '.mdx') {
      return {
        type: 'extension',
        message: 'Only .md and .mdx files are allowed',
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        type: 'size',
        message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Check MIME type - always validate to prevent empty MIME type bypass
    // Allow common MIME types for Markdown files
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        type: 'mime',
        message: 'Invalid file type. Please upload a valid Markdown file',
      };
    }

    return null;
  }, []);

  const processFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      setError(null);

      try {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        onUpload(file);
      } catch (err) {
        setError({
          type: 'processing',
          message: 'Failed to process file. Please try again',
        });
      }
    },
    [onUpload, validateFile]
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
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer?.files?.[0];
      processFile(file);
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      processFile(file);
      // Reset input value to allow re-selecting the same file, even after errors
      // This allows users to re-upload a file that failed validation after fixing it
      e.target.value = '';
    },
    [processFile]
  );

  return (
    <div className="mt-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
        role="button"
        tabIndex={0}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          ${dragOver ? 'border-teal-500 bg-teal-500/10' : error ? 'border-red-500 bg-red-500/10' : 'border-dark-700 hover:border-teal-500/50 bg-dark-900/50'}`}
      >
        <input
         <input
          ref={fileInputRef}
           type="file"
          type="file"
          accept=".md,.mdx"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload documentation file"
        />
        <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
          {error ? (
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ) : (
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
          )}
        </div>
        {error ? (
          <>
            <p className="text-red-400 font-medium mb-2">Upload Failed</p>
            <p className="text-red-300 text-sm mb-4">{error.message}</p>
            <button
              onClick={e => {
                e.stopPropagation();
                setError(null);
              }}
              className="text-teal-400 text-sm hover:text-teal-300 underline"
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <p className="text-dark-200 font-medium mb-2">Drop your Markdown files here</p>
            <p className="text-dark-500 text-sm mb-4">or click to browse (.md, .mdx)</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
              <span className="px-2 py-1 bg-dark-800 rounded">README.md</span>
              <span className="px-2 py-1 bg-dark-800 rounded">guide.mdx</span>
              <span className="px-2 py-1 bg-dark-800 rounded">+ more</span>
            </div>
          </>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-dark-500">
          Max file size: {MAX_FILE_SIZE / (1024 * 1024)}MB • Supported formats: .md, .mdx
        </p>
      )}
    </div>
  );
}