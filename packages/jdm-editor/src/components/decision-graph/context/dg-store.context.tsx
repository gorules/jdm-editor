import { type VariableType } from '@gorules/zen-engine-wasm';
import type { Monaco } from '@monaco-editor/react';
import equal from 'fast-deep-equal/es6/react';
import type { WritableDraft } from 'immer';
import { produce } from 'immer';
import React, { type MutableRefObject, createRef, useMemo } from 'react';
import type { EdgeChange, NodeChange, ReactFlowInstance, useEdgesState, useNodesState } from 'reactflow';
import { match } from 'ts-pattern';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { CodeEditorProps } from '../../code-editor';
import type { DecisionEdge, DecisionGraphType, DecisionNode } from '../dg-types';
import { privateSymbol } from '../dg-types';
import { mapToGraphEdge, mapToGraphEdges, mapToGraphNode, mapToGraphNodes } from '../dg-util';
import type { useGraphClipboard } from '../hooks/use-graph-clipboard';
import type { CustomNodeSpecification } from '../nodes/custom-node';
import { NodeKind, type NodeSpecification } from '../nodes/specifications/specification-types';
import type { Simulation } from '../simulator/simulation.types';

export type PanelType = {
  id: string;
  icon: React.ReactNode;
  title: string;
  renderPanel?: React.FC;
  hideHeader?: boolean;
  onClick?: () => void;
};

type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

export type ViewConfigPermission = 'edit:values' | 'edit:rules' | 'edit:full';

export type ViewConfig = {
  enabled: boolean;
  description?: string;
  permissions?: Record<string, ViewConfigPermission | null | undefined> | null;
};

export enum NodeTypeKind {
  Input,
  Output,
  InferredInput,
  InferredOutput,
}

export type SetDecisionGraphOptions = {
  skipOnChangeEvent?: boolean;
};

export type DecisionGraphStoreType = {
  state: {
    id?: string;
    hideLeftToolbar?: boolean;
    components: NodeSpecification[];
    disabled?: boolean;
    decisionGraph: DecisionGraphType;
    hoveredEdgeId: string | null;
    openTabs: string[];
    activeTab: string;

    viewConfigCta?: string;
    viewConfig?: ViewConfig;

    name: string;

    customNodes: CustomNodeSpecification<object, any>[];

    panels?: PanelType[];
    activePanel?: string;
    onPanelsChange?: (val?: string) => void;

    simulate?: Simulation;

    compactMode?: boolean;

    nodeTypes: Record<string, Partial<Record<NodeTypeKind, VariableType>>>;
    globalType: Record<string, VariableType>;
  };

  references: {
    nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
    edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
    reactFlowInstance: MutableRefObject<ReactFlowInstance | null>;
    graphClipboard: MutableRefObject<ReturnType<typeof useGraphClipboard>>;
  };

  actions: {
    setDecisionGraph: (val: Partial<DecisionGraphType>, options?: SetDecisionGraphOptions) => void;

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

    closeTab: (id: string, action?: string) => void;
    openTab: (id: string) => void;
    goToNode: (id: string) => void;

    setActivePanel: (panel?: string) => void;

    setCompactMode: (mode: boolean) => void;
    toggleCompactMode: () => void;

    setNodeType: (id: string, kind: NodeTypeKind, vt: VariableType) => void;
    removeNodeType: (id: string, kind?: NodeTypeKind) => void;

    triggerNodeSelect: (id: string, mode: 'toggle' | 'only') => void;
  };

  listeners: {
    onChange?: (val: DecisionGraphType) => void;
    onPanelsChange?: (val?: string) => void;
    onReactFlowInit?: (instance: ReactFlowInstance) => void;
    onCodeExtension?: CodeEditorProps['extension'];
    onFunctionReady?: (monaco: Monaco) => void;
    onViewConfigCta?: () => void;
  };
};

