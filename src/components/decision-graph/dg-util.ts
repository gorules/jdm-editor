import { Edge, Node } from 'reactflow'

import { DecisionEdge, DecisionNode } from './context/dg-store.context'

export const mapToDecisionNode = (node: Node): DecisionNode => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    name: node?.data?.name,
    description: node?.data?.description,
    content: node?.data?.content,
  }
}
export const mapToDecisionNodes = (nodes: Node[]): DecisionNode[] => {
  return nodes.map(mapToDecisionNode)
}

export const mapToDecisionEdges = (edges: Edge[]): DecisionEdge[] => {
  return edges.map((edge) => {
    return {
      id: edge?.id,
      sourceId: edge?.source,
      type: edge?.type,
      targetId: edge?.target,
      name: edge?.label as string,
    }
  })
}

export const mapToGraphNode = (node: DecisionNode): Node => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      name: node.name,
      description: node.description,
      content: node?.content,
    },
  }
}
export const mapToGraphNodes = (nodes: DecisionNode[]): Node[] => {
  return nodes.map(mapToGraphNode)
}

export const mapToGraphEdges = (edges: DecisionEdge[]): Edge[] => {
  return edges
    .filter((edge) => edge.sourceId && edge.targetId)
    .map((edge) => {
      return {
        id: edge.id,
        source: edge.sourceId,
        type: edge?.type || 'edge',
        target: edge.targetId,
        label: edge.name,
      }
    })
}
