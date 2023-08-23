import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import clsx from 'clsx'
import equal from 'fast-deep-equal/es6/react'
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import TopologicalSort from 'topological-sort'
import { v4 } from 'uuid'

import { DecisionEdge, DecisionNode, useDecisionGraphStore } from '../context/dg-store.context'
import { edgeFunction } from '../custom-edge'
import {
  mapToDecisionEdges,
  mapToDecisionNodes,
  mapToGraphEdges,
  mapToGraphNode,
  mapToGraphNodes,
} from '../dg-util'
import '../dg.scss'
import { GraphComponents } from './graph-components'
import { useGraphClipboard } from '../hooks/use-graph-clipboard'
import { MultiNodeForm } from './multi-node-form'
import { NodeForm } from './node-form'
import { GraphNode, GraphNodeEdit } from './nodes'

export type GraphProps = {
  className?: string
}
export const Graph = forwardRef<
  {
    openEdit?: () => void
    closeEdit?: () => void
    confirmEdit?: () => void
  },
  GraphProps
>(({ className }, ref) => {
  const reactFlowWrapper = useRef<any>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  const [editGraph, setEditGraph] = useState(false)

  const [editNodes, setEditNodes, onEditNodesChange] = useNodesState([])
  const [editEdges, setEditEdges, onEditEdgesChange] = useEdgesState([])

  const inputNodes = editNodes?.filter?.((node) => node.type === 'inputNode')
  const outputNodes = editNodes?.filter?.((node) => node.type === 'outputNode')

  const selected = editNodes?.filter?.((node) => node?.selected)
  const selectedEdges = editEdges?.filter?.((edge) => edge?.selected)

  const nodes: DecisionNode[] = useDecisionGraphStore(
    (store) => store.decisionGraph?.nodes || [],
    equal
  )
  const edges: DecisionEdge[] = useDecisionGraphStore(
    (store) => store.decisionGraph?.edges || [],
    equal
  )
  const setDecisionGraph = useDecisionGraphStore((store) => store.setDecisionGraph, equal)
  const disabled = useDecisionGraphStore((store) => store.disabled, equal)
  const closeTab = useDecisionGraphStore((store) => store.closeTab, equal)
  const onAddNode = useDecisionGraphStore((store) => store.onAddNode, equal)

  const graphClipboard = useGraphClipboard(reactFlowInstance, reactFlowWrapper.current || undefined)

  const addNode = (type: string, position?: XYPosition) => {
    if (!reactFlowWrapper.current || !reactFlowInstance) return
    if (!position) {
      const rect = reactFlowWrapper?.current?.getBoundingClientRect() as DOMRect
      const rectCenter = {
        x: rect.width / 2,
        y: rect.height / 2,
      }

      position = reactFlowInstance?.project(rectCenter)
    }

    if (
      type !== 'decisionTableNode' &&
      type !== 'functionNode' &&
      type !== 'expressionNode' &&
      type !== 'inputNode' &&
      type !== 'outputNode'
    ) {
      return onAddNode(type, position)
    }

    const count = (nodes || []).filter((node) => node?.type === type)?.length

    const data: any = {}
    if (type === 'decisionTableNode') {
      const inputField = {
        id: v4(),
        name: 'Input',
        type: 'expression',
      }
      const outputField = {
        field: 'output',
        id: v4(),
        name: 'Output',
        type: 'expression',
      }
      data.content = {
        hitPolicy: 'first',
        inputs: [inputField],
        outputs: [outputField],
        rules: [],
      }
    } else if (type === 'functionNode') {
      data.content = [
        '/**',
        '* @param input',
        '* @param {{',
        "*  moment: import('dayjs')",
        '* }} helpers',
        '*/',
        'const handler = (input, { moment }) => {',
        '  return input;',
        '}',
      ].join('\n')
    } else if (type === 'inputNode') {
      data.name = 'Request'
    } else if (type === 'outputNode') {
      data.name = 'Response'
    } else if (type === 'expressionNode') {
      data.content = {
        expressions: [],
      }
    }

    const newNode: Node = {
      id: v4(),
      type,
      position,
      data: {
        name: `${type} ${count + 1}`,
        ...data,
      },
    }

    setEditNodes((nodes) => nodes.concat(newNode))
  }

  const updateNode = (node: Partial<Node>) => {
    setEditNodes((nodes) => {
      return (nodes || []).map((e) => {
        if (e.id === node?.id) {
          return {
            ...(e || {}),
            ...(node || {}),
            type: e.type,
            data: {
              ...(e?.data || {}),
              ...(node?.data || {}),
            },
          }
        }
        return e
      })
    })
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()

    if (!reactFlowWrapper.current || !reactFlowInstance) return

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    let elementPosition: XYPosition

    try {
      elementPosition = JSON.parse(event.dataTransfer.getData('relativePosition'))
    } catch (e) {
      return
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) as XYPosition

    position.x -= Math.round((elementPosition.x * 180) / 10) * 10
    position.y -= Math.round((elementPosition.y * 80) / 10) * 10

    addNode(type, position)
  }

  const onDragOver = (event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onConnect = (params: any) => {
    setEditEdges((els: Edge[]) => {
      return addEdge(
        {
          ...params,
          type: 'edge',
          id: v4(),
        },
        els
      )
    })
  }

  const edgeTypes = useMemo(
    () => ({
      edge: edgeFunction({
        nodes,
      }),
    }),
    [nodes]
  )

  const nodeTypes = useMemo(() => {
    return {
      decisionTableNode: GraphNode,
      decisionNode: GraphNode,
      functionNode: GraphNode,
      expressionNode: GraphNode,
      inputNode: GraphNode,
      outputNode: GraphNode,
    }
  }, [])

  const editNodeTypes = useMemo(() => {
    return {
      decisionTableNode: GraphNodeEdit,
      decisionNode: GraphNodeEdit,
      functionNode: GraphNodeEdit,
      expressionNode: GraphNodeEdit,
      inputNode: GraphNodeEdit,
      outputNode: GraphNodeEdit,
    }
  }, [])

  const confirmEdit = () => {
    try {
      // const edges = mapToDecisionEdges(editEdges)
      // const nodes = mapToDecisionNodes(editNodes)
      // if (nodes.filter((node) => node?.type === 'inputNode')?.length > 1) {
      //   message.error('Maximum 1 input')
      //   return
      // }
      // if (nodes.filter((node) => node?.type === 'outputNode')?.length > 1) {
      //   message.error('Maximum 1 output')
      //   return
      // }
      //
      // const nds = new Map()
      // const sortOp = new TopologicalSort(nds)
      // sortOp.addNodes(new Map(nodes.map((node) => [node.id, node])))
      // edges.forEach((edge) => {
      //   sortOp.addEdge(edge.sourceId, edge.targetId)
      // })
      // sortOp.sort()
      //
      // const sortedNodes = Array.from<any>(sortOp.sort().values())
      //   .map((el) => el?.node)
      //   .filter((el) => !!el)

      setDecisionGraph({
        nodes: mapToDecisionNodes(editNodes),
        edges: mapToDecisionEdges(editEdges),
      })
      setEditGraph(false)
    } catch (e: any) {
      console.log(e)
      message.error(e?.message)
    }
  }

  useImperativeHandle(ref, () => ({
    openEdit: () => {
      if (disabled) return
      setEditNodes(mapToGraphNodes(nodes))
      setEditEdges(mapToGraphEdges(edges))
      setEditGraph(true)
    },
    closeEdit: () => {
      setEditGraph(false)
    },
    confirmEdit: () => {
      confirmEdit()
    },
    addNode: (node: DecisionNode) => {
      if (editGraph) {
        setEditNodes((nodes) => nodes.concat(mapToGraphNode(node)))
      }
    },
  }))

  return (
    <div className={clsx(['tab-content', className])}>
      <div className={'grl-dg__command-bar'}>
        {!editGraph && (
          <Button
            type='default'
            size={'small'}
            disabled={disabled}
            onClick={() => {
              setEditNodes(mapToGraphNodes(nodes))
              setEditEdges(mapToGraphEdges(edges))
              setEditGraph(true)
            }}
            icon={<SettingOutlined />}
          >
            Edit Graph
          </Button>
        )}
        {editGraph && (
          <Button
            type='default'
            size={'small'}
            onClick={() => {
              confirmEdit()
            }}
            icon={<CheckOutlined />}
          >
            Confirm
          </Button>
        )}
        {editGraph && (
          <Button
            type='default'
            color='secondary'
            size={'small'}
            onClick={() => {
              setEditGraph(false)
            }}
            icon={<CloseOutlined />}
          >
            Cancel
          </Button>
        )}
      </div>
      <div className={'content-wrapper'}>
        <div className={clsx(['react-flow'])} ref={reactFlowWrapper}>
          <ReactFlow
            nodesConnectable={editGraph}
            nodesDraggable={editGraph}
            elevateEdgesOnSelect={editGraph}
            elevateNodesOnSelect={editGraph}
            nodes={editGraph ? editNodes : mapToGraphNodes(nodes || [])}
            edges={editGraph ? editEdges : mapToGraphEdges(edges || [])}
            onInit={(instance) => setReactFlowInstance(instance)}
            snapToGrid={true}
            snapGrid={[10, 10]}
            nodeTypes={editGraph ? editNodeTypes : nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={(e) => (editGraph ? onDrop(e) : undefined)}
            onDragOver={editGraph ? onDragOver : undefined}
            onConnect={onConnect}
            proOptions={{
              hideAttribution: true,
            }}
            onNodesChange={(e) => {
              editGraph && onEditNodesChange(e)
            }}
            onEdgesChange={(e) => {
              editGraph && onEditEdgesChange(e)
            }}
            onNodesDelete={(e) => {
              if (editGraph) {
                e.forEach((node) => {
                  closeTab?.(node?.id)
                })
              }
            }}
            onEdgesDelete={() => {
              //
            }}
            onEdgeClick={() => {
              //
            }}
          >
            <Controls showInteractive={false} />
            <Background color={'#d9d9d9'} gap={20} />
          </ReactFlow>
        </div>
        {editGraph && (
          <div className={'grl-dg__aside'}>
            {!selected?.length && !selectedEdges?.length && (
              <GraphComponents
                inputDisabled={inputNodes.length > 0}
                outputDisabled={outputNodes.length > 0}
                onPaste={async () => {
                  if (editGraph) {
                    try {
                      // await graphClipboard.pasteNodes()
                    } catch (e) {
                      message.error(e?.message)
                    }
                  }
                }}
              />
            )}
            {selected?.length === 1 && selectedEdges?.length === 0 && (
              <NodeForm
                node={selected?.[0]}
                onChange={updateNode}
                onClose={() => {
                  setEditNodes((nodes) => nodes.map((i) => ({ ...i, selected: false })))
                }}
                onCopy={async () => {
                  await graphClipboard.copyNodes(selected)
                  message.success('Copied to clipboard!')
                }}
                removeNode={(node) => {
                  setEditEdges((edges) =>
                    edges.filter((edge) => edge?.target !== node?.id && edge?.source !== node?.id)
                  )
                  setEditNodes((nodes) => nodes.filter((n) => n?.id !== node?.id))
                }}
              />
            )}
            {(selected?.length > 1 || selectedEdges?.length > 0) && (
              <MultiNodeForm
                edges={selectedEdges}
                nodes={selected}
                onCopy={async (nodes) => {
                  await graphClipboard.copyNodes(nodes)
                  message.success('Copied to clipboard!')
                }}
                removeNodes={(nodes) => {
                  const nodeIds = nodes.map((i) => i.id)
                  setEditEdges((edges) =>
                    edges.filter(
                      (edge) => !nodeIds.includes(edge?.target) && !nodeIds.includes(edge?.source)
                    )
                  )
                  setEditNodes((nodes) => nodes.filter((n) => !nodeIds.includes(n?.id)))
                }}
                removeEdges={(edges) => {
                  const edgeIds = edges.map((i) => i.id)
                  setEditEdges((edges) => edges.filter((edge) => !edgeIds.includes(edge?.id)))
                }}
                onClose={() => {
                  setEditNodes((nodes) => nodes.map((i) => ({ ...i, selected: false })))
                  setEditEdges((edges) => edges.map((i) => ({ ...i, selected: false })))
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
})
