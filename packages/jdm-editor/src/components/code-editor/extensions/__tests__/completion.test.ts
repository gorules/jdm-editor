import { describe, expect, it } from 'vitest';

import { getCompletions } from '../completion';

describe('getCompletions integration', () => {
  it('returns the same array reference across repeated calls (cache contract)', () => {
    const first = getCompletions();
    const second = getCompletions();

    expect(Array.isArray(first)).toBe(true);
    expect(second).toBe(first);
  });

  it('returns completion entries with expected shape when available', () => {
    const completions = getCompletions();

    if (completions.length === 0) {
      expect(completions).toEqual([]);
      return;
    }

    const first = completions[0];
    expect(first).toMatchObject({
      type: expect.any(String),
      label: expect.any(String),
      detail: expect.any(String),
      info: expect.any(String),
    });
  });
});
