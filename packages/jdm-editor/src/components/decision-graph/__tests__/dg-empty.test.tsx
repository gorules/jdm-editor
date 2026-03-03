import { act, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphProvider, useDecisionGraphRaw } from '../context/dg-store.context';
import { DecisionGraphEmpty } from '../dg-empty';
import type { DecisionGraphType } from '../dg-types';

const StoreProbe = ({ onStore }: { onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>> }) => {
  const store = useDecisionGraphRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

const graph: DecisionGraphType = {
  nodes: [
    { id: 'node-1', name: 'Input', type: 'inputNode', content: { schema: '{}' }, position: { x: 0, y: 0 } },
    { id: 'node-2', name: 'Output', type: 'outputNode', content: { schema: '{}' }, position: { x: 100, y: 0 } },
  ],
  edges: [],
};

describe('DecisionGraphEmpty', () => {
  it('sanitizes open tabs and active tab when viewConfig is enabled', () => {
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();
    const { rerender } = render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={graph} />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    act(() => {
      store?.actions.openTab('node-1');
      store?.actions.openTab('node-2');
    });
    expect(store?.stateStore.getState().activeTab).toBe('node-2');

    rerender(
      <DecisionGraphProvider>
        <DecisionGraphEmpty
          value={graph}
          viewConfig={{ enabled: true, permissions: { graph: 'edit:full', 'node-1': 'edit:full', 'node-2': null } }}
        />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const state = store?.stateStore.getState();
    expect(state?.openTabs).toEqual(['node-1']);
    expect(state?.activeTab).toBe('graph');
  });

  it('updates debounced onChange listener on prop changes and emits latest graph update once per debounce window', () => {
    vi.useFakeTimers();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();
    const onChangeA = vi.fn();
    const onChangeB = vi.fn();

    const { rerender } = render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={graph} onChange={onChangeA} />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    act(() => {
      store?.actions.setDecisionGraph({
        nodes: [
          ...graph.nodes,
          { id: 'node-3', name: 'Expr', type: 'expressionNode', content: { expressions: [] }, position: { x: 200, y: 0 } },
        ],
      });
      store?.actions.setDecisionGraph({
        nodes: [
          ...graph.nodes,
          { id: 'node-4', name: 'Expr2', type: 'expressionNode', content: { expressions: [] }, position: { x: 220, y: 0 } },
        ],
      });
      vi.advanceTimersByTime(110);
    });

    expect(onChangeA).toHaveBeenCalledTimes(1);
    expect(onChangeA.mock.calls[0]?.[0].nodes).toHaveLength(3);
    expect(onChangeA.mock.calls[0]?.[0].nodes.at(-1)?.id).toBe('node-4');

    rerender(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={graph} onChange={onChangeB} />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    act(() => {
      store?.actions.setDecisionGraph({
        nodes: [
          ...graph.nodes,
          { id: 'node-5', name: 'Expr3', type: 'expressionNode', content: { expressions: [] }, position: { x: 240, y: 0 } },
        ],
      });
      vi.advanceTimersByTime(110);
    });

    expect(onChangeA).toHaveBeenCalledTimes(1);
    expect(onChangeB).toHaveBeenCalledTimes(1);
    expect(onChangeB.mock.calls[0]?.[0].nodes.at(-1)?.id).toBe('node-5');
    vi.useRealTimers();
  });
});
