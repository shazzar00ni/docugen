import { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';
import { parseMarkdown } from './lib/markdown';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';

/**
 * Root application component that provides a markdown upload area, shows the uploaded filename, and displays rendered HTML.
 *
 * @returns The component's React element containing an UploadArea, an optional "Uploaded" filename line, and an optional MarkdownViewer with the rendered HTML.
 */
export function App() {
  const [html, setHtml] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  const handleUpload = (content: string, fileName?: string) => {
    const rendered = parseMarkdown(content);
    setHtml(rendered);
    if (fileName) setUploaded(fileName);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <UploadArea onUpload={handleUpload} />
      {uploaded && <div className="p-2 text-sm text-teal-300">Uploaded: {uploaded}</div>}
      {html && (
        <div className="p-4">
          <MarkdownViewer content={html} />
        </div>
      )}
    </div>
  );
}

export default App;
