import React, { useState, useEffect, useRef } from 'react';
import { UploadArea } from './components/upload/UploadArea';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { Navigation } from './components/navigation/Navigation';
import { TableOfContents } from './components/navigation/TableOfContents';
import { Breadcrumbs } from './components/navigation/Breadcrumbs';
import { ThemeProvider, useTheme } from './components/theme/ThemeProvider';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { CustomizationPanel, type CustomTheme } from './components/theme/CustomizationPanel';
import { MobileMenu } from './components/mobile/MobileMenu';
import { ExportControls } from './components/deploy/ExportControls';
import { DeploymentControls } from './components/deploy/DeploymentControls';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null);
  const [siteTitle, setSiteTitle] = useState('DocuGen');
  const [logoUrl, setLogoUrl] = useState('');
  const [deploymentPanelOpen, setDeploymentPanelOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Generate combined CSS/JS for export
  const getAssets = () => {
    const themeCSS = customTheme ? `
        :root {
          --color-bg: ${customTheme.bg};
          --color-text: ${customTheme.text};
          --color-primary: ${customTheme.primary};
        }
      ` : '';

    const baseCSS = `
      /* Tailwind base styles would be included in production build */
      /* For demo, use minimal custom styles */
      body { font-family: system-ui, -apple-system, sans-serif; }
      .prose { max-width: none; }
      ${themeCSS}
    `;

    const baseJS = `
      // Basic navigation and search could go here
      console.log('Documentation loaded');
    `;

    return { css: baseCSS, js: baseJS };
  };

  // Handle file upload
  const handleUpload = (content: string, fileName?: string) => {
    if (!fileName) return;
    const html = parseMarkdown(content);
    const navTree = extractNavFromHtml(html);
    setState({ rawMarkdown: content, fileName, renderedHtml: html, navTree });
    setActiveNavId(navTree[0]?.id);
    setMobileMenuOpen(false);
  };

  // Load customizations from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('docugen-site-config');
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (config.title) setSiteTitle(config.title);
          if (config.logoUrl) setLogoUrl(config.logoUrl);
        } catch {
          // Ignore invalid data
        }
      }
    }
  }, []);

  // Save customizations to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = { title: siteTitle, logoUrl };
      localStorage.setItem('docugen-site-config', JSON.stringify(config));
    }
  }, [siteTitle, logoUrl]);

  // Simple file watcher simulation
  useFileWatcher(useRef(state?.rawMarkdown ?? null));

  const assets = getAssets();

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
        {/* Header with breadcrumbs, logo, title, and mobile menu trigger */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="h-8 w-auto max-w-32"
                  />
                )}
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{siteTitle}</h1>
              </div>
              <div className="flex items-center space-x-3">
                <Breadcrumbs items={breadcrumbs} className="text-xs" />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7-6h7a1 1 0 011-1v12a1 1 0 01-1-1h-3a1 1 0 01-1-1v12a1 1 0 01-1-1h7a1 1 0 011 1z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <MobileMenu>
            {/* Customization panel in mobile menu */}
            <div className="p-4">
              <CustomizationPanel
                onThemeUpdate={setCustomTheme}
              />
            </div>
            {/* Export/Deploy controls in mobile menu */}
            <div className="p-4 space-y-4">
              <ExportControls
                html={state.renderedHtml}
                css={assets.css}
                js={assets.js}
              />
              <DeploymentControls
                html={state.renderedHtml}
                css={assets.css}
                js={assets.js}
                onDeploy={(result) => {
                  if (result.success) {
                    setDeploymentPanelOpen(false);
                  }
                }}
              />
            </div>
            </div>
          </MobileMenu>
        )}

        {/* Main content area with sidebar navigation and TOC */}
        <div className="flex max-w-7xl mx-auto">
          {/* Left sidebar: Navigation */}
          <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
            <div className="p-4">
              <Navigation items={state.navTree} activeId={activeNavId} />
            </div>
          </aside>

          {/* Right sidebar: Table of Contents */}
          <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
            <div className="p-4">
              <TableOfContents items={state.navTree} />
            </div>
          </aside>

          {/* Main content: MarkdownViewer */}
          <main className="flex-1 overflow-y-auto">
            <article className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert md:px-8">
              <MarkdownViewer content={state.renderedHtml} />
            </article>
          </main>
        </div>

        {/* Desktop deployment panel trigger */}
        <button
          onClick={() => setDeploymentPanelOpen(!deploymentPanelOpen)}
          className="hidden md:flex fixed bottom-4 right-4 p-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 z-40"
          aria-label="Toggle deployment panel"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h13M3 16h13m-13-8h13m-13-4h13" />
          </svg>
        </button>

        {/* Deployment panel overlay */}
        {deploymentPanelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Export & Deploy</h3>
                <button
                  onClick={() => setDeploymentPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Close export panel"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ExportControls
                html={state.renderedHtml}
                css={assets.css}
                js={assets.js}
              />
              <DeploymentControls
                html={state.renderedHtml}
                css={assets.css}
                js={assets.js}
                onDeploy={(result) => {
                  if (result.success) {
                    setDeploymentPanelOpen(false);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Theme toggle and customization panel trigger */}
        <ThemeToggle />
        <CustomizationPanel
          onThemeUpdate={setCustomTheme}
          className="bottom-20 right-20"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;