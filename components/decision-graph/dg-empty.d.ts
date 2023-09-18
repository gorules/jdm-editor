import type React from 'react';
import type { XYPosition } from 'reactflow';
import type { CustomNodeType, DecisionGraphType, DecisionNode } from './context/dg-store.context';
export type DecisionGraphEmptyType = {
    id?: string;
    defaultValue?: DecisionGraphType;
    value?: DecisionGraphType;
    disabled?: boolean;
    configurable?: boolean;
    simulate?: any;
    components?: CustomNodeType[];
    onChange?: (val: DecisionGraphType) => void;
    onAddNode?: (type: string, position?: XYPosition) => void;
    onOpenNode?: (node: DecisionNode) => void;
    onTabChange?: (tab?: string) => void;
    onEditGraph?: (edit: boolean) => void;
};
export declare const DecisionGraphEmpty: React.FC<DecisionGraphEmptyType>;
//# sourceMappingURL=dg-empty.d.ts.map