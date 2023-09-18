import type { DecisionTableStoreType } from '../components/decision-table/context/dt-store.context';
export type SchemaSelectProps = {
    field: string;
    name?: string;
    items?: SchemaSelectProps[];
};
export declare const recursiveSelect: (selector: string[], fields: SchemaSelectProps[]) => SchemaSelectProps | undefined;
export declare const getPath: (key: string, items: SchemaSelectProps[]) => string[] | undefined;
export declare const columnIdSelector: (x: string) => (state: DecisionTableStoreType) => any;
//# sourceMappingURL=components.d.ts.map