import { Analytics } from './components/Analytics';

/**
 * Analytics bridge component that wraps the Analytics component.
 * Provides a simple way to include analytics tracking in the application.
 *
 * @returns The Analytics component
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
