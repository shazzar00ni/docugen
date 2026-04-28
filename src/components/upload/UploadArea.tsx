import React, { useState, useRef, useCallback } from 'react';
import { UPLOAD_AREA_COPY } from '../../data/content';

export interface UploadAreaProps {
  onUpload: (file: File) => void;
}

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types for Markdown files
const ALLOWED_MIME_TYPES = [
  'text/markdown',
  'text/x-markdown',
  'text/plain', // Some systems report .md as text/plain
  'application/octet-stream', // Fallback for unknown types
];

interface ValidationError {
  type: 'extension' | 'size' | 'mime' | 'processing';
  message: string;
}

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
        message: UPLOAD_AREA_COPY.errors.extension,
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        type: 'size',
        message: UPLOAD_AREA_COPY.errors.size(MAX_FILE_SIZE / (1024 * 1024)),
      };
    }

    // Check MIME type - always validate to prevent empty MIME type bypass
    // Allow common MIME types for Markdown files
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        type: 'mime',
        message: UPLOAD_AREA_COPY.errors.mime,
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
          message: UPLOAD_AREA_COPY.errors.processing,
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
      <button
        type="button"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        aria-label={UPLOAD_AREA_COPY.ariaLabel}
        className={`relative w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          ${dragOver ? 'border-teal-500 bg-teal-500/10' : error ? 'border-red-500 bg-red-500/10' : 'border-dark-700 hover:border-teal-500/50 bg-dark-900/50'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.mdx"
          onChange={handleFileSelect}
          className="hidden"
          aria-label={UPLOAD_AREA_COPY.inputAriaLabel}
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
            <p className="text-red-400 font-medium mb-2">{UPLOAD_AREA_COPY.errorTitle}</p>
            <p className="text-red-300 text-sm mb-4">{error.message}</p>
            {/*
             * Rendered as a <span> (not <button>) to avoid invalid nested interactive
             * content inside the outer <button> dropzone. Clicking anywhere on the
             * dropzone reopens the file picker, which is the natural retry action.
             */}
            <span className="text-teal-400 text-sm hover:text-teal-300 underline">
              {UPLOAD_AREA_COPY.tryAgain}
            </span>
          </>
        ) : (
          <>
            <p className="text-dark-200 font-medium mb-2">{UPLOAD_AREA_COPY.prompt}</p>
            <p className="text-dark-500 text-sm mb-4">{UPLOAD_AREA_COPY.browseHint}</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
              {UPLOAD_AREA_COPY.examples.map(example => (
                <span key={example} className="px-2 py-1 bg-dark-800 rounded">
                  {example}
                </span>
              ))}
            </div>
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-xs text-dark-500">
          {UPLOAD_AREA_COPY.maxSizeHint(MAX_FILE_SIZE / (1024 * 1024))}
        </p>
      )}
    </div>
  );
}
