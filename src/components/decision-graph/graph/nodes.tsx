import {
  ApartmentOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  FunctionOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Space, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import type { FC } from 'react';
import React, { useMemo, useRef } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

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
