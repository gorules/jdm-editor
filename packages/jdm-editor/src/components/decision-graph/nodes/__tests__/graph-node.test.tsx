import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { describe, expect, it } from 'vitest';

import { DecisionGraphProvider, useDecisionGraphRaw } from '../../context/dg-store.context';
import { DecisionGraphEmpty } from '../../dg-empty';
import { GraphNode } from '../graph-node';

const decisionGraph = {
  nodes: [
    {
      id: 'node-1',
      type: 'expressionNode',
      name: 'Node 1',
      content: { expressions: [] },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
};

const GraphStoreSetup: React.FC = () => {
  const store = useDecisionGraphRaw();

  React.useEffect(() => {
    store.referenceStore.setState({
      nodesState: {
        current: [[], () => undefined, () => undefined],
      } as never,
      edgesState: {
        current: [[], () => undefined, () => undefined],
      } as never,
    });
  }, [store]);

  return null;
};

describe('GraphNode persistent details state', () => {
  it('keeps settings panel open state across remount for the same node id', async () => {
    const user = userEvent.setup();

    const specification = {
      displayName: 'Expression',
      icon: <span>E</span>,
      renderSettings: () => <div>Node Settings Content</div>,
    };

    const { unmount } = render(
      <ReactFlowProvider>
        <DecisionGraphProvider>
          <GraphStoreSetup />
          <DecisionGraphEmpty value={decisionGraph} />
          <GraphNode id='node-1' name='Node 1' specification={specification} />
        </DecisionGraphProvider>
      </ReactFlowProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByText('Node Settings Content')).toBeInTheDocument();

    unmount();

    render(
      <ReactFlowProvider>
        <DecisionGraphProvider>
          <GraphStoreSetup />
          <DecisionGraphEmpty value={decisionGraph} />
          <GraphNode id='node-1' name='Node 1' specification={specification} />
        </DecisionGraphProvider>
      </ReactFlowProvider>,
    );

    expect(screen.getByText('Node Settings Content')).toBeInTheDocument();
  });
});
