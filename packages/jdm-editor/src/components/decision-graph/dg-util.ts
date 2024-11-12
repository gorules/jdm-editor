import type { Edge, Node } from 'reactflow';
import { MarkerType } from 'reactflow';

import type { DecisionEdge, DecisionNode } from './context/dg-store.context';

export const privateSymbol = Symbol('private');

export const mapToDecisionEdge = (edge: Edge): DecisionEdge => {
  return {
    id: edge?.id,
    sourceId: edge?.source,
    type: edge?.type,
    targetId: edge?.target,
    name: edge?.label as string,
    sourceHandle: edge.sourceHandle ?? undefined,
    targetHandle: edge.targetHandle ?? undefined,
  };
};

export const mapToGraphNode = (node: DecisionNode): Node => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    height: node[privateSymbol]?.dimensions?.height,
    width: node[privateSymbol]?.dimensions?.width,
    selected: node[privateSymbol]?.selected,
    data: {
      name: node.name,
      kind: node?.content?.kind,
      status: node?.status,
    },
  };
};
export const mapToGraphNodes = (nodes: DecisionNode[]): Node[] => {
  return nodes.map(mapToGraphNode);
};

export const mapToGraphEdge = (edge: DecisionEdge): Edge => {
  return {
    id: edge.id,
    source: edge.sourceId,
    type: edge?.type || 'edge',
    target: edge.targetId,
    label: edge.name,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
    data: {
      status: edge.status,
    },
  };
};

export const mapToGraphEdges = (edges: DecisionEdge[]): Edge[] => {
  return edges.filter((edge) => edge.sourceId && edge.targetId).map(mapToGraphEdge);
};
