import React, { useState, useEffect } from 'react';
import { UploadArea } from './components/upload/UploadArea';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { Navigation } from './components/navigation/Navigation';
import { TableOfContents } from './components/navigation/TableOfContents';
import { Breadcrumbs } from './components/navigation/Breadcrumbs';
import { parseMarkdown, extractNavFromHtml, getPathToItem } from './lib/nav';

export type DocViewerState = {
  rawMarkdown: string;
  renderedHtml: string;
  navTree: ReturnType<typeof extractNavFromHtml>;
};

export function App() {
  const [state, setState] = useState<DocViewerState | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>();

  // Handle file upload
  const handleUpload = (content: string, fileName?: string) => {
    if (!fileName) return;
    const html = parseMarkdown(content);
    const navTree = extractNavFromHtml(html);
    setState({ rawMarkdown: content, renderedHtml: html, navTree });
    // Set active to first heading on upload
    setActiveNavId(navTree[0]?.id);
  };

  // Sync active nav ID when TOC IntersectionObserver updates
  useEffect(() => {
    // If TOC updates activeId, we may want to update Navigation active state
    // In a real app, use context or state management to sync across components
  }, [activeNavId]);

  if (!state) {
    return (
      <div className="min-h-screen bg-dark-950 p-8">
        <UploadArea onUpload={handleUpload} />
      </div>
    );
  }

  const breadcrumbs = getPathToItem(state.navTree, activeNavId ?? state.navTree[0]?.id);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header with breadcrumbs */}
      <header className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={breadcrumbs} className="text-xs" />
        </div>
      </header>

      {/* Main content area with sidebar navigation and TOC */}
      <div className="flex max-w-7xl mx-auto">
        {/* Left sidebar: Navigation */}
        <aside className="w-64 bg-dark-900 border-r border-dark-800 h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <Navigation items={state.navTree} activeId={activeNavId} />
          </div>
        </aside>

        {/* Right sidebar: Table of Contents */}
        <aside className="w-64 bg-dark-900 border-l border-dark-800 h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <TableOfContents items={state.navTree} />
          </div>
        </aside>

        {/* Main content: MarkdownViewer */}
        <main className="flex-1 overflow-y-auto">
          <article className="max-w-3xl mx-auto px-8 py-8 prose prose-invert">
            <MarkdownViewer content={state.renderedHtml} />
          </article>
        </main>
      </div>
    </div>
  );
}

export default App;
