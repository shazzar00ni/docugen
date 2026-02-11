import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Theme, THEMES } from '../../lib/theme';

export type CustomTheme = {
  name: string;
  bg: string;
  text: string;
  border: string;
  primary: string;
};

export type CustomizationPanelProps = {
  onThemeUpdate?: (theme: CustomTheme) => void;
  className?: string;
};

export function CustomizationPanel({ onThemeUpdate, className }: CustomizationPanelProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState<CustomTheme>(() => ({
    name: 'Custom',
    bg: THEMES.custom.bg,
    text: THEMES.custom.text,
    border: THEMES.custom.border,
    primary: '#14b8a6', // teal
  }));

  // Load custom theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('docugen-custom-theme');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCustomTheme(parsed);
        } catch {
          // Ignore invalid stored data
        }
      }
    }
  }, []);

  // Save custom theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('docugen-custom-theme', JSON.stringify(customTheme));
    }
  }, [customTheme]);

  const applyCustomTheme = () => {
    setTheme('custom');
    onThemeUpdate?.(customTheme);
    // Force theme system to use custom colors
    document.documentElement.style.setProperty('--color-primary', customTheme.primary);
    document.documentElement.style.setProperty('--color-bg', customTheme.bg);
    document.documentElement.style.setProperty('--color-text', customTheme.text);
  };

  const resetTheme = (presetName: Exclude<Theme, 'custom'>) => {
    setTheme(presetName);
    const preset = THEMES[presetName];
    const resetCustom = { ...customTheme, ...preset };
    setCustomTheme(resetCustom);
    onThemeUpdate?.(resetCustom);
    localStorage.removeItem('docugen-custom-theme');
    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--color-primary');
    document.documentElement.style.removeProperty('--color-bg');
    document.documentElement.style.removeProperty('--color-text');
  };

  return (
    <div
      className={`fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 ${isOpen ? 'w-80' : 'w-64'} ${className || ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Customize</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close customization panel"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Theme selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['light', 'dark'] as const).map(preset => (
              <button
                key={preset}
                onClick={() => resetTheme(preset)}
                className={`p-2 text-xs rounded transition-colors ${
                  theme === preset
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {THEMES[preset].label}
              </button>
            ))}
          </div>
        </div>

        {/* Color customizer */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Colors
          </label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400">Background</label>
              <input
                type="color"
                value={customTheme.bg}
                onChange={e => setCustomTheme({ ...customTheme, bg: e.target.value })}
                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400">Text</label>
              <input
                type="color"
                value={customTheme.text}
                onChange={e => setCustomTheme({ ...customTheme, text: e.target.value })}
                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400">Primary</label>
              <input
                type="color"
                value={customTheme.primary}
                onChange={e => setCustomTheme({ ...customTheme, primary: e.target.value })}
                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={applyCustomTheme}
            className="w-full p-2 text-xs font-medium text-white bg-teal-600 rounded hover:bg-teal-700 transition-colors"
          >
            Apply Custom Theme
          </button>
        </div>
      </div>

      {/* Expand/collapse trigger when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute -top-2 -right-2 p-2 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700"
          aria-label="Open customization panel"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0h12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
