import {
  BranchesOutlined,
  FunctionOutlined,
  LoginOutlined,
  LogoutOutlined,
  NumberOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import type { Node, NodeProps } from 'reactflow';
import { v4 } from 'uuid';

import { defaultFunctionValue } from '../../function/helpers/libs';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { GraphNode } from './graph-node';

export enum NodeKind {
  Input = 'inputNode',
  Output = 'outputNode',
  DecisionTable = 'decisionTableNode',
  Function = 'functionNode',
  Expression = 'expressionNode',
  Switch = 'switchNode',
}

export type NodeKindSpecification<T = any> = {
  icon: React.ReactNode;
  displayName: string;
  generateNode: () => Omit<Node<T>, 'position' | 'id'>;
  renderNode: (data: { specification: Pick<NodeKindSpecification, 'icon' | 'displayName'> }) => React.FC<NodeProps>;
};

function makeNodeSpecification<T extends Record<NodeKind, V>, V extends NodeKindSpecification>(o: T): Readonly<T> {
  return o;
}

export const nodeSpecification = makeNodeSpecification({
  [NodeKind.Input]: {
    icon: <LoginOutlined />,
    displayName: 'Request',
    generateNode: () => ({
      type: NodeKind.Input,
      data: {
        name: 'myRequest',
      },
    }),
    renderNode:
      ({ specification }) =>
      ({ data }) => (
        <GraphNode icon={specification.icon} type={specification.displayName} name={data.name} handleLeft={false} />
      ),
  },
  [NodeKind.Output]: {
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
      ({ data }) => (
        <GraphNode icon={specification.icon} type={specification.displayName} name={data.name} handleRight={false} />
      ),
  },
  [NodeKind.DecisionTable]: {
    icon: <TableOutlined />,
    displayName: 'Decision table',
    generateNode: () => ({
      type: NodeKind.Output,
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
  },
  [NodeKind.Function]: {
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
  },
  [NodeKind.Expression]: {
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
      ({ data }) => <GraphNode icon={specification.icon} type={specification.displayName} name={data.name} />,
  },
  [NodeKind.Switch]: {
    icon: <BranchesOutlined />,
    displayName: 'Switch',
    generateNode: () => ({
      type: NodeKind.Output,
      data: {
        name: 'mySwitch',
        content: {
          statements: [{ id: v4(), condition: '' }],
        },
      },
    }),
    renderNode:
      ({ specification }) =>
      ({ data }) => <GraphNode icon={specification.icon} type={specification.displayName} name={data.name} />,
  },
});
