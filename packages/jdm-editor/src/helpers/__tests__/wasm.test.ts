import { describe, expect, it } from 'vitest';

import { isWasmAvailable } from '../wasm';

describe('isWasmAvailable integration contracts', () => {
  it('never throws and always returns a readiness-state value', () => {
    const sample = Array.from({ length: 3 }, () => isWasmAvailable());
    sample.forEach((value) => {
      expect([true, false, undefined]).toContain(value);
    });
  });

  it('once readiness becomes true, all subsequent calls remain true (cache monotonicity)', () => {
    const values = Array.from({ length: 5 }, () => isWasmAvailable());
    const firstTrueIndex = values.findIndex((v) => v === true);

    if (firstTrueIndex === -1) {
      expect(values.some((v) => v === true)).toBe(false);
      return;
    }

    const tail = values.slice(firstTrueIndex);
    tail.forEach((value) => expect(value).toBe(true));
  });
});
