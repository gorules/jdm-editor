import type React from 'react';
import type { Node, NodeProps } from 'reactflow';

export enum NodeKind {
  Input = 'inputNode',
  Output = 'outputNode',
  DecisionTable = 'decisionTableNode',
  Function = 'functionNode',
  Expression = 'expressionNode',
  Switch = 'switchNode',
}

export type NodeSpecification<T = any> = {
  icon: React.ReactNode;
  displayName: string;
  documentationUrl: string;
  generateNode: () => Omit<Node<T>, 'position' | 'id'>;
  renderNode: (data: {
    specification: Pick<NodeSpecification, 'icon' | 'displayName' | 'documentationUrl'>;
  }) => React.FC<NodeProps>;
};
