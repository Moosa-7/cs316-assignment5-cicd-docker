import { render } from '@testing-library/react';
import App from './App';

// Mock axios so test doesn't try to hit a real backend
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

test('App renders without crashing', () => {
  render(<App />);
});

test('basic math works', () => {
  expect(1 + 1).toBe(2);
});
