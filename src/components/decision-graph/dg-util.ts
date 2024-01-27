import type { Edge, Node } from 'reactflow';

import type { DecisionEdge, DecisionNode } from './context/dg-store.context';

export const mapToDecisionNode = (node: Node): DecisionNode => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    name: node?.data?.name,
    description: node?.data?.description,
    content: node?.data?.content,
  };
};
export const mapToDecisionNodes = (nodes: Node[]): DecisionNode[] => {
  return nodes.map(mapToDecisionNode);
};

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
export const mapToDecisionEdges = (edges: Edge[]): DecisionEdge[] => {
  return edges.map(mapToDecisionEdge);
};

export const mapToGraphNode = (node: DecisionNode): Node => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      name: node.name,
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
  };
};
export const mapToGraphEdges = (edges: DecisionEdge[]): Edge[] => {
  return edges.filter((edge) => edge.sourceId && edge.targetId).map(mapToGraphEdge);
};
