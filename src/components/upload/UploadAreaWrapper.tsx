import React, { useState, useRef, useCallback } from 'react';
import { UploadAreaProps } from './UploadArea';

/**
 * Wraps and renders an UploadArea while tracking the most recently uploaded file name in internal state.
 *
 * Maintains an internal `uploaded` value and supplies an `onUpload` handler to the child UploadArea that updates
 * that value to the provided file name or `"unknown"` when a file is uploaded.
 *
 * @returns A JSX element rendering UploadArea configured with an `onUpload` handler.
 */
export function UploadAreaWrapper() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const onUpload = (content: string, fileName?: string) => {
    setUploaded(fileName ?? 'unknown');
  };
  return <UploadArea onUpload={onUpload} />;
}