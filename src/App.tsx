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
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (content: string, fileName?: string) => {
    try {
      const rendered = parseMarkdown(content);
      setHtml(rendered);
      if (fileName) setUploaded(fileName);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to parse Markdown';
      setError(message);
      console.error('Failed to parse Markdown:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <UploadArea onUpload={handleUpload} />
      {error && <div className="p-2 text-sm text-red-400">Error: {error}</div>}
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
