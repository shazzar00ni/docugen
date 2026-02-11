import React, { useState, useEffect, useRef } from 'react';
import { UploadArea } from './components/upload/UploadArea';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { Navigation } from './components/navigation/Navigation';
import { TableOfContents } from './components/navigation/TableOfContents';
import { Breadcrumbs } from './components/navigation/Breadcrumbs';
import { ThemeProvider, useTheme } from './components/theme/ThemeProvider';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { parseMarkdown, extractNavFromHtml, getPathToItem } from './lib/nav';

export type DocViewerState = {
  rawMarkdown: string;
  fileName?: string;
  renderedHtml: string;
  navTree: ReturnType<typeof extractNavFromHtml>;
};

/** Simple file watcher for hot reload */
function useFileWatcher(contentRef: React.MutableRefObject<string | null>) {
  useEffect(() => {
    // Mock: in a real app, this would be an external trigger/editor that updates the content
    // For now, simulate by allowing manual re-upload (handled by UploadArea)
    return;
  }, []);
}

export function App() {
  const [state, setState] = useState<DocViewerState | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>();
  const { theme } = useTheme();

  // Handle file upload (supports re-uploads for hot reload)
  const handleUpload = (content: string, fileName?: string) => {
    if (!fileName) return;
    const html = parseMarkdown(content);
    const navTree = extractNavFromHtml(html);
    setState({ rawMarkdown: content, fileName, renderedHtml: html, navTree });
    setActiveNavId(navTree[0]?.id);
  };

  // Simple file watcher simulation (mock for demo)
  useFileWatcher(useRef(state?.rawMarkdown ?? null));

  // Sync active nav ID when TOC IntersectionObserver updates
  useEffect(() => {
    // If TOC updates activeId, we may want to update Navigation active state
    // In a real app, use context or state management to sync across components
  }, [activeNavId]);

  if (!state) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <UploadArea onUpload={handleUpload} />
        </div>
      </ThemeProvider>
    );
  }

  const breadcrumbs = getPathToItem(state.navTree, activeNavId ?? state.navTree[0]?.id);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header with breadcrumbs */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={breadcrumbs} className="text-xs" />
          </div>
        </header>

        {/* Main content area with sidebar navigation and TOC */}
        <div className="flex max-w-7xl mx-auto">
          {/* Left sidebar: Navigation */}
          <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
            <div className="p-4">
              <Navigation items={state.navTree} activeId={activeNavId} />
            </div>
          </aside>

          {/* Right sidebar: Table of Contents */}
          <aside className="w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
            <div className="p-4">
              <TableOfContents items={state.navTree} />
            </div>
          </aside>

          {/* Main content: MarkdownViewer */}
          <main className="flex-1 overflow-y-auto">
            <article className="max-w-3xl mx-auto px-8 py-8 prose dark:prose-invert">
              <MarkdownViewer content={state.renderedHtml} />
            </article>
          </main>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
