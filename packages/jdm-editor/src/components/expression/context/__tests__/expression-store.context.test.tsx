import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import {
  ExpressionStoreProvider,
  createExpression,
  useExpressionStoreRaw,
} from '../expression-store.context';

const wrapper = ({ children }: { children: React.ReactNode }) => <ExpressionStoreProvider>{children}</ExpressionStoreProvider>;

describe('expression store', () => {
  it('createExpression uses defaults and applies partial overrides', () => {
    const expression = createExpression({ key: 'k', value: 'v' });
    expect(expression.id).toEqual(expect.any(String));
    expect(expression.key).toBe('k');
    expect(expression.value).toBe('v');
  });

  it('addRowAbove inserts a new expression at the requested index', () => {
    const { result } = renderHook(() => useExpressionStoreRaw(), { wrapper });

    act(() => {
      result.current.getState().setExpressions([
        createExpression({ id: 'a', key: 'first', value: '1' }),
        createExpression({ id: 'b', key: 'second', value: '2' }),
      ]);
      result.current.getState().addRowAbove(1);
    });

    const expressions = result.current.getState().expressions;
    expect(expressions).toHaveLength(3);
    expect(expressions[1].id).not.toBe('a');
    expect(expressions[1].id).not.toBe('b');
  });

  it('updateRow updates only the targeted row fields', () => {
    const { result } = renderHook(() => useExpressionStoreRaw(), { wrapper });

    act(() => {
      result.current.getState().setExpressions([
        createExpression({ id: 'a', key: 'first', value: '1' }),
        createExpression({ id: 'b', key: 'second', value: '2' }),
      ]);
      result.current.getState().updateRow(1, { key: 'updated' });
    });

    const expressions = result.current.getState().expressions;
    expect(expressions).toHaveLength(2);
    expect(expressions[0]).toMatchObject({ id: 'a', key: 'first' });
    expect(expressions[1]).toMatchObject({ id: 'b', key: 'updated' });
  });

  it('swapRows reorders rows and removeRow removes by index', () => {
    const { result } = renderHook(() => useExpressionStoreRaw(), { wrapper });

    act(() => {
      result.current.getState().setExpressions([
        createExpression({ id: 'a', key: 'first', value: '1' }),
        createExpression({ id: 'b', key: 'second', value: '2' }),
        createExpression({ id: 'c', key: 'third', value: '3' }),
      ]);
      result.current.getState().swapRows(0, 2);
      result.current.getState().removeRow(1);
    });

    const expressions = result.current.getState().expressions;
    expect(expressions.map((row) => row.id)).toEqual(['b', 'a']);
  });
});
