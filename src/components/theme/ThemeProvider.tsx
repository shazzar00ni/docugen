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

export function useTheme() {
  return useContext(ThemeContext);
}

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
