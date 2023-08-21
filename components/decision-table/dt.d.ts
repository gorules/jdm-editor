import React from 'react';
import { DecisionTableContextProps } from './context/dt-store.context';
import { DecisionTableEmptyType } from './dt-empty';
export type DecisionTableProps = {
    tableHeight: string | number;
    mountDialogsOnBody?: boolean;
    manager?: any;
} & DecisionTableContextProps & DecisionTableEmptyType;
export declare const DecisionTable: React.FC<DecisionTableProps>;
//# sourceMappingURL=dt.d.ts.map