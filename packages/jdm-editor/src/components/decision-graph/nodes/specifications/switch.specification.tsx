import { BranchesOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Popconfirm, Typography } from 'antd';
import clsx from 'clsx';
import React, { useLayoutEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { P, match } from 'ts-pattern';

import { LocalCodeEditor } from '../../../code-editor/local-ce';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type SwitchStatement = {
  id?: string;
  condition?: string;
  isDefault?: boolean;
};

export type NodeSwitchData = {
  hitPolicy?: 'first' | 'collect';
  statements?: SwitchStatement[];
};

export const switchSpecification: NodeSpecification<NodeSwitchData> = {
  type: NodeKind.Switch,
  icon: <BranchesOutlined />,
  displayName: 'Switch',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/switch',
  shortDescription: 'Conditional branching',
  generateNode: ({ index }) => ({
    name: `switch${index}`,
    content: {
      statements: [{ id: crypto.randomUUID(), condition: '' }],
    },
  }),
  renderNode: ({ specification, ...props }) => <SwitchNode specification={specification} {...props} />,
};

const SwitchNode: React.FC<
  MinimalNodeProps & {
    specification: Pick<NodeSpecification, 'displayName' | 'icon' | 'documentationUrl'>;
  }
> = ({ id, data, selected, specification }) => {
  const graphActions = useDecisionGraphActions();
  const { content, disabled, nodeTrace } = useDecisionGraphState(({ decisionGraph, disabled, simulate }) => ({
    nodeTrace: match(simulate)
      .with({ result: P._ }, ({ result }) => result?.trace?.[id]?.traceData)
      .otherwise(() => null),
    content: (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeSwitchData | undefined,
    disabled,
  }));

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
          key='add condition'
          type='link'
          disabled={disabled}
          onClick={() => {
            if (hitPolicy === 'first' && statements?.length > 0) {
              graphActions.updateNode(id, (draft) => {
                draft.content.statements = ((draft.content.statements || []) as SwitchStatement[]).map((statement) => {
                  if (statement.isDefault) {
                    statement.isDefault = false;
                  }
                  return statement;
                });
                draft.content.statements.push({ id: crypto.randomUUID(), condition: '', isDefault: true });
                return draft;
              });
            } else {
              graphActions.updateNode(id, (draft) => {
                draft.content.statements = ((draft.content.statements || []) as SwitchStatement[]).map((statement) => {
                  if (statement.isDefault) {
                    statement.isDefault = false;
                  }
                  return statement;
                });
                draft.content.statements.push({ id: crypto.randomUUID(), condition: '', isDefault: false });
                return draft;
              });
            }
          }}
        >
          Add Condition
        </Button>,
        <Dropdown
          key='hitPolicy'
          trigger={['click']}
          placement='bottomRight'
          disabled={disabled}
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
                onClick: () => {
                  graphActions.updateNode(id, (draft) => {
                    draft.content.statements = ((draft.content.statements || []) as SwitchStatement[]).map(
                      (statement) => {
                        if (statement.isDefault) {
                          statement.isDefault = false;
                        }
                        return statement;
                      },
                    );
                    return draft;
                  });
                  changeHitPolicy('collect');
                },
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
          {statements.map((statement, index) => (
            <SwitchHandle
              key={statement.id}
              index={index}
              value={statement.condition}
              id={statement.id}
              isDefault={statement.isDefault}
              totalStatements={statements.length}
              disabled={disabled}
              hitPolicy={hitPolicy}
              onSetIsDefault={(val) => {
                graphActions.updateNode(id, (draft) => {
                  const draftStatement = draft.content.statements.find((s: SwitchStatement) => {
                    return s.id === statement.id;
                  });
                  if (val) {
                    draftStatement.condition = '';
                  }
                  draftStatement.isDefault = val;
                  return draft;
                });
              }}
              isActive={match(nodeTrace)
                .with({ statements: P.array(P._) }, ({ statements }) =>
                  statements.some((s) => typeof s === 'object' && s && 'id' in s && s.id === statement?.id),
                )
                .otherwise(() => false)}
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
  isDefault?: boolean;
  onChange?: (value: string) => void;
  onSetIsDefault?: (isDefault: boolean) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  configurable?: boolean;
  hitPolicy: 'first' | 'collect';
  totalStatements: number;
  index: number;
}> = ({
  id,
  value,
  onChange,
  disabled,
  configurable = true,
  onDelete,
  isActive,
  index = 0,
  isDefault = false,
  onSetIsDefault,
  totalStatements,
  hitPolicy,
}) => {
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

  const isLastIndex = index === totalStatements - 1;

  const isElse = isDefault && hitPolicy === 'first' && isLastIndex;

  return (
    <div className={clsx('switchNode__statement', isActive && 'active')}>
      <div
        className={clsx('switchNode__statement__heading', isElse && 'switchNode__statement__heading--without-input')}
      >
        {(index === 0 || hitPolicy === 'collect') && (
          <Button className={clsx('switchNode__statement__heading__action')} size={'small'} type={'text'}>
            If
          </Button>
        )}
        {hitPolicy !== 'collect' && index > 0 && (
          <Button
            className={clsx('switchNode__statement__heading__action', isElse && 'inactive')}
            size={'small'}
            type={'text'}
            onClick={() => {
              if (isLastIndex && hitPolicy === 'first') {
                onSetIsDefault?.(false);
              }
            }}
          >
            Else If
          </Button>
        )}
        {hitPolicy !== 'collect' && index > 0 && isLastIndex && (
          <Button
            className={clsx('switchNode__statement__heading__action', !isElse && 'inactive')}
            size={'small'}
            type={'text'}
            onClick={() => {
              if (isLastIndex && hitPolicy === 'first') {
                onSetIsDefault?.(true);
              }
            }}
          >
            Else
          </Button>
        )}
        <div
          style={{
            flexGrow: 1,
          }}
        />
        {!disabled && configurable && (
          <Popconfirm title='Remove condition?' okText='Remove' onConfirm={() => onDelete?.()}>
            <Button className='switchNode__statement__delete' size='small' type='text' icon={<DeleteOutlined />} />
          </Popconfirm>
        )}
        <Handle
          id={id}
          type='source'
          position={Position.Right}
          className={clsx(isActive && 'switchNode__activeHandle')}
        />
      </div>
      {!isDefault && (
        <div className='switchNode__statement__inputArea'>
          <LocalCodeEditor
            placeholder={`cart.total > 100`}
            style={{
              fontSize: 12,
              lineHeight: '20px',
              width: '100%',
            }}
            value={inner}
            maxRows={4}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};
