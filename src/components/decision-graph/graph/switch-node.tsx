import { BranchesOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Space, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useMemo, useRef } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';
import { v4 } from 'uuid';

import { platform } from '../../../helpers/platform';
import { SpacedText } from '../../spaced-text';
import { useDecisionGraphStore } from '../context/dg-store.context';
import { mapToDecisionNode } from '../dg-util';
import { useNodeError } from './nodes';

type SwitchStatement = {
  id: string;
  condition: string;
};

export const GraphSwitchNode: React.FC<NodeProps> = (props) => {
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
          if (type !== 'inputNode' && type !== 'outputNode' && type !== 'switchNode') {
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
        <div className='switchNode__body'>
          {statements.map((statement) => (
            <HandleThing
              key={statement.id}
              statement={statement}
              isConnectable={isConnectable}
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

const HandleThing: React.FC<{
  statement: SwitchStatement;
  isConnectable: boolean;
  onChange?: (condition: string) => void;
}> = ({ statement, isConnectable, onChange }) => {
  return (
    <div className={clsx('switchNode__statement')}>
      <div className='inputArea'>
        <Input
          value={statement.condition}
          onChange={(e) => onChange?.(typeof e.target.value === 'string' ? e.target.value : '')}
        />
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          overlayStyle={{ maxWidth: 250 }}
          menu={{
            items: [
              {
                key: 'move-up',
                label: <SpacedText left='Move up' right={platform.shortcut('Alt + Up')} />,
              },
              {
                key: 'move-down',
                label: <SpacedText left='Move down' right={platform.shortcut('Alt + Down')} />,
              },
              { type: 'divider' },
              {
                key: 'add-up',
                label: <SpacedText left='Add above' right={platform.shortcut('Ctrl + Up')} />,
              },
              {
                key: 'add-down',
                label: <SpacedText left='Add below' right={platform.shortcut('Ctrl + Down')} />,
              },
              { type: 'divider' },
              {
                key: 'delete',
                label: <SpacedText left='Remove' right={platform.shortcut('Ctrl + Backspace')} />,
              },
            ],
          }}
        >
          <Button className='switchNode__statement__more' size='small' type='text' icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Handle id={statement.id} type='source' position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
};
