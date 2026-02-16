import { useState } from 'react';
import { UploadArea } from './UploadArea';

/**
 * Renders an UploadArea and captures the most recently uploaded file name in internal state.
 *
 * The component holds an `uploaded` state and updates it to the provided `fileName` or `"unknown"`
 * when the UploadArea invokes the `onUpload` callback.
 *
 * @returns A React element rendering the UploadArea component.
 */
export function UploadAreaWrapper() {
  const [, setUploaded] = useState<string | null>(null);
  const onUpload = (_content: string, fileName?: string) => {
    setUploaded(fileName ?? 'unknown');
  };
  return <UploadArea onUpload={onUpload} />;
}
