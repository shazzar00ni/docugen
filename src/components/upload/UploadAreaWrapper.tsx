
import { useCallback } from 'react';
import { UploadArea } from './UploadArea';

/**
 * Renders an UploadArea configured to log uploaded file names to the console.
 *
 * @returns The UploadArea element with an `onUpload` handler that logs the uploaded file's name.
 */
export function UploadAreaWrapper() {
  const onUpload = useCallback((f: File) => {
    console.log('File uploaded:', f.name);
  }, []);
  return <UploadArea onUpload={onUpload} />;
}
