import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';

import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specifications';
import { NodeKind } from './specifications';

export type OutputNodeData = {
  name?: string;
};

export const outputSpecification: NodeSpecification<OutputNodeData> = {
  icon: <LogoutOutlined />,
  displayName: 'Response',
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
