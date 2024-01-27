import { message } from 'antd';
import { type RefObject, useCallback, useMemo } from 'react';
import type { Node, ReactFlowInstance, XYPosition } from 'reactflow';
import { v4 } from 'uuid';

import { copyToClipboard, pasteFromClipboard } from '../../../helpers/utility';
import {
  type DecisionEdge,
  type DecisionNode,
  useDecisionGraphActions,
  useDecisionGraphRaw,
} from '../context/dg-store.context';

type ClipboardData = {
  nodes: DecisionNode[];
  edges?: DecisionEdge[];
};

const isClipboardData = (data: any): data is ClipboardData => {
  if (typeof data !== 'object') return false;
  return Array.isArray(data?.nodes);
};

export const useGraphClipboard = (
  reactFlow: RefObject<ReactFlowInstance | null>,
  wrapper: RefObject<HTMLDivElement | null>,
) => {
  const raw = useDecisionGraphRaw();
  const { addNodes } = useDecisionGraphActions();

  const copyNodes = useCallback(
    async (nodes: Node[]) => {
      try {
        const copyNodes = (raw.stateStore.getState()?.decisionGraph?.nodes || []).filter((n) =>
          nodes.some((node) => node.id === n.id),
        );

        const clipboardData: ClipboardData = {
          nodes: copyNodes,
        };

        await copyToClipboard(JSON.stringify(clipboardData));
      } catch (e) {
        message.error(e.message);
      }
    },
    [raw],
  );

  const pasteNodes = useCallback(async () => {
    if (!reactFlow?.current) {
      return;
    }

    const clipboardText = await pasteFromClipboard();
    if (!clipboardText) return;
    const clipboardData = JSON.parse(clipboardText);

    if (!isClipboardData(clipboardData)) {
      throw new Error('invalid clipboard');
    }

    const nodeIds: Record<string, string> = clipboardData.nodes.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: v4(),
      }),
      {},
    );

    const copyNodeIds = Object.keys(nodeIds);
    const anchor = reactFlow.current.getNodes().find((n) => copyNodeIds.includes(n.id));
    const copyAnchor = clipboardData.nodes.find((n) => n.id === anchor?.id);
    const gravityCenter = {
      x: clipboardData.nodes.reduce((acc, n) => acc + n.position.x, 0) / clipboardData.nodes.length,
      y: clipboardData.nodes.reduce((acc, n) => acc + n.position.y, 0) / clipboardData.nodes.length,
    } as XYPosition;

    const nodes = clipboardData.nodes.map((n: DecisionNode) => {
      const position: XYPosition = {
        x: n?.position?.x || 0,
        y: n?.position?.y || 0,
      };

      if (anchor && copyAnchor) {
        const isAnchor = n.id === anchor.id;

        if (isAnchor) {
          position.x = anchor.position.x;
          position.y = anchor.position.y - 20;
        } else {
          position.x = anchor.position.x - copyAnchor.position.x + n.position.x;
          position.y = anchor.position.y - copyAnchor.position.y + n.position.y - 20;
        }
      } else if (wrapper.current) {
        const rect = wrapper.current.getBoundingClientRect();
        const rectCenter = {
          x: rect.width / 2,
          y: rect.height / 2,
        };

        const projection = reactFlow.current!.project(rectCenter);

        position.x = n.position.x + projection.x - gravityCenter.x / 2;
        position.y = n.position.y + projection.y - gravityCenter.y / 2;
      }

      return {
        ...n,
        position,
        id: nodeIds[n.id],
      };
    });

    addNodes(nodes);

    if (anchor) {
      try {
        await copyToClipboard(JSON.stringify({ nodes }));
      } catch (e) {
        //
      }
    }
  }, [reactFlow, wrapper]);

  const register = useCallback(
    (selected?: Node[]) => {
      if (!selected) return;
      const listener = async (e: KeyboardEvent) => {
        if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey) && selected.length > 0) {
          await copyNodes(selected);
          message.success('Copied to clipboard!');
        } else if (e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) {
          try {
            await pasteNodes();
            message.success('Pasted from clipboard!');
          } catch (e) {
            message.error('Invalid clipboard data.');
          }
        }
      };

      window.addEventListener('keydown', listener);

      return () => window.removeEventListener('keydown', listener);
    },
    [copyNodes, pasteNodes],
  );

  return useMemo(
    () => ({
      copyNodes,
      pasteNodes,
      register,
    }),
    [copyNodes, pasteNodes, register],
  );
};
