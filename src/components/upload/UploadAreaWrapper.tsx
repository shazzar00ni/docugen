import React, { useState, useRef, useCallback } from 'react';
import { UploadAreaProps } from './UploadArea';

export function UploadAreaWrapper() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const onUpload = (content: string, fileName?: string) => {
    setUploaded(fileName ?? 'unknown');
  };
  return <UploadArea onUpload={onUpload} />;
}
