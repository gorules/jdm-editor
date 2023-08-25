import { produce } from 'immer';
import React, { useMemo } from 'react';
import type { XYPosition } from 'reactflow';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

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

  type?: string;
};

export type DecisionGraphType = {
  nodes: DecisionNode[];
  edges: DecisionEdge[];
};

export type CustomNodeType = {
  type: string;
  name: string;
  onOpen?: () => void;
  renderForm?: () => React.ReactNode;
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
          set({
            decisionGraph: graph,
          });
          getState()?.onChange?.(graph);
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
  return React.useContext(DecisionGraphStoreContext)(selector, equals);
}

export const useDecisionGraphRaw = () => React.useContext(DecisionGraphStoreContext);
export default DecisionGraphProvider;
