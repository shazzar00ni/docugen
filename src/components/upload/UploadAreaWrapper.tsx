import { UploadArea } from './UploadArea';

/**
 * Render a wrapper that supplies an `onUpload` handler which logs uploaded file names.
 *
 * @returns An UploadArea element with an `onUpload` prop that logs the uploaded File's `name` to the console.
 */
export function UploadAreaWrapper() {
import { useCallback } from 'react';
import { UploadArea } from './UploadArea';

/**
 * Render an UploadArea configured to log uploaded file names to the console.
 *
 * @returns The UploadArea element with an `onUpload` handler that logs the uploaded file's `name` to the console.
 */
export function UploadAreaWrapper() {
  const onUpload = useCallback((f: File) => {
    console.log('File uploaded:', f.name);
  }, []);
  return <UploadArea onUpload={onUpload} />;
}
  return <UploadArea onUpload={onUpload} />;
}