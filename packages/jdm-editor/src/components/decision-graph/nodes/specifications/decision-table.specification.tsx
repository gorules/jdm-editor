import { ArrowRightOutlined, TableOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Divider, Form, Input, Radio, Switch } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import type { z } from 'zod';

import type { decisionTableSchema } from '../../../../helpers/schema';
import { CodeEditor } from '../../../code-editor';
import { NodeTypeKind, useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeDecisionTableData = z.infer<typeof decisionTableSchema>['content'];

export const decisionTableSpecification: NodeSpecification<NodeDecisionTableData> = {
  type: NodeKind.DecisionTable,
  icon: <TableOutlined />,
  displayName: 'Decision table',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/decision-tables',
  shortDescription: 'Rules spreadsheet',
  inferTypes: {
    needsUpdate: (content, prevContent) => !equal(content, prevContent),
    determineOutputType: ({ content, input }) => {
      let nodeInput = input.clone();
      let determinedType = VariableType.fromJson({ Object: {} });
      if (content.inputField) {
        nodeInput = input.calculateType(content.inputField);
      }

      if (content.executionMode === 'loop') {
        nodeInput = nodeInput.unwrapArray();
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

      if (content.executionMode === 'loop') {
        determinedType = determinedType.intoArray();
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
      passThrough: true,
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const { passThrough } = useDecisionGraphState(({ decisionGraph }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData;
      return {
        passThrough: content?.passThrough || false,
      };
    });

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        helper={passThrough && <ArrowRightOutlined style={{ color: 'var(--grl-color-text-secondary)' }} />}
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
    const { fields, disabled, inputType } = useDecisionGraphState(({ decisionGraph, disabled, nodeTypes }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData;
      return {
        disabled,
        inputType: nodeTypes?.[id]?.[NodeTypeKind.Input] ?? nodeTypes?.[id]?.[NodeTypeKind.InferredInput],
        fields: {
          passThrough: content?.passThrough || false,
          inputField: content?.inputField,
          outputPath: content?.outputPath,
          executionMode: content?.executionMode,
        },
      };
    });

    return (
      <Form
        layout='vertical'
        size='small'
        initialValues={fields}
        disabled={disabled}
        onValuesChange={(changedValues) => {
          graphActions.updateNode(id, (draft) => {
            Object.assign(draft.content, changedValues);
            return draft;
          });
        }}
      >
        <Form.Item label='Passthrough' name='passThrough' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Divider />
        <Form.Item label='Input field' name='inputField'>
          <CodeEditor
            variableType={inputType}
            expectedVariableType={fields?.executionMode === 'loop' ? { Array: 'Any' } : undefined}
            style={{ fontSize: 12, lineHeight: '20px', width: '100%' }}
            maxRows={4}
          />
        </Form.Item>
        <Form.Item label='Output path' name='outputPath'>
          <Input />
        </Form.Item>
        <Form.Item label='Execution mode' name='executionMode'>
          <Radio.Group defaultValue='single'>
            <Radio defaultChecked className={'xs-form-control'} value='single'>
              Single
            </Radio>
            <Radio className={'xs-form-control'} value='loop'>
              Loop
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  },
};
