import { TableOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { useDecisionGraphActions } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

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
  hitPolicy?: 'first' | 'collect';
  inputs?: DecisionTableInput[];
  outputs?: DecisionTableOutput[];
  rules?: Record<string, string>[];
};

export const decisionTableSpecification: NodeSpecification<NodeDecisionTableData> = {
  type: NodeKind.DecisionTable,
  icon: <TableOutlined />,
  displayName: 'Decision table',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/decision-tables',
  shortDescription: 'Rules spreadsheet',
  generateNode: ({ index }) => ({
    name: `decisionTable${index}`,
    content: {
      hitPolicy: 'first',
      inputs: [
        {
          id: crypto.randomUUID(),
          name: 'Input',
        },
      ],
      outputs: [
        {
          id: crypto.randomUUID(),
          field: 'output',
          name: 'Output',
        },
      ],
      rules: [],
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        actions={[
          <Button key='edit-table' type='link' onClick={() => graphActions.openTab(id)}>
            Edit Table
          </Button>,
        ]}
      />
    );
  },
};
