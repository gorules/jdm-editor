import { CellContext } from '@tanstack/react-table';
import React from 'react';
import { TableSchemaItem } from '../context/dt-store.context';
export type TableDefaultCellProps = {
    context: CellContext<Record<string, string>, string>;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const TableDefaultCell: React.NamedExoticComponent<TableDefaultCellProps>;
export type TableCellProps = {
    column?: {
        colType: string;
    } & TableSchemaItem;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};
//# sourceMappingURL=table-default-cell.d.ts.map