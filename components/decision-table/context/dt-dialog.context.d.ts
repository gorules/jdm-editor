import React from 'react';
import { ColumnType, TableSchemaItem } from './dt-store.context';
export type TableDialogType = 'add' | 'reorder' | 'edit';
export type TableDialogState = {
    type: TableDialogType;
    item: TableSchemaItem | null;
    columnType: ColumnType;
};
export type TableDialogContextState = {
    setDialog: React.Dispatch<React.SetStateAction<TableDialogState | undefined>>;
    dialog: TableDialogState | undefined;
    isDialogActive: (type: TableDialogType) => boolean;
    getContainer?: () => HTMLElement;
};
export declare const TableDialogContext: React.Context<TableDialogContextState>;
export declare const DecisionTableDialogProvider: React.FC<React.PropsWithChildren<{
    getContainer?: () => HTMLElement;
}>>;
export declare const useDecisionTableDialog: () => TableDialogContextState;
//# sourceMappingURL=dt-dialog.context.d.ts.map