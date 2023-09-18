import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { DecisionTableContextProps } from './context/dt-store.context';
import type { DecisionTableEmptyType } from './dt-empty';
export type DecisionTableProps = {
    tableHeight: string | number;
    mountDialogsOnBody?: boolean;
    manager?: DragDropManager;
} & DecisionTableContextProps & DecisionTableEmptyType;
export declare const DecisionTable: React.FC<DecisionTableProps>;
//# sourceMappingURL=dt.d.ts.map