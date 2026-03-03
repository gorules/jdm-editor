import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionTableCommandBar } from '../dt-command-bar';
import { DecisionTableProvider, parseDecisionTable, useDecisionTableRaw } from '../context/dt-store.context';
import { DecisionTableEmpty } from '../dt-empty';

const StoreProbe = ({ onStore }: { onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>> }) => {
  const store = useDecisionTableRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

describe('DecisionTableCommandBar', () => {
  it('adds rows above and below cursor through command bar buttons', async () => {
    const user = userEvent.setup();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>();
    const value = parseDecisionTable({
      hitPolicy: 'first',
      inputs: [{ id: 'in', name: 'Input' }],
      outputs: [{ id: 'out', name: 'Output', field: 'output' }],
      rules: [{ _id: 'r1', in: 'start', out: 'ok' }],
    });

    const { getByRole } = render(
      <DecisionTableProvider>
        <DecisionTableEmpty value={value} permission='edit:full' />
        <DecisionTableCommandBar />
        <StoreProbe onStore={onStore} />
      </DecisionTableProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();

    act(() => {
      store?.actions.setCursor({ x: 'in', y: 0 });
    });

    await user.click(getByRole('button', { name: 'arrow-down' }));

    expect(store?.stateStore.getState().decisionTable.rules).toHaveLength(2);

    await user.click(getByRole('button', { name: 'arrow-up' }));

    expect(store?.stateStore.getState().decisionTable.rules).toHaveLength(3);
    expect(store?.stateStore.getState().cursor?.y).toBe(1);
  });

  it('clears cursor when Deselect is clicked', async () => {
    const user = userEvent.setup();
    const onStore = vi.fn<(store: ReturnType<typeof useDecisionTableRaw>) => void>();
    const value = parseDecisionTable({
      hitPolicy: 'first',
      inputs: [{ id: 'in', name: 'Input' }],
      outputs: [{ id: 'out', name: 'Output', field: 'output' }],
      rules: [{ _id: 'r1', in: 'start', out: 'ok' }],
    });

    const { getByRole } = render(
      <DecisionTableProvider>
        <DecisionTableEmpty value={value} permission='edit:full' />
        <DecisionTableCommandBar />
        <StoreProbe onStore={onStore} />
      </DecisionTableProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    act(() => {
      store?.actions.setCursor({ x: 'in', y: 0 });
    });

    await user.click(getByRole('button', { name: /deselect/i }));
    expect(store?.stateStore.getState().cursor).toBeNull();
  });
});
