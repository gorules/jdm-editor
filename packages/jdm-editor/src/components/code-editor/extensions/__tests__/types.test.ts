import { EditorState } from '@codemirror/state';
import { createVariableType } from '@gorules/zen-engine-wasm';
import { describe, expect, it } from 'vitest';

import {
  buildTypeCompletion,
  typeField,
  updateExpectedVariableTypeEffect,
  updateExpressionTypeEffect,
  updateStrictModeEffect,
  updateVariableTypeEffect,
  zenKindToString,
} from '../types';

const createTestVariableType = () =>
  createVariableType({
    Object: {
      customer: { Object: { id: 'String' } },
      amount: 'Number',
    },
  });

describe('types helpers', () => {
  it('buildTypeCompletion builds object property completions', () => {
    const completions = buildTypeCompletion({ kind: { Object: { amount: 'Number', approved: 'Bool' } }, type: 'variable' });
    expect(completions).toHaveLength(2);
    expect(completions[0]).toMatchObject({ label: 'amount', type: 'variable', detail: 'number' });
  });

  it('zenKindToString converts primitive and structured kinds', () => {
    expect(zenKindToString('String')).toBe('string');
    expect(zenKindToString({ Array: 'Bool' })).toBe('bool[]');
    expect(zenKindToString({ Const: 'usd' })).toBe('"usd"');
    expect(zenKindToString({ Enum: ['usd', 'eur'] })).toBe('"usd" | "eur"');
  });

  it('typeField computes type info on variable type update and doc change', () => {
    const variableType = createTestVariableType();
    let state = EditorState.create({ doc: 'amount', extensions: [typeField] });

    state = state.update({
      changes: { from: 0, to: state.doc.length, insert: 'amount' },
      effects: [updateVariableTypeEffect.of(variableType)],
    }).state;

    const field = state.field(typeField);
    expect(field.rootKind).toEqual({ Object: { customer: { Object: { id: 'String' } }, amount: 'Number' } });
    expect(field.types[0]?.kind).toBe('Number');
  });

  it('typeField supports unary mode, strict mode, and expected type updates', () => {
    const variableType = createTestVariableType();
    let state = EditorState.create({ doc: 'amount > 10', extensions: [typeField] });

    state = state.update({ effects: [updateVariableTypeEffect.of(variableType)] }).state;
    state = state.update({ effects: [updateExpressionTypeEffect.of('unary'), updateStrictModeEffect.of(true)] }).state;
    state = state.update({ effects: [updateExpectedVariableTypeEffect.of(variableType)] }).state;

    const field = state.field(typeField);
    expect(field.expressionType).toBe('unary');
    expect(field.strict).toBe(true);
    expect(field.expectedVariableType).toBe(variableType);
  });
});
