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

function Loading() {
  return (
    <div className="py-20 text-center">
      <div className="inline-block w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-50 dark:bg-dark-950 transition-colors duration-300">
        <a
          href="#main"
          className="sr-only focus:not-sr-only absolute left-0 top-0 m-4 px-3 py-2 bg-teal-600 text-white rounded"
        >
          Skip to content
        </a>
        <Navbar />
        <Analytics />
        <main id="main" role="main">
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
