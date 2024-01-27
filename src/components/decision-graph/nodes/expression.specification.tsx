import { NumberOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useDecisionGraphStore } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import { NodeKind, NodeSpecification } from './specifications';

export type Expression = {
  id?: string;
  key?: string;
  value?: string;
};

export type NodeExpressionData = {
  name?: string;
  content?: {
    expressions?: Expression[];
  };
};

export const expressionSpecification: NodeSpecification<NodeExpressionData> = {
  icon: <NumberOutlined />,
  displayName: 'Expression',
  generateNode: () => ({
    type: NodeKind.Expression,
    data: {
      name: 'myExpression',
      content: {
        expressions: [],
      },
    },
  }),
  renderNode:
    ({ specification }) =>
    ({ id, data }) => {
      const { openTab } = useDecisionGraphStore(
        ({ openTab }) => ({
          openTab,
        }),
        equal,
      );

      return (
        <GraphNode
          id={id}
          icon={specification.icon}
          type={specification.displayName}
          name={data.name}
          actions={[
            <Button key='edit-table' type='link' onClick={() => openTab(id)}>
              Edit Expression
            </Button>,
          ]}
        />
      );
    },
};
