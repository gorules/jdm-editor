import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import type { WritableDraft } from 'immer/src/types/types-external';
import React, { type MutableRefObject, createRef, useMemo } from 'react';
import type { EdgeChange, NodeChange, ReactFlowInstance, useEdgesState, useNodesState } from 'reactflow';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import { mapToGraphEdge, mapToGraphEdges, mapToGraphNode, mapToGraphNodes } from '../dg-util';
import type { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { CustomNodeSpecification } from '../nodes/custom-node/index';
import { NodeKind, type NodeSpecification } from '../nodes/specifications/specification-types';
import type { Simulation } from '../types/simulation.types';
import { BASE_TABS, type Tab } from '../graph/common-tab';


export type Position = {
  x: number;
  y: number;
};

export type DecisionNode<T = any> = {
  id: string;
  name: string;
  description?: string;
  type?: string;
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

    customNodes: CustomNodeSpecification<object, string>[];
    customTabs: Tab[];

    panels?: PanelType[];
    activePanel?: string;
    onPanelsChange?: (val?: string) => void;

    simulate?: Simulation;
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
    setHoveredEdgeId: (edgeId: string | null) => void;

    closeTab: (id: string) => void;
    openTab: (id: string) => void;

    setActivePanel: (panel?: string) => void;
  };

  listeners: {
    onChange?: (val: DecisionGraphType) => void;
    onPanelsChange?: (val?: string) => void;
    onReactFlowInit?: (instance: ReactFlowInstance) => void;
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
      create<DecisionGraphStoreType['state']>(() => ({
        id: undefined,
        simulate: undefined,
        decisionGraph: { nodes: [], edges: [] },
        hoveredEdgeId: null,
        openTabs: [],
        activeTab: 'graph',
        disabled: false,
        configurable: true,
        components: [],
        customNodes: [],
        customTabs: [
          ...BASE_TABS
        ],
        activePanel: undefined,
        panels: [],
      })),
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
        const { decisionGraph } = stateStore.getState();

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

        stateStore.setState({ decisionGraph: newDecisionGraph });
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
      updateNode: (id, updater) => {
        const { decisionGraph } = stateStore.getState();
        const { nodesState } = referenceStore.getState();

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const node = (draft.nodes ?? []).find((node) => node?.id === id);
          if (!node) {
            return;
          }

          updater(node);
        });

        nodesState.current[1]?.((nodes) =>
          nodes.map((n) => {
            if (n.id === id) {
              return mapToGraphNode((newDecisionGraph.nodes || []).find((node) => node.id === id) as DecisionNode);
            }
            return n;
          }),
        );

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
