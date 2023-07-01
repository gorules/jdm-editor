import React from 'react'
import { Edge, Node } from 'reactflow'

export type Position = {
  x: number
  y: number
}

export type DecisionNode = {
  id: string

  name: string
  description?: string
  type?: string

  content?: any

  position: Position
}

export type DecisionEdge = {
  id: string
  name: string

  sourceId: string
  targetId: string

  type?: string
}

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

export type DecisionGraphContextState = {
  simulate?: any
  nodes?: DecisionNode[]
  edges?: DecisionEdge[]
  openNode?: (id: string) => void
  closeNode?: (id: string) => void
}

export type DecisionGraphContextProps = {
  simulate?: any
  onOpenNode?: (id: string) => void
  onCloseNode?: (id: string) => void
  nodes?: DecisionNode[]
  edges?: DecisionEdge[]
}

const DecisionGraphContext = React.createContext<DecisionGraphContextState>({} as any)

const DecisionGraphContextProvider: React.FC<React.PropsWithChildren<DecisionGraphContextProps>> = (
  props
) => {
  const { children, simulate, nodes, edges, onOpenNode, onCloseNode } = props

  return (
    <DecisionGraphContext.Provider
      value={{
        simulate,
        openNode: onOpenNode,
        closeNode: onCloseNode,
        nodes,
        edges,
      }}
    >
      {children}
    </DecisionGraphContext.Provider>
  )
}

export const useDecisionGraph = () => React.useContext(DecisionGraphContext)
export default DecisionGraphContextProvider
