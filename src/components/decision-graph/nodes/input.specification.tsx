import { LoginOutlined } from '@ant-design/icons';
import React from 'react';

import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeInputData = {
  name?: string;
};

export const inputSpecification: NodeSpecification<NodeInputData> = {
  icon: <LoginOutlined />,
  displayName: 'Request',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  generateNode: () => ({
    type: NodeKind.Input,
    data: {
      name: 'myRequest',
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
        handleLeft={false}
      />
    ),
};
