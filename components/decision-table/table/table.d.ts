import React from 'react';
import type { DecisionTableType } from '../context/dt-store.context';
export type TableProps = {
    maxHeight: string | number;
};
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<{
    setDecisionTable?: ((decisionTable: DecisionTableType) => void) | undefined;
}>>;
//# sourceMappingURL=table.d.ts.map