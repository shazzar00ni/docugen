import { useState } from 'react';
import { UploadArea } from './components/upload/UploadArea';
import { parseMarkdown } from './lib/markdown';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';

export function App() {
  const [html, setHtml] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  const handleUpload = (content: string, fileName?: string) => {
    try {
      const rendered = parseMarkdown(content);
      setHtml(rendered);
      if (fileName) setUploaded(fileName);
    } catch (err) {
      console.error('Failed to parse markdown:', err);
      setHtml(null);
    }
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
