/* eslint-disable vitest/require-top-level-describe */

import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// vi.useFakeTimers();

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
