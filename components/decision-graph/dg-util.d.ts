import type { Edge, Node } from 'reactflow';
import type { DecisionEdge, DecisionNode } from './context/dg-store.context';
export declare const mapToDecisionNode: (node: Node) => DecisionNode;
export declare const mapToDecisionNodes: (nodes: Node[]) => DecisionNode[];
export declare const mapToDecisionEdges: (edges: Edge[]) => DecisionEdge[];
export declare const mapToGraphNode: (node: DecisionNode) => Node;
export declare const mapToGraphNodes: (nodes: DecisionNode[]) => Node[];
export declare const mapToGraphEdges: (edges: DecisionEdge[]) => Edge[];
//# sourceMappingURL=dg-util.d.ts.map