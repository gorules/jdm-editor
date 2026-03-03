import { VariableType } from '@gorules/zen-engine-wasm';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { describe, expect, it } from 'vitest';

import { isWasmAvailable } from '../../../../helpers/wasm';
import { validateZenExpression } from '../linter';

describe('validateZenExpression integration', () => {
  it('returns no diagnostics for empty source', () => {
    expect(
      validateZenExpression({
        source: '   ',
        expressionType: 'standard',
        types: [],
      }),
    ).toEqual([]);
  });

  it('maps type diagnostics severities from hint/info/warning prefixes', () => {
    const diagnostics = validateZenExpression({
      source: 'amount',
      types: [
        { error: 'Hint: consider cast', kind: 'Any', nodeKind: 'Expr', span: [0, 6] },
        { error: 'Info: this narrows type', kind: 'Any', nodeKind: 'Expr', span: [0, 6] },
        { error: 'Type mismatch', kind: 'Any', nodeKind: 'Expr', span: [0, 6] },
      ],
    });

    const severities = diagnostics.map((d) => d.severity);
    expect(severities).toContain('hint');
    expect(severities).toContain('info');
    expect(severities).toContain('warning');
  });

  it('enforces unary bool result with strictness-aware severity', () => {
    const warningDiagnostics = validateZenExpression({
      source: 'amount',
      expressionType: 'unary',
      strict: false,
      types: [{ error: null, kind: 'Number', nodeKind: 'Expr', span: [0, 6] }],
    });

    const errorDiagnostics = validateZenExpression({
      source: 'amount',
      expressionType: 'unary',
      strict: true,
      types: [{ error: null, kind: 'Number', nodeKind: 'Expr', span: [0, 6] }],
    });

    const warningUnary = warningDiagnostics.find((d) => d.message.includes('Expected unary expression'));
    const errorUnary = errorDiagnostics.find((d) => d.message.includes('Expected unary expression'));

    expect(warningUnary?.severity).toBe('warning');
    expect(errorUnary?.severity).toBe('error');
  });

  it('reports expected type mismatch and attaches renderMessage', () => {
    const expected = VariableType.fromJson('Bool');
    const diagnostics = validateZenExpression({
      source: 'amount',
      strict: true,
      types: [{ error: null, kind: 'Any', nodeKind: 'Expr', span: [0, 6] }],
      expectedVariableType: expected,
    });

    const mismatch = diagnostics.find((d) => d.message.includes('Expected expression to evaluate to type'));
    expect(mismatch?.severity).toBe('error');

    const host = document.createElement('div');
    document.body.appendChild(host);
    const view = new EditorView({
      state: EditorState.create({ doc: '' }),
      parent: host,
    });

    const rendered = mismatch?.renderMessage?.(view);
    expect(rendered instanceof HTMLElement).toBe(true);
    expect(rendered?.textContent).toContain('Expected expression to evaluate to type');

    view.destroy();
    host.remove();
  });

  it('returns parser diagnostics for invalid syntax when wasm is available', () => {
    const diagnostics = validateZenExpression({
      source: 'a +',
      expressionType: 'standard',
      types: [],
    });

    if (!isWasmAvailable()) {
      expect(diagnostics).toEqual([]);
      return;
    }

    expect(diagnostics.length).toBeGreaterThan(0);
    expect(
      diagnostics.some((d) => ['Parser error', 'Lexer error', 'Compiler error', 'VM error'].includes(d.source ?? '')),
    ).toBe(true);
  });
});
