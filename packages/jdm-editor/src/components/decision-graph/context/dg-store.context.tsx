import { type VariableType } from '@gorules/zen-engine-wasm';
import type { Monaco } from '@monaco-editor/react';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import type { WritableDraft } from 'immer/src/types/types-external';
import React, { type MutableRefObject, createRef, useMemo } from 'react';
import type { EdgeChange, NodeChange, ReactFlowInstance, useEdgesState, useNodesState } from 'reactflow';
import type { z } from 'zod';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { nodeSchema } from '../../../helpers/schema';
import type { CodeEditorProps } from '../../code-editor';
import { mapToGraphEdge, mapToGraphEdges, mapToGraphNode, mapToGraphNodes } from '../dg-util';
import type { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { CustomNodeSpecification } from '../nodes/custom-node';
import { NodeKind, type NodeSpecification } from '../nodes/specifications/specification-types';
import type { Simulation } from '../types/simulation.types';

export type Position = {
  x: number;
  y: number;
};

type NodeSchema = z.infer<typeof nodeSchema>;

export type DecisionNode<T = any> = {
  id: string;
  name: string;
  description?: string;
  type?: NodeSchema['type'] | string;
  content?: T;
  position: Position;
};

export type DecisionEdge = {
  id: string;
  name?: string;
  sourceId: string;
  targetId: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
};

export type DecisionGraphType = {
  nodes: DecisionNode[];
  edges: DecisionEdge[];
};

export type PanelType = {
  id: string;
  icon: React.ReactNode;
  title: string;
  renderPanel?: React.FC;
  onClick?: () => void;
};

type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

export enum NodeTypeKind {
  Input,
  Output,
  InferredInput,
  InferredOutput,
}

export type DecisionGraphStoreType = {
  state: {
    id?: string;
    components: NodeSpecification[];
    disabled?: boolean;
    configurable?: boolean;
    decisionGraph: DecisionGraphType;
    hoveredEdgeId: string | null;
    openTabs: string[];
    activeTab: string;

    name: string;

    customNodes: CustomNodeSpecification<object, any>[];

    panels?: PanelType[];
    activePanel?: string;
    onPanelsChange?: (val?: string) => void;

    simulate?: Simulation;

    compactMode?: boolean;

    nodeTypes: Record<string, Partial<Record<NodeTypeKind, VariableType>>>;
  };

  references: {
    nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
    edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
    graphClipboard: MutableRefObject<ReturnType<typeof useGraphClipboard>>;
  };

  actions: {
    setDecisionGraph: (val: DecisionGraphType) => void;

    handleNodesChange: (nodesChange: NodeChange[]) => void;
    handleEdgesChange: (edgesChange: EdgeChange[]) => void;

    setNodes: (nodes: DecisionNode[]) => void;
    addNodes: (nodes: DecisionNode[]) => void;
    updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode>) => void;
    removeNodes: (ids: string[]) => void;

    duplicateNodes: (ids: string[]) => void;
    copyNodes: (ids: string[]) => void;
    pasteNodes: () => void;

    setEdges: (edges: DecisionEdge[]) => void;
    addEdges: (edge: DecisionEdge[]) => void;
    removeEdges: (ids: string[]) => void;
    removeEdgeByHandleId: (handleId: string) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;

    closeTab: (id: string) => void;
    openTab: (id: string) => void;

    setActivePanel: (panel?: string) => void;

    setCompactMode: (mode: boolean) => void;
    toggleCompactMode: () => void;

    setNodeType: (id: string, kind: NodeTypeKind, vt: VariableType) => void;
    removeNodeType: (id: string, kind?: NodeTypeKind) => void;
  };

  listeners: {
    onChange?: (val: DecisionGraphType) => void;
    onPanelsChange?: (val?: string) => void;
    onReactFlowInit?: (instance: ReactFlowInstance) => void;
    onCodeExtension?: CodeEditorProps['extension'];
    onFunctionReady?: (monaco: Monaco) => void;
  };
};

type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
  setState: (partial: Partial<T>) => void;
};

export const DecisionGraphStoreContext = React.createContext<{
  stateStore: ExposedStore<DecisionGraphStoreType['state']>;
  listenerStore: ExposedStore<DecisionGraphStoreType['listeners']>;
  referenceStore: ExposedStore<DecisionGraphStoreType['references']>;
  actions: DecisionGraphStoreType['actions'];
}>({} as any);

