import { BranchesOutlined, CaretRightOutlined, DeleteOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useLayoutEffect, useRef, useState } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';
import { v4 } from 'uuid';

import { AutosizeTextArea } from '../../autosize-text-area';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { useNodeError } from './nodes';

type SwitchStatement = {
  id: string;
  condition: string;
};

export const GraphSwitchNode: React.FC<NodeProps> = (props) => {
  const { id } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  const { node, nodeTrace, updateNode, disabled, simulate } = useDecisionGraphStore(
    ({ decisionGraph, simulate, updateNode, disabled, configurable }) => ({
      node: (decisionGraph?.nodes ?? []).find((node) => node.id === id),
      nodeTrace: simulate?.result?.trace?.[id],
      updateNode,
      disabled,
      configurable,
      simulate,
    }),
    equal,
  );

  const error = useNodeError(id, simulate);

  const statements: SwitchStatement[] = node?.content?.statements || [];
  const hitPolicy = node?.content?.hitPolicy || 'first';
  const changeHitPolicy = (value: string) => {
    updateNode(
      id,
      produce(node?.content, (draft: any) => {
        draft.hitPolicy = value;
      }),
    );
  };

  return (
    <div ref={rootRef} className={clsx(['node', 'switch', nodeTrace && 'simulated', error && 'error'])}>
      {nodeTrace && (
        <div className={'performance'}>
          <Typography.Text style={{ fontSize: 10 }}>{nodeTrace?.performance || null}</Typography.Text>
        </div>
      )}
      <div className='switchNode'>
        <div className='switchNode__title'>
          <div className={'text-ellipsis'}>
            <Typography.Text strong>{node?.name}</Typography.Text>
          </div>
          <div className={'text-ellipsis'}>
            <Typography.Text style={{ fontSize: 12 }}>
              <Space size={4} style={{ maxWidth: '100%' }}>
                <BranchesOutlined />
                <span>Switch Node</span>
              </Space>
            </Typography.Text>
          </div>
          <Handle type='target' position={Position.Left} isConnectable={false} />
        </div>
        <div className={'switchNode__conditionsText'}>
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            Conditions
          </Typography.Text>
          <Dropdown
            trigger={['click']}
            placement='bottomRight'
            menu={{
              items: [
                {
                  key: 'first',
                  label: 'First',
                  onClick: () => {
                    changeHitPolicy('first');
                  },
                },
                {
                  key: 'collect',
                  label: 'Collect',
                  onClick: () => {
                    changeHitPolicy('collect');
                  },
                },
              ],
            }}
          >
            <Typography.Link
              style={{
                fontSize: 12,
                textTransform: 'capitalize',
              }}
            >
              {hitPolicy} <DownOutlined />
            </Typography.Link>
          </Dropdown>
        </div>
        <div className='switchNode__body nodrag'>
          {statements.map((statement) => (
            <SwitchHandle
              key={statement.id}
              value={statement.condition}
              id={statement.id}
              isConnectable={false}
              configurable={false}
              disabled={disabled}
              isActive={(nodeTrace?.traceData?.statements || []).some(
                (s: SwitchStatement) => s?.id && s?.id === statement?.id,
              )}
              onChange={(condition) => {
                updateNode(
                  id,
                  produce(node?.content, (draft: any) => {
                    draft.statements = (draft.statements || []).map((s: any) => {
                      if (statement.id === s.id) {
                        return {
                          id: s.id,
                          condition,
                        };
                      }
                      return s;
                    });
                  }),
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const GraphSwitchNodeEdit: React.FC<NodeProps> = (props) => {
  const { id, data, isConnectable } = props;
  const { setNodes } = useReactFlow();
  const rootRef = useRef<HTMLDivElement>(null);

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
    <div ref={rootRef} className={clsx(['node', 'switch'])}>
      <div className='switchNode'>
        <div className='switchNode__title'>
          <div className={'text-ellipsis'}>
            <Typography.Text strong>{data?.name}</Typography.Text>
          </div>
          <div className={'text-ellipsis'}>
            <Typography.Text style={{ fontSize: 12 }}>
              <Space size={4} style={{ maxWidth: '100%' }}>
                <BranchesOutlined />
                <span>Switch Node</span>
              </Space>
            </Typography.Text>
          </div>
          <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
        </div>
        <div className={'switchNode__conditionsText'}>
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            Conditions
          </Typography.Text>
          <Dropdown
            trigger={['click']}
            placement='bottomRight'
            menu={{
              items: [
                {
                  key: 'first',
                  label: 'First',
                  onClick: () => {
                    changeHitPolicy('first');
                  },
                },
                {
                  key: 'collect',
                  label: 'Collect',
                  onClick: () => {
                    changeHitPolicy('collect');
                  },
                },
              ],
            }}
          >
            <Typography.Link
              style={{
                fontSize: 12,
                textTransform: 'capitalize',
              }}
            >
              {hitPolicy} <DownOutlined />
            </Typography.Link>
          </Dropdown>
        </div>
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
        <Button
          className='switchNode__addButton'
          type='link'
          size='small'
          icon={<PlusOutlined />}
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
        />
      </div>
    </div>
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
