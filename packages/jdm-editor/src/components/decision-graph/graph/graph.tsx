import { CloseOutlined, CompressOutlined, LeftOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip, Typography, message, notification } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal';
import React, { type MutableRefObject, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Connection, Node, ProOptions, ReactFlowInstance, XYPosition } from 'reactflow';
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  SelectionMode,
  getOutgoers,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { P, match } from 'ts-pattern';

import { nodeSchema } from '../../../helpers/schema';
import {
  type DecisionGraphStoreType,
  type ExposedStore,
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphRaw,
  useDecisionGraphReferences,
  useDecisionGraphState,
} from '../context/dg-store.context';
import { edgeFunction } from '../custom-edge';
import { type DecisionNode } from '../dg-types';
import { mapToDecisionEdge } from '../dg-util';
import '../dg.scss';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { CustomNodeSpecification } from '../nodes/custom-node';
import { GraphNode } from '../nodes/graph-node';
import type { MinimalNodeProps } from '../nodes/specifications/specification-types';
import { NodeKind } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';
import { GraphComponents } from './graph-components';

export type GraphProps = {
  className?: string;
  onDisableTabs?: (val: boolean) => void;
  reactFlowProOptions?: ProOptions;
};

export type GraphRef = DecisionGraphStoreType['actions'] & {
  stateStore: ExposedStore<DecisionGraphStoreType['state']>;
};

const defaultNodeTypes = Object.entries(nodeSpecification).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: React.memo(
      (props: MinimalNodeProps) => value.renderNode({ specification: value, ...props }),
      (prevProps, nextProps) => {
        return (
          prevProps.id === nextProps.id &&
          prevProps.selected === nextProps.selected &&
          equal(prevProps.data, nextProps.data)
        );
      },
    ),
  }),
  {},
);

const edgeTypes = {
  edge: React.memo(edgeFunction(null)),
};

