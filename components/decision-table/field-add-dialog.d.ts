import React from 'react';
import { SchemaSelectProps } from '../../helpers/components';
import { ColumnType, TableSchemaItem } from './dt.context';
export type FieldAddProps = {
    id?: string;
    onSuccess?: (column: TableSchemaItem) => void;
    onDismiss?: () => void;
    isOpen?: boolean;
    schema?: SchemaSelectProps[];
    columnType?: ColumnType;
};
export declare const FieldAdd: React.FC<FieldAddProps>;
//# sourceMappingURL=field-add-dialog.d.ts.map