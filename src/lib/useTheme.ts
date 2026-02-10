import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * React hook to access theme context.
 * Provides access to current theme state and theme toggle function.
 *
 * @returns Theme context object containing theme state and toggle function
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```typescript
 * const { theme, toggleTheme } = useTheme();
 * // theme: 'light' | 'dark'
 * // toggleTheme: () => void
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
