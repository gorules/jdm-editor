import { describe, expect, it } from 'vitest';

import { getTrace } from '../trace';

describe('getTrace', () => {
  it('returns the value directly for non-array inputs', () => {
    expect(getTrace('value', 0)).toBe('value');
  });

  it('returns indexed array element when index is valid', () => {
    expect(getTrace(['a', 'b', 'c'], 2)).toBe('c');
  });

  it('falls back to first element when index is out of range', () => {
    expect(getTrace(['a', 'b', 'c'], 99)).toBe('a');
  });

  it('falls back to first element for negative index', () => {
    expect(getTrace(['a', 'b', 'c'], -1)).toBe('a');
  });
});
