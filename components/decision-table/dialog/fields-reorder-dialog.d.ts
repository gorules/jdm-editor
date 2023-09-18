import React from 'react';
import type { TableSchemaItem } from '../context/dt-store.context';
export type FieldsReorderProps = {
    fields?: TableSchemaItem[];
    onSuccess?: (columns: TableSchemaItem[]) => void;
    onDismiss?: () => void;
    isOpen?: boolean;
    getContainer?: () => HTMLElement;
};
export declare const FieldsReorder: React.FC<FieldsReorderProps>;
//# sourceMappingURL=fields-reorder-dialog.d.ts.map