import { parser as zenParser } from '@gorules/lezer-zen';
import { parser as zenTemplateParser } from '@gorules/lezer-zen-template';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { describe, expect, it, vi } from 'vitest';

import { applyCompletion, zenExtensions } from '../zen';

describe('zen parser seams', () => {
  it('parses valid standard expressions', () => {
    const tree = zenParser.parse('amount > 100 && customer.id != ""');
    expect(tree.length).toBeGreaterThan(0);
    expect(tree.topNode.name).toBe('Standard');
  });

  it('parses templates with embedded expressions', () => {
    const tree = zenTemplateParser.parse('Hello {{ customer.name }}');
    expect(tree.length).toBeGreaterThan(0);
  });

  it('handles malformed expressions without throwing', () => {
    const tree = zenParser.parse('amount > ');
    expect(tree.length).toBeGreaterThan(0);
    expect(tree.toString()).toContain('⚠');
  });
});

describe('zen editor extensions', () => {
  it('returns extension set with linter by default', () => {
    const extensions = zenExtensions({ type: 'standard' });
    expect(extensions.length).toBeGreaterThan(5);
  });

  it('can disable linter extension', () => {
    const withLint = zenExtensions({ type: 'standard', lint: true });
    const withoutLint = zenExtensions({ type: 'standard', lint: false });
    expect(withoutLint.length).toBe(withLint.length - 1);
  });
});

describe('applyCompletion', () => {
  it('adds parens for function/method completions and places cursor inside', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const view = new EditorView({
      state: EditorState.create({ doc: '' }),
      parent: host,
    });

    const dispatchSpy = vi.spyOn(view, 'dispatch');
    applyCompletion(view, { label: 'len', type: 'function', boost: 1 }, 0, 0);

    expect(view.state.doc.toString()).toBe('len()');
    expect(view.state.selection.main.anchor).toBe(4);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    dispatchSpy.mockRestore();
    view.destroy();
    host.remove();
  });

  it('inserts plain labels for non-function completions', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const view = new EditorView({
      state: EditorState.create({ doc: '' }),
      parent: host,
    });

    const dispatchSpy = vi.spyOn(view, 'dispatch');
    applyCompletion(view, { label: 'customer', type: 'variable', boost: 1 }, 0, 0);

    expect(view.state.doc.toString()).toBe('customer');
    expect(view.state.selection.main.anchor).toBe(8);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    dispatchSpy.mockRestore();
    view.destroy();
    host.remove();
  });
});
