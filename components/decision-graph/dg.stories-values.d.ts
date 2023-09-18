export declare const defaultGraph: {
    nodes: ({
        id: string;
        type: string;
        position: {
            x: number;
            y: number;
        };
        name: string;
        content?: undefined;
    } | {
        id: string;
        type: string;
        position: {
            x: number;
            y: number;
        };
        name: string;
        content: {
            hitPolicy: string;
            inputs: {
                id: string;
                type: string;
                field: string;
                name: string;
            }[];
            outputs: {
                field: string;
                id: string;
                name: string;
                type: string;
            }[];
            rules: {
                _id: string;
                _description: string;
                HVo_JpALi8: string;
                HW6mSVfLbs: string;
                '3EGDrV0ssV': string;
            }[];
        };
    })[];
    edges: {
        id: string;
        sourceId: string;
        type: string;
        targetId: string;
    }[];
};
//# sourceMappingURL=dg.stories-values.d.ts.map