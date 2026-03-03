import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphProvider, useDecisionGraphRaw } from '../../context/dg-store.context';
import { DecisionGraphEmpty } from '../../dg-empty';
import type { DecisionGraphType } from '../../dg-types';
import { GraphTabs } from '../graph-tabs';

const graph: DecisionGraphType = {
  nodes: [
    { id: 'input', type: 'inputNode', name: 'Input', content: { schema: '{}' }, position: { x: 0, y: 0 } },
    {
      id: 'expr-1',
      type: 'expressionNode',
      name: 'Expr 1',
      content: { expressions: [], passThrough: true, inputField: null, outputPath: null, executionMode: 'single' },
      position: { x: 200, y: 0 },
    },
    {
      id: 'expr-2',
      type: 'expressionNode',
      name: 'Expr 2',
      content: { expressions: [], passThrough: true, inputField: null, outputPath: null, executionMode: 'single' },
      position: { x: 400, y: 0 },
    },
    {
      id: 'expr-3',
      type: 'expressionNode',
      name: 'Expr 3',
      content: { expressions: [], passThrough: true, inputField: null, outputPath: null, executionMode: 'single' },
      position: { x: 600, y: 0 },
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

describe('GraphTabs', () => {
  it('opens tabs on click and closes the selected tab through tab close action', async () => {
    const user = userEvent.setup();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={graph} />
        <GraphTabs />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();

    act(() => {
      store?.actions.openTab('expr-1');
      store?.actions.openTab('expr-2');
    });

    await user.click(await screen.findByText('Expr 1'));
    expect(store?.stateStore.getState().activeTab).toBe('expr-1');

    const tabLabel = screen.getByText('Expr 1').closest('.grl-graph-tabs__tab');
    expect(tabLabel).toBeTruthy();

    const closeIcon = tabLabel?.querySelector('button.grl-graph-tabs__closeIcon');
    expect(closeIcon).toBeTruthy();
    if (!(closeIcon instanceof HTMLButtonElement)) {
      throw new Error('Expected close icon button for Expr 1 tab');
    }

    await user.click(closeIcon);

    expect(store?.stateStore.getState().openTabs).toEqual(['expr-2']);
    expect(store?.stateStore.getState().activeTab).toBe('graph');
    expect(screen.queryByText('Expr 1')).not.toBeInTheDocument();
    expect(screen.getByText('Expr 2')).toBeInTheDocument();
  });

  it('applies context-menu close-right action to open tabs', async () => {
    const user = userEvent.setup();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionGraphRaw>) => void>();

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={graph} />
        <GraphTabs />
        <StoreProbe onStore={onStore} />
      </DecisionGraphProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];

    act(() => {
      store?.actions.openTab('expr-1');
      store?.actions.openTab('expr-2');
      store?.actions.openTab('expr-3');
    });

    const expr2Label = await screen.findByText('Expr 2');
    fireEvent.contextMenu(expr2Label);

    const closeRight = await screen.findByText('Close Tabs to the right');
    await user.click(closeRight);

    expect(store?.stateStore.getState().openTabs).toEqual(['expr-1', 'expr-2']);
    expect(store?.stateStore.getState().activeTab).toBe('expr-2');
    expect(screen.queryByText('Expr 3')).not.toBeInTheDocument();
    expect(screen.getByText('Expr 2')).toBeInTheDocument();
  });
});
