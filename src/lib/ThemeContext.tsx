import { createContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react';

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
 * Determine the initial UI theme from a stored preference or the system preference, using safe fallbacks.
 *
 * @returns `'dark'` if a stored preference is `'dark'`, the system preference is dark, the environment is not a browser, or an error occurs; `'light'` otherwise.
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
 * Apply the given theme to the document root by ensuring the `dark` class reflects the theme.
 *
 * When `theme` is `'dark'` the `dark` class is added to `document.documentElement`; when `'light'` it is removed.
 *
 * @param theme - Theme to apply (`'dark'` or `'light'`)
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
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Silently fail - theme preference persistence is non-critical
    }
  }, [theme]);

  const setThemeDirect = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Silently fail - theme preference persistence is non-critical
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme: setThemeDirect }),
    [theme, toggleTheme, setThemeDirect]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
