/**
 * @file Vitest global setup for React Testing Library. Configures mocks for localStorage and IntersectionObserver.
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, beforeEach } from 'vitest';

/**
 * Mock implementation of the browser's localStorage API for test environments.
 */
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

/**
 * Setup global mocks for IntersectionObserver and localStorage before all tests run.
 */
beforeAll(() => {
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

/**
 * Reset localStorage mocks before each individual test to ensure isolation.
 */
beforeEach(() => {
  localStorageMock.clear.mockReset();
  localStorageMock.getItem.mockReset();
  localStorageMock.setItem.mockReset();
  localStorageMock.removeItem.mockReset();
  localStorageMock.getItem.mockReturnValue(null);
});

/**
 * Clean up React Testing Library renders and DOM state after each test.
 */
afterEach(() => {
  cleanup();
});
