import { useCallback } from 'react';
import { UploadArea } from './UploadArea';

/**
 * Render an UploadArea configured to log uploaded file names to the console.
 *
 * The wrapped onUpload handler logs the names of any uploaded files.
 *
 * @returns A JSX element that renders `UploadArea` with an `onUpload` handler which logs the uploaded files' names to the console.
 */
export function UploadAreaWrapper() {
  const onUpload = useCallback((files: File[]) => {
    files.forEach(f => console.log('File uploaded:', f.name));
  }, []);
  return <UploadArea onUpload={onUpload} />;
}
