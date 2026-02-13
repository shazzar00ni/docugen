import { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';

/**
 * Root application component that renders an UploadArea and shows the name of the last uploaded file.
 *
 * @returns The rendered JSX element for the app.
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