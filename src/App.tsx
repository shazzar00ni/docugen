import { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';

/**
 * Root application component that displays an upload area and, when a file is selected, the uploaded file's name.
 *
 * Maintains local state for the uploaded file name and passes a handler to the UploadArea to update that state.
 *
 * @returns The root JSX element containing the upload area and an optional uploaded filename display.
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