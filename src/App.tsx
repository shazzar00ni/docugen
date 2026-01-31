import { Suspense, lazy } from 'react';
import { ThemeProvider } from './lib/ThemeContext';
import { Navbar } from './components/Navbar';
import { Analytics } from './components/Analytics';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FAQ } from './components/FAQ';

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
 * Loading spinner component for lazy-loaded content.
 * Displays a rotating teal spinner during content loading.
 *
 * @returns Loading spinner component
 */
function Loading() {
  return (
    <div className="py-20 text-center">
      <div className="inline-block w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * Main application component with theme support and lazy loading.
 * Renders the complete application layout with all sections.
 *
 * @returns Main app component wrapped in theme provider
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
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
