import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../components/theme/ThemeProvider';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Theme, DEFAULT_THEME, THEMES } from '../lib/theme';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default theme context', () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-display">{theme}</div>;
    };
    render(<TestComponent />);
    expect(screen.getByTestId('theme-display')).toHaveTextContent(DEFAULT_THEME);
  });

  it('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('light');
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-display">{theme}</div>;
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
  });

  it('updates document class and localStorage when theme changes', () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return (
        <button data-testid="set-theme" onClick={() => setTheme('custom')}>
          Set theme
        </button>
      );
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    screen.getByTestId('set-theme').click();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('docugen-theme', 'custom');
    expect(document.documentElement.className).toBe(THEMES.custom.bg);
  });
});

describe('ThemeToggle', () => {
  it('renders theme switcher buttons', () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return <ThemeToggle />;
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTitle('Light theme')).toBeInTheDocument();
    expect(screen.getByTitle('Dark theme')).toBeInTheDocument();
    expect(screen.getByTitle('Custom theme')).toBeInTheDocument();
  });
});
