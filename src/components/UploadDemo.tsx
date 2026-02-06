import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

export function UploadDemo() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = useCallback(() => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsComplete(true);
    }, 2000);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && (droppedFile.name.endsWith('.md') || droppedFile.name.endsWith('.mdx'))) {
        setFile(droppedFile);
        simulateUpload();
      }
    },
    [simulateUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (
        selectedFile &&
        (selectedFile.name.endsWith('.md') || selectedFile.name.endsWith('.mdx'))
      ) {
        setFile(selectedFile);
        simulateUpload();
      }
    },
    [simulateUpload]
  );

  const resetDemo = () => {
    setFile(null);
    setIsUploading(false);
    setIsComplete(false);
  };

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        {!file && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-300
                ${
                  isDragging
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-dark-700 hover:border-teal-500/50 bg-dark-900/50'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.mdx"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload documentation file"
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
          </motion.div>
        )}

        {file && !isComplete && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-900/50 border border-dark-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-dark-100 font-medium">{file.name}</p>
                <p className="text-dark-500 text-sm">
                  {isUploading ? 'Analyzing and structuring...' : 'Ready to process'}
                </p>
              </div>
              {isUploading && (
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            {isUploading && (
              <div className="mt-4 h-1 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className="h-full bg-teal-500"
                />
              </div>
            )}
          </motion.div>
        )}

        {file && isComplete && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-dark-100 font-medium">Documentation processed!</p>
                <p className="text-dark-400 text-sm">12 sections extracted, 3 pages generated</p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetDemo}>
                Try another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
