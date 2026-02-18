import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, DEFAULT_THEME } from '../lib/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

/**
 * Provides access to the current theme context value.
 *
 * @returns The context value containing `theme` (the active Theme) and `setTheme` (a function to update it)
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Provides theme state to descendants, persists the selected theme to localStorage, and applies the theme's root class to the document.
 *
 * Initializes the theme from localStorage key "docugen-theme" when running in a browser (falls back to DEFAULT_THEME), and updates both localStorage and document.documentElement.className whenever the theme changes.
 *
 * @returns A React provider element that supplies the current `theme` and `setTheme` updater to descendant components.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load from localStorage or use default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('docugen-theme') as Theme;
      return stored || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('docugen-theme', theme);
      document.documentElement.className = THEMES[theme].bg;
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}