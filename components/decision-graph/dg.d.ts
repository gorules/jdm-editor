import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { DecisionGraphContextProps } from './context/dg-store.context';
import type { DecisionGraphEmptyType } from './dg-empty';
import type { DecisionGraphWrapperProps } from './dg-wrapper';
import type { GraphRef } from './graph/graph';
export type DecisionGraphProps = {
    manager?: DragDropManager;
} & DecisionGraphWrapperProps & DecisionGraphContextProps & DecisionGraphEmptyType;
export declare const DecisionGraph: React.ForwardRefExoticComponent<{
    manager?: DragDropManager | undefined;
} & DecisionGraphWrapperProps & DecisionGraphEmptyType & React.RefAttributes<GraphRef>>;
//# sourceMappingURL=dg.d.ts.map