export type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
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
      create<DecisionGraphStoreType['state']>()(() => ({
        id: undefined,
        simulate: undefined,
        decisionGraph: { nodes: [], edges: [] },
        hoveredEdgeId: null,
        openTabs: [],
        activeTab: 'graph',
        name: 'graph.json',
        disabled: false,
        components: [],
        customNodes: [],
        activePanel: undefined,
        panels: [],
        compactMode: localStorage.getItem('jdm-compact-mode') === 'true',
        nodeTypes: {},
        globalType: {},
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
        reactFlowInstance: createRef() as MutableRefObject<ReactFlowInstance | null>,
      })),
    [],
  );

  const actions = useMemo<DecisionGraphStoreType['actions']>(
    () => ({
      handleNodesChange: (changes = []) => {
        const { nodesState } = referenceStore.getState();
        const { decisionGraph } = stateStore.getState();
        const [, , onNodesChange] = nodesState.current;

        let hasChanges = false;

        onNodesChange?.(changes);
        const newDecisionGraph = produce(decisionGraph, (draft) => {
          changes.forEach((c) =>
            match(c)
              .with({ type: 'position' }, (p) => {
                const node = draft.nodes.find((n) => n.id === p.id);
                if (node && p.position && !equal(node.position, p.position)) {
                  hasChanges = true;
                  node.position = p.position;
                }
              })
              .with({ type: 'dimensions' }, (d) => {
                const node = draft.nodes.find((n) => n.id === d.id);
                if (node && !equal(node[privateSymbol]?.dimensions, d.dimensions)) {
                  hasChanges = true;
                  node[privateSymbol] ??= {};
                  node[privateSymbol].dimensions = { height: d.dimensions?.height, width: d.dimensions?.width };
                }
              })
              .with({ type: 'select' }, (s) => {
                const node = draft.nodes.find((n) => n.id === s.id);

                if (node && node[privateSymbol]?.selected !== s.selected) {
                  hasChanges = true;
                  node[privateSymbol] ??= {};
                  node[privateSymbol].selected = s.selected;
                }
              })
              .otherwise(() => {
                // No-op
              }),
          );
        });

        if (!hasChanges) {
          return;
        }

        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
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
      setDecisionGraph: (graph, options = {}) => {
        const { decisionGraph } = stateStore.getState();
        const { edgesState, nodesState } = referenceStore.getState();
        const { skipOnChangeEvent = false } = options;

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          Object.assign(draft, graph);
        });

        edgesState?.current?.[1](mapToGraphEdges(newDecisionGraph?.edges ?? []));
        nodesState?.current?.[1](mapToGraphNodes(newDecisionGraph?.nodes ?? []));
        stateStore.setState({
          decisionGraph: newDecisionGraph,
        });
        if (!skipOnChangeEvent) {
          listenerStore.getState().onChange?.(newDecisionGraph);
        }
      },
      setHoveredEdgeId: (edgeId) => stateStore.setState({ hoveredEdgeId: edgeId }),
      goToNode: (id: string) => {
        if (stateStore.getState().activeTab !== 'graph') {
          return;
        }

        const { reactFlowInstance } = referenceStore.getState();
        if (!reactFlowInstance.current) {
          return;
        }

        const node = reactFlowInstance.current.getNode(id);
        if (!node) {
          return;
        }

        reactFlowInstance.current.fitView({ nodes: [node], duration: 1_000, maxZoom: 1.25 });
      },
      openTab: (id: string) => {
        const { openTabs } = stateStore.getState();
        const nodeId = openTabs.find((i) => i === id);

        if (id === 'graph') {
          return stateStore.setState({ activeTab: id });
        }

        if (nodeId) {
          stateStore.setState({ activeTab: nodeId });
        } else {
          stateStore.setState({ openTabs: [...openTabs, id], activeTab: id });
        }
      },
      closeTab: (id: string, action?: string) => {
        const { openTabs, activeTab } = stateStore.getState();
        const index = openTabs?.findIndex((i) => i === id);
        const tab = openTabs?.[index];

        const updatedTabs = match(action)
          .with(undefined, () => openTabs.filter((id) => id !== tab))
          .with('close', () => openTabs.filter((id) => id !== tab))
          .with('close-all', () => [])
          .with('close-other', () => openTabs.filter((id) => id === tab))
          .with('close-right', () => openTabs.slice(0, index + 1))
          .with('close-left', () => openTabs.slice(index))
          .otherwise(() => openTabs);

        const updatedState: Partial<DecisionGraphStoreType['state']> = {
          openTabs: updatedTabs,
        };

        const newActiveTabId = updatedTabs?.find((i) => i === activeTab);
        if (!newActiveTabId) {
          updatedState.activeTab = updatedTabs?.[index - 1] ?? 'graph';
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
      triggerNodeSelect: (id, mode) => {
        const { decisionGraph } = stateStore.getState();
        const { nodesState, edgesState } = referenceStore.getState();
        const [, setNodes] = nodesState.current;
        const [, setEdges] = edgesState.current;

        const newDecisionGraph = produce(decisionGraph, (draft) => {
          const chosenNode = draft.nodes.find((n) => n.id === id);
          if (!chosenNode) {
            return;
          }

          if (mode === 'only') {
            draft.nodes.forEach((n) => {
              if (n[privateSymbol]) {
                n[privateSymbol].selected = false;
              }
            });
          }

          chosenNode[privateSymbol] ??= {};
          chosenNode[privateSymbol].selected = match(mode)
            .with('only', () => true)
            .otherwise(() => !chosenNode[privateSymbol]?.selected);
        });

        setNodes(mapToGraphNodes(newDecisionGraph.nodes));
        if (mode == 'only') {
          setEdges((edges) =>
            edges.map((e) => ({
              ...e,
              selected: false,
            })),
          );
        }
        stateStore.setState({ decisionGraph: newDecisionGraph });
        listenerStore.getState().onChange?.(newDecisionGraph);
      },
    }),
    [],
  );

  const value = useMemo(
    () => ({
      stateStore,
      referenceStore,
      listenerStore,
      actions,
    }),
    [stateStore, referenceStore, listenerStore, actions],
  );

  return <DecisionGraphStoreContext.Provider value={value}>{children}</DecisionGraphStoreContext.Provider>;
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

export const useNodeDiff = (id: string) => {
  const { diff, contentDiff } = useDecisionGraphState((s) => {
    const node = (s?.decisionGraph?.nodes ?? []).find((node) => node.id === id);

    return {
      diff: node?._diff,
      contentDiff: node?.content?._diff,
    };
  });
  return {
    diff,
    contentDiff,
  };
};

export const useEdgeDiff = (id: string) => {
  const { diff } = useDecisionGraphState((s) => {
    const edge = (s?.decisionGraph?.edges ?? []).find((edge) => edge.id === id);

    return {
      diff: edge?._diff,
    };
  });
  return {
    diff,
  };
};

export default DecisionGraphProvider;
