import { describe, expect, it } from 'vitest';

import type { DecisionGraphType } from '../../components/decision-graph/dg-types';
import { getNodeData } from '../node-data';

const graph: DecisionGraphType = {
  nodes: [
    { id: 'input', name: 'Input', type: 'inputNode', position: { x: 0, y: 0 }, content: {} },
    { id: 'expr', name: 'AutoApproved', type: 'expressionNode', position: { x: 1, y: 1 }, content: {} },
    { id: 'output', name: 'Output', type: 'outputNode', position: { x: 2, y: 2 }, content: {} },
  ],
  edges: [],
};

describe('getNodeData', () => {
  it('returns node input data and $nodes outputs excluding output nodes', () => {
    const trace = {
      in: {
        id: 'input',
        name: 'Input',
        input: { request: true },
        output: { extracted: true },
        performance: null,
        traceData: null,
      },
      ex: {
        id: 'expr',
        name: 'AutoApproved',
        input: { amount: 10 },
        output: { auto_approved: true },
        performance: null,
        traceData: null,
      },
      out: {
        id: 'output',
        name: 'Output',
        input: { any: true },
        output: { final: true },
        performance: null,
        traceData: null,
      },
    };

    const result = getNodeData('expr', { trace, decisionGraph: graph });

    expect(result.data).toEqual({ amount: 10 });
    expect(result.$nodes).toEqual({
      Input: { extracted: true },
      AutoApproved: { auto_approved: true },
    });
  });
});
