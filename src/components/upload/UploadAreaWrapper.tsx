import React, { useState } from 'react';
import { UploadArea } from './UploadArea';

export function UploadAreaWrapper() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const onUpload = (content: string, fileName?: string) => {
    setUploaded(fileName ?? 'unknown');
  };
  return <UploadArea onUpload={onUpload} />;
}
