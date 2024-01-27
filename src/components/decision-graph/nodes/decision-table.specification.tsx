import { TableOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import { v4 } from 'uuid';

import { useDecisionGraphStore } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import { NodeKind, NodeSpecification } from './specifications';

export type DecisionTableInput = {
  id?: string;
  name?: string;
  field?: string;
};

export type DecisionTableOutput = {
  id?: string;
  name?: string;
  field?: string;
};

export type NodeDecisionTableData = {
  name?: string;
  content?: {
    hitPolicy?: 'first' | 'collect';
    inputs?: DecisionTableInput[];
    outputs?: DecisionTableOutput[];
    rules?: Record<string, string>[];
  };
};

export const decisionTableSpecification: NodeSpecification = {
  icon: <TableOutlined />,
  displayName: 'Decision table',
  generateNode: () => ({
    type: NodeKind.DecisionTable,
    data: {
      name: 'myDecisionTable',
      content: {
        hitPolicy: 'first',
        inputs: [
          {
            id: v4(),
            name: 'Input',
            type: 'expression',
          },
        ],
        outputs: [
          {
            field: 'output',
            id: v4(),
            name: 'Output',
            type: 'expression',
          },
        ],
        rules: [],
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
              Edit Table
            </Button>,
          ]}
        />
      );
    },
};
