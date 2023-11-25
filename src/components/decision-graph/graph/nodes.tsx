import {
  ApartmentOutlined,
  ArrowRightOutlined,
  BranchesOutlined,
  CodeOutlined,
  DownOutlined,
  FunctionOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  SwitcherOutlined,
  TableOutlined,
  UpOutlined,
} from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Input, Space, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import type { FC } from 'react';
import React, { useMemo, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { NodeProps, useReactFlow } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { v4 } from 'uuid';

import type { CustomNodeType } from '../context/dg-store.context';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { mapToDecisionNode } from '../dg-util';

const useNodeError = (id: string, simulate: any) => {
  if (simulate?.error?.data?.nodeId === id) {
    return simulate?.error?.data;
  }

  return null;
};

export const GraphNode: FC<NodeProps> = (props) => {
  const { id, data, isConnectable, type } = props;
  const doubleClickTimer = useRef<number>();

  const { openTab, simulate, customComponents } = useDecisionGraphStore(
    ({ simulate, openTab, components }) => ({
      openTab,
      simulate,
      customComponents: components ?? [],
    }),
    equal,
  );

  const component = useMemo(() => {
    return customComponents.find((component) => component.type === type);
  }, [customComponents, type]);

  const trace = useMemo(() => {
    return simulate?.result?.trace?.[id];
  }, [simulate]);

  const error = useNodeError(id, simulate);

  const innerOpen = () => {
    if (component) {
      component?.onOpen?.(mapToDecisionNode(props as any));
    } else {
      openTab?.(id);
    }
  };

  return (
    <div
      className={clsx([
        'node',
        trace && 'simulated',
        error && 'error',
        type === 'outputNode' && 'output',
        type === 'inputNode' && 'input',
      ])}
      onClick={() => {
        if (doubleClickTimer.current && performance.now() - doubleClickTimer.current < 250) {
          if (type !== 'inputNode' && type !== 'outputNode') {
            innerOpen();
          }
        }

        doubleClickTimer.current = performance.now();
      }}
    >
      {trace &&
        (type === 'decisionNode' ||
          type === 'expressionNode' ||
          type === 'decisionTableNode' ||
          type === 'functionNode') && (
          <div className={'performance'}>
            <Typography.Text
              style={{
                fontSize: 10,
              }}
            >
              {trace?.performance || null}
            </Typography.Text>
          </div>
        )}
      {(type === 'decisionTableNode' ||
        type === 'decisionNode' ||
        type === 'functionNode' ||
        type === 'expressionNode' ||
        type === 'outputNode') && <Handle type='target' position={Position.Left} isConnectable={isConnectable} />}
      <Space direction={'vertical'} size={0} className={'full-width'} style={{ textAlign: 'center' }}>
        <div className={'text-ellipsis'}>
          <Typography.Text strong>{data?.name}</Typography.Text>
        </div>
        <div className={'text-ellipsis'}>
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            {type === 'decisionTableNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <TableOutlined />
                <span>Decision Table</span>
              </Space>
            )}
            {type === 'functionNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <FunctionOutlined />
                <span>Function</span>
              </Space>
            )}
            {type === 'expressionNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <CodeOutlined />
                <span>Expression</span>
              </Space>
            )}
            {type === 'inputNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <ArrowRightOutlined />
                <span>Input</span>
              </Space>
            )}
            {type === 'outputNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <ArrowRightOutlined />
                <span>Output</span>
              </Space>
            )}
            {component && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                {component?.renderIcon?.()}
                <span>{component.name}</span>
              </Space>
            )}
          </Typography.Text>
        </div>
        {component && component?.onOpen && (
          <Typography.Link
            onClick={() => {
              innerOpen();
            }}
          >
            Open
          </Typography.Link>
        )}
        {!component && type !== 'inputNode' && type !== 'outputNode' && (
          <Typography.Link
            onClick={() => {
              innerOpen();
            }}
          >
            Open
          </Typography.Link>
        )}
      </Space>
      {(type === 'decisionTableNode' ||
        type === 'decisionNode' ||
        type === 'functionNode' ||
        type === 'expressionNode' ||
        type === 'inputNode') && <Handle type='source' position={Position.Right} isConnectable={isConnectable} />}
    </div>
  );
};

