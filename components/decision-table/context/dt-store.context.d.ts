import React from 'react';
import { StoreApi } from 'zustand';
import { SchemaSelectProps } from '../../../helpers/components';
import { TableCellProps } from '../table/table-default-cell';
export type TableExportOptions = {
    name?: string;
};
export type TableCursor = {
    x: string;
    y: number;
};
export type TableSchemaItem = {
    id: string;
    name: string;
    field?: string;
    type: string;
    defaultValue?: string;
};
export type TableSchema = {
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
};
export type HitPolicy = 'first' | 'collect';
export type ColumnType = 'inputs' | 'outputs';
export type DecisionTableType = {
    hitPolicy: HitPolicy | string;
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    rules: Record<string, string>[];
};
export declare const parseDecisionTable: (decisionTable?: DecisionTableType) => DecisionTableType;
export type DecisionTableStoreType = {
    id?: string;
    name?: string;
    decisionTable: DecisionTableType;
    setDecisionTable: (val: DecisionTableType) => void;
    cursor: TableCursor | null;
    setCursor: (cursor: TableCursor | null) => void;
    commitData: (data: string, cursor: TableCursor) => void;
    swapRows: (source: number, target: number) => void;
    addRowAbove: (target?: number) => void;
    addRowBelow: (target?: number) => void;
    removeRow: (target?: number) => void;
    addColumn: (type: ColumnType, column: TableSchemaItem) => void;
    updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void;
    removeColumn: (type: ColumnType, id: string) => void;
    reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void;
    updateHitPolicy: (hitPolicy: HitPolicy) => void;
    activeRules?: string[];
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    disabled?: boolean;
    configurable?: boolean;
    disableHitPolicy?: boolean;
    minColWidth?: number;
    colWidth: number;
    onChange?: (val: DecisionTableType) => void;
    cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
};
export declare const DecisionTableStoreContext: React.Context<{
    (): DecisionTableStoreType;
    <U>(selector: (state: DecisionTableStoreType) => U, equals?: ((a: U, b: U) => boolean) | undefined): U;
} & StoreApi<DecisionTableStoreType> & {
    setState: (partial: Partial<DecisionTableStoreType>) => void;
}>;
export type DecisionTableContextProps = {};
export declare const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>>;
export declare const useDecisionTableStore: (selector: (state: DecisionTableStoreType) => any, equals?: ((a: any, b: any) => boolean) | undefined) => any;
export declare const useDecisionTableRaw: () => {
    (): DecisionTableStoreType;
    <U>(selector: (state: DecisionTableStoreType) => U, equals?: ((a: U, b: U) => boolean) | undefined): U;
} & StoreApi<DecisionTableStoreType> & {
    setState: (partial: Partial<DecisionTableStoreType>) => void;
};
export default DecisionTableProvider;
//# sourceMappingURL=dt-store.context.d.ts.map