import { ArrowRightOutlined, SyncOutlined } from '@ant-design/icons';
import { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Form } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import _ from 'lodash';
import { HashIcon } from 'lucide-react';
import React from 'react';
import type { z } from 'zod';

import { useNodeType } from '../../../../helpers/node-type';
import type { expressionNodeSchema } from '../../../../helpers/schema';
import type { ExpressionEntry } from '../../../expression/context/expression-store.context';
import { DiffInput, DiffRadio, DiffSwitch } from '../../../shared';
import { DiffCodeEditor } from '../../../shared/diff-ce';
import { useDecisionGraphActions, useDecisionGraphState, useNodeDiff } from '../../context/dg-store.context';
import { type Diff, type DiffMetadata } from '../../dg-types';
import { compareAndUnifyLists, compareStringFields } from '../../diff/comparison';
import { TabExpression } from '../../graph/tab-expression';
import { GraphNode } from '../graph-node';
import type { NodeDecisionTableData } from './decision-table.specification';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type Expression = {
  id: string;
  key?: string;
  value?: string;
};

type InferredContent = z.infer<typeof expressionNodeSchema>['content'];

export type NodeExpressionData = Omit<InferredContent, 'expressions'> &
  Diff & {
    expressions: (InferredContent['expressions'][0] & Diff)[];
  };

const compareExpressions = (currentExpr: ExpressionEntry, previousExpr: ExpressionEntry) => {
  if (!currentExpr || !previousExpr) {
    return { hasChanges: false, fields: {} };
  }

  let hasChanges = false;
  const fields = {};

  if (currentExpr.key !== undefined || previousExpr.key !== undefined) {
    const hasKeyChange = !compareStringFields(currentExpr.key, previousExpr.key);
    const hasValueChange = !compareStringFields(currentExpr.value, previousExpr.value);

    if (hasKeyChange) {
      fields.key = {
        status: 'modified',
        previousValue: previousExpr.key,
      };
      hasChanges = true;
    }

    if (hasValueChange) {
      fields.value = {
        status: 'modified',
        previousValue: previousExpr.value,
      };
      hasChanges = true;
    }

    return {
      fields,
      hasChanges,
    };
  }

  if (currentExpr.rules || previousExpr.rules) {
    const currentRules = currentExpr.rules || [];
    const previousRules = previousExpr.rules || [];

    const rulesComparison = compareAndUnifyLists(currentRules, previousRules, {
      compareFields: (currentRule, previousRule) => {
        let ruleHasChanges = false;
        const ruleFields = {};

        if (!compareStringFields(currentRule?.if, previousRule?.if)) {
          ruleFields.if = {
            status: 'modified',
            previousValue: previousRule.if,
          };
          ruleHasChanges = true;
        }

        // Compare 'then' expressions recursively
        if (currentRule?.then || previousRule?.then) {
          const currentThen = currentRule.then || [];
          const previousThen = previousRule.then || [];

          const thenComparison = compareAndUnifyLists(currentThen, previousThen, {
            compareFields: compareExpressions, // Recursive call
          });

          // Check if any then expressions have changes
          const hasThenChanges = thenComparison.some(
            (expr) =>
              expr?._diff?.status === 'modified' ||
              expr?._diff?.status === 'added' ||
              expr?._diff?.status === 'removed',
          );

          if (hasThenChanges) {
            ruleFields.then = {
              status: 'modified',
            };
            ruleHasChanges = true;
          }

          // Update the rule's then array with diff information
          currentRule.then = thenComparison;
        }

        return {
          hasChanges: ruleHasChanges,
          fields: ruleFields,
        };
      },
    });

    // Check if any rules have changes
    const hasRulesChanges = rulesComparison.some(
      (rule) =>
        rule?._diff?.status === 'modified' || rule?._diff?.status === 'added' || rule?._diff?.status === 'removed',
    );

    if (hasRulesChanges) {
      fields.rules = {
        status: 'modified',
      };
      hasChanges = true;
    }

    // Update the expression's rules with diff information
    currentExpr.rules = rulesComparison;
  }

  return {
    hasChanges,
    fields,
  };
};

export const expressionSpecification: NodeSpecification<NodeExpressionData> = {
  type: NodeKind.Expression,
  icon: <HashIcon size='1em' />,
  displayName: 'Expression',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/expression',
  shortDescription: 'Mapping utility',
  renderTab: ({ id, manager }) => <TabExpression id={id} manager={manager} />,
  getDiffContent: (current, previous) => {
    const newContent = produce(current, (draft) => {
      const fields: DiffMetadata['fields'] = {};

      // Compare top-level fields (unchanged from your original)
      if ((current.executionMode || false) !== (previous.executionMode || false)) {
        _.set(fields, 'executionMode', {
          status: 'modified',
          previousValue: previous.executionMode,
        });
      }

      if (!compareStringFields(current.inputField, previous.inputField)) {
        _.set(fields, 'inputField', {
          status: 'modified',
          previousValue: previous.inputField,
        });
      }

      if (!compareStringFields(current.outputPath, previous.outputPath)) {
        _.set(fields, 'outputPath', {
          status: 'modified',
          previousValue: previous.outputPath,
        });
      }

      if ((current.passThrough || false) !== (previous.passThrough || false)) {
        _.set(fields, 'passThrough', {
          status: 'modified',
          previousValue: previous.passThrough,
        });
      }

      const expressions = compareAndUnifyLists(current?.expressions || [], previous?.expressions || [], {
        compareFields: compareExpressions,
      });

      draft.expressions = expressions;

      if (
        expressions.find(
          (expr) =>
            expr?._diff?.status === 'modified' || expr?._diff?.status === 'added' || expr?._diff?.status === 'removed',
        )
      ) {
        _.set(fields, 'expressions', {
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

    return newContent;
  },
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
      executionMode: 'single',
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
            onChange={(val) => {
              updateNode({ inputField: val?.trim() || null });
            }}
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
