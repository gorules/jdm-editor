import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Expression } from '../../expression';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { SimulationTraceDataExpression } from '../types/simulation.types';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content, traceData } = useDecisionGraphState(
    ({ disabled, configurable, decisionGraph, simulate }) => ({
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
      traceData:
        simulate && 'result' in simulate
          ? (simulate.result?.trace[id]?.traceData as SimulationTraceDataExpression)
          : undefined,
    }),
  );

  return (
    <div style={{ maxWidth: 900, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Expression
        traceData={traceData}
        value={content?.expressions}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
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
