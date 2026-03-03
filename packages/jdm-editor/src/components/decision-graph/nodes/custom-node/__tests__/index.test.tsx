import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createJdmNode } from '../index';

describe('createJdmNode', () => {
  it('provides a default generateNode implementation when omitted', () => {
    const node = createJdmNode({
      kind: 'httpRequest',
      displayName: 'HTTP Request',
      inputs: [{ name: 'url', control: 'text', label: 'URL' }],
      icon: <span>H</span>,
    });

    expect(node.kind).toBe('httpRequest');
    expect(node.displayName).toBe('HTTP Request');
    expect(node.generateNode({ index: 2 }).name).toBe('httpRequest2');
  });

  it('keeps custom generateNode and onNodeAdd contracts', async () => {
    const onNodeAdd = vi.fn(async (n: { id: string; name: string; position: { x: number; y: number } }) => n);
    const node = createJdmNode({
      kind: 'customA',
      displayName: 'Custom A',
      generateNode: ({ index }) => ({ name: `custom-${index}` }),
      onNodeAdd,
    });

    expect(node.generateNode({ index: 5 }).name).toBe('custom-5');
    expect(node.onNodeAdd).toBe(onNodeAdd);

    if (!node.onNodeAdd) {
      throw new Error('Expected onNodeAdd to be available');
    }

    await node.onNodeAdd({ id: 'n1', name: 'n1', position: { x: 0, y: 0 } });
    expect(onNodeAdd).toHaveBeenCalledTimes(1);
  });
});
