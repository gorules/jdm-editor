import React from 'react';
import { SchemaSelectProps } from '../../../helpers/components';
import { CellProps } from '../table/table-default-cell';
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
export type TableCell = HTMLTableDataCellElement;
export type TableData = Record<string, string>[];
export type TableEventElements = {
    cell: HTMLElement;
};
export type TableExportOptions = {
    name?: string;
};
export type TableImportOptions = {
    file: File;
    replaceSchema?: boolean;
};
export type HitPolicy = 'first' | 'collect';
export type ColumnType = 'inputs' | 'outputs';
export type DecisionTableState = {
    id?: string;
    name?: string;
    cursor: TableCursor | null;
    setCursor: (cursor: TableCursor | null) => void;
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    value: DecisionTableProps;
    commitData: (data: string, cursor: TableCursor) => void;
    swapRows: (source: number, target: number) => void;
    addRowAbove: (target: number) => void;
    addRowBelow: (target: number) => void;
    removeRow: (target: number) => void;
    addColumn: (type: ColumnType, column: TableSchemaItem) => void;
    updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void;
    removeColumn: (type: ColumnType, id: string) => void;
    reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void;
    updateHitPolicy: (hitPolicy: HitPolicy) => void;
    getColumnId: (x: string) => ({
        colType: string;
    } & TableSchemaItem) | undefined;
    cells: React.MutableRefObject<Record<string, TableCell | null>>;
    table: React.MutableRefObject<HTMLTableElement | null>;
    namespace: string;
    importCsv: () => void;
    exportCsv: (options: TableExportOptions) => Promise<void>;
    activeRules?: string[];
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    disabled?: boolean;
    configurable?: boolean;
    disableHitPolicy?: boolean;
    cellRenderer?: (props: CellProps) => JSX.Element | null | undefined;
};
export type DecisionTableProps = {
    hitPolicy: HitPolicy | string;
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    rules: Record<string, string>[];
};
export declare const DecisionTableContext: React.Context<DecisionTableState>;
export type DecisionTableContextProps = {
    id?: string;
    name?: string;
    defaultValue?: DecisionTableProps;
    value?: DecisionTableProps;
    onChange?: (decisionTable: DecisionTableProps) => void;
    namespace?: string;
    activeRules?: string[];
    configurable?: boolean;
    disabled?: boolean;
    disableHitPolicy?: boolean;
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    cellRenderer?: (props: CellProps) => JSX.Element | null | undefined;
};
export declare const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>>;
export declare const useDecisionTable: () => DecisionTableState;
export default DecisionTableProvider;
//# sourceMappingURL=dt.context.d.ts.map