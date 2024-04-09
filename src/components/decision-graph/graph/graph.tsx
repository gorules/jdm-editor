import { WarningOutlined } from '@ant-design/icons';
import { Modal, Typography, message } from 'antd';
import clsx from 'clsx';
import React, { type MutableRefObject, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import type { Connection, ProOptions, ReactFlowInstance, XYPosition } from 'reactflow';
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { P, match } from 'ts-pattern';
import { v4 } from 'uuid';

import {
  type DecisionGraphStoreType,
  type DecisionNode,
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphReferences,
  useDecisionGraphState,
} from '../context/dg-store.context';
import { edgeFunction } from '../custom-edge';
import { mapToDecisionEdge } from '../dg-util';
import '../dg.scss';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { CustomNodeSpecification } from '../nodes/custom-node/index';
import { GraphNode } from '../nodes/graph-node';
import type { MinimalNodeProps } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';

export type GraphProps = {
  className?: string;
  onDisableTabs?: (val: boolean) => void;
  reactFlowProOptions?: ProOptions;
};

export type GraphRef = DecisionGraphStoreType['actions'];

const defaultNodeTypes = Object.entries(nodeSpecification).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: React.memo(
      (props: MinimalNodeProps) => value.renderNode({ specification: value, ...props }),
      (prevProps, nextProps) => {
        return (
          prevProps.id === nextProps.id &&
          prevProps.selected === nextProps.selected &&
          prevProps.data === nextProps.data
        );
      },
    ),
  }),
  {},
);

const edgeTypes = {
  edge: React.memo(edgeFunction(null)),
};

