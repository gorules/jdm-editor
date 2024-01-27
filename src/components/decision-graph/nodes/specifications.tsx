import React from 'react';
import type { Node, NodeProps } from 'reactflow';

import { decisionTableSpecification } from './decision-table.specification';
import { expressionSpecification } from './expression.specification';
import { functionSpecification } from './function.specification';
import { inputSpecification } from './input.specification';
import { outputSpecification } from './output.specification';
import { switchSpecification } from './switch.specification';

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
  generateNode: () => Omit<Node<T>, 'position' | 'id'>;
  renderNode: (data: { specification: Pick<NodeSpecification, 'icon' | 'displayName'> }) => React.FC<NodeProps>;
};

function makeNodeSpecification<T extends Record<NodeKind, V>, V extends NodeSpecification>(o: T): Readonly<T> {
  return o;
}

export const nodeSpecification = makeNodeSpecification({
  [NodeKind.Input]: inputSpecification,
  [NodeKind.Output]: outputSpecification,
  [NodeKind.DecisionTable]: decisionTableSpecification,
  [NodeKind.Function]: functionSpecification,
  [NodeKind.Expression]: expressionSpecification,
  [NodeKind.Switch]: switchSpecification,
});
