import { act, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ExpressionController } from '../expression-controller';
import type { ExpressionEntry } from '../context/expression-store.context';
import { ExpressionStoreProvider, useExpressionStoreRaw } from '../context/expression-store.context';

type StoreProbeProps = {
  onStore: ReturnType<typeof vi.fn<(store: ReturnType<typeof useExpressionStoreRaw>) => void>>;
};

const StoreProbe = ({ onStore }: StoreProbeProps) => {
  const store = useExpressionStoreRaw();
  useEffect(() => {
    onStore(store);
  }, [onStore, store]);
  return null;
};

const initialRows: ExpressionEntry[] = [{ id: 'one', key: 'k1', value: 'v1' }];

describe('ExpressionController', () => {
  it('hydrates initial state from defaultValue when uncontrolled', () => {
    const onStore = vi.fn<(store: ReturnType<typeof useExpressionStoreRaw>) => void>();
    render(
      <ExpressionStoreProvider>
        <ExpressionController defaultValue={initialRows} />
        <StoreProbe onStore={onStore} />
      </ExpressionStoreProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();
    expect(store?.getState().expressions).toEqual(initialRows);
  });

  it('emits onChange only when expressions change and stays silent for unrelated state updates', () => {
    const onStore = vi.fn<(store: ReturnType<typeof useExpressionStoreRaw>) => void>();
    const onChange = vi.fn<(rows: ExpressionEntry[]) => void>();
    const { rerender } = render(
      <ExpressionStoreProvider>
        <ExpressionController value={initialRows} onChange={onChange} />
        <StoreProbe onStore={onStore} />
      </ExpressionStoreProvider>,
    );

    const store = onStore.mock.calls.at(-1)?.[0];
    expect(store).toBeDefined();
    onChange.mockClear();

    rerender(
      <ExpressionStoreProvider>
        <ExpressionController value={initialRows} onChange={onChange} disabled />
        <StoreProbe onStore={onStore} />
      </ExpressionStoreProvider>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const nextRows: ExpressionEntry[] = [{ id: 'two', key: 'k2', value: 'v2' }];
    rerender(
      <ExpressionStoreProvider>
        <ExpressionController value={nextRows} onChange={onChange} disabled />
        <StoreProbe onStore={onStore} />
      </ExpressionStoreProvider>,
    );

    expect(store?.getState().expressions).toEqual(nextRows);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(nextRows);

    act(() => {
      store?.setState({ disabled: false, permission: 'view' });
    });
    expect(onChange).toHaveBeenCalledTimes(1);

    act(() => {
      store?.getState().setExpressions([{ id: 'three', key: 'k3', value: 'v3' }]);
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith([{ id: 'three', key: 'k3', value: 'v3' }]);
  });
});
