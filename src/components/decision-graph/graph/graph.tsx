import { CheckOutlined, CloseOutlined, ExportOutlined, ImportOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import { DirectedGraph } from 'graphology';
import { hasCycle } from 'graphology-dag';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Edge, Node, ProOptions, ReactFlowInstance, XYPosition } from 'reactflow';
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 } from 'uuid';

import { defaultFunctionValue } from '../../function/helpers/libs';
import type { DecisionEdge, DecisionGraphType, DecisionNode } from '../context/dg-store.context';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { edgeFunction } from '../custom-edge';
import { mapToDecisionEdges, mapToDecisionNodes, mapToGraphEdges, mapToGraphNode, mapToGraphNodes } from '../dg-util';
import '../dg.scss';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import { GraphComponents } from './graph-components';
import { MultiNodeForm } from './multi-node-form';
import { NodeForm } from './node-form';
import { GraphNode, GraphNodeEdit, GraphSwitchNode } from './nodes';

export const DecisionContentType = 'application/vnd.gorules.decision';

export type GraphProps = {
  className?: string;
  hideExportImport?: boolean;
  onDisableTabs?: (val: boolean) => void;
  reactFlowProOptions?: ProOptions;
};

export type GraphRef = {
  openEdit?: () => void;
  closeEdit?: () => void;
  confirmEdit?: () => void;
  openNode?: (id: string) => void;
  addNode?: (node: DecisionNode) => void;
  setDecisionGraph?: (decisionGraph: DecisionGraphType) => void;
};

