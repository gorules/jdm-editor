import { Modal, Typography } from 'antd';
import clsx from 'clsx';
import React, { type MutableRefObject, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { Node, ProOptions, ReactFlowInstance, XYPosition } from 'reactflow';
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 } from 'uuid';

import {
  type DecisionGraphStoreType,
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphReferences,
} from '../context/dg-store.context';
import { edgeFunction } from '../custom-edge';
import { mapToDecisionEdge, mapToDecisionNode } from '../dg-util';
import '../dg.scss';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { NodeKind } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export type GraphProps = {
  className?: string;
  hideExportImport?: boolean;
  onDisableTabs?: (val: boolean) => void;
  reactFlowProOptions?: ProOptions;
};

export type GraphRef = DecisionGraphStoreType['actions'];

const nodeTypes = Object.entries(nodeSpecification).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: React.memo(value.renderNode({ specification: value }), (prevProps, nextProps) => {
      return (
        prevProps.id === nextProps.id && prevProps.selected === nextProps.selected && prevProps.data === nextProps.data
      );
    }),
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
  const graphListeners = useDecisionGraphListeners(({ onAddNode }) => ({ onAddNode }));
  const graphReferences = useDecisionGraphReferences((s) => s);
  graphReferences.nodesState.current = nodesState;
  graphReferences.edgesState.current = edgesState;

  const selected = nodesState[0].filter((node) => node?.selected);

  const graphClipboard = useGraphClipboard(reactFlowInstance, reactFlowWrapper);

  useEffect(() => {
    return graphClipboard.register(selected);
  }, [selected, graphClipboard]);

  const addNodeInner = (type: string, position?: XYPosition) => {
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

    if (!(type in nodeSpecification)) {
      return graphListeners.onAddNode?.(type, position);
    }

    const partialNode = nodeSpecification[type as NodeKind].generateNode();

    // TODO should be DecisionNode
    const newNode: Node = {
      ...partialNode,
      id: v4(),
      position,
    };

    graphActions.addNode(mapToDecisionNode(newNode));
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

    addNodeInner(type, position);
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

    graphActions.addEdge(mapToDecisionEdge(edge));
  };

  useImperativeHandle(ref, () => graphActions);

  return (
    <div className={clsx(['tab-content', className])}>
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
            }}
            snapToGrid={true}
            snapGrid={[5, 5]}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            proOptions={reactFlowProOptions}
            onNodesChange={graphActions.handleNodesChange}
            onEdgesChange={graphActions.handleEdgesChange}
            onNodesDelete={(e) => {
              e.forEach((node) => {
                graphActions.closeTab(node?.id);
              });
            }}
            onKeyDown={(e) => {
              // HANDLE COPY
              if (e.key === 'c' && e.metaKey) {
                const selectedNodes = nodesState[0].filter((n) => n.selected);
                const selectedEdges = edgesState[0].filter((e) => e.selected);
              } else if (e.key === 'Backspace') {
                const selectedNodes = nodesState[0].filter((n) => n.selected);
                const selectedEdges = edgesState[0].filter((e) => e.selected);
                if (selectedNodes.length > 0) {
                  Modal.confirm({
                    icon: null,
                    title: 'Delete node(s)',
                    content: <Typography.Text>Are you sure you want to delete selected node(s)?</Typography.Text>,
                    okButtonProps: { danger: true },
                    onOk: () => {
                      if (selectedEdges.length > 0) {
                        graphActions.removeEdges(selectedEdges.map((e) => e.id));
                      }
                      graphActions.removeNodes(selectedNodes.map((n) => n.id));
                    },
                  });
                  e.stopPropagation();
                } else if (selectedEdges.length > 0) {
                  graphActions.removeEdges(selectedEdges.map((e) => e.id));
                  e.stopPropagation();
                }
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
