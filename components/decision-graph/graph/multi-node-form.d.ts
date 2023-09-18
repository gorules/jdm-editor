import type { FC } from 'react';
import type { Edge, Node } from 'reactflow';
export type MultiNodeFormProps = {
    nodes: Node[];
    edges: Edge[];
    onCopy?: (node: Node[]) => void;
    removeNodes?: (nodes: Node[]) => void;
    removeEdges?: (edges: Edge[]) => void;
    onClose?: () => void;
};
export declare const MultiNodeForm: FC<MultiNodeFormProps>;
//# sourceMappingURL=multi-node-form.d.ts.map