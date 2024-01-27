import { FunctionOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { defaultFunctionValue } from '../../function/helpers/libs';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import { NodeKind, NodeSpecification } from './specifications';

export type NodeFunctionData = {
  name?: string;
  content?: string;
};

export const functionSpecification: NodeSpecification<NodeFunctionData> = {
  icon: <FunctionOutlined />,
  displayName: 'Function',
  generateNode: () => ({
    type: NodeKind.Function,
    data: {
      name: 'myFunction',
      content: defaultFunctionValue,
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
            <Button key='edit-function' type='link' onClick={() => openTab(id)}>
              Edit Function
            </Button>,
          ]}
        />
      );
    },
};