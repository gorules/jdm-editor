import { describe, expect, it } from 'vitest';
import type { Edge } from 'reactflow';

import { privateSymbol } from '../dg-types';
import { mapToDecisionEdge, mapToGraphEdges, mapToGraphNode } from '../dg-util';

describe('dg-util mappers', () => {
  it('maps reactflow edge to decision edge', () => {
    const edge: Edge = {
      id: 'edge-1',
      source: 'node-a',
      target: 'node-b',
      sourceHandle: null,
      targetHandle: 'target-handle',
      label: 'Flow',
      type: 'edge',
    };
    const mapped = mapToDecisionEdge(edge);

    expect(mapped).toEqual({
      id: 'edge-1',
      sourceId: 'node-a',
      targetId: 'node-b',
      name: 'Flow',
      sourceHandle: undefined,
      targetHandle: 'target-handle',
      type: 'edge',
    });
  });

  it('maps decision node to graph node including private layout metadata', () => {
    const mapped = mapToGraphNode({
      id: 'n-1',
      type: 'expressionNode',
      name: 'Expression',
      position: { x: 11, y: 22 },
      content: { kind: 'calc' },
      [privateSymbol]: {
        dimensions: { width: 400, height: 120 },
        selected: true,
      },
    });

    expect(mapped).toMatchObject({
      id: 'n-1',
      type: 'expressionNode',
      position: { x: 11, y: 22 },
      width: 400,
      height: 120,
      selected: true,
      data: { name: 'Expression', kind: 'calc' },
    });
  });

  it('filters invalid edges when mapping decision edges to graph edges', () => {
    const mapped = mapToGraphEdges([
      { id: 'e-1', sourceId: 'a', targetId: 'b', type: 'edge' },
      { id: 'e-2', sourceId: '', targetId: 'b', type: 'edge' },
      { id: 'e-3', sourceId: 'a', targetId: '', type: 'edge' },
    ]);

    expect(mapped).toHaveLength(1);
    expect(mapped[0]).toMatchObject({
      id: 'e-1',
      source: 'a',
      target: 'b',
      type: 'edge',
    });
  });
});
