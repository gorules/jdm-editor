import type { FC } from 'react';
import type { Node } from 'reactflow';
export type NodeFormProps<T = any> = {
    node: Node;
    onCopy?: (node: Node) => void;
    onChange?: (data: T) => void;
    onClose?: () => void;
    removeNode?: (node: Node) => void;
};
export declare const NodeForm: FC<NodeFormProps>;
//# sourceMappingURL=node-form.d.ts.map