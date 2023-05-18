import React from 'react';
import { TableSchemaItem } from './dt.context';
export type CellProps = {
    column?: {
        colType: string;
    } & TableSchemaItem;
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    onFocus: () => void;
};
export declare const DefaultCell: React.FC<CellProps>;
//# sourceMappingURL=table-default-cell.d.ts.map