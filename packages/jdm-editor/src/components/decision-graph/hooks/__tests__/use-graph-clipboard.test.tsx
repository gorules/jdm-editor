import { act, render } from '@testing-library/react';
import { message } from 'antd';
import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { Node } from 'reactflow';

import { copyToClipboard, pasteFromClipboard } from '../../../../helpers/utility';
import { DecisionGraphProvider } from '../../context/dg-store.context';
import { DecisionGraphEmpty } from '../../dg-empty';
import { useGraphClipboard } from '../use-graph-clipboard';

vi.mock('../../../../helpers/utility', () => ({
  copyToClipboard: vi.fn(),
  pasteFromClipboard: vi.fn(),
}));

const copyToClipboardMock = vi.mocked(copyToClipboard);
const pasteFromClipboardMock = vi.mocked(pasteFromClipboard);

type ClipboardApi = ReturnType<typeof useGraphClipboard>;

type ProbeProps = {
  onReady: (api: ClipboardApi) => void;
  reactFlowRef: React.RefObject<any>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};

const Probe: React.FC<ProbeProps> = ({ onReady, reactFlowRef, wrapperRef }) => {
  const api = useGraphClipboard(reactFlowRef, wrapperRef);
  useEffect(() => {
    onReady(api);
  }, [api, onReady]);
  return null;
};

const initialGraph = {
  nodes: [
    { id: 'a', type: 'expressionNode', name: 'A', content: { expressions: [] }, position: { x: 10, y: 20 } },
    { id: 'b', type: 'expressionNode', name: 'B', content: { expressions: [] }, position: { x: 50, y: 80 } },
  ],
  edges: [{ id: 'e1', type: 'edge', sourceId: 'a', targetId: 'b', sourceHandle: null, targetHandle: null }],
};

describe('useGraphClipboard', () => {
  it('copies selected nodes and inner edges to clipboard payload', async () => {
    const successSpy = vi.spyOn(message, 'success');
    const onReady = vi.fn<(api: ClipboardApi) => void>();

    const reactFlowRef = {
      current: {
        getEdges: () => [{ id: 'e1', type: 'edge', source: 'a', target: 'b', sourceHandle: null, targetHandle: null }],
        getNodes: () => [{ id: 'a', position: { x: 10, y: 20 } }, { id: 'b', position: { x: 50, y: 80 } }],
      },
    };

    const wrapperRef = {
      current: document.createElement('div'),
    };

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={initialGraph} />
        <Probe onReady={onReady} reactFlowRef={reactFlowRef} wrapperRef={wrapperRef} />
      </DecisionGraphProvider>,
    );

    const api = onReady.mock.calls.at(-1)?.[0];
    if (!api) {
      throw new Error('Clipboard API was not initialized');
    }
    const selectedNodes: Node[] = [
      { id: 'a', position: { x: 10, y: 20 }, data: {}, type: 'expressionNode' },
      { id: 'b', position: { x: 50, y: 80 }, data: {}, type: 'expressionNode' },
    ];

    await act(async () => {
      await api.copyNodes(selectedNodes);
    });

    expect(copyToClipboardMock).toHaveBeenCalledTimes(1);
    const serialized = copyToClipboardMock.mock.calls[0]?.[0];
    if (!serialized) {
      throw new Error('Expected serialized clipboard payload');
    }

    const payload = JSON.parse(serialized) as {
      nodes: Array<{ id: string }>;
      edges: Array<{ sourceId: string; targetId: string }>;
    };

    expect(payload.nodes.map((n) => n.id)).toEqual(['a', 'b']);
    expect(payload.edges).toEqual([{ sourceId: 'a', targetId: 'b', id: 'e1', type: 'edge' }]);
    expect(successSpy).toHaveBeenCalledWith('Copied to clipboard!');

    successSpy.mockRestore();
  });

  it('rejects invalid clipboard payloads on paste', async () => {
    const errorSpy = vi.spyOn(message, 'error');
    const onReady = vi.fn<(api: ClipboardApi) => void>();

    pasteFromClipboardMock.mockResolvedValue('{"foo":1}');

    const reactFlowRef = {
      current: {
        getEdges: () => [],
        getNodes: () => [{ id: 'a', position: { x: 0, y: 0 } }],
        project: ({ x, y }: { x: number; y: number }) => ({ x, y }),
      },
    };

    const wrapper = document.createElement('div');
    Object.defineProperty(wrapper, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 600, height: 400, right: 600, bottom: 400 }),
      configurable: true,
    });

    render(
      <DecisionGraphProvider>
        <DecisionGraphEmpty value={initialGraph} />
        <Probe onReady={onReady} reactFlowRef={reactFlowRef} wrapperRef={{ current: wrapper }} />
      </DecisionGraphProvider>,
    );

    const api = onReady.mock.calls.at(-1)?.[0];
    if (!api) {
      throw new Error('Clipboard API was not initialized');
    }

    await act(async () => {
      await api.pasteNodes();
    });

    expect(errorSpy).toHaveBeenCalledWith('Failed to paste from clipboard');

    errorSpy.mockRestore();
  });
});
