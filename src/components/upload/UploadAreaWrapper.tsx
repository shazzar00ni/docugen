import React, { useState, useRef, useCallback } from 'react';
import { UploadAreaProps } from './UploadArea';

export function UploadAreaWrapper() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const onUpload = (f: File) => {
    setUploaded(f.name);
  };
  return <UploadArea onUpload={onUpload} />;
}
