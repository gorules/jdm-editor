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
    ({ id, data, selected }) => (
      <GraphNode
        id={id}
        color='secondary'
        specification={specification}
        name={data.name}
        isSelected={selected}
        handleLeft={false}
      />
    ),
};
