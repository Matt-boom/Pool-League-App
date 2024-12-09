import '@testing-library/jest-dom';
import { expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn()
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  localStorageMock.getItem.mockImplementation((key) => {
    switch (key) {
      case 'teams':
        return '[]';
      case 'players':
        return '[]';
      case 'matches':
        return '[]';
      default:
        return null;
    }
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock window.alert
window.alert = vi.fn();

// Add missing global types
declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  }
}