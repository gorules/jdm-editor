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
  displayName: 'Response',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  generateNode: () => ({
    type: NodeKind.Output,
    data: {
      name: 'myResponse',
    },
  }),
  renderNode:
    ({ specification }) =>
    ({ id, data }) => (
      <GraphNode
        id={id}
        color='secondary'
        icon={specification.icon}
        type={specification.displayName}
        name={data.name}
        handleRight={false}
      />
    ),
};
