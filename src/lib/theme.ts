export type Theme = 'light' | 'dark' | 'custom';

export const THEMES: Record<Theme, { label: string; bg: string; text: string; border: string }> = {
  light: { label: 'Light', bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
  dark: { label: 'Dark', bg: 'bg-gray-900', text: 'text-gray-100', border: 'border-gray-700' },
  custom: { label: 'Custom', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
};

export const DEFAULT_THEME: Theme = 'dark';
