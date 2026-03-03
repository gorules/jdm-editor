import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionTableProvider, parseDecisionTable } from '../../context/dt-store.context';
import { DecisionTable } from '../../dt';
import { DecisionTableEmpty } from '../../dt-empty';

const tableValue = parseDecisionTable({
  hitPolicy: 'first',
  inputs: [{ id: 'in', name: 'Input' }],
  outputs: [{ id: 'out', name: 'Output', field: 'result' }],
  rules: [{ _id: 'r1', in: 'x', out: 'y' }],
});

describe('Table column sizing persistence', () => {
  it('writes column sizing to localStorage when table id is provided', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
        <DecisionTableProvider>
          <DecisionTableEmpty value={tableValue} />
          <DecisionTable id='table-1' tableHeight={300} />
        </DecisionTableProvider>,
      );

    expect(setItemSpy).toHaveBeenCalledWith('jdm-editor:decisionTable:columns:table-1', expect.any(String));

    setItemSpy.mockRestore();
  });

  it('handles malformed persisted sizing payload without throwing', () => {
    localStorage.setItem('jdm-editor:decisionTable:columns:table-bad', '{not-json');

    expect(() =>
      render(
        <DecisionTableProvider>
          <DecisionTableEmpty value={tableValue} />
          <DecisionTable id='table-bad' tableHeight={300} />
        </DecisionTableProvider>,
      ),
    ).not.toThrow();
  });
});
