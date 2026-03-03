import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  DecisionTableProvider,
  parseDecisionTable,
  useDecisionTableRaw,
} from '../dt-store.context';

const wrapper = ({ children }: { children: React.ReactNode }) => <DecisionTableProvider>{children}</DecisionTableProvider>;

describe('decision table store', () => {
  it('parseDecisionTable creates required schema defaults', () => {
    const table = parseDecisionTable({ hitPolicy: 'first', inputs: [], outputs: [], rules: [] });
    expect(table.inputs).toHaveLength(1);
    expect(table.outputs).toHaveLength(1);
    expect(table.executionMode).toBe('single');
    expect(table.passThorough).toBe(false);
  });

  it('commitData updates target cell and emits onChange', () => {
    const { result } = renderHook(() => useDecisionTableRaw(), { wrapper });
    const onChange = vi.fn();

    const seed = parseDecisionTable({
      hitPolicy: 'first',
      inputs: [{ id: 'in', name: 'Input' }],
      outputs: [{ id: 'out', name: 'Output', field: 'output' }],
      rules: [{ _id: 'r1', in: 'old', out: '' }],
    });

    act(() => {
      result.current.listenerStore.setState({ onChange });
      result.current.actions.setDecisionTable(seed);
      result.current.actions.commitData('updated', { x: 'in', y: 0 });
    });

    const table = result.current.stateStore.getState().decisionTable;
    expect(table.rules[0].in).toBe('updated');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('addRowAbove shifts cursor when inserting at current row', () => {
    const { result } = renderHook(() => useDecisionTableRaw(), { wrapper });
    const seed = parseDecisionTable({
      hitPolicy: 'first',
      inputs: [{ id: 'in', name: 'Input' }],
      outputs: [{ id: 'out', name: 'Output', field: 'output' }],
      rules: [{ _id: 'r1', in: '', out: '' }],
    });

    act(() => {
      result.current.actions.setDecisionTable(seed);
      result.current.actions.setCursor({ x: 'in', y: 0 });
      result.current.actions.addRowAbove(0);
    });

    const state = result.current.stateStore.getState();
    expect(state.decisionTable.rules).toHaveLength(2);
    expect(state.cursor).toEqual({ x: 'in', y: 1 });
  });
});
