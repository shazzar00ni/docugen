import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from '../components/mobile/MobileMenu';
import { isMobile, useMediaQuery } from '../lib/responsive';

// Mock window.matchMedia for tests
const matchMediaMock = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => matchMediaMock(query)),
});

describe('responsive utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('detects mobile screen size', () => {
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });
    expect(isMobile()).toBe(true);
  });

  it('detects desktop screen size', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    expect(isMobile()).toBe(false);
  });
});

describe('MobileMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders mobile menu trigger on small screens', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const TestComponent = () => (
      <div>
        <MobileMenu>
          <div>Test Content</div>
        </MobileMenu>
      </div>
    );
    render(<TestComponent />);
    expect(screen.getByRole('button', { name: 'Toggle navigation menu' })).toBeInTheDocument();
  });

  it('does not render mobile menu on desktop', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const TestComponent = () => (
      <div>
        <MobileMenu>
          <div>Test Content</div>
        </MobileMenu>
      </div>
    );
    render(<TestComponent />);
    expect(
      screen.queryByRole('button', { name: 'Toggle navigation menu' })
    ).not.toBeInTheDocument();
  });

  it('opens and closes mobile menu', async () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const TestComponent = () => (
      <div>
        <MobileMenu>
          <div>Test Content</div>
        </MobileMenu>
      </div>
    );
    render(<TestComponent />);
    const trigger = screen.getByRole('button', { name: 'Toggle navigation menu' });

    // Menu should be closed initially
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();

    // Open the menu
    await userEvent.click(trigger);
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Close the menu
    await userEvent.click(trigger);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
