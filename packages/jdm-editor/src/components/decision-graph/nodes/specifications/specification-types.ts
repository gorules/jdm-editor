import type React from 'react';
import type { NodeProps } from 'reactflow';

import type { DecisionNode } from '../../context/dg-store.context';
import type { DecisionNodeProps } from '../decision-node';

export enum NodeKind {
  Input = 'inputNode',
  Output = 'outputNode',
  DecisionTable = 'decisionTableNode',
  Function = 'functionNode',
  Expression = 'expressionNode',
  Switch = 'switchNode',
}

export type MinimalNodeProps = Pick<NodeProps, 'id' | 'data' | 'selected'>;
export type MinimalNodeSpecification = Pick<
  NodeSpecification,
  'color' | 'icon' | 'displayName' | 'documentationUrl' | 'helper'
>;

type GenerateNodeParams = {
  index: number;
};

export type NodeSpecification<T = any> = {
  icon?: React.ReactNode;
  type: string;
  color?: DecisionNodeProps['color'];
  group?: string;
  displayName: string | React.ReactNode;
  documentationUrl?: string;
  shortDescription?: string;
  helper?: string | React.ReactNode;
  generateNode: (params: GenerateNodeParams) => Omit<DecisionNode<T>, 'position' | 'id' | 'type'>;
  renderNode: React.FC<MinimalNodeProps & { specification: MinimalNodeSpecification }>;

  onNodeAdd?: (node: DecisionNode<T>) => Promise<DecisionNode<T>>;
};
