import { ArrowRightOutlined, NumberOutlined, SyncOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Form, Input, Radio, Switch } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import type { z } from 'zod';

import { useNodeType } from '../../../../helpers/node-type';
import type { expressionNodeSchema } from '../../../../helpers/schema';
import { CodeEditor } from '../../../code-editor';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeDecisionTableData } from './decision-table.specification';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type Expression = {
  id?: string;
  key?: string;
  value?: string;
};

export type NodeExpressionData = z.infer<typeof expressionNodeSchema>['content'];

export const expressionSpecification: NodeSpecification<NodeExpressionData> = {
  type: NodeKind.Expression,
  icon: <NumberOutlined />,
  displayName: 'Expression',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/expression',
  shortDescription: 'Mapping utility',
  inferTypes: {
    needsUpdate: (content, prevContent) => !equal(content, prevContent),
    determineOutputType: ({ input, content }) => {
      let nodeInput = input.clone();
      let determinedType = VariableType.fromJson({ Object: {} });
      if (content.inputField) {
        nodeInput = input.calculateType(content.inputField);
      }

      if (content.executionMode === 'loop') {
        nodeInput = nodeInput.arrayItem();
      }

      (content.expressions || []).forEach((expression) => {
        if (!expression.key || !expression.value) {
          return;
        }

        const calculatedType = nodeInput.calculateType(expression.value);

        nodeInput.set(`$.${expression.key}`, calculatedType);
        determinedType.set(expression.key, calculatedType);
      });

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
    name: `expression${index}`,
    content: {
      inputField: null,
      outputPath: null,
      expressions: [],
      passThrough: true,
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const { passThrough, executionMode } = useDecisionGraphState(({ decisionGraph }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeExpressionData;
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
        actions={[
          <Button key='edit-table' type='text' onClick={() => graphActions.openTab(id)}>
            Edit Expression
          </Button>,
        ]}
        helper={[executionMode === 'loop' && <SyncOutlined />, passThrough && <ArrowRightOutlined />]}
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
        },
      };
    });

    const updateNode = (data: Partial<NodeExpressionData>) => {
      graphActions.updateNode(id, (draft) => {
        Object.assign(draft.content, data);
        return draft;
      });
    };

    return (
      <div className={'settings-form'}>
        <Form.Item label='Passthrough'>
          <Switch
            disabled={disabled}
            size={'small'}
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
            defaultValue={fields?.inputField ?? ''}
            onChange={(val) => {
              updateNode({ inputField: val?.trim() || null });
            }}
          />
        </Form.Item>
        <Form.Item label='Output path'>
          <Input
            size={'small'}
            disabled={disabled}
            defaultValue={fields?.outputPath ?? ''}
            onChange={(e) => updateNode({ outputPath: e?.target?.value?.trim() || null })}
          />
        </Form.Item>
        <Form.Item label='Execution mode'>
          <Radio.Group
            size={'small'}
            disabled={disabled}
            value={fields?.executionMode}
            onChange={(e) => updateNode({ executionMode: e?.target?.value })}
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
