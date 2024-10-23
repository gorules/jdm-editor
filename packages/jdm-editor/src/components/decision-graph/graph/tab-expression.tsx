import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { useNodeType } from '../../../helpers/node-type';
import { Expression } from '../../expression';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeExpressionData } from '../nodes/specifications/expression.specification';
import type { SimulationTrace, SimulationTraceDataExpression } from '../types/simulation.types';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const nodeType = useNodeType(id, { attachGlobals: false });
  const { disabled, configurable, content, trace, globalType } = useDecisionGraphState(
    ({ disabled, configurable, decisionGraph, simulate, globalType }) => ({
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeExpressionData,
      trace:
        simulate && 'result' in simulate
          ? (simulate.result?.trace[id] as SimulationTrace<SimulationTraceDataExpression>)
          : undefined,
      globalType,
    }),
  );

  const computedType = useMemo(() => {
    if (!nodeType) {
      return undefined;
    }

    const computedType = match(content?.inputField)
      .with(P.string, (inputField) => nodeType.get(inputField))
      .otherwise(() => nodeType);

    const newType = content?.executionMode === 'loop' ? computedType.arrayItem() : computedType;

    Object.entries(globalType).forEach(([k, v]) => newType.set(k, v));
    return newType;
  }, [nodeType, globalType, content?.inputField, content?.executionMode]);

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
