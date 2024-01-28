import type React from 'react';
import type { Node, NodeProps } from 'reactflow';

import type { DecisionNodeProps } from '../../decision-node/decision-node';

export enum NodeKind {
  Input = 'inputNode',
  Output = 'outputNode',
  DecisionTable = 'decisionTableNode',
  Function = 'functionNode',
  Expression = 'expressionNode',
  Switch = 'switchNode',
}

export type MinimalNodeProps = Pick<NodeProps, 'id' | 'data' | 'selected'>;
export type MinimalNodeSpecification = Pick<NodeSpecification, 'color' | 'icon' | 'displayName' | 'documentationUrl'>;

export type NodeSpecification<T = any> = {
  icon: React.ReactNode;
  color?: DecisionNodeProps['color'];
  displayName: string;
  documentationUrl: string;
  shortDescription: string;
  generateNode: () => Omit<Node<T>, 'position' | 'id'>;
  renderNode: (data: { specification: MinimalNodeSpecification }) => React.FC<MinimalNodeProps>;
};
