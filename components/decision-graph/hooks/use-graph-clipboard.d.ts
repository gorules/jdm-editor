import type { Node, ReactFlowInstance } from 'reactflow';
export declare const useGraphClipboard: (reactFlow?: ReactFlowInstance, wrapper?: HTMLDivElement) => {
    copyNodes: (nodes: Node[]) => Promise<void>;
    pasteNodes: () => Promise<void>;
    register: (selected?: Node[]) => (() => void) | undefined;
};
//# sourceMappingURL=use-graph-clipboard.d.ts.map