export const Graph = forwardRef<GraphRef, GraphProps>(({ reactFlowProOptions, className }, ref) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance>(null);

  const nodesState = useNodesState([]);
  const edgesState = useEdgesState([]);

  const graphActions = useDecisionGraphActions();
  const graphReferences = useDecisionGraphReferences((s) => s);
  const { onReactFlowInit } = useDecisionGraphListeners(({ onReactFlowInit }) => ({ onReactFlowInit }));
  const { disabled, components, customNodes } = useDecisionGraphState(({ disabled, components, customNodes }) => ({
    disabled,
    components,
    customNodes,
  }));

  graphReferences.nodesState.current = nodesState;
  graphReferences.edgesState.current = edgesState;
  graphReferences.graphClipboard.current = useGraphClipboard(reactFlowInstance, reactFlowWrapper);

  const customNodeRenderer = useMemo(() => {
    return React.memo(
      (props: MinimalNodeProps) => {
        const node = customNodes.find((node) => node.kind === props?.data?.kind) as CustomNodeSpecification<
          object,
          string
        >;

        if (!node) {
          console.warn('node not found', props, customNodes);
          return (
            <GraphNode
              id={props.id}
              specification={{
                displayName: `${props.data?.kind}`,
                color: 'var(--grl-color-error)',
                icon: <WarningOutlined />,
              }}
              name={props?.data?.name}
              isSelected={props.selected}
              displayError
              noBodyPadding
              handleLeft={true}
              handleRight={true}
            />
          );
        }

        return node.renderNode({
          specification: node,
          ...props,
        });
      },
      (prevProps, nextProps) => {
        return (
          prevProps.id === nextProps.id &&
          prevProps.selected === nextProps.selected &&
          prevProps.data === nextProps.data
        );
      },
    );
  }, [customNodes]);

  const nodeTypes = useMemo<Record<string, React.FC>>(() => {
    return components.reduce(
      (acc, component) => ({
        ...acc,
        [component.type]: React.memo(
          (props: MinimalNodeProps) => component.renderNode({ specification: component, ...props }),
          (prevProps, nextProps) => {
            return (
              prevProps.id === nextProps.id &&
              prevProps.selected === nextProps.selected &&
              prevProps.data === nextProps.data
            );
          },
        ),
      }),
      { ...defaultNodeTypes, customNode: customNodeRenderer },
    );
  }, [components, customNodeRenderer]);

  const addNodeInner = async (type: string, position?: XYPosition, component?: string) => {
    if (!reactFlowWrapper.current || !reactFlowInstance.current) {
      return;
    }

    if (!position) {
      const rect = reactFlowWrapper.current.getBoundingClientRect();
      const rectCenter = {
        x: rect.width / 2,
        y: rect.height / 2,
      };

      position = reactFlowInstance.current.project(rectCenter);
    }

    const customSpecification = match(type)
      .with('customNode', () => customNodes.find((node) => node.kind === component))
      .otherwise(() => {
        const allSpecifications = [...Object.values(nodeSpecification), ...components];
        return allSpecifications.find((s) => s.type === type);
      });
    if (!customSpecification) {
      message.error(`Unknown node type ${type} - ${component}.`);
      return;
    }

    let newNode: DecisionNode | null = match(customSpecification)
      .with({ kind: P.string }, (specification) => {
        const existingCount =
          (reactFlowInstance.current?.getNodes() || []).filter((n) => n.data?.kind === specification.kind).length + 1;

        const partialNode = specification.generateNode({ index: existingCount });
        return {
          id: v4(),
          type: 'customNode',
          name: partialNode.name,
          position: position as XYPosition,
          content: {
            kind: specification.kind,
            config: partialNode?.config,
          },
        } satisfies DecisionNode;
      })
      .with({ type: P.string }, (specification) => {
        const existingCount =
          (reactFlowInstance.current?.getNodes() || []).filter((n) => n.type === specification.type).length + 1;
        const partialNode = specification.generateNode({ index: existingCount });

        return {
          type: specification.type,
          id: v4(),
          position: position as XYPosition,
          ...partialNode,
        } satisfies DecisionNode;
      })
      .otherwise(() => null);
    if (!newNode) {
      message.error(`Unknown node type ${type} - ${component}.`);
      return;
    }

    if (customSpecification.onNodeAdd) {
      try {
        newNode = await customSpecification.onNodeAdd(newNode);
      } catch {
        return;
      }
    }

    graphActions.addNodes([newNode]);
  };

  const isValidConnection = (connection: Connection): boolean => {
    // Disallow self-reference
    if (connection.source === connection.target) {
      return false;
    }

    if (disabled) {
      return false;
    }

    const [edges] = edgesState;
    const hasDuplicate = edges.some(
      (edge) =>
        edge.source === connection.source &&
        edge.target === connection.target &&
        (edge.sourceHandle ?? null) === (connection.sourceHandle ?? null) &&
        (edge.targetHandle ?? null) === (connection.targetHandle ?? null),
    );

    return !hasDuplicate;
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!reactFlowWrapper.current || !reactFlowInstance.current) {
      return;
    }

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    let elementPosition: XYPosition;

    try {
      elementPosition = JSON.parse(event.dataTransfer.getData('relativePosition'));
    } catch (e) {
      return;
    }
    const position = reactFlowInstance.current.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) as XYPosition;

    position.x -= Math.round((elementPosition.x * 226) / 10) * 10;
    position.y -= Math.round((elementPosition.y * 60) / 10) * 10;

    const component = match(event.dataTransfer.getData('customNodeComponent'))
      .with(P.string, (c) => c)
      .otherwise(() => undefined);

    addNodeInner(type, position, component);
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onConnect = (params: any) => {
    const edge = {
      ...params,
      type: 'edge',
      id: v4(),
    };

    if (disabled) return;
    graphActions.addEdges([mapToDecisionEdge(edge)]);
  };

  useImperativeHandle(ref, () => graphActions);

  return (
    <div
      className={clsx(['tab-content', className])}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'v' && e.metaKey && !disabled) {
          graphActions.pasteNodes();
        }
      }}
    >
      <div className={'content-wrapper'}>
        <div className={clsx(['react-flow'])} ref={reactFlowWrapper}>
          <ReactFlow
            elevateEdgesOnSelect={false}
            elevateNodesOnSelect={true}
            zoomOnDoubleClick={false}
            nodes={nodesState[0]}
            edges={edgesState[0]}
            onInit={(instance) => {
              (reactFlowInstance as MutableRefObject<ReactFlowInstance>).current = instance;
              onReactFlowInit?.(instance);
            }}
            snapToGrid={true}
            snapGrid={[5, 5]}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            proOptions={reactFlowProOptions}
            nodesConnectable={!disabled}
            nodesDraggable={!disabled}
            edgesUpdatable={!disabled}
            onNodesChange={graphActions.handleNodesChange}
            onEdgesChange={graphActions.handleEdgesChange}
            onNodesDelete={(e) => {
              e.forEach((node) => {
                graphActions.closeTab(node?.id);
              });
            }}
            onKeyDown={(e) => {
              const [nodes] = nodesState;
              const [edges] = edgesState;

              if (e.key === 'c' && e.metaKey) {
                const selectedNodeIds = nodesState[0].filter((n) => n.selected).map(({ id }) => id);
                if (selectedNodeIds.length === 0) {
                  return;
                }

                graphActions.copyNodes(selectedNodeIds);
                e.preventDefault();
              } else if (e.key === 'd' && e.metaKey) {
                if (!disabled) {
                  const selectedNodeIds = nodes.filter((n) => n.selected).map(({ id }) => id);
                  if (selectedNodeIds.length === 0) {
                    return;
                  }

                  graphActions.duplicateNodes(selectedNodeIds);
                }
                e.preventDefault();
              } else if (e.key === 'Backspace') {
                if (!disabled) {
                  const selectedNodes = nodes.filter((n) => n.selected);
                  const selectedEdges = edges.filter((e) => e.selected);

                  if (selectedNodes.length > 0) {
                    const length = selectedNodes.length;
                    const text = length > 1 ? 'nodes' : 'node';
                    Modal.confirm({
                      icon: null,
                      title: `Delete ${text}`,
                      content: (
                        <Typography.Text>
                          Are you sure you want to delete {length > 1 ? `${length} ${text}` : text}?
                        </Typography.Text>
                      ),
                      okButtonProps: { danger: true },
                      onOk: () => {
                        if (selectedEdges.length > 0) {
                          graphActions.removeEdges(selectedEdges.map((e) => e.id));
                        }
                        graphActions.removeNodes(selectedNodes.map((n) => n.id));
                      },
                    });
                  } else if (selectedEdges.length > 0) {
                    graphActions.removeEdges(selectedEdges.map((e) => e.id));
                  }
                }
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            onEdgeMouseEnter={(_, edge) => graphActions.setHoveredEdgeId(edge.id)}
            onEdgeMouseLeave={() => graphActions.setHoveredEdgeId(null)}
          >
            <Controls showInteractive={false} />
            <Background color='var(--grl-color-border)' gap={20} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
});
