import React from 'react';
import type { SchemaSelectProps } from '../../../helpers/components';
import type { ColumnType, TableSchemaItem } from '../context/dt-store.context';
export type FieldUpdateProps = {
    id?: string;
    field?: TableSchemaItem;
    onSuccess?: (column: TableSchemaItem) => void;
    onDismiss?: () => void;
    isOpen?: boolean;
    schema?: SchemaSelectProps[];
    columnType?: ColumnType;
    getContainer?: () => HTMLElement;
};
export declare const FieldUpdate: React.FC<React.PropsWithChildren<FieldUpdateProps>>;
//# sourceMappingURL=field-update-dialog.d.ts.map