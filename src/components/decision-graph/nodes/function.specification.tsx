import { FunctionOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import { defaultFunctionValue } from '../../function/helpers/libs';
import { useDecisionGraphActions } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeFunctionData = string;

export const functionSpecification: NodeSpecification<NodeFunctionData> = {
  icon: <FunctionOutlined />,
  displayName: 'Function',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/functions',
  shortDescription: 'Javascript lambda',
  generateNode: () => ({
    type: NodeKind.Function,
    name: 'myFunction',
    content: defaultFunctionValue,
  }),
  renderNode:
    ({ specification }) =>
    ({ id, data, selected }) => {
      const graphActions = useDecisionGraphActions();

      return (
        <GraphNode
          id={id}
          specification={specification}
          name={data.name}
          isSelected={selected}
          actions={[
            <Button key='edit-function' type='link' onClick={() => graphActions.openTab(id)}>
              Edit Function
            </Button>,
          ]}
        />
      );
    },
};
