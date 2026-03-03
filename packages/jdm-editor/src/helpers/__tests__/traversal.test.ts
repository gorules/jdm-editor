import { describe, expect, it } from 'vitest';

import type { DecisionGraphType } from '../../components/decision-graph/dg-types';
import { createGraphWalker } from '../traversal';

const baseGraph: DecisionGraphType = {
  nodes: [
    { id: 'input', type: 'inputNode', name: 'Input', position: { x: 0, y: 0 }, content: {} },
    { id: 'a', type: 'expressionNode', name: 'A', position: { x: 1, y: 0 }, content: {} },
    { id: 'b', type: 'expressionNode', name: 'B', position: { x: 2, y: 0 }, content: {} },
    { id: 'c', type: 'outputNode', name: 'C', position: { x: 3, y: 0 }, content: {} },
  ],
  edges: [
    { id: 'e1', sourceId: 'input', targetId: 'a', type: 'edge' },
    { id: 'e2', sourceId: 'input', targetId: 'b', type: 'edge' },
    { id: 'e3', sourceId: 'a', targetId: 'c', type: 'edge' },
    { id: 'e4', sourceId: 'b', targetId: 'c', type: 'edge' },
  ],
};

describe('createGraphWalker', () => {
  it('walks graph and yields nodes after incomers are satisfied', () => {
    const walker = createGraphWalker();
    const result = Array.from(walker.walk(baseGraph));

    expect(result[0]?.node.id).toBe('input');

    const final = result.find((step) => step.node.id === 'c');
    expect(final?.incomers.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });

  it('returns empty iterator when graph has a cycle', () => {
    const walker = createGraphWalker();

    const cycleGraph: DecisionGraphType = {
      nodes: [
        { id: 'input', type: 'inputNode', name: 'Input', position: { x: 0, y: 0 }, content: {} },
        { id: 'a', type: 'expressionNode', name: 'A', position: { x: 1, y: 0 }, content: {} },
      ],
      edges: [
        { id: 'e1', sourceId: 'input', targetId: 'a', type: 'edge' },
        { id: 'e2', sourceId: 'a', targetId: 'input', type: 'edge' },
      ],
    };

    expect(Array.from(walker.walk(cycleGraph))).toEqual([]);
  });

  it('resolves current node data by id on subsequent walks', () => {
    const walker = createGraphWalker();
    const firstPass = Array.from(walker.walk(baseGraph));

    const renamedGraph: DecisionGraphType = {
      ...baseGraph,
      nodes: baseGraph.nodes.map((n) => (n.id === 'a' ? { ...n, name: 'A-Renamed' } : n)),
    };

    const secondPass = Array.from(walker.walk(renamedGraph));

    expect(firstPass.find((x) => x.node.id === 'a')?.node.name).toBe('A');
    expect(secondPass.find((x) => x.node.id === 'a')?.node.name).toBe('A-Renamed');
  });
});
