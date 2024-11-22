import { ArrowRightOutlined, SyncOutlined, TableOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Form, Input, Radio, Switch } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import type { z } from 'zod';

import { useNodeType } from '../../../../helpers/node-type';
import type { decisionTableSchema } from '../../../../helpers/schema';
import { CodeEditor } from '../../../code-editor';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

import { v4 as uuidv4 } from 'uuid';

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
          id: crypto.randomUUID() || uuidv4(),
          name: 'Input',
        },
      ],
      outputs: [
        {
          id: crypto.randomUUID() || uuidv4(),
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
        <Form.Item label='Hit Policy'>
          <Radio.Group
            size={'small'}
            disabled={disabled}
            value={fields?.hitPolicy}
            onChange={(e) => updateNode({ hitPolicy: e?.target?.value })}
          >
            <Radio defaultChecked value='first'>
              First
            </Radio>
            <Radio value='collect'>Collect</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Passthrough'>
          <Switch
            size={'small'}
            disabled={disabled}
            checked={fields?.passThrough}
            onChange={(e) => updateNode({ passThrough: e })}
          />
        </Form.Item>
        <Form.Item label='Input field'>
          <CodeEditor
            variableType={inputType}
            disabled={disabled}
            style={{ fontSize: 12, lineHeight: '20px', width: '100%' }}
            expectedVariableType={fields?.executionMode === 'loop' ? { Array: 'Any' } : undefined}
            maxRows={4}
            value={fields?.inputField ?? ''}
            onChange={(val) => updateNode({ inputField: val?.trim() || null })}
          />
        </Form.Item>
        <Form.Item label='Output path'>
          <Input
            size={'small'}
            disabled={disabled}
            value={fields?.outputPath ?? ''}
            onChange={(e) => updateNode({ outputPath: e?.target?.value?.trim() || null })}
          />
        </Form.Item>
        <Form.Item label='Execution mode'>
          <Radio.Group
            size={'small'}
            disabled={disabled}
            value={fields?.executionMode}
            onChange={(e) => {
              updateNode({ executionMode: e?.target?.value });
            }}
          >
            <Radio defaultChecked value='single'>
              Single
            </Radio>
            <Radio value='loop'>Loop</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    );
  },
};
