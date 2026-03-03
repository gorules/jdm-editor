import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphProvider, useDecisionGraphRaw } from '../dg-store.context';

const wrapper = ({ children }: { children: React.ReactNode }) => <DecisionGraphProvider>{children}</DecisionGraphProvider>;

describe('decision graph store', () => {
  it('openTab and closeTab apply tab lifecycle actions consistently', () => {
    const { result } = renderHook(() => useDecisionGraphRaw(), { wrapper });

    act(() => {
      result.current.actions.openTab('node-1');
      result.current.actions.openTab('node-2');
      result.current.actions.openTab('node-3');
      result.current.actions.closeTab('node-2', 'close-right');
    });

    expect(result.current.stateStore.getState().openTabs).toEqual(['node-1', 'node-2']);
    expect(result.current.stateStore.getState().activeTab).toBe('node-1');

    act(() => {
      result.current.actions.closeTab('node-2', 'close-left');
    });

    expect(result.current.stateStore.getState().openTabs).toEqual(['node-2']);
    expect(result.current.stateStore.getState().activeTab).toBe('node-2');

    act(() => {
      result.current.actions.closeTab('node-2');
    });

    expect(result.current.stateStore.getState().openTabs).toEqual([]);
    expect(result.current.stateStore.getState().activeTab).toBe('graph');
  });

  it('setDecisionGraph respects skipOnChangeEvent option', () => {
    const { result } = renderHook(() => useDecisionGraphRaw(), { wrapper });
    const onChange = vi.fn();

    act(() => {
      result.current.listenerStore.setState({ onChange });
      result.current.actions.setDecisionGraph(
        {
          nodes: [{ id: 'n1', name: 'Input', type: 'inputNode', position: { x: 0, y: 0 }, content: { schema: '{}' } }],
          edges: [],
        },
        { skipOnChangeEvent: true },
      );
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.stateStore.getState().decisionGraph.nodes).toHaveLength(1);

    act(() => {
      result.current.actions.setDecisionGraph({ edges: [] });
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('setCompactMode persists preference to localStorage', () => {
    const { result } = renderHook(() => useDecisionGraphRaw(), { wrapper });

    act(() => {
      result.current.actions.setCompactMode(true);
    });

    expect(result.current.stateStore.getState().compactMode).toBe(true);
    expect(localStorage.getItem('jdm-compact-mode')).toBe('true');
  });
});
