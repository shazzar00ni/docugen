import React from 'react';
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';
import { Theme, THEMES } from '../../lib/theme';

/**
 * Renders a floating theme toggle with buttons for selecting "light", "dark", or "custom" themes.
 *
 * @returns The React element containing three icon buttons that set the application theme when clicked.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const handleSetTheme = (newTheme: Theme) => () => setTheme(newTheme);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-dark-800 rounded-lg p-2 shadow-lg">
      <button
        onClick={() => handleSetTheme('light')}
        className={`p-2 rounded transition-colors ${
          theme === 'light' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
        }`}
        title="Light theme"
      >
        <SunIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleSetTheme('dark')}
        className={`p-2 rounded transition-colors ${
          theme === 'dark' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
        }`}
        title="Dark theme"
      >
        <MoonIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleSetTheme('custom')}
        className={`p-2 rounded transition-colors ${
          theme === 'custom' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
        }`}
        title="Custom theme"
      >
        <Cog6ToothIcon className="w-4 h-4" />
      </button>
    </div>
  );
}