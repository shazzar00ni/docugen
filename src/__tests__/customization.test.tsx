import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../components/theme/ThemeProvider';
import { CustomizationPanel } from '../components/theme/CustomizationPanel';
import { Theme, DEFAULT_THEME } from '../lib/theme';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('CustomizationPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders color inputs for custom theme', () => {
    const TestComponent = () => (
      <ThemeProvider>
        <CustomizationPanel />
      </ThemeProvider>
    );
    render(<TestComponent />);
    expect(screen.getByDisplayValue('Background')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Text')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Primary')).toBeInTheDocument();
  });

  it('updates custom theme when colors change', async () => {
    const onThemeUpdate = vi.fn();
    const TestComponent = () => (
      <ThemeProvider>
        <CustomizationPanel onThemeUpdate={onThemeUpdate} />
      </ThemeProvider>
    );
    render(<TestComponent />);

    const bgInput = screen.getByDisplayValue('Background');
    await userEvent.clear(bgInput);
    await userEvent.type(bgInput, '#ffffff');
    await userEvent.tab();

    const textInput = screen.getByDisplayValue('Text');
    await userEvent.clear(textInput);
    await userEvent.type(textInput, '#000000');
    await userEvent.tab();

    const primaryInput = screen.getByDisplayValue('Primary');
    await userEvent.clear(primaryInput);
    await userEvent.type(primaryInput, '#ff0000');
    await userEvent.tab();

    const applyButton = screen.getByRole('button', { name: /Apply Custom/i });
    await userEvent.click(applyButton);

    expect(onThemeUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        bg: '#ffffff',
        text: '#000000',
        primary: '#ff0000',
      })
    );
  });

  it('applies CSS custom properties when custom theme is applied', async () => {
    const TestComponent = () => (
      <ThemeProvider>
        <CustomizationPanel />
      </ThemeProvider>
    );
    render(<TestComponent />);

    const bgInput = screen.getByDisplayValue('Background');
    await userEvent.clear(bgInput);
    await userEvent.type(bgInput, '#123456');
    await userEvent.tab();

    const applyButton = screen.getByRole('button', { name: /Apply Custom/i });
    await userEvent.click(applyButton);

    expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#123456');
  });

  it('resets to preset theme correctly', async () => {
    const TestComponent = () => (
      <ThemeProvider>
        <CustomizationPanel />
      </ThemeProvider>
    );
    render(<TestComponent />);

    const lightButton = screen.getByRole('button', { name: 'Light' });
    await userEvent.click(lightButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('docugen-theme', 'light');
    expect(document.documentElement.className).toContain('bg-white');
  });

  it('saves and loads custom theme from localStorage', () => {
    const customTheme = {
      name: 'Custom',
      bg: '#111111',
      text: '#222222',
      border: '#333333',
      primary: '#444444',
    };
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'docugen-custom-theme') return JSON.stringify(customTheme);
      return null;
    });

    const TestComponent = () => (
      <ThemeProvider>
        <CustomizationPanel />
      </ThemeProvider>
    );
    render(<TestComponent />);

    // Should load custom theme values
    expect(screen.getByDisplayValue('Background')).toHaveValue('#111111');
    expect(screen.getByDisplayValue('Text')).toHaveValue('#222222');
  });
});
