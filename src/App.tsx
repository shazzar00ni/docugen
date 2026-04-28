import { useState, useCallback, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { UploadArea } from './components/upload/UploadArea';
import { FileTree } from './components/nav/FileTree';
import type { FileNode } from './components/nav/FileTree';
import { MarkdownRenderer } from './components/viewer/MarkdownRenderer';
import { buildFileTree } from './lib/fileTree';

type UploadedFile = {
  file: File;
  content: string;
};

/**
 * Root application component.
 *
 * Manages the collection of uploaded Markdown files and the currently selected file.
 * Renders the AppLayout with a FileTree sidebar and either a MarkdownRenderer or the
 * upload prompt in the main content area.
 */
export function App() {
  const [fileMap, setFileMap] = useState<Map<string, UploadedFile>>(new Map());
  const [treeNodes, setTreeNodes] = useState<FileNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Derive file tree from fileMap changes
  useEffect(() => {
    const allFiles = Array.from(fileMap.values()).map(v => v.file);
    setTreeNodes(buildFileTree(allFiles));
  }, [fileMap]);

  const handleUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      const path = file.webkitRelativePath || file.name;
      setFileMap(prev => {
        const next = new Map(prev);
        next.set(path, { file, content });
        return next;
      });
      setSelectedPath(path);
    };
    reader.readAsText(file);
  }, []);

  const selected = selectedPath ? fileMap.get(selectedPath) : null;

  const sidebar = (
    <FileTree nodes={treeNodes} selectedPath={selectedPath} onSelect={setSelectedPath} />
  );

  const content = selected ? (
    <MarkdownRenderer content={selected.content} fileName={selectedPath ?? undefined} />
  ) : (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="w-full max-w-lg">
        <h1 className="text-xl font-semibold text-dark-100 mb-1 text-center">
          Upload your documentation
        </h1>
        <p className="text-dark-400 text-sm text-center mb-6">
          Drag and drop Markdown or MDX files to get started.
        </p>
        <UploadArea onUpload={handleUpload} />
      </div>
    </div>
  );

  return <AppLayout sidebar={sidebar} content={content} />;
}

export default App;
