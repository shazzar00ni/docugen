/**
 * SkipToContent component provides a hidden link for keyboard and screen reader users
 * to bypass navigation and jump directly to the main content.
 *
 * This improves accessibility by allowing users to skip repetitive navigation elements.
 * The link is visually hidden but becomes visible when focused.
 *
 * @example
 * ```tsx
 * import { SkipToContent } from '@/components/SkipToContent';
 *
 * function App() {
 *   return (
 *     <>
 *       <SkipToContent />
 *       <Navbar />
 *       <main id="main-content">...</main>
 *     </>
 *   );
 * }
 * ```
 *
 * @returns A JSX element representing a skip-to-content link
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
    >
      Skip to main content
    </a>
  );
}
