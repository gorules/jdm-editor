import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { Expression } from '../../expression';
import { NodeTypeKind, useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeExpressionData } from '../nodes/specifications/expression.specification';
import type { SimulationTrace, SimulationTraceDataExpression } from '../types/simulation.types';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content, trace, inferredType } = useDecisionGraphState(
    ({ disabled, configurable, decisionGraph, simulate, nodeTypes }) => ({
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeExpressionData,
      trace:
        simulate && 'result' in simulate
          ? (simulate.result?.trace[id] as SimulationTrace<SimulationTraceDataExpression>)
          : undefined,
      inferredType: nodeTypes[id]?.[NodeTypeKind.Input] ?? nodeTypes[id]?.[NodeTypeKind.InferredInput],
    }),
  );

  const computedType = useMemo(() => {
    if (!inferredType) {
      return undefined;
    }

    const computedType = match(content?.inputField)
      .with(P.string, (inputField) => inferredType.get(inputField))
      .otherwise(() => inferredType);

    return content?.executionMode === 'loop' ? computedType.unwrapArray() : computedType;
  }, [inferredType, content?.inputField, content?.executionMode]);

  return (
    <div style={{ height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <Expression
        traceData={trace?.traceData}
        value={content?.expressions}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
        inputData={computedType}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            draft.content.expressions = val;
            return draft;
          });
        }}
      />
    </div>
  );
};
