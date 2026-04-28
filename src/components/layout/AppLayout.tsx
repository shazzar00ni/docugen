import { ReactNode } from 'react';

type AppLayoutProps = {
  sidebar: ReactNode;
  content: ReactNode;
};

/**
 * Main application layout with a fixed header, collapsible sidebar, and scrollable content area.
 *
 * @param sidebar - Sidebar slot (file tree navigation)
 * @param content - Main content slot (markdown viewer or upload area)
 */
export function AppLayout({ sidebar, content }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-dark-950 text-dark-100">
      {/* Header */}
      <header className="flex-shrink-0 h-14 border-b border-dark-800 flex items-center px-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
          <span className="font-semibold text-dark-100 text-sm">DocuGen</span>
        </div>
        <span className="text-dark-600 text-xs ml-auto">Markdown → Static Docs</span>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 border-r border-dark-800 overflow-y-auto bg-dark-950">
          <div className="px-3 py-3 border-b border-dark-800">
            <span className="text-xs font-medium text-dark-500 uppercase tracking-wider">
              Files
            </span>
          </div>
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-dark-900">{content}</main>
      </div>
    </div>
  );
}