export const Graph = forwardRef<GraphRef, GraphProps>(function GraphInner({ reactFlowProOptions, className }, ref) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance>(null);

  const nodesState = useNodesState([]);
  const edgesState = useEdgesState([]);

  const [componentsOpened, setComponentsOpened] = useState(true);

  const raw = useDecisionGraphRaw();
  const graphActions = useDecisionGraphActions();
  const graphReferences = useDecisionGraphReferences((s) => s);
  const { onReactFlowInit } = useDecisionGraphListeners(({ onReactFlowInit }) => ({ onReactFlowInit }));
  const { disabled, hasInputNode, components, customNodes } = useDecisionGraphState(
    ({ disabled, components, customNodes, decisionGraph }) => ({
      disabled,
      components,
      customNodes,
      hasInputNode: (decisionGraph?.nodes || []).some((n) => n.type === NodeKind.Input),
    }),
  );

  graphReferences.nodesState.current = nodesState;
  graphReferences.edgesState.current = edgesState;
  graphReferences.graphClipboard.current = useGraphClipboard(reactFlowInstance, reactFlowWrapper);
  graphReferences.reactFlowInstance.current = reactFlowInstance.current;

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
          equal(prevProps.data, nextProps.data)
        );
      },
    );
  }, [customNodes]);

  const nodeTypes = useMemo<Record<string, React.FC<any>>>(() => {
    return components.reduce(
      (acc, component) => ({
        ...acc,
        [component.type]: React.memo(
          (props: MinimalNodeProps) => component.renderNode({ specification: component, ...props }),
          (prevProps, nextProps) => {
            return (
              prevProps.id === nextProps.id &&
              prevProps.selected === nextProps.selected &&
              equal(prevProps.data, nextProps.data)
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
          id: crypto.randomUUID(),
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
          id: crypto.randomUUID(),
          type: specification.type,
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
        newNode = (await customSpecification.onNodeAdd(newNode as any)) as any;
      } catch {
        return;
      }
    }

    const parsed = nodeSchema.safeParse(newNode);
    if (parsed.success) {
      return graphActions.addNodes([nodeSchema.parse(newNode)]);
    }
    message.error(parsed.error?.message);
  };

  const isValidConnection = (connection: Connection): boolean => {
    // Disallow self-reference
    if (connection.source === connection.target) {
      return false;
    }

    if (disabled) {
      return false;
    }

    const [nodes] = nodesState;
    const [edges] = edgesState;

    const hasDuplicate = edges.some(
      (edge) =>
        edge.source === connection.source &&
        edge.target === connection.target &&
        (edge.sourceHandle ?? null) === (connection.sourceHandle ?? null) &&
        (edge.targetHandle ?? null) === (connection.targetHandle ?? null),
    );

    const target = nodes.find((node) => node.id === connection.target);
    if (!target || target.id === connection.source) {
      return false;
    }

    const hasCycle = (node: Node, visited = new Set()) => {
      if (visited.has(node.id)) {
        return false;
      }

      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    return !hasDuplicate && !hasCycle(target);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!reactFlowWrapper.current || !reactFlowInstance.current) {
      return;
    }

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    let elementPosition: XYPosition;

    try {
      elementPosition = JSON.parse(event.dataTransfer.getData('relativePosition'));
    } catch {
      return;
    }

    const position = reactFlowInstance.current.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) as XYPosition;

    position.x -= Math.round((elementPosition.x * 226) / 10) * 10;
    position.y -= Math.round((elementPosition.y * 60) / 10) * 10;

    const nodeData = event.dataTransfer.getData('nodeData');
    if (nodeData) {
      try {
        const jsonData = JSON.parse(nodeData);
        graphActions.addNodes([nodeSchema.parse({ ...jsonData, position })]);
      } catch (err) {
        notification.error({ message: 'Failed to create a node' });
        console.error(err);
      }

      return;
    }

    const type = event.dataTransfer.getData('nodeType');
    const component = match(event.dataTransfer.getData('customNodeComponent'))
      .with(P.string, (c) => c)
      .otherwise(() => undefined);

    void addNodeInner(type, position, component);
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onConnect = (params: any) => {
    const edge = {
      ...params,
      type: 'edge',
      id: crypto.randomUUID(),
    };

    if (disabled) return;
    graphActions.addEdges([mapToDecisionEdge(edge)]);
  };

  useImperativeHandle(ref, () => ({
    ...graphActions,
    stateStore: raw.stateStore,
  }));

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
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        {!disabled && !componentsOpened && (
          <div
            className={'grl-dg__components__floating'}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <Tooltip placement='right' title='Components'>
              <Button icon={<LeftOutlined style={{ fontSize: 12 }} />} onClick={() => setComponentsOpened(true)} />
            </Tooltip>
          </div>
        )}
        <div
          tabIndex={0}
          className={'content-wrapper'}
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
        >
          <div className={clsx(['react-flow'])} ref={reactFlowWrapper}>
            <ReactFlow
              deleteKeyCode={null}
              elevateEdgesOnSelect={false}
              elevateNodesOnSelect={true}
              zoomOnDoubleClick={false}
              connectionRadius={35}
              nodes={nodesState[0]}
              edges={edgesState[0]}
              onInit={(instance) => {
                (reactFlowInstance as MutableRefObject<ReactFlowInstance>).current = instance;
                onReactFlowInit?.(instance);
              }}
              snapToGrid={true}
              snapGrid={[5, 5]}
              minZoom={0.25}
              selectionMode={SelectionMode.Partial}
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
              onEdgeMouseEnter={(_, edge) => graphActions.setHoveredEdgeId(edge.id)}
              onEdgeMouseLeave={() => graphActions.setHoveredEdgeId(null)}
            >
              <Controls showInteractive={false}>
                <ControlButton onClick={() => graphActions.toggleCompactMode()}>
                  <CompressOutlined />
                </ControlButton>
              </Controls>
              <Background color='var(--grl-color-border)' gap={20} />
            </ReactFlow>
          </div>
        </div>
        {!disabled && componentsOpened && (
          <div className={'grl-dg__aside__menu'}>
            <div className={'grl-dg__aside__menu__heading'}>
              <div className={'grl-dg__aside__menu__heading__text'}>
                <Typography.Text strong style={{ marginBottom: 0 }}>
                  Components
                </Typography.Text>{' '}
                <Typography.Text type='secondary' style={{ fontSize: 10, marginLeft: 5 }}>
                  (Drag-and-drop)
                </Typography.Text>
              </div>
              <Button
                type={'text'}
                size='small'
                icon={<CloseOutlined style={{ fontSize: 12 }} />}
                onClick={() => setComponentsOpened(false)}
              />
            </div>
            <div className={'grl-dg__aside__menu__content'}>
              <GraphComponents inputDisabled={hasInputNode} disabled={disabled} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
