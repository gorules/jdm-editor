import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';

import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeOutputData = never;

export const outputSpecification: NodeSpecification<NodeOutputData> = {
  type: NodeKind.Output,
  icon: <LogoutOutlined />,
  color: 'secondary',
  displayName: 'Response',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: 'Outputs the context',
  generateNode: () => ({ name: 'response' }),
  renderNode: ({ id, data, selected, specification }) => (
    <GraphNode id={id} specification={specification} name={data.name} isSelected={selected} handleRight={false} />
  ),
};
