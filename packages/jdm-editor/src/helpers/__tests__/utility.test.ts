import { describe, expect, it, vi } from 'vitest';

import { copyToClipboard, get, pasteFromClipboard } from '../utility';

describe('utility clipboard helpers', () => {
  it('uses navigator clipboard in secure contexts', async () => {
    const writeText = vi.fn<(content: string) => Promise<void>>().mockResolvedValue();
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText, readText: vi.fn() },
      configurable: true,
    });

    await copyToClipboard('hello');

    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('falls back to document.execCommand when clipboard api is unavailable', async () => {
    const execCommandSpy = vi.spyOn(document, 'execCommand').mockReturnValue(true);
    Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });

    await copyToClipboard('fallback-text');

    expect(execCommandSpy).toHaveBeenCalledWith('copy');
    expect(document.querySelector('textarea')).toBeNull();

    execCommandSpy.mockRestore();
  });

  it('returns empty string when clipboard read fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: vi.fn().mockRejectedValue(new Error('no permission')),
      },
      configurable: true,
    });

    await expect(pasteFromClipboard()).resolves.toBe('');
  });
});

describe('utility get', () => {
  it('returns nested values and default fallback', () => {
    const value = get({ a: { b: { c: 42 } } }, 'a.b.c', 0);
    const fallback = get({ a: {} }, 'a.b.c', 'missing');

    expect(value).toBe(42);
    expect(fallback).toBe('missing');
  });
});
