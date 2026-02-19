import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './lib/ThemeContext';
import { Navbar } from './components/Navbar';
import { Analytics } from './components/Analytics';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FAQ } from './components/FAQ';
import { UploadArea } from './components/upload/UploadArea';
import { MarkdownViewer } from './components/markdown/MarkdownViewer';
import { Navigation } from './components/navigation/Navigation';
import { TableOfContents } from './components/navigation/TableOfContents';
import { Breadcrumbs } from './components/navigation/Breadcrumbs';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { CustomizationPanel, type CustomTheme } from './components/theme/CustomizationPanel';
import { MobileMenu } from './components/mobile/MobileMenu';
import { ExportControls } from './components/deploy/ExportControls';
import { DeploymentControls } from './components/deploy/DeploymentControls';
import { parseMarkdown, extractNavFromHtml, getPathToItem } from './lib/nav';

const Features = lazy(() =>
  import('./components/Features').then(module => ({ default: module.Features }))
);
const Testimonials = lazy(() =>
  import('./components/Testimonials').then(module => ({ default: module.Testimonials }))
);
const Preview = lazy(() =>
  import('./components/Preview').then(module => ({ default: module.Preview }))
);
const Pricing = lazy(() =>
  import('./components/Pricing').then(module => ({ default: module.Pricing }))
);
const Newsletter = lazy(() =>
  import('./components/Newsletter').then(module => ({ default: module.Newsletter }))
);

/**
 * Render a centered spinner used as a fallback while lazy-loaded content is loading.
 *
 * Intended for use as a Suspense fallback or other short-lived loading states.
 */
function Loading() {
  return (
    <div className="py-20 text-center">
      <div className="inline-block w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export type DocViewerState = {
  rawMarkdown: string;
  fileName?: string;
  renderedHtml: string;
  navTree: ReturnType<typeof extractNavFromHtml>;
};

/**
 * File watcher hook for hot reload functionality.
 * Currently a placeholder for future file watching implementation.
 *
 * @param _contentRef - Reference to the current markdown content (reserved for future use)
 */
function useFileWatcher(_contentRef: React.MutableRefObject<string | null>) {
  useEffect(() => {
    return;
  }, []);
}

/**
 * DocuGen viewer component for rendering uploaded Markdown documentation.
 */
function DocuGenViewer() {
  const [state, setState] = useState<DocViewerState | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null);
  const [siteTitle, setSiteTitle] = useState('DocuGen');
  const [logoUrl, setLogoUrl] = useState('');
  const [deploymentPanelOpen, setDeploymentPanelOpen] = useState(false);

  const getAssets = () => {
    const themeCSS = customTheme
      ? `
        :root {
          --color-bg: ${customTheme.bg};
          --color-text: ${customTheme.text};
          --color-primary: ${customTheme.primary};
        }
      `
      : '';

    const baseCSS = `
      body { font-family: system-ui, -apple-system, sans-serif; }
      .prose { max-width: none; }
      ${themeCSS}
    `;

    const baseJS = `
      console.log('Documentation loaded');
    `;

    return { css: baseCSS, js: baseJS };
  };

  const handleUpload = (content: string, fileName?: string) => {
    if (!fileName) return;
    const html = parseMarkdown(content);
    const navTree = extractNavFromHtml(html);
    setState({ rawMarkdown: content, fileName, renderedHtml: html, navTree });
    setActiveNavId(navTree[0]?.id);
    setMobileMenuOpen(false);
  };

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = { title: siteTitle, logoUrl };
      localStorage.setItem('docugen-site-config', JSON.stringify(config));
    }
  }, [siteTitle, logoUrl]);

  useFileWatcher(useRef(state?.rawMarkdown ?? null));

  const assets = getAssets();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
        <UploadArea onUpload={handleUpload} />
      </div>
    );
  }

  const breadcrumbs = getPathToItem(state.navTree, activeNavId ?? state.navTree[0]?.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 w-auto max-w-32" />}
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {siteTitle}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Breadcrumbs items={breadcrumbs} className="text-xs" />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-500 hover:text-slate-700 rounded-lg"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7-6h7a1 1 0 011-1v12a1 1 0 01-1-1h-3a1 1 0 01-1-1v12a1 1 0 01-1-1h7a1 1 0 011 1z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileMenu>
          <div className="p-4">
            <CustomizationPanel onThemeUpdate={setCustomTheme} />
          </div>
          <div className="p-4 space-y-4">
            <ExportControls html={state.renderedHtml} css={assets.css} js={assets.js} />
            <DeploymentControls
              html={state.renderedHtml}
              css={assets.css}
              js={assets.js}
              onDeploy={result => {
                if (result.success) setDeploymentPanelOpen(false);
              }}
            />
          </div>
        </MobileMenu>
      )}

      <div className="flex max-w-7xl mx-auto">
        <aside className="hidden md:block w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <Navigation items={state.navTree} activeId={activeNavId} />
          </div>
        </aside>

        <aside className="hidden md:block w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <TableOfContents items={state.navTree} />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <article className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert md:px-8">
            <MarkdownViewer content={state.renderedHtml} />
          </article>
        </main>
      </div>

      <button
        onClick={() => setDeploymentPanelOpen(!deploymentPanelOpen)}
        className="hidden md:flex fixed bottom-4 left-4 p-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 z-40"
        aria-label="Toggle deployment panel"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8h13M3 16h13m-13-8h13m-13-4h13"
          />
        </svg>
      </button>

      {deploymentPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 m-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Export & Deploy
              </h3>
              <button
                onClick={() => setDeploymentPanelOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ExportControls html={state.renderedHtml} css={assets.css} js={assets.js} />
            <DeploymentControls
              html={state.renderedHtml}
              css={assets.css}
              js={assets.js}
              onDeploy={result => {
                if (result.success) setDeploymentPanelOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <ThemeToggle />
      <CustomizationPanel onThemeUpdate={setCustomTheme} className="bottom-20 right-20" />
    </div>
  );
}

/**
 * Root React component that composes the site's themed layout and primary sections.
 *
 * Renders the top-level application structure wrapped in a theme provider, including
 * navigation, analytics, hero and feature sections, doc viewer, footer, and utilities
 * such as scroll-to-top. Lazy-loaded sections use a shared loading fallback.
 *
 * @returns The application's top-level JSX element containing theme, layout, and content sections.
 */
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <Analytics />
        <main>
          <Hero />
          <HowItWorks />
          <Suspense fallback={<Loading />}>
            <Features />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Testimonials />
          </Suspense>
          <FAQ />
          <Suspense fallback={<Loading />}>
            <Preview />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Pricing />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Newsletter />
          </Suspense>
          <DocuGenViewer />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;