export const GraphNodeEdit: FC<NodeProps> = (props) => {
  const { data, isConnectable, type, selected } = props;

  const customComponents: CustomNodeType[] = useDecisionGraphStore((store) => store.components || [], equal);

  const component = useMemo(() => {
    return customComponents.find((component) => component.type === type);
  }, [customComponents, type]);

  return (
    <div
      className={clsx([
        'node',
        selected && 'selected',
        type === 'outputNode' && 'output',
        type === 'inputNode' && 'input',
      ])}
    >
      {(type === 'decisionTableNode' ||
        type === 'decisionNode' ||
        type === 'functionNode' ||
        type === 'expressionNode' ||
        type === 'outputNode' ||
        component) && <Handle type='target' position={Position.Left} isConnectable={isConnectable} />}
      <Space
        direction={'vertical'}
        size={0}
        className={'full-width'}
        style={{
          textAlign: 'center',
        }}
      >
        <div className={'text-ellipsis'}>
          <Typography.Text strong>{data?.name}</Typography.Text>
        </div>
        <div className={'text-ellipsis'}>
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            {type === 'decisionTableNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <TableOutlined />
                <span>Decision Table</span>
                {data?.hitPolicy === 'COLLECT' && <span>(c)</span>}
              </Space>
            )}
            {type === 'functionNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <FunctionOutlined />
                <span>Function</span>
              </Space>
            )}
            {type === 'expressionNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <CodeOutlined />
                <span>Expression</span>
              </Space>
            )}
            {type === 'inputNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <ArrowRightOutlined />
                <span>Input</span>
              </Space>
            )}
            {type === 'outputNode' && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <ArrowRightOutlined />
                <span>Output</span>
              </Space>
            )}
            {component && (
              <Space size={4} style={{ maxWidth: '100%' }}>
                <ApartmentOutlined />
                <span>{component?.name}</span>
              </Space>
            )}
          </Typography.Text>
        </div>
      </Space>
      {(type === 'decisionTableNode' ||
        type === 'decisionNode' ||
        type === 'functionNode' ||
        type === 'expressionNode' ||
        type === 'inputNode' ||
        component) && <Handle type='source' position={Position.Right} isConnectable={isConnectable} />}
    </div>
  );
};

type SwitchStatement = {
  id: string;
  condition: string;
  edgeIds: string[];
};

export const GraphSwitchNode: FC<NodeProps> = (props) => {
  const { id, data, isConnectable, type } = props;
  const doubleClickTimer = useRef<number>();
  const { setNodes } = useReactFlow();
  const rootRef = useRef<HTMLDivElement>(null);

  const { openTab, simulate, customComponents } = useDecisionGraphStore(
    ({ simulate, openTab, components }) => ({
      openTab,
      simulate,
      customComponents: components ?? [],
    }),
    equal,
  );

  const component = useMemo(() => {
    return customComponents.find((component) => component.type === type);
  }, [customComponents, type]);

  const trace = useMemo(() => {
    return simulate?.result?.trace?.[id];
  }, [simulate]);

  const error = useNodeError(id, simulate);

  const innerOpen = () => {
    if (component) {
      component?.onOpen?.(mapToDecisionNode(props as any));
    } else {
      openTab?.(id);
    }
  };

  const statements: SwitchStatement[] = data?.content?.statements || [];

  return (
    <div
      ref={rootRef}
      className={clsx(['node', 'switch', trace && 'simulated', error && 'error'])}
      onClick={() => {
        if (doubleClickTimer.current && performance.now() - doubleClickTimer.current < 250) {
          if (type !== 'inputNode' && type !== 'outputNode') {
            innerOpen();
          }
        }

        doubleClickTimer.current = performance.now();
      }}
    >
      {trace && (
        <div className={'performance'}>
          <Typography.Text style={{ fontSize: 10 }}>{trace?.performance || null}</Typography.Text>
        </div>
      )}
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <Space direction={'vertical'} size={0} className={'full-width'} style={{ textAlign: 'center' }}>
        <div className={'text-ellipsis'}>
          <Typography.Text strong>{data?.name}</Typography.Text>
        </div>
        <div className={'text-ellipsis'}>
          <Typography.Text
            style={{
              fontSize: 12,
            }}
          >
            <Space size={4} style={{ maxWidth: '100%' }}>
              <BranchesOutlined />
              <span>Switch Node</span>
            </Space>
          </Typography.Text>
        </div>
        <DndProvider backend={HTML5Backend} options={{ rootElement: rootRef.current }}>
          <div className='statementList'>
            {statements.map((statement) => (
              <HandleThing key={statement.id} statement={statement} isConnectable={isConnectable} />
            ))}
          </div>
        </DndProvider>
        <Button
          type='text'
          size='small'
          icon={<PlusCircleOutlined />}
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
                      statements: [
                        ...(node?.data?.content?.statements ?? []),
                        {
                          id: v4(),
                          condition: '',
                          edgeIds: [],
                        },
                      ],
                    },
                  },
                };
              }),
            );
          }}
        />
      </Space>
    </div>
  );
};

const HandleThing: React.FC<{ statement: SwitchStatement; isConnectable: boolean }> = ({
  statement,
  isConnectable,
}) => {
  return (
    <div className={clsx('switchWrapper')}>
      {isConnectable && (
        <div className='buttons'>
          <Button size='small' type='text' icon={<UpOutlined />} />
          <Button size='small' type='text' icon={<DownOutlined />} />
        </div>
      )}
      <Input.TextArea autoSize={{ maxRows: 3 }} />
      <Handle id={statement.id} type='source' position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
};
