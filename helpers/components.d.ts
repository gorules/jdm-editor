export type SchemaSelectProps = {
    field: string;
    name?: string;
    items?: SchemaSelectProps[];
};
export declare const recursiveSelect: (selector: string[], fields: SchemaSelectProps[]) => SchemaSelectProps | undefined;
export declare const getPath: (key: string, items: SchemaSelectProps[]) => string[] | undefined;
//# sourceMappingURL=components.d.ts.map