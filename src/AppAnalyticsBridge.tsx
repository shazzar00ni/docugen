import { Analytics } from './components/Analytics';

/**
 * Wraps and renders the Analytics component to include analytics tracking.
 *
 * @returns The rendered Analytics element
 *
 * @example
 * ```tsx
 * import { AppAnalyticsBridge } from './AppAnalyticsBridge';
 *
 * function App() {
 *   return (
 *     <div>
 *       <AppAnalyticsBridge />
 *     </div>
 *   );
 * }
 * ```
 */
export function AppAnalyticsBridge() {
  return <Analytics />;
}