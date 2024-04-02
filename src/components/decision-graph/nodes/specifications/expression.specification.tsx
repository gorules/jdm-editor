import { NumberOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { useDecisionGraphActions } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type Expression = {
  id?: string;
  key?: string;
  value?: string;
};

export type NodeExpressionData = {
  expressions?: Expression[];
};

export const expressionSpecification: NodeSpecification<NodeExpressionData> = {
  type: NodeKind.Expression,
  icon: <NumberOutlined />,
  displayName: 'Expression',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/expression',
  shortDescription: 'Mapping utility',
  generateNode: ({ index }) => ({
    name: `expression${index}`,
    content: {
      expressions: [],
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
            Edit Expression
          </Button>,
        ]}
      />
    );
  },
};
