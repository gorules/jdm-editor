import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';

import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type OutputNodeData = {
  name?: string;
};

export const outputSpecification: NodeSpecification<OutputNodeData> = {
  icon: <LogoutOutlined />,
  color: 'secondary',
  displayName: 'Response',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: 'Outputs the context',
  generateNode: () => ({
    type: NodeKind.Output,
    data: {
      name: 'myResponse',
    },
  }),
  renderNode:
    ({ specification }) =>
    ({ id, data, selected }) => (
      <GraphNode id={id} specification={specification} name={data.name} isSelected={selected} handleRight={false} />
    ),
};
