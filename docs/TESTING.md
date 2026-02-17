# Testing Guide

Comprehensive guide to testing in DocuGen, including setup, patterns, and best practices.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Test Setup](#test-setup)
- [Testing Patterns](#testing-patterns)
- [Component Testing](#component-testing)
- [Hook Testing](#hook-testing)
- [End-to-End (E2E) Testing](#end-to-end-e2e-testing)
- [Mocking](#mocking)
- [Coverage](#coverage)
- [Best Practices](#best-practices)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)

## Overview

DocuGen uses a comprehensive testing strategy focused on:

- **Unit Testing**: Component behavior and logic
- **Integration Testing**: Component interactions
- **End-to-End (E2E) Testing**: Full user flows in a real browser
- **Accessibility Testing**: Screen reader compatibility
- **User Experience Testing**: Real user interactions

### Testing Philosophy

1. **Test Behavior, Not Implementation**: Test what users see and do
2. **Minimal Mocking**: Mock external dependencies only
3. **Accessibility First**: Include a11y tests in every component
4. **Fast Feedback**: Tests run quickly in watch mode

## Testing Stack

| Tool                      | Purpose                     | Version |
| ------------------------- | --------------------------- | ------- |
| **Vitest**                | Test runner                 | 4.0.17  |
| **React Testing Library** | Component testing utilities | 16.3.2  |
| **Jest DOM**              | DOM assertions              | 6.9.1   |
| **jsdom**                 | Browser environment         | 27.4.0  |
| **Playwright**            | End-to-end testing          | latest  |

### End-to-End (E2E) Testing

DocuGen uses Playwright for end-to-end testing to verify full user flows in a real browser.

**Setup**:

- Config file: `playwright.config.ts`
- Test directory: `e2e/`
- Example test: `e2e/landing.spec.ts`

**Commands**:

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run E2E tests in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific E2E test file
npx playwright test e2e/landing.spec.ts

# Run E2E tests with UI
npx playwright test --ui
```

**Test Structure**:

- Tests use Playwright's `test` and `expect` functions
- Page object patterns for reusable selectors
- Located in `e2e/` directory

**Example Test**:

```typescript
import { test, expect } from '@playwright/test';

test('landing page loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});
```

| **@vitest/coverage-v8** | Code coverage | 4.0.18 |

### Why This Stack?

- **Vitest**: Fast, Vite-native, great TypeScript support
- **Testing Library**: Encourages testing from user perspective
- **Jest DOM**: Rich matchers for DOM assertions
- **jsdom**: Simulates browser environment for tests

## Test Setup

### Configuration

**Location**: `src/test/setup.ts`

The test setup file configures the testing environment:

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

// Setup global mocks
beforeAll(() => {
  // Mock IntersectionObserver for framer-motion
  vi.stubGlobal(
    'IntersectionObserver',
    class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );

  vi.stubGlobal('localStorage', localStorageMock);
});

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.clear.mockClear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.getItem.mockReturnValue(null);
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

### Global Mocks

The setup file provides these global mocks:

1. **localStorage**: Prevents actual storage access
2. **IntersectionObserver**: Required for Framer Motion viewport animations

### Configuration Files

**vitest.config.ts** (in project root):

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

## Testing Patterns

### Pattern 1: Basic Component Test

Structure for testing a simple component:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);

    // Assert element is in document
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays correct text', () => {
    render(<MyComponent />);

    // Assert text content
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Pattern 2: User Interaction Test

Testing user actions:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'new value' }
    });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'new value' } })
    );
  });
});
```

### Pattern 3: Props Testing

Testing component props:

```typescript
describe('Component Props', () => {
  it('applies variant prop', () => {
    render(<Button variant="secondary">Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-dark-800');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-8');
  });
});
```

### Pattern 4: Accessibility Testing

Testing accessibility:

```typescript
describe('Accessibility', () => {
  it('has correct ARIA attributes', () => {
    render(<Input aria-invalid={true} aria-describedby="error" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'error');
  });

  it('is keyboard accessible', () => {
    render(<Button>Focusable</Button>);

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('has proper labels', () => {
    render(<label>Email <Input /></label>);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
```

### Pattern 5: Async Testing

Testing async operations:

```typescript
describe('Async Operations', () => {
  it('shows loading state', async () => {
    render(<AsyncComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });

  it('handles async form submission', async () => {
    render(<FormComponent />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });
  });
});
```

## Component Testing

### UI Components

#### Button Component Tests

**Location**: `src/components/ui/Button.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies default variant and size', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-teal-600');
    expect(button).toHaveClass('px-6');
  });

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-dark-800');
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Key Testing Points**:

1. Text rendering with `getByRole('button', { name: /text/i })`
2. CSS class verification with `toHaveClass()`
3. Event handler testing with mocked functions
4. Props validation

#### Input Component Tests

**Location**: `src/components/ui/Input.test.tsx`

```typescript
describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'new value' }
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
```

**Key Testing Points**:

1. Input element rendering
2. Value change handling
3. Disabled state verification
4. Placeholder text

### Section Components

#### Newsletter Component Tests

**Location**: `src/components/Newsletter.test.tsx`

```typescript
describe('Newsletter', () => {
  it('renders newsletter section', () => {
    render(<Newsletter />);
    expect(screen.getByRole('heading', { name: /Stay in the loop/i })).toBeInTheDocument();
  });

  it('shows success message after submission', () => {
    render(<Newsletter />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
  });

  it('shows error for invalid email format', () => {
    render(<Newsletter />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });
});
```

**Key Testing Points**:

1. Form validation logic
2. Success/error state transitions
3. User input handling
4. Error message display

## Hook Testing

### Testing Custom Hooks

#### ThemeContext Tests

**Location**: `src/lib/ThemeContext.test.tsx`

```typescript
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './useTheme';

// Test component to use the hook
function TestComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
      <button onClick={() => setTheme('light')} data-testid="set-light">Set Light</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('provides default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('throws error when used outside provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');
  });
});
```

**Key Testing Points**:

1. Provider context value
2. Hook state updates
3. Error handling for misuse
4. localStorage integration (mocked)

## End-to-End (E2E) Testing

DocuGen uses [Playwright](https://playwright.dev/) for end-to-end testing, simulating real user interactions in actual browsers.

### E2E Stack

| Tool           | Purpose             | Version |
| -------------- | ------------------- | ------- |
| **Playwright** | E2E test runner     | Latest  |
| **Chromium**   | Chrome/Edge browser | -       |
| **Firefox**    | Firefox browser     | -       |
| **WebKit**     | Safari browser      | -       |

### Configuration

**Location**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
  ],
});

export default config;
```

### Running E2E Tests

```bash
# Run all E2E tests
npm run e2e

# Run in headed mode (see browser)
npm run e2e:headed

# Run specific test file
npx playwright test e2e/landing.spec.ts

# Run specific browser
npx playwright test --project=Chromium
```

### E2E Test Structure

E2E tests are located in the `e2e/` directory:

```text
e2e/
└── landing.spec.ts    # Landing page tests
```

### Writing E2E Tests

Example test from `e2e/landing.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('loads landing page and core sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: /your docs/i })).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
});
```

### Best Practices for E2E Tests

1. **Use semantic locators**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Test user flows**: Focus on critical user journeys
3. **Assert visibility**: Always use `toBeVisible()` for assertions
4. **Handle async properly**: Use `await` for all async operations
5. **Test responsive behavior**: Verify layouts at different viewport sizes

## Mocking

### Mocking Browser APIs

#### localStorage

```typescript
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

// In test setup or beforeEach
vi.stubGlobal('localStorage', localStorageMock);

// Usage in tests
localStorageMock.getItem.mockReturnValue('dark');
```

#### IntersectionObserver

Required for Framer Motion viewport animations:

```typescript
vi.stubGlobal(
  'IntersectionObserver',
  class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
);
```

#### matchMedia

```typescript
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### Mocking Functions

```typescript
// Create mock function
const mockFn = vi.fn();

// Mock implementation
mockFn.mockImplementation(() => 'mocked value');
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue({ data: [] });

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg');
```

### Mocking Modules

```typescript
// Mock entire module
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn(),
  postData: vi.fn(),
}));

// Mock specific import
import { fetchData } from '@/lib/api';
vi.mocked(fetchData).mockResolvedValue({ success: true });
```

## Coverage

### Running Coverage Reports

```bash
# Generate coverage report
npm run test:run -- --coverage

# Generate HTML report
npm run test:run -- --coverage --reporter=html
```

### Coverage Configuration

**vitest.config.ts**:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/main.tsx'],
    },
  },
});
```

### Coverage Goals

| Category   | Target | Priority |
| ---------- | ------ | -------- |
| Statements | 80%    | High     |
| Branches   | 75%    | Medium   |
| Functions  | 80%    | High     |
| Lines      | 80%    | High     |

### What to Test

**Must Test**:

- User interactions (clicks, inputs, form submissions)
- Conditional rendering logic
- Error handling
- Props validation
- Accessibility features

**Nice to Test**:

- CSS classes (if logic-dependent)
- Internal helper functions
- Edge cases

**Skip**:

- Simple rendering (covered by TypeScript)
- Static content
- Third-party libraries

## Best Practices

### 1. Test What Users See

```typescript
// Good - Test user-visible behavior
it('shows success message after form submission', () => {
  render(<Form />);
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

// Bad - Testing implementation details
it('calls submit function with correct args', () => {
  const submit = vi.spyOn(component, 'handleSubmit');
  // ...
});
```

### 2. Use Semantic Queries

Priority order for queries:

1. `getByRole` - Most preferred
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Inputs
4. `getByText` - Text content
5. `getByTestId` - Last resort

```typescript
// Good - Semantic queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');
screen.getByRole('heading', { level: 1 });

// Bad - Implementation queries
screen.getByTestId('submit-button');
document.querySelector('.btn-primary');
```

### 3. Keep Tests Independent

```typescript
// Good - Independent tests
describe('Component', () => {
  it('test 1', () => {
    render(<Component />);
    // assertions
  });

  it('test 2', () => {
    render(<Component />);
    // assertions
  });
});

// Bad - Shared state
let container;
beforeEach(() => {
  container = render(<Component />);
});
```

### 4. Test Edge Cases

```typescript
describe('Input', () => {
  it('handles empty input', () => {});
  it('handles very long input', () => {});
  it('handles special characters', () => {});
  it('handles rapid input changes', () => {});
});
```

### 5. Use Descriptive Test Names

```typescript
// Good - Clear intent
it('displays error message when email is invalid', () => {});

// Bad - Vague
it('test email validation', () => {});
```

### 6. Organize Tests with describe Blocks

```typescript
describe('Button', () => {
  describe('rendering', () => {
    it('renders with text', () => {});
    it('renders with icon', () => {});
  });

  describe('interactions', () => {
    it('calls onClick', () => {});
    it('handles disabled state', () => {});
  });

  describe('variants', () => {
    it('renders primary variant', () => {});
    it('renders secondary variant', () => {});
  });
});
```

## Running Tests

### Development Mode

```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once
npm run test:run

# Run specific test file
npm run test:run -- src/components/ui/Button.test.tsx

# Run tests matching pattern
npm run test:run -- --grep="Button"
```

### CI Mode

```bash
# Run once (for CI/CD)
npm run test:run

# With coverage
npm run test:run -- --coverage

# With verbose output
npm run test:run -- --reporter=verbose
```

### Watch Mode Commands

When in watch mode (`npm run test`):

| Key | Action                      |
| --- | --------------------------- |
| `a` | Run all tests               |
| `f` | Run only failed tests       |
| `p` | Filter by filename pattern  |
| `t` | Filter by test name pattern |
| `q` | Quit watch mode             |

## Troubleshooting

### Common Issues

#### 1. Tests Not Finding Elements

**Problem**: `screen.getByRole` or similar queries fail

**Solutions**:

```typescript
// Debug what's rendered
screen.debug();

// Log roles for debugging
console.log(screen.getByRole('button')); // See all buttons

// Use more specific queries
screen.getByRole('button', { name: /specific text/i });
```

#### 2. Async Test Failures

**Problem**: Test completes before async operations finish

**Solutions**:

```typescript
// Use waitFor for async assertions
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Or use findBy queries (returns promise)
const element = await screen.findByText('Loaded');
```

#### 3. localStorage Mock Not Working

**Problem**: Tests using localStorage fail

**Solution**:

```typescript
// Ensure mock is cleared between tests
beforeEach(() => {
  localStorageMock.clear.mockClear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.getItem.mockReturnValue(null);
});
```

#### 4. Framer Motion Warnings

**Problem**: Warnings about IntersectionObserver

**Solution**: Already mocked in `src/test/setup.ts`. If issues persist:

```typescript
// Mock framer-motion if needed
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    // ... other components
  },
}));
```

#### 5. TypeScript Errors in Tests

**Problem**: Type errors in test files

**Solutions**:

- Ensure `vitest/globals` is in tsconfig
- Import types explicitly: `import type { ... }`
- Check test file imports

### Debug Techniques

```typescript
// Log rendered output
screen.debug();

// Log specific element
screen.debug(screen.getByRole('button'));

// Pretty print HTML
console.log(prettyDOM(container));

// Check accessibility tree
console.log(screen.getByRole('button', { name: /submit/i }).outerHTML);
```

### Test Utilities

Create helper functions for common operations:

```typescript
// test/utils.tsx
import React from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/lib/ThemeContext';

interface TestRenderOptions extends RenderOptions {
  theme?: 'dark' | 'light';
}

export function render(
  ui: React.ReactElement,
  { theme = 'dark', ...options }: TestRenderOptions = {}
) {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ThemeProvider defaultTheme={theme}>
      {children}
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
```

Usage:

```typescript
import { render } from '@/test/utils';

it('renders with theme', () => {
  render(<Component />, { theme: 'light' });
  // test...
});
```

---

**Related Documents**:

- [Component Library](./COMPONENTS.md) - Component documentation
- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Architecture Guide](./ARCHITECTURE.md) - System design
