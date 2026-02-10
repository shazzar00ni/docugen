import { useTheme } from '../lib/useTheme';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS, SITE } from '../data/content';

/**
 * Navbar component that displays the main navigation header for the application.
 * Features include theme toggle, navigation links, authentication buttons, and mobile menu support.
 * The navbar is fixed at the top with a backdrop blur effect for better visibility over content.
 *
 * @example
 * ```tsx
 * import { Navbar } from '@/components/Navbar';
 *
 * function App() {
 *   return <Navbar />;
 * }
 * ```
 *
 * @returns A JSX element representing the navigation header
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <Container>
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-teal-400 transition-colors">
              {SITE.name}
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-400 dark:hover:text-teal-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Early Access
            </Button>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </nav>
  );
}