export const Graph = forwardRef<GraphRef, GraphProps>(
  ({ reactFlowProOptions, className, onDisableTabs, hideExportImport }, ref) => {
    const reactFlowWrapper = useRef<any>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

    const fileInput = useRef<HTMLInputElement>(null);
    const [editGraph, setEditGraph] = useState(false);

    const [editNodes, setEditNodes, onEditNodesChange] = useNodesState([]);
    const [editEdges, setEditEdges, onEditEdgesChange] = useEdgesState([]);

    const inputNodes = editNodes?.filter?.((node) => node.type === 'inputNode');
    const outputNodes = editNodes?.filter?.((node) => node.type === 'outputNode');

    const selected = editNodes?.filter?.((node) => node?.selected);
    const selectedEdges = editEdges?.filter?.((edge) => edge?.selected);

    const { nodes, edges, setDecisionGraph, disabled, closeTab, openTab, onAddNode, onEditGraph, onChange } =
      useDecisionGraphStore(
        ({ decisionGraph, setDecisionGraph, disabled, closeTab, openTab, onChange, onAddNode, onEditGraph }) => ({
          nodes: decisionGraph?.nodes ?? [],
          edges: decisionGraph?.edges ?? [],
          setDecisionGraph,
          disabled,
          closeTab,
          openTab,
          onChange,
          onAddNode,
          onEditGraph,
        }),
        equal,
      );

    const graphClipboard = useGraphClipboard(reactFlowInstance, reactFlowWrapper.current || undefined);

    useEffect(() => {
      onEditGraph?.(editGraph);
      onDisableTabs?.(editGraph);
    }, [editGraph]);

    useEffect(() => {
      return graphClipboard.register(editGraph ? selected : undefined);
    }, [selected, graphClipboard.register, editGraph]);

    const addNode = (type: string, position?: XYPosition) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) return;
      if (!position) {
        const rect = reactFlowWrapper?.current?.getBoundingClientRect() as DOMRect;
        const rectCenter = {
          x: rect.width / 2,
          y: rect.height / 2,
        };

        position = reactFlowInstance?.project(rectCenter);
      }

      if (
        type !== 'decisionTableNode' &&
        type !== 'functionNode' &&
        type !== 'expressionNode' &&
        type !== 'switchNode' &&
        type !== 'inputNode' &&
        type !== 'outputNode'
      ) {
        return onAddNode?.(type, position);
      }

      const count = (nodes || []).filter((node) => node?.type === type)?.length;

      const data: any = {};
      if (type === 'decisionTableNode') {
        const inputField = {
          id: v4(),
          name: 'Input',
          type: 'expression',
        };
        const outputField = {
          field: 'output',
          id: v4(),
          name: 'Output',
          type: 'expression',
        };
        data.content = {
          hitPolicy: 'first',
          inputs: [inputField],
          outputs: [outputField],
          rules: [],
        };
      } else if (type === 'functionNode') {
        data.content = defaultFunctionValue;
      } else if (type === 'inputNode') {
        data.name = 'Request';
      } else if (type === 'outputNode') {
        data.name = 'Response';
      } else if (type === 'expressionNode') {
        data.content = {
          expressions: [],
        };
      } else if (type === 'switchNode') {
        data.content = {
          statements: [],
        };
      }

      const newNode: Node = {
        id: v4(),
        type,
        position,
        data: {
          name: `${type} ${count + 1}`,
          ...data,
        },
      };

      setEditNodes((nodes) => nodes.concat(newNode));
    };

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
            };
          }
          return e;
        });
      });
    };

    const onDrop = (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      let elementPosition: XYPosition;

      try {
        elementPosition = JSON.parse(event.dataTransfer.getData('relativePosition'));
      } catch (e) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) as XYPosition;

      position.x -= Math.round((elementPosition.x * 180) / 10) * 10;
      position.y -= Math.round((elementPosition.y * 80) / 10) * 10;

      addNode(type, position);
    };

    const onDragOver = (event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };

    const onConnect = (params: any) => {
      setEditEdges((els: Edge[]) => {
        return addEdge(
          {
            ...params,
            type: 'edge',
            id: v4(),
          },
          els,
        );
      });
    };

    const edgeTypes = useMemo(
      () => ({
        edge: edgeFunction({
          nodes,
        }),
      }),
      [],
    );

    const nodeTypes = useMemo(() => {
      return {
        decisionTableNode: GraphNode,
        decisionNode: GraphNode,
        functionNode: GraphNode,
        expressionNode: GraphNode,
        switchNode: GraphSwitchNode,
        inputNode: GraphNode,
        outputNode: GraphNode,
      };
    }, []);

    const editNodeTypes = useMemo(() => {
      return {
        decisionTableNode: GraphNodeEdit,
        decisionNode: GraphNodeEdit,
        functionNode: GraphNodeEdit,
        expressionNode: GraphNodeEdit,
        switchNode: GraphSwitchNode,
        inputNode: GraphNodeEdit,
        outputNode: GraphNodeEdit,
      };
    }, []);

    const confirmEdit = () => {
      try {
        const edges = mapToDecisionEdges(editEdges);
        const nodes = mapToDecisionNodes(editNodes);

        if (nodes.filter((node) => node?.type === 'inputNode')?.length > 1) {
          message.error('Maximum 1 input');
          return;
        }
        if (nodes.filter((node) => node?.type === 'outputNode')?.length > 1) {
          message.error('Maximum 1 output');
          return;
        }

        const graph = new DirectedGraph();
        edges.forEach((edge) => {
          graph.mergeEdge(edge.sourceId, edge.targetId);
        });

        if (hasCycle(graph)) {
          throw new Error('Graph is cyclic');
        }

        setDecisionGraph({
          nodes,
          edges,
        });
        onChange?.({
          nodes,
          edges,
        });
        setEditGraph(false);
      } catch (e: any) {
        message.error(e?.message);
      }
    };

    const handleUploadInput = async (event: any) => {
      const fileList = event?.target?.files as FileList;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed: any = JSON.parse(e?.target?.result as string);
          if (parsed?.contentType !== DecisionContentType) throw new Error('Invalid content type');

          const nodes: DecisionNode[] = Array.isArray(parsed?.nodes) ? parsed.nodes : [];
          const nodeIds = nodes.map((node) => node.id);

          const edges: DecisionEdge[] = (parsed.edges as DecisionEdge[]).filter(
            (edge) => nodeIds.includes(edge?.targetId) && nodeIds.includes(edge?.sourceId),
          );

          setDecisionGraph({
            edges,
            nodes,
          });
          onChange?.({
            edges,
            nodes,
          });
        } catch (e: any) {
          message.error(e.message);
        }
      };

      reader.readAsText(Array.from(fileList)?.[0], 'UTF-8');
    };

    const downloadJDM = async (name: string) => {
      try {
        // create file in browser
        const fileName = `${name.replaceAll('.json', '')}.json`;
        const json = JSON.stringify(
          {
            contentType: DecisionContentType,
            nodes,
            edges,
          },
          null,
          2,
        );
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = window.document.createElement('a');
        link.href = href;
        link.download = fileName;
        window.document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        window.document.body.removeChild(link);
        URL.revokeObjectURL(href);
      } catch (e) {
        message.error(e.message);
      }
    };

    useImperativeHandle(ref, () => ({
      openEdit: () => {
        if (disabled) return;
        setEditNodes(mapToGraphNodes(nodes));
        setEditEdges(mapToGraphEdges(edges));
        setEditGraph(true);
      },
      closeEdit: () => {
        setEditGraph(false);
      },
      confirmEdit: () => {
        confirmEdit();
      },
      addNode: (node: DecisionNode) => {
        if (editGraph) {
          setEditNodes((nodes) => nodes.concat(mapToGraphNode(node)));
        }
      },
      openNode: (id: string) => {
        if (!editGraph) {
          openTab(id);
        }
      },
      setDecisionGraph,
    }));

    return (
      <div className={clsx(['tab-content', className])}>
        <input
          hidden
          accept='application/json'
          type='file'
          ref={fileInput}
          onChange={handleUploadInput}
          onClick={(event) => {
            (event.target as any).value = null;
          }}
        />
        <div className={'grl-dg__command-bar'}>
          {!editGraph && (
            <>
              <Tooltip title='Edit graph mode allows you to add, connect and move nodes.'>
                <Button
                  type='default'
                  size={'small'}
                  disabled={disabled}
                  onClick={() => {
                    setEditNodes(mapToGraphNodes(nodes));
                    setEditEdges(mapToGraphEdges(edges));
                    setEditGraph(true);
                  }}
                  icon={<NodeIndexOutlined />}
                >
                  Edit graph
                </Button>
              </Tooltip>
              {!hideExportImport && (
                <Button
                  type='default'
                  size={'small'}
                  onClick={() => {
                    downloadJDM('graph');
                  }}
                  icon={<ExportOutlined />}
                >
                  Export JSON
                </Button>
              )}
              {!hideExportImport && (
                <Button
                  type='default'
                  size={'small'}
                  disabled={disabled}
                  onClick={() => {
                    fileInput?.current?.click?.();
                  }}
                  icon={<ImportOutlined />}
                >
                  Import JSON
                </Button>
              )}
            </>
          )}
          {editGraph && (
            <Button
              type='default'
              size={'small'}
              onClick={() => {
                confirmEdit();
              }}
              icon={<CheckOutlined />}
            >
              Apply changes
            </Button>
          )}
          {editGraph && (
            <Button
              type='default'
              color='secondary'
              size={'small'}
              onClick={() => {
                setEditGraph(false);
              }}
              icon={<CloseOutlined />}
            >
              Revert
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
              zoomOnDoubleClick={false}
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
              proOptions={reactFlowProOptions}
              onNodesChange={(e) => {
                editGraph && onEditNodesChange(e);
              }}
              onEdgesChange={(e) => {
                editGraph && onEditEdgesChange(e);
              }}
              onNodesDelete={(e) => {
                if (editGraph) {
                  e.forEach((node) => {
                    closeTab?.(node?.id);
                  });
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
              <Background color='var(--grl-color-border)' gap={20} />
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
                        await graphClipboard.pasteNodes();
                      } catch (e) {
                        message.error(e?.message);
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
                    setEditNodes((nodes) => nodes.map((i) => ({ ...i, selected: false })));
                  }}
                  onCopy={async () => {
                    await graphClipboard.copyNodes(selected);
                    message.success('Copied to clipboard!');
                  }}
                  removeNode={(node) => {
                    setEditEdges((edges) =>
                      edges.filter((edge) => edge?.target !== node?.id && edge?.source !== node?.id),
                    );
                    setEditNodes((nodes) => nodes.filter((n) => n?.id !== node?.id));
                  }}
                />
              )}
              {(selected?.length > 1 || selectedEdges?.length > 0) && (
                <MultiNodeForm
                  edges={selectedEdges}
                  nodes={selected}
                  onCopy={async (nodes) => {
                    await graphClipboard.copyNodes(nodes);
                    message.success('Copied to clipboard!');
                  }}
                  removeNodes={(nodes) => {
                    const nodeIds = nodes.map((i) => i.id);
                    setEditEdges((edges) =>
                      edges.filter((edge) => !nodeIds.includes(edge?.target) && !nodeIds.includes(edge?.source)),
                    );
                    setEditNodes((nodes) => nodes.filter((n) => !nodeIds.includes(n?.id)));
                  }}
                  removeEdges={(edges) => {
                    const edgeIds = edges.map((i) => i.id);
                    setEditEdges((edges) => edges.filter((edge) => !edgeIds.includes(edge?.id)));
                  }}
                  onClose={() => {
                    setEditNodes((nodes) => nodes.map((i) => ({ ...i, selected: false })));
                    setEditEdges((edges) => edges.map((i) => ({ ...i, selected: false })));
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
