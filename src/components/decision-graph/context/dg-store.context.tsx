import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import type { WritableDraft } from 'immer/src/types/types-external';
import React, { type MutableRefObject, createRef, useMemo } from 'react';
import type { EdgeChange, NodeChange, XYPosition, useEdgesState, useNodesState } from 'reactflow';
import { v4 } from 'uuid';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import { mapToGraphEdge, mapToGraphEdges, mapToGraphNode, mapToGraphNodes } from '../dg-util';

export type Position = {
  x: number;
  y: number;
};

export type DecisionNode = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  content?: any;
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

export type CustomNodeRenderFormType = {
  value: any;
  onChange: (val: any) => void;
};

export type CustomNodeType = {
  type: string;
  name: string;
  onOpen?: (node: DecisionNode) => void;
  renderForm?: (props: CustomNodeRenderFormType) => React.ReactNode;
  renderIcon?: () => React.ReactNode;
};

type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

export type DecisionGraphStoreType = {
  state: {
    id?: string;
    components?: CustomNodeType[];
    disabled?: boolean;
    configurable?: boolean;
    simulate?: any;
    decisionGraph: DecisionGraphType;
    hoveredEdgeId: string | null;
    openTabs: string[];
    activeTab: string;
  };

  references: {
    nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
    edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
  };

  actions: {
    setDecisionGraph: (val: DecisionGraphType) => void;

    handleNodesChange: (nodesChange: NodeChange[]) => void;
    handleEdgesChange: (edgesChange: EdgeChange[]) => void;

    setNodes: (nodes: DecisionNode[]) => void;
    addNode: (node: DecisionNode) => void;
    addNodes: (nodes: DecisionNode[]) => void;
    duplicateNode: (id: string) => void;
    updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode>) => void;
    removeNode: (id: string) => void;
    removeNodes: (ids: string[]) => void;

    setEdges: (edges: DecisionEdge[]) => void;
    addEdge: (edge: DecisionEdge) => void;
    removeEdge: (id: string) => void;
    removeEdges: (ids: string[]) => void;
    setHoveredEdgeId: (edgeId: string | null) => void;

    closeTab: (id: string) => void;
    openTab: (id: string) => void;
  };

  listeners: {
    onChange?: (val: DecisionGraphType) => void;
    onOpenNode?: (node: DecisionNode) => void;
    onEditGraph?: (edit: boolean) => void;
    onAddNode?: (type: string, position?: XYPosition) => void;
    onTabChange?: (tab?: string) => void;
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
      })),
    [],
  );

  const listenerStore = useMemo(
    () =>
      create<DecisionGraphStoreType['listeners']>(() => ({
        onChange: undefined,
        onOpenNode: undefined,
        onEditGraph: undefined,
        onAddNode: undefined,
        onTabChange: undefined,
      })),
    [],
  );

  const referenceStore = useMemo(
    () =>
      create<DecisionGraphStoreType['references']>(() => ({
        nodesState: createRef() as MutableRefObject<ReturnType<typeof useNodesState>>,
        edgesState: createRef() as MutableRefObject<ReturnType<typeof useEdgesState>>,
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
              const change = changes.find((change: NodeChange & { id: string }) => change.id === node.id);
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
                const change = changes.find((change: EdgeChange & { id: string }) => change.id === edge.id);
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
      addNode: (node: DecisionNode) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        nodesState.current[1]?.((nodes) => nodes.concat(mapToGraphNode(node)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const nodes = draft.nodes || [];
          draft.nodes = nodes.concat(node);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      addNodes: (nodes: DecisionNode[]) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        nodesState.current[1]?.((n) => n.concat(mapToGraphNodes(nodes)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const n = draft.nodes || [];
          draft.nodes = n.concat(nodes);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      duplicateNode: (id) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        const node = (decisionGraph?.nodes || []).find((n) => n.id === id);
        if (!node) return;

        const newNode: DecisionNode = {
          ...node,
          position: {
            x: node.position?.x || 0,
            y: (node.position?.y || 0) + 140,
          },
          id: v4(),
        };

        nodesState.current[1]?.((n) => n.concat(mapToGraphNode(newNode)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const n = draft.nodes || [];
          draft.nodes = n.concat(newNode);
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
      removeNode: (id) => {
        const { nodesState, edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        nodesState.current[1]?.((nodes) => nodes.filter((n) => n.id !== id));
        edgesState.current[1]?.((edges) =>
          edges.filter((e) => e.source !== id && e.target !== id && e.sourceHandle !== id && e.targetHandle !== id),
        );

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const nodes = draft.nodes || [];
          const edges = draft.edges || [];
          draft.nodes = nodes.filter((n) => n.id !== id);
          draft.edges = edges.filter(
            (e) => e.sourceId !== id && e.targetId !== id && e.sourceHandle !== id && e.targetHandle !== id,
          );
        });

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
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
      addEdge: (edge: DecisionEdge) => {
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        edgesState.current?.[1]?.((els) => els.concat(mapToGraphEdge(edge)));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const edges = draft.edges || [];
          draft.edges = edges.concat(edge);
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
      removeEdge: (id) => {
        const { edgesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();

        edgesState?.current?.[1]?.((edges) => edges.filter((e) => e.id !== id));
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          draft.edges = draft.edges.filter((e) => e.id !== id);
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

        stateStore.setState({
          openTabs: openTabs.filter((id) => id !== tab),
        });

        if (activeTab === id) {
          stateStore.setState({
            activeTab: index > 0 ? openTabs?.[index - 1] : 'graph',
          });
        }
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
