import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraphProvider } from '../../context/dg-store.context';
import { DecisionGraphEmpty } from '../../dg-empty';
import { GraphSideToolbar } from '../graph-side-toolbar';

vi.mock('../../../decision-table/excel', () => ({
  exportDecisionTable: vi.fn(),
  readDecisionTableFile: vi.fn(),
}));

import { exportDecisionTable } from '../../../decision-table/excel';

const exportDecisionTableMock = vi.mocked(exportDecisionTable);

const graph = {
  nodes: [
    {
      id: 'dt-allowed',
      type: 'decisionTableNode',
      name: 'Allowed Table',
      content: { hitPolicy: 'first', inputs: [], outputs: [], rules: [] },
      position: { x: 0, y: 0 },
    },
    {
      id: 'dt-hidden',
      type: 'decisionTableNode',
      name: 'Hidden Table',
      content: { hitPolicy: 'first', inputs: [], outputs: [], rules: [] },
      position: { x: 250, y: 0 },
    },
  ],
  edges: [],
};

describe('GraphSideToolbar', () => {
  it('toggles active panel and emits onPanelsChange callback', async () => {
    const user = userEvent.setup();
    const onPanelsChange = vi.fn<(panel?: string) => void>();

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty
          value={graph}
          panels={[
            {
              id: 'inspector',
              title: 'Inspector',
              icon: <span>Inspector</span>,
              renderPanel: () => <div>Panel</div>,
            },
          ]}
          onPanelsChange={onPanelsChange}
        />
        <GraphSideToolbar />
      </DecisionGraphProvider>,
    );

    const panelButton = screen.getByRole('button', { name: 'Inspector' });

    await user.click(panelButton);
    expect(onPanelsChange).toHaveBeenLastCalledWith('inspector');

    await user.click(panelButton);
    expect(onPanelsChange).toHaveBeenLastCalledWith(undefined);
  });

  it('exports only permitted decision tables when view mode is enabled', async () => {
    const user = userEvent.setup();

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty
          value={graph}
          name='decision-model.json'
          viewConfig={{
            enabled: true,
            permissions: {
              'dt-allowed': 'edit:full',
              'dt-hidden': null,
            },
          }}
        />
        <GraphSideToolbar />
      </DecisionGraphProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'cloud-download' }));
    await user.click(await screen.findByText('Download Excel'));

    expect(exportDecisionTableMock).toHaveBeenCalledTimes(1);
    expect(exportDecisionTableMock).toHaveBeenCalledWith(
      'decision-model',
      expect.arrayContaining([
        expect.objectContaining({ id: 'dt-allowed', name: 'Allowed Table' }),
      ]),
    );

    const payload = exportDecisionTableMock.mock.calls[0]?.[1] ?? [];
    expect(payload).toHaveLength(1);
  });
});
