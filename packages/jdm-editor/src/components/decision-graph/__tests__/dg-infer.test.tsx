import { act, render, waitFor } from '@testing-library/react';
import { VariableType } from '@gorules/zen-engine-wasm';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphInferTypes } from '../dg-infer';
import { DecisionGraphProvider, NodeTypeKind, useDecisionGraphRaw } from '../context/dg-store.context';
import type { Simulation } from '../simulator/simulation.types';

const StoreProbe = ({ onStore }: { onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>> }) => {
  const store = useDecisionGraphRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

describe('DecisionGraphInferTypes', () => {
  it('derives global $nodes type from node names and output types', async () => {
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();
    render(
      <DecisionGraphProvider>
        <DecisionGraphInferTypes />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();

    act(() => {
      store?.stateStore.setState({
        decisionGraph: {
          nodes: [{ id: 'n1', name: 'AutoApproved', type: 'expressionNode', position: { x: 0, y: 0 }, content: {} }],
          edges: [],
        },
        nodeTypes: {
          n1: {
            [NodeTypeKind.Output]: VariableType.fromJson('Bool'),
          },
        },
      });
    });

    await waitFor(() => {
      const globalType = store?.stateStore.getState().globalType.$nodes;
      expect(globalType?.get('AutoApproved').toJson()).toBe('Bool');
    });

    const firstNodesType = store?.stateStore.getState().globalType.$nodes;
    act(() => {
      store?.stateStore.setState({ hoveredEdgeId: 'edge-1' });
    });

    await waitFor(() => {
      expect(store?.stateStore.getState().globalType.$nodes).toBe(firstNodesType);
    });
  });

  it('removes trace-driven Input/Output node types when simulation trace becomes null', async () => {
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();
    render(
      <DecisionGraphProvider>
        <DecisionGraphInferTypes />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();

    const simulateWithTrace: Simulation = {
      result: {
        performance: '1ms',
        result: {},
        snapshot: { nodes: [], edges: [] },
        trace: {},
      },
    };

    act(() => {
      store?.stateStore.setState({
        decisionGraph: {
          nodes: [{ id: 'n1', name: 'Node', type: 'expressionNode', position: { x: 0, y: 0 }, content: {} }],
          edges: [],
        },
        nodeTypes: {
          n1: {
            [NodeTypeKind.Input]: VariableType.fromJson('String'),
            [NodeTypeKind.Output]: VariableType.fromJson('Number'),
            [NodeTypeKind.InferredOutput]: VariableType.fromJson('Bool'),
          },
        },
        simulate: simulateWithTrace,
      });
    });

    await waitFor(() => {
      const nodeType = store?.stateStore.getState().nodeTypes.n1;
      expect(nodeType?.[NodeTypeKind.Input]?.toJson()).toBe('String');
      expect(nodeType?.[NodeTypeKind.Output]?.toJson()).toBe('Number');
    });

    act(() => {
      store?.stateStore.setState({ simulate: {} });
    });

    await waitFor(() => {
      const nodeType = store?.stateStore.getState().nodeTypes.n1;
      expect(nodeType?.[NodeTypeKind.Input]).toBeUndefined();
      expect(nodeType?.[NodeTypeKind.Output]).toBeUndefined();
      expect(nodeType?.[NodeTypeKind.InferredOutput]?.toJson()).toBe('Bool');
    });
  });
});
