import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphProvider, useDecisionGraphRaw } from '../../context/dg-store.context';
import { DecisionGraphEmpty } from '../../dg-empty';
import type { DecisionGraphType } from '../../dg-types';
import { GraphNodes } from '../graph-nodes';

const graph: DecisionGraphType = {
  nodes: [
    {
      id: 'dt-1',
      type: 'decisionTableNode',
      name: 'Allowed Table',
      content: { hitPolicy: 'first', inputs: [], outputs: [], rules: [] },
      position: { x: 0, y: 0 },
    },
    {
      id: 'expr-1',
      type: 'expressionNode',
      name: 'Hidden Expression',
      content: { expressions: [], passThrough: true, inputField: null, outputPath: null, executionMode: 'single' },
      position: { x: 200, y: 0 },
    },
  ],
  edges: [],
};

const StoreProbe = ({ onStore }: { onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>> }) => {
  const store = useDecisionGraphRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

describe('GraphNodes', () => {
  it('shows only permitted nodes in view mode and opens tab from node card click', async () => {
    const user = userEvent.setup();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty
          value={graph}
          viewConfig={{
            enabled: true,
            permissions: {
              'dt-1': 'edit:full',
              'expr-1': null,
            },
          }}
        />
        <GraphNodes />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    expect(await screen.findByText('Decision View')).toBeInTheDocument();
    expect(screen.getByText('1 configurable items')).toBeInTheDocument();
    expect(screen.getByText('Allowed Table')).toBeInTheDocument();
    expect(screen.queryByText('Hidden Expression')).not.toBeInTheDocument();

    await user.click(screen.getByText('Allowed Table'));

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store?.stateStore.getState().activeTab).toBe('dt-1');
    expect(store?.stateStore.getState().openTabs).toEqual(['dt-1']);
  });
});
