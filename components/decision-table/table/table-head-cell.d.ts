import React from 'react';
import { TableSchemaItem } from '../context/dt-store.context';
export type TableHeadCellProps = {
    configurable?: boolean;
    disabled?: boolean;
};
export type TableHeadCellFieldProps = {
    configurable?: boolean;
    disabled?: boolean;
    schema: TableSchemaItem;
};
export declare const TableHeadCellInput: React.FC<TableHeadCellProps>;
export declare const TableHeadCellOutput: React.FC<TableHeadCellProps>;
export declare const TableHeadCellInputField: React.FC<TableHeadCellFieldProps>;
export declare const TableHeadCellOutputField: React.FC<TableHeadCellFieldProps>;
//# sourceMappingURL=table-head-cell.d.ts.map