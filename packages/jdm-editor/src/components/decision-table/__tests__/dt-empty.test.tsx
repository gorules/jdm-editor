import { act, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionTableEmpty } from '../dt-empty';
import { DecisionTableProvider, parseDecisionTable, useDecisionTableRaw } from '../context/dt-store.context';

const StoreProbe = ({ onStore }: { onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>> }) => {
  const store = useDecisionTableRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

describe('DecisionTableEmpty', () => {
  it('syncs top-level props into state store', () => {
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>();
    render(
      <DecisionTableProvider>
        <DecisionTableEmpty id="dt-1" name="table.json" disabled permission="edit:rules" colWidth={222} minColWidth={111} />
        <StoreProbe onStore={onStore} />
      </DecisionTableProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    const state = store?.stateStore.getState();
    expect(state?.id).toBe('dt-1');
    expect(state?.name).toBe('table.json');
    expect(state?.disabled).toBe(true);
    expect(state?.permission).toBe('edit:rules');
    expect(state?.colWidth).toBe(222);
    expect(state?.minColWidth).toBe(111);
  });

  it('updates debounced onChange listener on prop changes and emits only latest payload per debounce window', () => {
    vi.useFakeTimers();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>();
    const onChangeA = vi.fn();
    const onChangeB = vi.fn();
    const value = parseDecisionTable({
      hitPolicy: 'first',
      inputs: [{ id: 'in', name: 'Input' }],
      outputs: [{ id: 'out', name: 'Output', field: 'output' }],
      rules: [{ _id: 'r1', in: 'start', out: '' }],
    });

    const { rerender } = render(
      <DecisionTableProvider>
        <DecisionTableEmpty value={value} onChange={onChangeA} />
        <StoreProbe onStore={onStore} />
      </DecisionTableProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    act(() => {
      store?.actions.commitData('changed-1', { x: 'in', y: 0 });
      store?.actions.commitData('changed-2', { x: 'in', y: 0 });
      vi.advanceTimersByTime(110);
    });

    expect(onChangeA).toHaveBeenCalledTimes(1);
    expect(onChangeA.mock.calls[0]?.[0].rules[0].in).toBe('changed-2');

    rerender(
      <DecisionTableProvider>
        <DecisionTableEmpty value={value} onChange={onChangeB} />
        <StoreProbe onStore={onStore} />
      </DecisionTableProvider>,
    );

    act(() => {
      store?.actions.commitData('changed-3', { x: 'in', y: 0 });
      vi.advanceTimersByTime(110);
    });

    expect(onChangeA).toHaveBeenCalledTimes(1);
    expect(onChangeB).toHaveBeenCalledTimes(1);
    expect(onChangeB.mock.calls[0]?.[0].rules[0].in).toBe('changed-3');
    vi.useRealTimers();
  });
});
