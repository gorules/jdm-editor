import { BranchesOutlined, CaretRightOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Typography } from 'antd';
import clsx from 'clsx';
import React, { useLayoutEffect, useState } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';
import { v4 } from 'uuid';

import { AutosizeTextArea } from '../../autosize-text-area';
import { GraphNode } from './graph-node';
import type { NodeSpecification } from './specifications';
import { NodeKind } from './specifications';

export type SwitchStatement = {
  id?: string;
  condition?: string;
};

export type NodeSwitchData = {
  name?: string;
  content?: {
    hitPolicy?: 'first' | 'collect';
    statements?: SwitchStatement[];
  };
};

export const switchSpecification: NodeSpecification<NodeSwitchData> = {
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
};

const SwitchNode: React.FC<
  NodeProps & {
    specification: Pick<NodeSpecification, 'displayName' | 'icon'>;
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
          {!(statements?.length > 0) && (
            <Typography.Text type={'secondary'} className={'no-conditions'}>
              No conditions
            </Typography.Text>
          )}
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
  id?: string;
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
          placeholder={`Enter condition (e.g. x > 10)`}
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
