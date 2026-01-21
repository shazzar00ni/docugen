import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll } from 'vitest';

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
});

afterEach(() => {
  cleanup();
});
