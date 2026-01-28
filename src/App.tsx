import React, { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';

export function App() {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const handleUpload = (f: File) => setUploaded(f.name);

  return (
    <div>
      <UploadArea onUpload={handleUpload} />
      {uploaded && <div>Uploaded: {uploaded}</div>}
    </div>
  );
}

export default App;
