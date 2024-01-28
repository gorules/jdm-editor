import { BranchesOutlined, CaretRightOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Typography } from 'antd';
import clsx from 'clsx';
import React, { useLayoutEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { v4 } from 'uuid';

import { AutosizeTextArea } from '../../autosize-text-area';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { GraphNode } from './graph-node';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

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
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/switch',
  shortDescription: 'Conditional branching',
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
  MinimalNodeProps & {
    specification: Pick<NodeSpecification, 'displayName' | 'icon' | 'documentationUrl'>;
  }
> = ({ id, data, selected, specification }) => {
  const isConnectable = true;
  const graphActions = useDecisionGraphActions();
  const content = useDecisionGraphState(
    ({ decisionGraph }) =>
      (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeSwitchData['content'] | undefined,
  );

  const statements: SwitchStatement[] = content?.statements || [];
  const hitPolicy = content?.hitPolicy || 'first';

  const changeHitPolicy = (hitPolicy: string) => {
    graphActions.updateNode(id, (node) => {
      node.content.hitPolicy = hitPolicy;
      return node;
    });
  };

  return (
    <GraphNode
      id={id}
      className={clsx(['switch'])}
      specification={specification}
      name={data.name}
      handleRight={false}
      noBodyPadding
      isSelected={selected}
      actions={[
        <Button
          key='add row'
          type='link'
          onClick={() => {
            graphActions.updateNode(id, (draft) => {
              draft.content.statements.push({ id: v4(), condition: '' });
              return draft;
            });
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
                graphActions.updateNode(id, (draft) => {
                  draft.content.statements = draft.content.statements.filter(
                    (s: SwitchStatement) => s?.id !== statement?.id,
                  );

                  return draft;
                });
              }}
              onChange={(condition) => {
                graphActions.updateNode(id, (draft) => {
                  const draftStatement = draft.content.statements.find((s: SwitchStatement) => {
                    return s.id === statement.id;
                  });

                  draftStatement.condition = condition;
                  return draft;
                });
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
