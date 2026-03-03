import { describe, expect, it } from 'vitest';

import {
  CustomKind,
  NodeKind,
  decisionModelSchema,
  edgeSchema,
  expressionNodeSchema,
  inputNodeSchema,
  nodeSchema,
} from '../schema';

describe('schema helpers', () => {
  it('applies model defaults for nodes and edges', () => {
    expect(decisionModelSchema.parse({})).toEqual({ nodes: [], edges: [] });
  });

  it('normalizes nullish schema fields in input nodes', () => {
    const node = inputNodeSchema.parse({
      type: NodeKind.Input,
      name: 'Input',
      content: { schema: null },
    });

    expect(node.content.schema).toBe('');
    expect(node.position).toEqual({ x: 0, y: 0 });
  });

  it('normalizes expression execution fields', () => {
    const node = expressionNodeSchema.parse({
      type: NodeKind.Expression,
      name: 'Expr',
      content: {
        expressions: [],
        passThrough: null,
        inputField: '   ',
        outputPath: '',
        executionMode: null,
      },
    });

    expect(node.content.passThrough).toBe(false);
    expect(node.content.inputField).toBeNull();
    expect(node.content.outputPath).toBeNull();
    expect(node.content.executionMode).toBe('single');
  });

  it('accepts custom nodes and unknown node types via nodeSchema', () => {
    const custom = nodeSchema.parse({
      type: CustomKind,
      name: 'Custom',
      content: { kind: 'x', config: { enabled: true } },
    });

    const unknown = nodeSchema.parse({
      type: 'vendor-special-node',
      name: 'Unknown',
      content: { anything: true },
    });

    expect(custom.type).toBe(CustomKind);
    expect(unknown.type).toBe('vendor-special-node');
  });

  it('validates edge type as edge', () => {
    expect(
      edgeSchema.parse({
        id: 'e1',
        sourceId: 'a',
        targetId: 'b',
        type: 'edge',
      }),
    ).toMatchObject({ id: 'e1', type: 'edge' });
  });
});
