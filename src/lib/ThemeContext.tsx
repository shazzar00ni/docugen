import { createContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'docugen-theme';

/**
 * Determine the initial UI theme using a stored preference or the system preference, with safe fallbacks.
 *
 * Defaults to `'dark'` when not running in a browser or when an error occurs.
 *
 * @returns `'dark'` if a stored preference is `'dark'`, the system preference is dark, or on error/non-browser; `'light'` otherwise.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

/**
 * Apply the provided theme to the document root by toggling the "dark" class.
 *
 * Adds the "dark" class to document.documentElement when the theme is 'dark' and removes it when the theme is 'light'.
 *
 * @param theme - Theme to apply ('dark' or 'light')
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * React context provider for theme management.
 * Manages theme state, persistence, and DOM theme application.
 *
 * @param children - Child components to wrap with theme context
 * @returns Theme context provider component
 *
 * @example
 * ```typescript
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Silently fail - theme preference persistence is non-critical
    }
  };

  const setThemeDirect = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Silently fail - theme preference persistence is non-critical
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeDirect }}>
      {children}
    </ThemeContext.Provider>
  );
}