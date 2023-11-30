import React from 'react';
import type { XYPosition } from 'reactflow';
import type { StoreApi } from 'zustand';
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
export declare const DecisionGraphStoreContext: React.Context<{
    (): DecisionGraphStoreType;
    <U>(selector: (state: DecisionGraphStoreType) => U): U;
    <U_1>(selector: (state: DecisionGraphStoreType) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<DecisionGraphStoreType> & {
    setState: (partial: Partial<DecisionGraphStoreType>) => void;
}>;
export type DecisionGraphContextProps = {};
export declare const DecisionGraphProvider: React.FC<React.PropsWithChildren<DecisionGraphContextProps>>;
export declare function useDecisionGraphStore<T>(selector: (state: DecisionGraphStoreType) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useDecisionGraphRaw: () => {
    (): DecisionGraphStoreType;
    <U>(selector: (state: DecisionGraphStoreType) => U): U;
    <U_1>(selector: (state: DecisionGraphStoreType) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<DecisionGraphStoreType> & {
    setState: (partial: Partial<DecisionGraphStoreType>) => void;
};
export default DecisionGraphProvider;
//# sourceMappingURL=dg-store.context.d.ts.map