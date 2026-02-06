import { useState } from 'react';
import { UploadArea } from './UploadArea';

export function UploadAreaWrapper() {
  const [, setUploaded] = useState<string | null>(null);
  const onUpload = (_content: string, fileName?: string) => {
    setUploaded(fileName ?? 'unknown');
  };
  return <UploadArea onUpload={onUpload} />;
}