export type DecisionGraphContextProps = {
  //
};

export const DecisionGraphProvider: React.FC<React.PropsWithChildren<DecisionGraphContextProps>> = (props) => {
  const { children } = props;

  const stateStore = useMemo(
    () =>
      create<DecisionGraphStoreType['state']>()(
        () =>
          ({
            id: undefined,
            simulate: undefined,
            decisionGraph: { nodes: [], edges: [] },
            hoveredEdgeId: null,
            openTabs: [],
            activeTab: 'graph',
            name: 'graph.json',
            disabled: false,
            configurable: true,
            components: [],
            customNodes: [],
            activePanel: undefined,
            panels: [],
            compactMode: localStorage.getItem('jdm-compact-mode') === 'true',
            nodeTypes: {},
          }) as DecisionGraphStoreType['state'],
      ),
    [],
  );

  const listenerStore = useMemo(
    () =>
      create<DecisionGraphStoreType['listeners']>(() => ({
        onChange: undefined,
        onPanelsChange: undefined,
      })),
    [],
  );

  const referenceStore = useMemo(
    () =>
      create<DecisionGraphStoreType['references']>(() => ({
        nodesState: createRef() as MutableRefObject<ReturnType<typeof useNodesState>>,
        edgesState: createRef() as MutableRefObject<ReturnType<typeof useEdgesState>>,
        graphClipboard: createRef() as MutableRefObject<ReturnType<typeof useGraphClipboard>>,
      })),
    [],
  );

  const actions = useMemo<DecisionGraphStoreType['actions']>(
    () => ({
      handleNodesChange: (changes = []) => {
        changes = changes.filter((c) => c.type !== 'dimensions');
        if (changes.length === 0) {
          return;
        }

        const { decisionGraph } = stateStore.getState();
        const { nodesState } = referenceStore.getState();

        nodesState.current[2]?.(changes);
        if (changes.find((c) => c.type === 'position')) {
          const newDecisionGraph = produce(decisionGraph, (draft) => {
            const nodes = (draft.nodes || []).map((node) => {
              const change = changes.find((change) => 'id' in change && change.id === node.id);
              if (change?.type === 'position' && change?.position) {
                node.position = change.position as Position;
              }
              return node;
            });
            draft.nodes = nodes;
          });

          stateStore.setState({ decisionGraph: newDecisionGraph });
          listenerStore.getState().onChange?.(newDecisionGraph);
        }
      },
      handleEdgesChange: (changes = []) => {
        const { decisionGraph } = stateStore.getState();
        const { edgesState } = referenceStore.getState();

        edgesState?.current?.[2](changes);
        if (changes.find((c) => c.type === 'remove')) {
          const newDecisionGraph = produce(decisionGraph, (draft) => {
            const edges = (draft.edges || [])
              .map((edge) => {
                const change = changes.find((change) => 'id' in change && change.id === edge.id);
                if (change?.type === 'remove') {
                  return null;
                }
                return edge;
              })
              .filter((node) => !!node) as DecisionEdge[];
            draft.edges = edges;
          });

          stateStore.setState({ decisionGraph: newDecisionGraph });
          listenerStore.getState().onChange?.(newDecisionGraph);
        }
      },
      setNodes: (nodes: DecisionNode[] = []) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();
        nodesState?.current?.[1](mapToGraphNodes(nodes));

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.nodes = nodes;
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      addNodes: (nodes: DecisionNode[]) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        const hasInput = nodesState.current[0]?.some((n) => n.type === NodeKind.Input);
        if (hasInput) {
          nodes = nodes.filter((n) => n.type !== NodeKind.Input);
        }

        nodesState.current[1]?.((n) => n.concat(mapToGraphNodes(nodes)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.nodes = (draft.nodes || []).concat(nodes);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      duplicateNodes: (ids) => {
        const { nodesState, edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        let nodes = (decisionGraph?.nodes || []).filter((n) => ids.includes(n.id));

        const hasInput = nodesState.current[0]?.some((n) => n.type === NodeKind.Input);
        if (hasInput) {
          nodes = nodes.filter((n) => n.type !== NodeKind.Input);
        }

        if (nodes.length === 0) {
          return;
        }

        const nodeIds: Record<string, string> = nodes.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.id]: crypto.randomUUID(),
          }),
          {},
        );

        const newNodes = nodes.map<DecisionNode>((node) => ({
          ...node,
          id: nodeIds[node.id],
          position: {
            x: node.position?.x || 0,
            y: (node.position?.y || 0) + 140,
          },
        }));

        const oldNodeIds = Object.keys(nodeIds);
        const newEdges: DecisionEdge[] = [];

        if (newNodes.length > 0) {
          (edgesState.current?.[0] || []).forEach((edge) => {
            if (oldNodeIds.includes(edge.source) && oldNodeIds.includes(edge.target)) {
              newEdges.push({
                id: crypto.randomUUID(),
                type: edge.type,
                sourceId: nodeIds[edge.source],
                targetId: nodeIds[edge.target],
                sourceHandle: edge.sourceHandle ?? undefined,
                targetHandle: edge.targetHandle ?? undefined,
              });
            }
          });
        }

        nodesState.current[1]?.((n) => n.concat(newNodes.map(mapToGraphNode)));
        edgesState.current[1]?.((e) => e.concat(newEdges.map(mapToGraphEdge)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.nodes.push(...newNodes);
          draft.edges.push(...newEdges);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      copyNodes: (ids) => {
        const { graphClipboard, nodesState } = referenceStore.getState();
        if (!graphClipboard.current || !nodesState.current) {
          return;
        }

        const [nodes] = nodesState.current;
        const copyNodes = nodes.filter((n) => ids.includes(n.id));

        graphClipboard.current.copyNodes(copyNodes);
      },
      pasteNodes: () => {
        const { graphClipboard } = referenceStore.getState();

        graphClipboard.current?.pasteNodes?.();
      },
      removeNodes: (ids = []) => {
        const { nodesState, edgesState } = referenceStore.getState();
        const { decisionGraph, nodeTypes } = stateStore.getState();

        nodesState.current[1]?.((nodes) => nodes.filter((n) => ids.every((id) => n.id !== id)));
        edgesState.current[1]?.((edges) =>
          edges.filter((e) =>
            ids.every((id) => e.source !== id && e.target !== id && e.sourceHandle !== id && e.targetHandle !== id),
          ),
        );

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const nodes = draft.nodes || [];
          const edges = draft.edges || [];
          draft.nodes = nodes.filter((n) => ids.every((id) => n.id !== id));
          draft.edges = edges.filter((e) =>
            ids.every((id) => e.sourceId !== id && e.targetId !== id && e.sourceHandle !== id && e.targetHandle !== id),
          );
        });

        const newNodeTypes = produce(nodeTypes, (draft) => {
          ids.forEach((id) => {
            if (id in draft) {
              delete draft[id];
            }
          });
        });

        stateStore.setState({ decisionGraph: newDecisionGraph, nodeTypes: newNodeTypes });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      addEdges: (edges: DecisionEdge[]) => {
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        edgesState.current?.[1]?.((els) => els.concat(edges.map(mapToGraphEdge)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.edges = (draft.edges || []).concat(edges);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      setEdges: (edges = []) => {
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        edgesState?.current?.[1]?.(mapToGraphEdges(edges));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.edges = edges;
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      removeEdges: (ids) => {
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        edgesState?.current?.[1]?.((edges) => edges.filter((e) => !ids.find((id) => e.id === id)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.edges = draft.edges.filter((e) => !ids.find((id) => e.id === id));
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      removeEdgeByHandleId: (handleId: string) => {
        if (!handleId) return;
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();
        edgesState?.current?.[1]?.((edges) => edges.filter((e) => e.sourceHandle !== handleId));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.edges = draft.edges.filter((e) => e.sourceHandle !== handleId);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      updateNode: (id, updater) => {
        const { decisionGraph } = stateStore.getState();
        const { nodesState } = referenceStore.getState();
        const [nodes, setNodes] = nodesState.current;

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const node = (draft.nodes ?? []).find((node) => node?.id === id);
          if (!node) {
            return;
          }

          updater(node);
        });

        const changedNode = newDecisionGraph.nodes.find((n) => n.id === id);
        if (!changedNode) {
          return;
        }

        const graphChangedNode = mapToGraphNode(changedNode as DecisionNode);
        const existingGraphNode = nodes.find((n) => n.id === id);
        if (!equal(graphChangedNode, existingGraphNode)) {
          setNodes((nodes) => nodes.map((n) => (n.id === id ? graphChangedNode : n)));
        }

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      setDecisionGraph: (graph) => {
        const { edgesState, nodesState } = referenceStore.getState();

        edgesState?.current?.[1](mapToGraphEdges(graph?.edges || []));
        nodesState?.current?.[1](mapToGraphNodes(graph?.nodes || []));

        stateStore.setState({ decisionGraph: graph });
        listenerStore.getState().onChange?.(graph);
      },
      setHoveredEdgeId: (edgeId) => stateStore.setState({ hoveredEdgeId: edgeId }),
      openTab: (id: string) => {
        const { openTabs } = stateStore.getState();
        const nodeId = openTabs.find((i) => i === id);

        if (nodeId) {
          stateStore.setState({ activeTab: nodeId });
        } else {
          stateStore.setState({ openTabs: [...openTabs, id], activeTab: id });
        }
      },
      closeTab: (id: string) => {
        const { openTabs, activeTab } = stateStore.getState();
        const index = openTabs?.findIndex((i) => i === id);
        const tab = openTabs?.[index];

        const updatedState: Partial<DecisionGraphStoreType['state']> = {
          openTabs: openTabs.filter((id) => id !== tab),
        };

        if (activeTab === id) {
          updatedState.activeTab = openTabs?.[index - 1] ?? 'graph';
        }

        stateStore.setState(updatedState);
      },
      setActivePanel: (panel?: string) => {
        const { panels } = stateStore.getState();
        const updatedState: Partial<DecisionGraphStoreType['state']> = {
          activePanel: panel === undefined ? undefined : (panels || []).find((p) => p.id === panel)?.id,
        };
        listenerStore.getState()?.onPanelsChange?.(panel);
        stateStore.setState(updatedState);
      },
      setCompactMode: (mode: boolean) => {
        const updatedState: Partial<DecisionGraphStoreType['state']> = {
          compactMode: mode,
        };
        localStorage.setItem('jdm-compact-mode', `${mode}`);
        stateStore.setState(updatedState);
      },
      toggleCompactMode: () => {
        const { compactMode } = stateStore.getState();
        const mode = !compactMode;
        const updatedState: Partial<DecisionGraphStoreType['state']> = {
          compactMode: mode,
        };
        localStorage.setItem('jdm-compact-mode', `${mode}`);
        stateStore.setState(updatedState);
      },
      setNodeType: (id, kind, vt) => {
        const { nodeTypes } = stateStore.getState();

        const newNodeTypes = produce(nodeTypes, (draft) => {
          draft[id] ??= {};
          draft[id][kind] = vt;
        });

        stateStore.setState({ nodeTypes: newNodeTypes });
      },
      removeNodeType: (id, kind) => {
        const { nodeTypes } = stateStore.getState();

        const newNodeTypes = produce(nodeTypes, (draft) => {
          if (!(id in draft)) {
            return;
          }

          if (kind) {
            if (kind in draft[id]) {
              delete draft[id][kind];
            }
          } else {
            delete draft[id];
          }
        });

        stateStore.setState({ nodeTypes: newNodeTypes });
      },
    }),
    [],
  );

  return (
    <DecisionGraphStoreContext.Provider
      value={{
        stateStore,
        referenceStore,
        listenerStore,
        actions,
      }}
    >
      {children}
    </DecisionGraphStoreContext.Provider>
  );
};

export function useDecisionGraphState<T>(
  selector: (state: DecisionGraphStoreType['state']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(DecisionGraphStoreContext).stateStore(selector, equals);
}

export function useDecisionGraphListeners<T>(
  selector: (state: DecisionGraphStoreType['listeners']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(DecisionGraphStoreContext).listenerStore(selector, equals);
}

export function useDecisionGraphReferences<T>(
  selector: (state: DecisionGraphStoreType['references']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(DecisionGraphStoreContext).referenceStore(selector, equals);
}

export function useDecisionGraphActions(): DecisionGraphStoreType['actions'] {
  return React.useContext(DecisionGraphStoreContext).actions;
}

export function useDecisionGraphRaw() {
  return React.useContext(DecisionGraphStoreContext);
}

export default DecisionGraphProvider;
