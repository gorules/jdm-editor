import React from 'react';
import type { ProOptions } from 'reactflow';
import type { DecisionGraphType, DecisionNode } from '../context/dg-store.context';
export declare const DecisionContentType = "application/vnd.gorules.decision";
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
export declare const Graph: React.ForwardRefExoticComponent<GraphProps & React.RefAttributes<GraphRef>>;
//# sourceMappingURL=graph.d.ts.map