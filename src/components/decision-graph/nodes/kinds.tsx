import {
  BranchesOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  DownOutlined,
  FunctionOutlined,
  LoginOutlined,
  LogoutOutlined,
  NumberOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useLayoutEffect, useState } from 'react';
import type { Node, NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';
import { v4 } from 'uuid';

import { AutosizeTextArea } from '../../autosize-text-area';
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
  },
  [NodeKind.DecisionTable]: {
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
  },
  [NodeKind.Switch]: {
    icon: <BranchesOutlined />,
    displayName: 'Switch',
    generateNode: () => ({
      type: NodeKind.Switch,
      data: {
        name: 'mySwitch',
        content: {
          statements: [{ id: v4(), condition: '' }],
        },
      },
    }),
    renderNode:
      ({ specification }) =>
      (props) => <SwitchNode specification={specification} {...props} />,
  },
});

type SwitchStatement = {
  id: string;
  condition: string;
};

export const SwitchNode: React.FC<
  NodeProps & {
    specification: Pick<NodeKindSpecification, 'displayName' | 'icon'>;
  }
> = ({ id, data, specification }) => {
  const { setNodes } = useReactFlow();
  const isConnectable = true;
  const statements: SwitchStatement[] = data?.content?.statements || [];
  const hitPolicy = data?.content?.hitPolicy || 'first';

  const changeHitPolicy = (value: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) return node;
        return {
          ...node,
          data: {
            ...(node?.data ?? {}),
            content: {
              ...(node?.data?.content ?? {}),
              hitPolicy: value,
            },
          },
        };
      }),
    );
  };

  return (
    <GraphNode
      id={id}
      className={clsx(['switch'])}
      icon={specification.icon}
      type={specification.displayName}
      name={data.name}
      handleRight={false}
      noBodyPadding
      actions={[
        <Button
          key='add row'
          type='link'
          onClick={() => {
            setNodes((nodes) =>
              nodes.map((node) => {
                if (node.id !== id) return node;
                return {
                  ...node,
                  data: {
                    ...(node?.data ?? {}),
                    content: {
                      ...(node?.data?.content ?? {}),
                      statements: [...(node?.data?.content?.statements ?? []), { id: v4(), condition: '' }],
                    },
                  },
                };
              }),
            );
          }}
        >
          Add row
        </Button>,
        <Dropdown
          key='hitPolicy'
          trigger={['click']}
          placement='bottomRight'
          menu={{
            items: [
              {
                key: 'first',
                label: 'First',
                onClick: () => changeHitPolicy('first'),
              },
              {
                key: 'collect',
                label: 'Collect',
                onClick: () => changeHitPolicy('collect'),
              },
            ],
          }}
        >
          <Button type='link' style={{ textTransform: 'capitalize', marginLeft: 'auto' }}>
            {hitPolicy} <DownOutlined />
          </Button>
        </Dropdown>,
      ]}
    >
      <div className='switchNode'>
        <div className='switchNode__body edit nodrag'>
          {statements.map((statement) => (
            <SwitchHandle
              key={statement.id}
              value={statement.condition}
              id={statement.id}
              isConnectable={isConnectable}
              onDelete={() => {
                setNodes((nodes) =>
                  nodes.map((node) => {
                    if (node.id !== id) return node;
                    return {
                      ...node,
                      data: {
                        ...(node?.data ?? {}),
                        content: {
                          ...(node?.data?.content ?? {}),
                          statements: (node?.data?.content?.statements || []).filter(
                            (s: SwitchStatement) => s?.id !== statement?.id,
                          ),
                        },
                      },
                    };
                  }),
                );
              }}
              onChange={(condition) => {
                setNodes((nodes) =>
                  nodes.map((node) => {
                    if (node.id !== id) return node;
                    return {
                      ...node,
                      data: {
                        ...(node?.data ?? {}),
                        content: {
                          ...(node?.data?.content ?? {}),
                          statements: (node?.data?.content?.statements ?? []).map((s: SwitchStatement) => {
                            if (s?.id !== statement.id) return s;
                            return { ...s, condition };
                          }),
                        },
                      },
                    };
                  }),
                );
              }}
            />
          ))}
        </div>
      </div>
    </GraphNode>
  );
};

const SwitchHandle: React.FC<{
  id: string;
  value?: string;
  isConnectable: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  configurable?: boolean;
}> = ({ id, value, isConnectable, onChange, disabled, configurable = true, onDelete, isActive }) => {
  const [inner, setInner] = useState(value);
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    setInner(val);
    onChange?.(val);
  };

  return (
    <div className={clsx('switchNode__statement')}>
      <div className='switchNode__statement__inputArea'>
        <AutosizeTextArea
          placeholder='Enter condition'
          style={{
            fontSize: 12,
            lineHeight: '20px',
          }}
          value={inner}
          maxRows={4}
          readOnly={disabled}
          onChange={(e) => handleChange?.(typeof e.target.value === 'string' ? e.target.value : '')}
        />
        {!disabled && configurable && (
          <Button
            className='switchNode__statement__more'
            size='small'
            type='text'
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete?.()}
          />
        )}
        {isActive && <CaretRightOutlined className={'switchNode__statement__activeIndicator'} />}
      </div>
      <Handle id={id} type='source' position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
};
