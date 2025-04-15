import { ArrowRightOutlined, SyncOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Form, Space } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import _ from 'lodash';
import { Grid3x3Icon } from 'lucide-react';
import React from 'react';
import type { z } from 'zod';

import { useNodeType } from '../../../../helpers/node-type';
import type { decisionTableSchema } from '../../../../helpers/schema';
import { DiffCodeEditor, DiffInput, DiffRadio, DiffSwitch } from '../../../shared';
import { useDecisionGraphActions, useDecisionGraphState, useNodeDiff } from '../../context/dg-store.context';
import type { Diff, DiffMetadata } from '../../dg-types';
import { compareAndUnifyLists } from '../../diff/comparison';
import { TabDecisionTable } from '../../graph/tab-decision-table';
import { GraphNode } from '../graph-node';
import { NodeKind } from './specification-types';
import type { NodeSpecification } from './specification-types';

type InferredContent = z.infer<typeof decisionTableSchema>['content'];

export type NodeDecisionTableData = Omit<InferredContent, 'inputs' | 'outputs' | 'rules'> &
  Diff & {
    rules: (InferredContent['rules'][0] & Diff)[];
    inputs: (InferredContent['inputs'][0] & Diff)[];
    outputs: (InferredContent['outputs'][0] & Diff)[];
  };

