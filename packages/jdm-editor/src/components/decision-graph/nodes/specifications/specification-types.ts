import { type VariableType } from '@gorules/zen-engine-wasm';
import type { DragDropManager } from 'dnd-core';
import type React from 'react';
import type { NodeProps } from 'reactflow';

import type { DecisionNode } from '../../dg-types';
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
  'color' | 'icon' | 'displayName' | 'documentationUrl' | 'helper' | 'renderSettings'
>;

type GenerateNodeParams = {
  index: number;
};

export type InferTypeData<T> = {
  input: VariableType;
  content: T;
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
  renderTab?: (props: { id: string; manager?: DragDropManager }) => React.ReactNode;
  getDiffContent?: (current: T, previous: T) => T;
  generateNode: (params: GenerateNodeParams) => Omit<DecisionNode<T>, 'position' | 'id' | 'type'>;
  renderNode: React.FC<MinimalNodeProps & { specification: MinimalNodeSpecification }>;
  renderSettings?: React.FC<{ id: string }>;
  inferTypes?: {
    needsUpdate: (content: T, prevContent: T) => boolean;
    determineOutputType: (state: InferTypeData<T>) => VariableType;
  };

  onNodeAdd?: (node: DecisionNode<T>) => Promise<DecisionNode<T>>;
};
