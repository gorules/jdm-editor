import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Expression } from '../../expression';
import { NodeTypeKind, useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
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
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
      trace:
        simulate && 'result' in simulate
          ? (simulate.result?.trace[id] as SimulationTrace<SimulationTraceDataExpression>)
          : undefined,
      inferredType: nodeTypes[id]?.[NodeTypeKind.Input] ?? nodeTypes[id]?.[NodeTypeKind.InferredInput],
    }),
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <Expression
        traceData={trace?.traceData}
        value={content?.expressions}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
        inputData={trace?.input ?? inferredType}
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
