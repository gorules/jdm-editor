import { describe, expect, it } from 'vitest';

import { renderDiagnosticMessage } from '../diagnostic';

describe('renderDiagnosticMessage', () => {
  it('renders inline code spans with string color', () => {
    const result = renderDiagnosticMessage({ text: 'Type is `"usd"`', className: 'tok' });
    expect(result).toContain('class="tok"');
    expect(result).toContain('color: #6aab73');
    expect(result).toContain('&quot;usd&quot;');
  });

  it('renders number code spans with number color', () => {
    const result = renderDiagnosticMessage({ text: 'Value is `123`' });
    expect(result).toContain('color: #57a8f5');
    expect(result).toContain('123');
  });

  it('escapes html-sensitive characters in code spans', () => {
    const result = renderDiagnosticMessage({ text: 'Bad token `<img src=x onerror=1>`' });
    expect(result).toContain('&lt;img src=x onerror=1&gt;');
    expect(result).not.toContain('<img src=x onerror=1>');
  });

  it('returns unchanged text when no backtick spans exist', () => {
    const text = 'Plain text only';
    expect(renderDiagnosticMessage({ text })).toBe(text);
  });
});
