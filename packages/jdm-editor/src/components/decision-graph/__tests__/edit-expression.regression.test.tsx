import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DecisionGraph } from '../dg';
import type { DecisionGraphType } from '../dg-types';

vi.mock('../../../../helpers/wasm', () => ({
  isWasmAvailable: () => false,
}));

const graph: DecisionGraphType = {
  nodes: [
    {
      id: 'input',
      type: 'inputNode',
      name: 'Input',
      content: { schema: '{"type":"object"}' },
      position: { x: 15, y: 195 },
    },
    {
      id: 'expr',
      type: 'expressionNode',
      name: 'AutoApproved?',
      content: {
        expressions: [],
        passThrough: true,
        inputField: null,
        outputPath: null,
        executionMode: 'single',
      },
      position: { x: 430, y: 320 },
    },
    {
      id: 'output',
      type: 'outputNode',
      name: 'Output',
      content: { schema: '{"type":"object"}' },
      position: { x: 790, y: 160 },
    },
  ],
  edges: [
    { id: 'e1', type: 'edge', sourceId: 'input', targetId: 'expr', sourceHandle: null },
    { id: 'e2', type: 'edge', sourceId: 'expr', targetId: 'output', sourceHandle: null },
  ],
};

describe('DecisionGraph expression tab', () => {
  it('opens Edit Expression tab without maximum update depth loops', async () => {
    const user = userEvent.setup();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<DecisionGraph value={graph} />);

    await user.click(await screen.findByRole('button', { name: /edit expression/i }));

    expect(await screen.findByText('Add row')).toBeInTheDocument();

    const hasMaxDepthError = errorSpy.mock.calls.some((call) =>
      call.some((arg) => typeof arg === 'string' && arg.includes('Maximum update depth exceeded')),
    );

    expect(hasMaxDepthError).toBe(false);

    errorSpy.mockRestore();
  });
});
