import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { Node, ProOptions, ReactFlowInstance, XYPosition } from 'reactflow';
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 } from 'uuid';

import type { DecisionEdge, DecisionGraphType, DecisionNode } from '../context/dg-store.context';
import { DecisionGraphStoreContext, useDecisionGraphStore } from '../context/dg-store.context';
import { edgeFunction } from '../custom-edge';
import { mapToDecisionEdge, mapToDecisionNode } from '../dg-util';
import '../dg.scss';
import { useGraphClipboard } from '../hooks/use-graph-clipboard';
import { type NodeKind, nodeSpecification } from '../nodes/specifications';
import { GraphComponents } from './graph-components';

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

export const Graph = forwardRef<GraphRef, GraphProps>(({ reactFlowProOptions, className, hideExportImport }, ref) => {
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const fileInput = useRef<HTMLInputElement>(null);

  const {
    setDecisionGraph,
    disabled,
    closeTab,
    openTab,
    onAddNode,
    onChange,
    nodesChange,
    edgesChange,
    addEdge,
    addNode,
    setHoveredEdgeId,
  } = useDecisionGraphStore(
    ({
      decisionGraph,
      setDecisionGraph,
      disabled,
      closeTab,
      openTab,
      onChange,
      onAddNode,
      nodesChange,
      edgesChange,
      addEdge,
      addNode,
      setHoveredEdgeId,
    }) => ({
      nodes: decisionGraph?.nodes ?? [],
      edges: decisionGraph?.edges ?? [],
      setDecisionGraph,
      disabled,
      closeTab,
      openTab,
      onChange,
      onAddNode,
      nodesChange,
      edgesChange,
      addEdge,
      addNode,
      setHoveredEdgeId,
    }),
    equal,
  );

  const nodesState = useNodesState([]);
  const edgesState = useEdgesState([]);

  const store = useContext(DecisionGraphStoreContext);
  store.getState().nodesState.current = nodesState;
  store.getState().edgesState.current = edgesState;

  const inputNodes = nodesState[0]?.filter?.((node) => node.type === 'inputNode');
  const selected = nodesState[0]?.filter?.((node) => node?.selected);

  const graphClipboard = useGraphClipboard(reactFlowInstance, reactFlowWrapper.current || undefined);

  useEffect(() => {
    return graphClipboard.register(selected);
  }, [selected, graphClipboard.register]);

  const addNodeInner = (type: string, position?: XYPosition) => {
    if (!reactFlowWrapper.current || !reactFlowInstance) return;
    if (!position) {
      const rect = reactFlowWrapper?.current?.getBoundingClientRect() as DOMRect;
      const rectCenter = {
        x: rect.width / 2,
        y: rect.height / 2,
      };

      position = reactFlowInstance?.project(rectCenter);
    }

    if (!(type in nodeSpecification)) {
      return onAddNode?.(type, position);
    }

    const partialNode = nodeSpecification[type as NodeKind].generateNode();

    // TODO should be DecisionNode
    const newNode: Node = {
      ...partialNode,
      id: v4(),
      position,
    };

    addNode(mapToDecisionNode(newNode));
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
    addEdge(mapToDecisionEdge(edge));
  };

  const edgeTypes = useMemo(
    () => ({
      edge: edgeFunction(null),
    }),
    [],
  );

  const nodeTypes = useMemo(() => {
    return Object.entries(nodeSpecification).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.renderNode({ specification: value }),
      }),
      {},
    );
  }, []);

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
          // nodes,
          // edges,
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
    addNode: (node: DecisionNode) => {
      addNode(node);
    },
    openNode: (id: string) => {
      openTab(id);
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
        {!hideExportImport && (
          <Button
            type='link'
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
            type='link'
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
      </div>
      <div className={'content-wrapper'}>
        <div className={'grl-dg__aside'}>
          <GraphComponents
            inputDisabled={inputNodes.length > 0}
            onPaste={async () => {
              try {
                await graphClipboard.pasteNodes();
              } catch (e) {
                message.error(e?.message);
              }
            }}
          />
        </div>
        <div className={clsx(['react-flow'])} ref={reactFlowWrapper}>
          <ReactFlow
            elevateEdgesOnSelect={false}
            elevateNodesOnSelect={true}
            zoomOnDoubleClick={false}
            nodes={nodesState[0]}
            edges={edgesState[0]}
            onInit={(instance) => setReactFlowInstance(instance)}
            snapToGrid={true}
            snapGrid={[5, 5]}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            proOptions={reactFlowProOptions}
            onNodesChange={nodesChange}
            onEdgesChange={edgesChange}
            onNodesDelete={(e) => {
              e.forEach((node) => {
                closeTab?.(node?.id);
              });
            }}
            onEdgeMouseEnter={(_, edge) => setHoveredEdgeId(edge.id)}
            onEdgeMouseLeave={() => setHoveredEdgeId(null)}
          >
            <Controls showInteractive={false} />
            <Background color='var(--grl-color-border)' gap={20} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
});
