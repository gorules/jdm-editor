import { produce } from 'immer';
import React, { type MutableRefObject, createRef, useMemo } from 'react';
import type { EdgeChange, NodeChange, XYPosition, useEdgesState, useNodesState } from 'reactflow';
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

export type DecisionGraphStoreType = {
  id?: string;

  components?: CustomNodeType[];

  decisionGraph: DecisionGraphType;
  setDecisionGraph: (val: DecisionGraphType) => void;

  disabled?: boolean;
  configurable?: boolean;

  simulate?: any;

  updateNode: (id: string, content: any) => void;

  nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
  edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;

  nodesChange: (nodesChange: NodeChange[]) => void;
  edgesChange: (edgesChange: EdgeChange[]) => void;

  setNodes: (nodes: DecisionNode[]) => void;
  addNode: (node: DecisionNode) => void;
  addNodes: (nodes: DecisionNode[]) => void;
  removeNode: (id: string) => void;
  // removeNodes(ids: string[]) => void;
  updateNodeContent: (id: string, content: any) => void;
  updateNodeName: (id: string, name: string) => void;
  setEdges: (edges: DecisionEdge[]) => void;
  addEdge: (edge: DecisionEdge) => void;
  removeEdge: (id: string) => void;

  hoveredEdgeId: string | null;
  setHoveredEdgeId: (edgeId: string | null) => void;

  openTabs: string[];
  activeTab: string;
  closeTab: (id: string) => void;
  openTab: (id: string) => void;

  onChange?: (val: DecisionGraphType) => void;
  onOpenNode?: (node: DecisionNode) => void;
  onEditGraph?: (edit: boolean) => void;
  onAddNode?: (type: string, position?: XYPosition) => void;
  onTabChange?: (tab?: string) => void;
};

export const DecisionGraphStoreContext = React.createContext<
  UseBoundStore<StoreApi<DecisionGraphStoreType>> & {
    setState: (partial: Partial<DecisionGraphStoreType>) => void;
  }
>({} as any);

export type DecisionGraphContextProps = {
  //
};

