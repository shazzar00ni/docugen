import React, { useState, useRef, useCallback } from 'react';

export type UploadAreaProps = {
  onUpload: (content: string, fileName?: string) => void;
};

/** Real Phase 1 Markdown/MDX uploader with text reading */
export function UploadArea({ onUpload }: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsText = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(f);
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer?.files?.[0];
      if (f && (f.name.endsWith('.md') || f.name.endsWith('.mdx'))) {
        readFileAsText(f)
          .then(content => onUpload(content, f.name))
          .catch(console.error);
      }
    },
    [onUpload]
  );
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f && (f.name.endsWith('.md') || f.name.endsWith('.mdx'))) {
        readFileAsText(f)
          .then(content => onUpload(content, f.name))
          .catch(console.error);
      }
    },
    [onUpload]
  );

  return (
    <div className="mt-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          ${dragOver ? 'border-teal-500 bg-teal-500/10' : 'border-dark-700 hover:border-teal-500/50 bg-dark-900/50'}`}
      >
        <input
          ref={el => (fileInputRef.current = el)}
          type="file"
          accept=".md,.mdx"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload documentation file"
          data-testid="doc-upload-input"
        />
        <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-dark-200 font-medium mb-2">Drop your Markdown files here</p>
        <p className="text-dark-500 text-sm mb-4">or click to browse (.md, .mdx)</p>
        <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
          <span className="px-2 py-1 bg-dark-800 rounded">README.md</span>
          <span className="px-2 py-1 bg-dark-800 rounded">guide.mdx</span>
          <span className="px-2 py-1 bg-dark-800 rounded">+ more</span>
        </div>
      </div>
    </div>
  );
}
