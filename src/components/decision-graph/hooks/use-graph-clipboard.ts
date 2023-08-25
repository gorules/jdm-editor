import { message } from 'antd';
import { useCallback } from 'react';
import type { Edge, Node, ReactFlowInstance, XYPosition } from 'reactflow';
import { v4 } from 'uuid';

import { copyToClipboard, pasteFromClipboard } from '../../../helpers/utility';

type ClipboardNode = Pick<Node, 'id' | 'type' | 'position' | 'width' | 'height' | 'data'>;

type ClipboardEdge = Pick<Edge, 'source' | 'target' | 'type'>;

type ClipboardData = {
  nodes: ClipboardNode[];
  edges: ClipboardEdge[];
};

const isClipboardData = (data: any): data is ClipboardData => {
  if (typeof data !== 'object') return false;
  return Array.isArray(data?.nodes);
};

export const useGraphClipboard = (reactFlow?: ReactFlowInstance, wrapper?: HTMLDivElement) => {
  const copyNodes = useCallback(
    async (nodes: Node[]) => {
      try {
        if (!reactFlow) return;

        const copyNodes = nodes.map<ClipboardNode>((n) => ({
          id: n.id,
          type: n.type,
          data: n.data,
          position: n.position,
          width: n.width,
          height: n.height,
        }));

        const copyNodeIds = copyNodes.map((n) => n.id);
        const copyEdges: ClipboardEdge[] = [];

        if (copyNodes.length > 0) {
          const edges = reactFlow.getEdges();
          edges.forEach((edge) => {
            if (copyNodeIds.includes(edge.source) && copyNodeIds.includes(edge.target)) {
              copyEdges.push({
                type: edge.type,
                source: edge.source,
                target: edge.target,
              });
            }
          });
        }

        const clipboardData: ClipboardData = {
          nodes: copyNodes,
          edges: copyEdges,
        };

        await copyToClipboard(JSON.stringify(clipboardData));
      } catch (e) {
        message.error(e.message);
      }
    },
    [reactFlow],
  );

  const pasteNodes = useCallback(async () => {
    if (!reactFlow) return;

    const clipboardText = await pasteFromClipboard();
    if (!clipboardText) return;
    const clipboardData = JSON.parse(clipboardText);

    if (!isClipboardData(clipboardData)) {
      throw new Error('invalid clipboard');
    }

    if (!Array.isArray(clipboardData?.nodes)) throw new Error('invalid clipboard');
    const nodeIds: Record<string, string> = clipboardData.nodes.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: v4(),
      }),
      {},
    );

    const copyNodeIds = Object.keys(nodeIds);
    const anchor = reactFlow.getNodes().find((n) => copyNodeIds.includes(n.id));
    const copyAnchor = clipboardData.nodes.find((n) => n.id === anchor?.id);
    const gravityCenter = {
      x: clipboardData.nodes.reduce((acc, n) => acc + n.position.x, 0) / clipboardData.nodes.length,
      y: clipboardData.nodes.reduce((acc, n) => acc + n.position.y, 0) / clipboardData.nodes.length,
    } as XYPosition;

    const nodes = clipboardData.nodes.map((n: ClipboardNode) => {
      const position: XYPosition = {
        x: n.position.x,
        y: n.position.y,
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
      } else if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const rectCenter = {
          x: rect.width / 2,
          y: rect.height / 2,
        };

        const projection = reactFlow.project(rectCenter);

        position.x = n.position.x + projection.x - gravityCenter.x - (n.width || 0) / 2;
        position.y = n.position.y + projection.y - gravityCenter.y - (n.height || 0) / 2;
      }

      return {
        ...n,
        position,
        id: nodeIds[n.id],
      };
    });

    const edges = clipboardData.edges.map((e) => ({
      id: v4(),
      type: e.type,
      source: nodeIds[e.source],
      target: nodeIds[e.target],
    }));

    reactFlow.addNodes(nodes);
    reactFlow.addEdges(edges);

    if (anchor) {
      try {
        await copyToClipboard(JSON.stringify({ nodes, edges }));
      } catch (e) {
        //
      }
    }
  }, [reactFlow]);

  const register = useCallback(
    (selected: Node[]) => {
      const listener = async (e: KeyboardEvent) => {
        if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey) && selected.length > 0) {
          await copyNodes(selected);
          message.success('Copied to clipboard!');
        } else if (e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) {
          try {
            await pasteNodes();
            message.success('Pasted from clipboard!');
          } catch (e) {
            // message.error('Invalid clipboard data.');
          }
        }
      };

      window.addEventListener('keydown', listener);

      return () => window.removeEventListener('keydown', listener);
    },
    [copyNodes, pasteNodes],
  );

  return {
    copyNodes,
    pasteNodes,
    register,
  };
};