export const decisionTableSpecification: NodeSpecification<NodeDecisionTableData> = {
  type: NodeKind.DecisionTable,
  icon: <Grid3x3Icon size='1em' />,
  displayName: 'Decision table',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/decision-tables',
  shortDescription: 'Rules spreadsheet',
  renderTab: ({ id, manager }) => <TabDecisionTable id={id} manager={manager} />,
  getDiffContent: (current, previous) => {
    return produce(current, (draft) => {
      const fields: DiffMetadata['fields'] = {};
      if ((current.executionMode ?? 'single') !== (previous.executionMode ?? 'single')) {
        _.set(fields, 'executionMode', {
          status: 'modified',
          previousValue: previous.executionMode,
        });
      }

      if ((current.hitPolicy ?? 'first') !== (previous.hitPolicy ?? 'first')) {
        _.set(fields, 'hitPolicy', {
          status: 'modified',
          previousValue: previous.hitPolicy,
        });
      }

      if ((current.inputField ?? '') !== (previous.inputField ?? '')) {
        _.set(fields, 'inputField', {
          status: 'modified',
          previousValue: previous.inputField,
        });
      }

      if ((current.outputPath ?? '') !== (previous.outputPath ?? '')) {
        _.set(fields, 'outputPath', {
          status: 'modified',
          previousValue: previous.outputPath,
        });
      }

      if ((current.passThrough ?? false) !== (previous.passThrough ?? false)) {
        _.set(fields, 'passThrough', {
          status: 'modified',
          previousValue: previous.passThrough,
        });
      }

      const inputs = compareAndUnifyLists(current?.inputs || [], previous?.inputs || [], {
        compareFields: (current, previous) => {
          const hasNameChange = (current.name ?? '') !== (previous.name ?? '');
          const hasFieldChange = (current.field ?? '') !== (previous.field ?? '');
          const hasDefaultValueChange = (current.defaultValue ?? '') !== (previous.defaultValue ?? '');

          return {
            hasChanges: hasNameChange || hasFieldChange || hasDefaultValueChange,
            fields: {
              ...(hasNameChange && {
                name: {
                  status: 'modified',
                  previousValue: previous.name,
                },
              }),
              ...(hasFieldChange && {
                field: {
                  status: 'modified',
                  previousValue: previous.field,
                },
              }),
              ...(hasDefaultValueChange && {
                defaultValue: {
                  status: 'modified',
                  previousValue: previous.defaultValue,
                },
              }),
            },
          };
        },
      });

      const outputs = compareAndUnifyLists(current?.outputs || [], previous?.outputs || [], {
        compareFields: (current, previous) => {
          const hasNameChange = (current.name ?? '') !== (previous.name ?? '');
          const hasFieldChange = (current.field ?? '') !== (previous.field ?? '');
          const hasDefaultValueChange = (current.defaultValue ?? '') !== (previous.defaultValue ?? '');

          return {
            hasChanges: hasNameChange || hasFieldChange || hasDefaultValueChange,
            fields: {
              ...(hasNameChange && {
                name: {
                  status: 'modified',
                  previousValue: previous.name,
                },
              }),
              ...(hasFieldChange && {
                field: {
                  status: 'modified',
                  previousValue: previous.field,
                },
              }),
              ...(hasDefaultValueChange && {
                defaultValue: {
                  status: 'modified',
                  previousValue: previous.defaultValue,
                },
              }),
            },
          };
        },
      });

      const rules = compareAndUnifyLists(current?.rules || [], previous?.rules || [], {
        idField: '_id',
        compareFields: (current, previous) => {
          const hasDescriptionChange = (current._description ?? '') !== (previous._description ?? '');

          const inputChanges: any = {};
          inputs.forEach((input) => {
            if (input._diff?.status === 'added') {
              inputChanges[input.id] = {
                status: 'added',
              };
            } else if (input._diff?.status === 'removed') {
              inputChanges[input.id] = {
                status: 'removed',
              };
            } else if ((current?.[input.id] ?? '') !== (previous?.[input.id] ?? '')) {
              inputChanges[input.id] = {
                status: 'modified',
                previousValue: previous?.[input.id],
              };
            }
          });

          const outputChanges: any = {};
          outputs.forEach((output) => {
            if (output?._diff?.status === 'added') {
              outputChanges[output.id] = {
                status: 'added',
              };
            } else if (output?._diff?.status === 'removed') {
              outputChanges[output.id] = {
                status: 'removed',
              };
            } else if ((current?.[output.id] ?? '') !== (previous?.[output.id] ?? '')) {
              outputChanges[output.id] = {
                status: 'modified',
                previousValue: previous?.[output.id],
              };
            }
          });

          return {
            hasChanges:
              hasDescriptionChange || Object.keys(inputChanges).length > 0 || Object.keys(outputChanges).length > 0,
            fields: {
              ...(hasDescriptionChange && {
                _description: {
                  status: 'modified',
                  previousValue: previous._description,
                },
              }),
              ...inputChanges,
              ...outputChanges,
            },
          };
        },
      });

      draft.inputs = inputs;
      draft.outputs = outputs;
      draft.rules = rules;

      if (
        inputs.find(
          (input) =>
            input?._diff?.status === 'modified' ||
            input?._diff?.status === 'added' ||
            input?._diff?.status === 'removed',
        )
      ) {
        _.set(fields, 'inputs', {
          status: 'modified',
        });
      }

      if (
        outputs.find(
          (output) =>
            output?._diff?.status === 'modified' ||
            output?._diff?.status === 'added' ||
            output?._diff?.status === 'removed',
        )
      ) {
        _.set(fields, 'outputs', {
          status: 'modified',
        });
      }

      if (
        rules.find(
          (rule) =>
            rule?._diff?.status === 'modified' || rule?._diff?.status === 'added' || rule?._diff?.status === 'removed',
        )
      ) {
        _.set(fields, 'rules', {
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
    needsUpdate: (content, prevContent) => !equal(content, prevContent),
    determineOutputType: ({ content, input }) => {
      let nodeInput = input.clone();
      let determinedType = VariableType.fromJson({ Object: {} });
      if (content.inputField) {
        nodeInput = input.calculateType(content.inputField);
      }

      if (content.executionMode === 'loop') {
        nodeInput = nodeInput.arrayItem();
      }

      const outputs = (content?.outputs || []).filter((output) => !!output.field);
      outputs.forEach((output) => {
        for (const rule of content.rules) {
          if (!rule[output.id]) {
            continue;
          }

          const calculatedType = nodeInput.calculateType(rule[output.id]);
          const jsonType = calculatedType.toJson();
          if (jsonType !== 'Any' && jsonType !== 'Null') {
            determinedType.set(output.field, calculatedType);
            return;
          }
        }

        determinedType.setJson(output.field, 'Any');
      });

      if (content.hitPolicy === 'collect') {
        determinedType = determinedType.toArray();
      }

      if (content.executionMode === 'loop') {
        determinedType = determinedType.toArray();
      }

      if (content.outputPath) {
        const newType = VariableType.fromJson({ Object: {} });
        newType.set(content.outputPath, determinedType);
        determinedType = newType;
      }

      if (content.passThrough) {
        determinedType = input.merge(determinedType);
      }

      return determinedType;
    },
  },
  generateNode: ({ index }) => ({
    name: `decisionTable${index}`,
    content: {
      hitPolicy: 'first',
      inputs: [
        {
          id: crypto.randomUUID(),
          name: 'Input',
        },
      ],
      outputs: [
        {
          id: crypto.randomUUID(),
          field: 'output',
          name: 'Output',
        },
      ],
      rules: [],
      inputField: null,
      outputPath: null,
      passThrough: true,
      executionMode: 'single',
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const { passThrough, executionMode } = useDecisionGraphState(({ decisionGraph }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData;
      return {
        passThrough: content?.passThrough || false,
        executionMode: content?.executionMode,
      };
    });

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        helper={[executionMode === 'loop' && <SyncOutlined />, passThrough && <ArrowRightOutlined />]}
        actions={[
          <Button key='edit-table' type='text' onClick={() => graphActions.openTab(id)}>
            Edit Table
          </Button>,
        ]}
      />
    );
  },
  renderSettings: ({ id }) => {
    const graphActions = useDecisionGraphActions();
    const inputType = useNodeType(id);
    const { contentDiff } = useNodeDiff(id);

    const { fields, disabled } = useDecisionGraphState(({ decisionGraph, disabled }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData;
      return {
        disabled,
        fields: {
          passThrough: content?.passThrough || false,
          inputField: content?.inputField,
          outputPath: content?.outputPath,
          executionMode: content?.executionMode || 'single',
          hitPolicy: content?.hitPolicy || 'first',
        },
      };
    });

    const updateNode = (data: Partial<NodeDecisionTableData>) => {
      graphActions.updateNode(id, (draft) => {
        Object.assign(draft.content, data);
        return draft;
      });
    };

    return (
      <div className={'settings-form'}>
        <Form.Item label={'Hit Policy'}>
          <Space direction={'vertical'} size={2}>
            <DiffRadio
              size={'small'}
              previousValue={contentDiff?.fields?.hitPolicy?.previousValue}
              displayDiff={contentDiff?.fields?.hitPolicy?.status === 'modified'}
              disabled={disabled}
              value={fields?.hitPolicy}
              onChange={(e) => updateNode({ hitPolicy: e?.target?.value })}
              options={[
                {
                  value: 'first',
                  label: 'First',
                },
                {
                  value: 'collect',
                  label: 'Collect',
                },
              ]}
            />
          </Space>
        </Form.Item>
        <Form.Item label='Passthrough'>
          <DiffSwitch
            disabled={disabled}
            size={'small'}
            displayDiff={contentDiff?.fields?.passThrough?.status === 'modified'}
            checked={fields?.passThrough}
            previousChecked={contentDiff?.fields?.passThrough?.previousValue}
            onChange={(e) => updateNode({ passThrough: e })}
          />
        </Form.Item>
        <Form.Item label='Input field'>
          <DiffCodeEditor
            variableType={inputType}
            disabled={disabled}
            displayDiff={contentDiff?.fields?.inputField?.status === 'modified'}
            previousValue={contentDiff?.fields?.inputField?.previousValue}
            style={{ fontSize: 12, lineHeight: '20px', width: '100%' }}
            expectedVariableType={fields?.executionMode === 'loop' ? { Array: 'Any' } : undefined}
            maxRows={4}
            value={fields?.inputField ?? ''}
            onChange={(val) => updateNode({ inputField: val?.trim() || null })}
          />
        </Form.Item>
        <Form.Item label='Output path'>
          <DiffInput
            size={'small'}
            readOnly={disabled}
            displayDiff={contentDiff?.fields?.outputPath?.status === 'modified'}
            previousValue={contentDiff?.fields?.outputPath?.previousValue}
            value={fields?.outputPath ?? ''}
            onChange={(e) => updateNode({ outputPath: e?.target?.value?.trim() || null })}
          />
        </Form.Item>
        <Form.Item label='Execution mode'>
          <DiffRadio
            size={'small'}
            disabled={disabled}
            displayDiff={contentDiff?.fields?.executionMode?.status === 'modified'}
            previousValue={contentDiff?.fields?.executionMode?.previousValue}
            value={fields?.executionMode}
            onChange={(e) => updateNode({ executionMode: e?.target?.value })}
            options={[
              {
                value: 'single',
                label: 'Single',
              },
              {
                value: 'loop',
                label: 'Loop',
              },
            ]}
          />
        </Form.Item>
      </div>
    );
  },
};
