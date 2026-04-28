import { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';

/**
 * Root component that renders an upload area and, if a file is selected, the uploaded file's name.
 *
 * @returns The root JSX element containing the upload area and, when present, the uploaded filename.
 */
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