export const DecisionGraphProvider: React.FC<React.PropsWithChildren<DecisionGraphContextProps>> = (props) => {
  const { children } = props;
  const store = useMemo(
    () =>
      create<DecisionGraphStoreType>((set, getState) => ({
        decisionGraph: {
          nodes: [],
          edges: [],
        },
        setDecisionGraph: (graph) => {
          getState()?.edgesState?.current?.[1](mapToGraphEdges(graph?.edges || []));
          getState()?.nodesState?.current?.[1](mapToGraphNodes(graph?.nodes || []));
          set({
            decisionGraph: graph,
          });
        },
        nodesState: createRef() as MutableRefObject<ReturnType<typeof useNodesState>>,
        edgesState: createRef() as MutableRefObject<ReturnType<typeof useEdgesState>>,
        nodesChange: (changes = []) => {
          getState()?.nodesState.current[2]?.(changes);
          if (changes.find((c) => c.type === 'position')) {
            const decisionGraph = produce(getState().decisionGraph, (draft) => {
              const nodes = (draft.nodes || []).map((node) => {
                const change = changes.find((change: NodeChange & { id: string }) => change.id === node.id);
                if (change?.type === 'position' && change?.position) {
                  node.position = change.position as Position;
                }
                return node;
              });
              draft.nodes = nodes;
            });
            set({
              decisionGraph,
            });
            getState()?.onChange?.(decisionGraph);
          }
        },
        edgesChange: (changes = []) => {
          getState()?.edgesState?.current?.[2](changes);
          if (changes.find((c) => c.type === 'remove')) {
            const decisionGraph = produce(getState().decisionGraph, (draft) => {
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
            set({
              decisionGraph,
            });
            getState()?.onChange?.(decisionGraph);
          }
        },
        setNodes: (nodes: DecisionNode[] = []) => {
          getState()?.nodesState?.current?.[1](mapToGraphNodes(nodes));
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            draft.nodes = nodes;
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        addNode: (node: DecisionNode) => {
          getState().nodesState.current[1]?.((nodes) => {
            return nodes.concat(mapToGraphNode(node));
          });
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const nodes = draft.nodes || [];
            draft.nodes = nodes.concat(node);
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        addNodes: (nodes: DecisionNode[]) => {
          getState().nodesState.current[1]?.((n) => {
            return n.concat(mapToGraphNodes(nodes));
          });
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const n = draft.nodes || [];
            draft.nodes = n.concat(nodes);
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        removeNode: (id) => {
          getState().nodesState.current[1]?.((nodes) => {
            return nodes.filter((n) => n.id !== id);
          });
          getState().edgesState.current[1]?.((edges) => {
            return edges.filter(
              (e) => e.source !== id && e.target !== id && e.sourceHandle !== id && e.targetHandle !== id,
            );
          });
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const nodes = draft.nodes || [];
            draft.nodes = nodes.filter((n) => n.id !== id);
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        updateNodeContent: (id, content) => {
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const nodes = (draft.nodes || []).map((node) => {
              if (node.id === id) {
                node.content = content;
              }
              return node;
            });
            draft.nodes = nodes;
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        updateNodeName: (id, name) => {
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const nodes = (draft.nodes || []).map((node) => {
              if (node.id === id) {
                node.name = name;
              }
              return node;
            });
            draft.nodes = nodes;
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        addEdge: (edge: DecisionEdge) => {
          getState().edgesState?.current?.[1]?.((els) => {
            return els.concat(mapToGraphEdge(edge));
          });
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const edges = draft.edges || [];
            draft.edges = edges.concat(edge);
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        setEdges: (edges = []) => {
          getState()?.edgesState?.current?.[1]?.(mapToGraphEdges(edges));
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            draft.edges = edges;
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        removeEdge: (id) => {
          getState()?.edgesState?.current?.[1]?.((edges) => {
            return edges.filter((e) => e.id !== id);
          });
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            draft.edges = draft.edges.filter((e) => e.id !== id);
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        updateNode: (id, content) => {
          const decisionGraph = produce(getState().decisionGraph, (draft) => {
            const nodes = (draft.nodes || []).map((node) => {
              if (id === node?.id) {
                node.content = content;
              }
              return node;
            });
            draft.nodes = nodes;
          });
          set({
            decisionGraph,
          });
          getState()?.onChange?.(decisionGraph);
        },
        hoveredEdgeId: null,
        setHoveredEdgeId: (edgeId) => set({ hoveredEdgeId: edgeId }),
        openTabs: [],
        activeTab: 'graph',
        openTab: (id: string) => {
          const openTabs = getState().openTabs;
          const nodeId = openTabs.find((i) => i === id);
          if (nodeId) {
            set({
              activeTab: nodeId,
            });
          } else {
            set({
              openTabs: [...openTabs, id],
              activeTab: id,
            });
          }
        },
        closeTab: (id: string) => {
          const openTabs = getState().openTabs;
          const activeTab = getState().activeTab;
          const index = openTabs?.findIndex((i) => i === id);
          const tab = openTabs?.[index];
          set({
            openTabs: openTabs.filter((id) => id !== tab),
          });
          if (activeTab === id) {
            set({
              activeTab: index > 0 ? openTabs?.[index - 1] : 'graph',
            });
          }
        },
        disabled: false,
        configurable: true,
        components: [],
      })),
    [],
  );
  return <DecisionGraphStoreContext.Provider value={store}>{children}</DecisionGraphStoreContext.Provider>;
};

export function useDecisionGraphStore<T>(
  selector: (state: DecisionGraphStoreType) => T,
  equals?: (a: any, b: any) => boolean,
): T {
  return React.useContext(DecisionGraphStoreContext)(selector, equals as any);
}

export const useDecisionGraphRaw = () => React.useContext(DecisionGraphStoreContext);
export default DecisionGraphProvider;
