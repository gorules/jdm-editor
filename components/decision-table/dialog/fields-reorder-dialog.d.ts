import React from 'react';
import { TableSchemaItem } from '../context/dt.context';
export type FieldsReorderProps = {
    fields?: TableSchemaItem[];
    onSuccess?: (columns: TableSchemaItem[]) => void;
    onDismiss?: () => void;
    isOpen?: boolean;
};
export declare const FieldsReorder: React.VFC<FieldsReorderProps>;
//# sourceMappingURL=fields-reorder-dialog.d.ts.map