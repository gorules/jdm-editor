import { describe, expect, it, vi } from 'vitest';

import type { DecisionEdge, DecisionNode } from '../../dg-types';
import { calculateDiffGraph, processEdges, processNodes } from '../utility';

describe('diff/utility', () => {
  it('processEdges marks added, unchanged, and removed edges', () => {
    const current: DecisionEdge[] = [
      { id: 'same', sourceId: 'a', targetId: 'b', type: 'edge' },
      { id: 'add', sourceId: 'b', targetId: 'c', type: 'edge' },
    ];
    const previous: DecisionEdge[] = [
      { id: 'same', sourceId: 'a', targetId: 'b', type: 'edge' },
      { id: 'del', sourceId: 'x', targetId: 'y', type: 'edge' },
    ];

    const result = processEdges(current, previous);
    const byId = Object.fromEntries(result.map((edge) => [edge.id, edge]));

    expect(byId.add._diff?.status).toBe('added');
    expect(byId.same._diff?.status).toBe('unchanged');
    expect(byId.del._diff?.status).toBe('removed');
  });

  it('processNodes marks moved, modified, unchanged, added, and removed statuses', () => {
    const current: DecisionNode[] = [
      { id: 'moved', type: 'vendor-node', name: 'Moved', content: {}, position: { x: 10, y: 0 } },
      { id: 'modified', type: 'vendor-node', name: 'Renamed', content: {}, position: { x: 0, y: 0 } },
      { id: 'same', type: 'vendor-node', name: 'Same', content: {}, position: { x: 0, y: 0 } },
      { id: 'added', type: 'vendor-node', name: 'Added', content: {}, position: { x: 0, y: 0 } },
    ];
    const previous: DecisionNode[] = [
      { id: 'moved', type: 'vendor-node', name: 'Moved', content: {}, position: { x: 0, y: 0 } },
      { id: 'modified', type: 'vendor-node', name: 'OldName', content: {}, position: { x: 0, y: 0 } },
      { id: 'same', type: 'vendor-node', name: 'Same', content: {}, position: { x: 0, y: 0 } },
      { id: 'removed', type: 'vendor-node', name: 'Removed', content: {}, position: { x: 0, y: 0 } },
    ];

    const result = processNodes(current, previous);
    const byId = Object.fromEntries(result.map((node) => [node.id, node]));

    expect(byId.moved._diff?.status).toBe('moved');
    expect(byId.modified._diff?.status).toBe('modified');
    expect(byId.same._diff?.status).toBe('unchanged');
    expect(byId.added._diff?.status).toBe('added');
    expect(byId.removed._diff?.status).toBe('removed');
  });

  it('uses custom component getDiffContent when provided', () => {
    const current: DecisionNode[] = [
      { id: 'comp', type: 'component-x', name: 'Component', content: { next: true }, position: { x: 0, y: 0 } },
    ];

    const previous: DecisionNode[] = [
      { id: 'comp', type: 'component-x', name: 'Component', content: { prev: true }, position: { x: 0, y: 0 } },
    ];

    const result = processNodes(current, previous, {
      components: [
        {
          type: 'component-x',
          icon: null,
          color: '#000',
          displayName: 'X',
          group: 'custom',
          renderNode: () => null,
          renderTab: () => null,
          generateNode: () => ({ name: 'component-x', content: {} }),
          getDiffContent: () => ({ _diff: { status: 'modified' }, from: 'component' }),
        },
      ],
      customNodes: [],
    });

    const byId = Object.fromEntries(result.map((node) => [node.id, node]));

    expect(byId.comp._diff?.status).toBe('modified');
    expect(byId.comp.content).toEqual({ _diff: { status: 'modified' }, from: 'component' });
  });

  it('calls custom node calculateDiff seam for matching custom node kinds', () => {
    const calculateDiff = vi.fn((current: unknown, previous: unknown): [unknown, unknown] => [current, previous]);
    const current: DecisionNode[] = [
      {
        id: 'custom',
        type: 'customNode',
        name: 'Custom',
        content: { kind: 'custom-kind', config: { next: true } },
        position: { x: 0, y: 0 },
      },
    ];
    const previous: DecisionNode[] = [
      {
        id: 'custom',
        type: 'customNode',
        name: 'Custom',
        content: { kind: 'custom-kind', config: { prev: true } },
        position: { x: 0, y: 0 },
      },
    ];

    const result = processNodes(current, previous, {
      customNodes: [
        {
          kind: 'custom-kind',
          displayName: 'Custom',
          group: 'custom',
          icon: null,
          renderNode: () => null,
          renderTab: () => null,
          generateNode: () => ({ name: 'custom-node' }),
          calculateDiff,
        },
      ],
      components: [],
    });

    expect(calculateDiff).toHaveBeenCalledTimes(1);
    expect(result[0]?._diff?.status).toBe('unchanged');

    expect(calculateDiff.mock.calls[0]?.[0]).toEqual({ kind: 'custom-kind', config: { next: true } });
    expect(calculateDiff.mock.calls[0]?.[1]).toEqual({ kind: 'custom-kind', config: { prev: true } });
  });

  it('calculateDiffGraph combines node and edge diffs', () => {
    const diff = calculateDiffGraph(
      {
        nodes: [{ id: 'n1', type: 'vendor-node', name: 'N1', content: {}, position: { x: 0, y: 0 } }],
        edges: [{ id: 'e1', sourceId: 'n1', targetId: 'n2', type: 'edge' }],
      },
      {
        nodes: [{ id: 'n2', type: 'vendor-node', name: 'N2', content: {}, position: { x: 0, y: 0 } }],
        edges: [{ id: 'e2', sourceId: 'n2', targetId: 'n1', type: 'edge' }],
      },
    );

    expect(diff.nodes.map((n) => n._diff?.status).sort()).toEqual(['added', 'removed']);
    expect(diff.edges.map((e) => e._diff?.status).sort()).toEqual(['added', 'removed']);
  });
});
