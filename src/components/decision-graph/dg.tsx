import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Tabs, theme } from 'antd'
import clsx from 'clsx'
import React, { useMemo, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowInstance,
  Viewport,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { v4 } from 'uuid'

import { Stack } from '../stack'
import DecisionGraphContextProvider, {
  DecisionEdge,
  DecisionNode,
  mapToGraphEdges,
  mapToGraphNodes,
} from './context/dg.context'
import { edgeFunction } from './custom-edge'
import './dg.scss'
import { GraphComponents } from './graph-components'
import { MultiNodeForm } from './multi-node-form'
import { NodeForm } from './node-form'
import { GraphNode, GraphNodeEdit } from './nodes'

export const DecisionGraph: React.FC<{
  value?: {
    nodes: DecisionNode[]
    edges: DecisionEdge[]
  }
  disabled: boolean
}> = ({ value, disabled }) => {
  const [viewport, setViewport] = useState<Viewport | undefined>({
    x: 0,
    y: 0,
    zoom: 1,
  })

  const reactFlowWrapper = useRef<any>(null)

  const [editGraph, setEditGraph] = useState(false)
  const [editNodes, setEditNodes, onEditNodesChange] = useNodesState([])
  const [editEdges, setEditEdges, onEditEdgesChange] = useEdgesState([])

  const inputNodes = editNodes?.filter?.((node) => node.type === 'inputNode')
  const outputNodes = editNodes?.filter?.((node) => node.type === 'outputNode')

  const selected = editNodes?.filter?.((node) => node?.selected)
  const selectedEdges = editEdges?.filter?.((edge) => edge?.selected)

  const nodes = useMemo<DecisionNode[]>(() => {
    return value?.nodes || []
  }, [value])

  const edges = useMemo<DecisionEdge[]>(() => {
    return value?.edges || []
  }, [value])

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  const openNode = (id: string) => {
    const nodeId = openIds.find((i) => i === id)
    const node = (nodes || []).find((node) => node.id === id)
    if (
      node?.type !== 'decisionTableNode' &&
      node?.type !== 'functionNode' &&
      node?.type !== 'expressionNode'
    )
      return
    if (nodeId) {
      setActiveTab(nodeId)
    } else {
      setOpenIds((ids) => {
        return [...ids, id]
      })
      setActiveTab(id)
    }
  }

  const [openIds, setOpenIds] = useState<string[]>([])

  const [activeTab, setActiveTab] = useState<string>('graph')

  const openedNodes = useMemo<DecisionNode[]>(() => {
    return openIds
      .map((id) => nodes.find((node) => node?.id === id))
      .filter((node) => !!node) as DecisionNode[]
  }, [nodes, openIds])

  const activeNode = useMemo<DecisionNode | undefined>(() => {
    return openedNodes?.find((node) => node?.id === activeTab)
  }, [openedNodes, activeTab])

  const closeNode = (id: string) => {
    const index = openIds?.findIndex((i) => i === id)
    const tab = openIds?.[index]
    setOpenIds((ids) => {
      const tmp = [...ids].filter((id) => id !== tab)
      return tmp
    })
    if (activeTab === id) {
      if (index > 0) {
        setActiveTab(openIds?.[index - 1])
      } else {
        setActiveTab('graph')
      }
    }
  }

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

    const count = (nodes || []).filter((node) => node?.type === type)?.length

    const data: any = {}
    if (['decisionNode'].includes(type)) {
      // setNodeDropped({
      //   id: v4(),
      //   type,
      //   position,
      // })
      return
    } else if (type === 'decisionTableNode') {
      const inputField = {
        field: 'input',
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

  const { token } = theme.useToken()

  return (
    <DecisionGraphContextProvider nodes={nodes} edges={edges} onOpenNode={openNode}>
      <div
        className={'grl-dg'}
        style={
          {
            '--border-color': token.colorBorder,
            '--primary-color': token.colorPrimary,
            '--primary-color-bg': token.colorPrimaryBg,
            '--color-bg-layout': token.colorBgLayout,
            '--color-bg-elevated': token.colorBgElevated,
            '--color-bg-container': token.colorBgContainer,
          } as any
        }
      >
        <div className={'grl-dg__wrapper'}>
          <div className={'grl-dg__nodes'}></div>
          <div className={'grl-dg__graph'}>
            <Tabs
              hideAdd
              type={'editable-card'}
              size='small'
              className={'tabs'}
              activeKey={activeNode?.id || 'graph'}
              onEdit={(targetKey: any, action: 'add' | 'remove') => {
                if (action === 'remove') {
                  closeNode(targetKey)
                }
              }}
              onChange={(val) => {
                // props?.onTabChange?.(val);
                setActiveTab(val)
              }}
            >
              <Tabs.TabPane closable={false} tab={'Graph'} key='graph' />
              {openedNodes?.map((node) => (
                <Tabs.TabPane
                  disabled={false}
                  key={node?.id}
                  tab={node?.name || node?.type}
                  closable={true}
                />
              ))}
            </Tabs>
            <div className={clsx(['tab-content', !activeNode && 'active'])}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.5rem',
                  borderBottom: '1px solid #f0f2f5',
                }}
              >
                <Stack gap={8} horizontal className='full-width'>
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
                        // confirmEdit()
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
                </Stack>
              </div>
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
                  defaultViewport={viewport}
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
                        closeNode?.(node?.id)
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
                  <Controls />
                  <Background color={token.colorBorder} gap={20} />
                </ReactFlow>
              </div>
            </div>
            {(openedNodes || []).map((node) => {
              return (
                <div
                  key={node?.id}
                  className={clsx(['tab-content', activeNode?.id === node?.id && 'active'])}
                >
                  {/*{node?.type === 'decisionTableNode' && (*/}
                  {/*  <TabTable*/}
                  {/*    node={node}*/}
                  {/*    simulate={simulate}*/}
                  {/*    disabled={disabled}*/}
                  {/*    version={version}*/}
                  {/*    configurable={true}*/}
                  {/*    onChange={(val) => {*/}
                  {/*      props?.onChange?.({*/}
                  {/*        edges,*/}
                  {/*        nodes: (nodes || []).map((e) => {*/}
                  {/*          if (e.id === node?.id) {*/}
                  {/*            return {*/}
                  {/*              ...e,*/}
                  {/*              content: val,*/}
                  {/*            }*/}
                  {/*          }*/}
                  {/*          return e*/}
                  {/*        }),*/}
                  {/*      })*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*)}*/}
                  {/*{node?.type === 'functionNode' && (*/}
                  {/*  <TabFunction*/}
                  {/*    key={node?.id}*/}
                  {/*    node={node}*/}
                  {/*    simulate={simulate}*/}
                  {/*    disabled={disabled}*/}
                  {/*    onChange={(val: string) => {*/}
                  {/*      props?.onChange?.({*/}
                  {/*        edges,*/}
                  {/*        nodes: (nodes || []).map((e) => {*/}
                  {/*          if (e.id === node?.id) {*/}
                  {/*            return {*/}
                  {/*              ...e,*/}
                  {/*              content: val,*/}
                  {/*            }*/}
                  {/*          }*/}
                  {/*          return e*/}
                  {/*        }),*/}
                  {/*      })*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*)}*/}
                  {/*{node?.type === 'expressionNode' && (*/}
                  {/*  <TabExpression*/}
                  {/*    key={node?.id}*/}
                  {/*    node={node}*/}
                  {/*    simulate={simulate}*/}
                  {/*    disabled={disabled}*/}
                  {/*    onChange={(val) => {*/}
                  {/*      props?.onChange?.({*/}
                  {/*        edges,*/}
                  {/*        nodes: (nodes || []).map((e) => {*/}
                  {/*          if (e.id === node?.id) {*/}
                  {/*            return {*/}
                  {/*              ...e,*/}
                  {/*              content: val,*/}
                  {/*            }*/}
                  {/*          }*/}
                  {/*          return e*/}
                  {/*        }),*/}
                  {/*      })*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*)}*/}
                </div>
              )
            })}
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
                      } catch {
                        // message.error(e?.message);
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
                    // await graphClipboard.copyNodes(selected);
                    // message.success('Copied to clipboard!');
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
                    // await graphClipboard.copyNodes(nodes)
                    // message.success('Copied to clipboard!')
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
    </DecisionGraphContextProvider>
  )
}
