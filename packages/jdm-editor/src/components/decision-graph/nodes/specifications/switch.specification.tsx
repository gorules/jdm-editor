import { ArrowRightOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Dropdown, Popconfirm, Typography } from 'antd';
import clsx from 'clsx';
import { produce } from 'immer';
import _ from 'lodash';
import { SplitIcon } from 'lucide-react';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Handle, Position } from 'reactflow';
import { P, match } from 'ts-pattern';

import { useNodeType } from '../../../../helpers/node-type';
import { DiffCodeEditor } from '../../../shared/diff-ce';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import type { Diff, DiffMetadata } from '../../dg-types';
import { compareAndUnifyLists } from '../../diff/comparison';
import type { SimulationTrace, SimulationTraceDataSwitch } from '../../simulator/simulation.types';
import { GraphNode } from '../graph-node';
import { NodeColor } from './colors';
import type { MinimalNodeProps, NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type SwitchStatement = {
  id: string;
  condition?: string;
  isDefault?: boolean;
} & Diff;

export type NodeSwitchData = {
  hitPolicy?: 'first' | 'collect';
  statements?: (SwitchStatement & Diff)[];
} & Diff;

export const switchSpecification: NodeSpecification<NodeSwitchData> = {
  type: NodeKind.Switch,
  icon: <SplitIcon size='1em' />,
  displayName: 'Switch',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/switch',
  shortDescription: 'Conditional branching',
  color: NodeColor.Purple,
  getDiffContent: (current, previous) => {
    return produce(current, (draft) => {
      const fields: DiffMetadata['fields'] = {};
      if ((current.hitPolicy ?? '') !== (previous.hitPolicy ?? '')) {
        _.set(fields, 'hitPolicy', {
          status: 'modified',
          previousValue: current.hitPolicy,
        });
      }

      const statements = compareAndUnifyLists(current?.statements || [], previous?.statements || [], {
        compareFields: (current, previous) => {
          const hasConditionChange = (current.condition ?? '') !== previous.condition;
          // const hasIsDefaultChange = (current.isDefault ?? false) !== (previous.isDefault ?? false);

          return {
            hasChanges: hasConditionChange,
            fields: {
              ...(hasConditionChange && {
                condition: {
                  status: 'modified',
                  previousValue: previous.condition,
                },
              }),
              // ...(hasIsDefaultChange && {
              //   isDefault: {
              //     status: 'modified',
              //     previousValue: previous.isDefault,
              //   },
              // }),
            },
          };
        },
      });

      draft.statements = statements;
      if (
        statements.find(
          (statement) =>
            statement?._diff?.status === 'modified' ||
            statement?._diff?.status === 'added' ||
            statement?._diff?.status === 'removed',
        )
      ) {
        _.set(fields, 'statements', {
          status: 'modified',
        });
      }

      if (Object.keys(fields).length > 0) {
        draft._diff = {
          status: 'modified',
          fields,
        };
      }
      return draft;
    });
  },
  inferTypes: {
    needsUpdate: () => false,
    determineOutputType: (state) => state.input,
  },
  generateNode: ({ index }) => ({
    name: `switch${index}`,
    content: {
      hitPolicy: 'first',
      statements: [{ id: crypto.randomUUID(), condition: '', isDefault: false }],
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
  const { ref: inViewRef, inView } = useInView({ delay: 1_000 });
  const { content, disabled, nodeTrace, compactMode, isGraphActive } = useDecisionGraphState(
    ({ decisionGraph, disabled, simulate, compactMode, activeTab }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id] as SimulationTrace<SimulationTraceDataSwitch>)
        .otherwise(() => null),
      content: (decisionGraph?.nodes || []).find((n) => n?.id === id)?.content as NodeSwitchData | undefined,
      disabled,
      compactMode,
      isGraphActive: activeTab === 'graph',
    }),
  );

  const nodeType = useNodeType(id, { disabled: !isGraphActive || !inView });
  const statements: SwitchStatement[] = content?.statements || [];
  const hitPolicy = content?.hitPolicy || 'first';

  const changeHitPolicy = (hitPolicy: string) => {
    graphActions.updateNode(id, (node) => {
      node.content.hitPolicy = hitPolicy;
      return node;
    });
  };

  const Handle = useMemo(() => (compactMode ? SwitchHandleCompact : SwitchHandle), [compactMode]);

  return (
    <GraphNode
      id={id}
      ref={inViewRef}
      className={clsx(['switch'])}
      specification={specification}
      name={data.name}
      handleRight={false}
      helper={[<ArrowRightOutlined key='arrow-right' />]}
      noBodyPadding
      isSelected={selected}
      actions={[
        <Button
          key='add condition'
          type='text'
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
          menu={{
            items: [
              {
                key: 'first',
                label: 'First',
                onClick: () => changeHitPolicy('first'),
                disabled,
              },
              {
                key: 'collect',
                label: 'Collect',
                disabled,
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
          <Button type='text' style={{ textTransform: 'capitalize', marginLeft: 'auto' }}>
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
            <Handle
              key={statement.id}
              index={index}
              value={statement.condition}
              diff={statement?._diff}
              id={statement.id}
              isDefault={statement.isDefault}
              totalStatements={statements.length}
              disabled={disabled}
              hitPolicy={hitPolicy}
              variableType={nodeType}
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
              isActive={match(nodeTrace?.traceData)
                .with({ statements: P.array(P._) }, ({ statements }) =>
                  statements.some((s) => typeof s === 'object' && s && 'id' in s && s.id === statement?.id),
                )
                .otherwise(() => false)}
              onDelete={() => {
                graphActions.updateNode(id, (draft) => {
                  draft.content.statements = draft.content.statements.filter(
                    (s: SwitchStatement) => s?.id !== statement?.id,
                  );

                  if ((draft.content.statements || []).length === 1) {
                    draft.content.statements = ((draft.content.statements || []) as SwitchStatement[]).map(
                      (statement) => {
                        if (statement.isDefault) {
                          statement.isDefault = false;
                        }
                        return statement;
                      },
                    );
                  }

                  return draft;
                });
                graphActions.removeEdgeByHandleId(statement?.id as string);
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
  diff?: DiffMetadata;
  onChange?: (value: string) => void;
  onSetIsDefault?: (isDefault: boolean) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  configurable?: boolean;
  hitPolicy: 'first' | 'collect';
  totalStatements: number;
  index: number;
  variableType?: VariableType;
}> = ({
  id,
  value,
  diff,
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
  variableType,
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

  const isElse =
    isDefault && hitPolicy === 'first' && isLastIndex && index > 0 && (value || '')?.trim?.()?.length === 0;

  return (
    <div className={clsx('switchNode__statement', isActive && 'active', diff?.status && `diff-${diff?.status}`)}>
      <div
        className={clsx('switchNode__statement__heading', isElse && 'switchNode__statement__heading--without-input')}
      >
        {(index === 0 || hitPolicy === 'collect') && (
          <Button
            disabled={disabled}
            className={clsx('switchNode__statement__heading__action')}
            size={'small'}
            type={'text'}
          >
            If
          </Button>
        )}
        {hitPolicy !== 'collect' && index > 0 && (
          <Button
            className={clsx('switchNode__statement__heading__action', isElse && 'inactive')}
            size={'small'}
            type={'text'}
            disabled={disabled}
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
            disabled={disabled}
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
      {!isElse && (
        <div className='switchNode__statement__inputArea'>
          <DiffCodeEditor
            style={{
              fontSize: 12,
              lineHeight: '20px',
              width: '100%',
            }}
            displayDiff={diff?.fields?.condition?.status === 'modified'}
            previousValue={diff?.fields?.condition?.previousValue}
            value={inner}
            maxRows={4}
            disabled={disabled}
            onChange={handleChange}
            variableType={variableType}
          />
        </div>
      )}
    </div>
  );
};

const SwitchHandleCompact: React.FC<{
  id?: string;
  value?: string;
  isDefault?: boolean;
  diff?: DiffMetadata;
  onChange?: (value: string) => void;
  onSetIsDefault?: (isDefault: boolean) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  configurable?: boolean;
  hitPolicy: 'first' | 'collect';
  totalStatements: number;
  index: number;
  variableType?: VariableType;
}> = ({ id, value, diff, onChange, disabled, configurable = true, onDelete, isActive, variableType }) => {
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
    <div
      className={clsx('switchNode__statement', 'compact', isActive && 'active', diff?.status && `diff-${diff?.status}`)}
    >
      <div className={clsx('switchNode__statement__inputArea')}>
        <DiffCodeEditor
          style={{
            fontSize: 12,
            lineHeight: '20px',
            width: '100%',
          }}
          displayDiff={diff?.fields?.condition?.status === 'modified'}
          previousValue={diff?.fields?.condition?.previousValue}
          value={inner}
          maxRows={4}
          disabled={disabled}
          onChange={handleChange}
          variableType={variableType}
        />
      </div>
      {!disabled && configurable && (
        <div className='switchNode__statement__button'>
          <Popconfirm title='Remove condition?' okText='Remove' onConfirm={() => onDelete?.()}>
            <Button className='switchNode__statement__delete' size='small' type='text' icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      )}
      <Handle
        id={id}
        type='source'
        position={Position.Right}
        className={clsx(isActive && 'switchNode__activeHandle')}
      />
    </div>
  );
};
