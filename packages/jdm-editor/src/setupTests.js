import '@testing-library/jest-dom';
import initZenEngineWasm from '@gorules/zen-engine-wasm';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

beforeAll(async () => {
  await initZenEngineWasm();
});

afterEach(() => {
  cleanup();
});
