import { useState, useCallback, useEffect } from 'react';
import { UploadArea } from './UploadArea';
import { FileTree } from './FileTree';
import { MarkdownViewer } from './MarkdownViewer';
import type { Heading } from './markdownUtils';

/**
 * Full-page documentation viewer layout.
 *
 * Manages the lifecycle of uploaded Markdown files:
 * 1. Shows the upload area when no files have been added.
 * 2. Transitions to a three-column layout (header / sidebar / content) once files are uploaded.
 *
 * The sidebar contains the FileTree and a table of contents. The main content area renders
 * the selected file via MarkdownViewer.
 */
export function DocLayout() {
  const [files, setFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback((newFiles: File[]) => {
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.webkitRelativePath || f.name));
      const merged = [
        ...prev,
        ...newFiles.filter(f => !existing.has(f.webkitRelativePath || f.name)),
      ];
      return merged;
    });
    // Auto-select the first new file
    if (newFiles.length > 0) {
      setActiveFile(newFiles[0]);
    }
  }, []);

  const handleSelectFile = useCallback((file: File) => {
    setActiveFile(file);
  }, []);

  const handleHeadings = useCallback((extracted: Heading[]) => {
    setHeadings(extracted);
  }, []);

  const handleReset = useCallback(() => {
    setFiles([]);
    setActiveFile(null);
    setContent('');
    setHeadings([]);
  }, []);

  // Read file content whenever activeFile changes
  useEffect(() => {
    if (!activeFile) {
      setContent('');
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = e => {
      setContent((e.target?.result as string) ?? '');
      setLoading(false);
    };

    reader.onerror = () => {
      setContent('');
      setLoading(false);
    };

    reader.readAsText(activeFile);
  }, [activeFile]);

  if (files.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark-100 mb-2">DocuGen</h1>
            <p className="text-dark-400">
              Drop your Markdown files to generate a documentation site
            </p>
          </div>
          <UploadArea onUpload={handleUpload} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-dark-800 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <h1 className="text-dark-100 font-bold text-lg">DocuGen</h1>
          <span className="text-dark-600 text-sm">
            {files.length} {files.length === 1 ? 'file' : 'files'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer">
            <span className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
              + Add files
            </span>
            <input
              type="file"
              accept=".md,.mdx"
              multiple
              className="hidden"
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  const newFiles = Array.from(e.target.files);
                  handleUpload(newFiles);
                }
                e.target.value = '';
              }}
              aria-label="Add more files"
            />
          </label>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-dark-800 flex flex-col overflow-y-auto flex-shrink-0">
          <div className="p-3 border-b border-dark-800">
            <p className="text-xs font-medium text-dark-500 uppercase tracking-wider">Files</p>
          </div>
          <div className="flex-1 p-2">
            <FileTree files={files} activeFile={activeFile} onSelect={handleSelectFile} />
          </div>

          {headings.length > 0 && (
            <div className="border-t border-dark-800">
              <div className="p-3 border-b border-dark-800">
                <p className="text-xs font-medium text-dark-500 uppercase tracking-wider">
                  On this page
                </p>
              </div>
              <nav aria-label="Table of contents" className="p-2">
                <ul className="space-y-0.5">
                  {headings.map(h => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-xs text-dark-500 hover:text-teal-400 transition-colors py-0.5 truncate"
                        style={{ paddingLeft: `${(h.level - 1) * 8 + 8}px` }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {loading && (
            <div className="flex items-center justify-center h-32 text-dark-500">
              <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-3" />
              Loading…
            </div>
          )}
          {!loading && activeFile && content && (
            <MarkdownViewer
              content={content}
              fileName={activeFile.webkitRelativePath || activeFile.name}
              onHeadingsExtracted={handleHeadings}
            />
          )}
          {!loading && !activeFile && (
            <div className="flex items-center justify-center h-full text-dark-500 text-sm">
              Select a file from the sidebar to view it
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
