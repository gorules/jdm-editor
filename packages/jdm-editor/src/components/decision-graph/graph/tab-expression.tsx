import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';
import type { z } from 'zod';

import type { GetNodeDataResult } from '../../../helpers/node-data';
import { getNodeData } from '../../../helpers/node-data';
import type { expressionNodeSchema } from '../../../helpers/schema';
import { get } from '../../../helpers/utility';
import { isWasmAvailable } from '../../../helpers/wasm';
import { Expression } from '../../expression';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeExpressionData } from '../nodes/specifications/expression.specification';
import type { SimulationTrace, SimulationTraceDataExpression } from '../simulator/simulation.types';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content } = useDecisionGraphState(({ disabled, configurable, decisionGraph }) => ({
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeExpressionData,
  }));

  const { nodeTrace, inputData, nodeSnapshot } = useDecisionGraphState(({ simulate, decisionGraph }) => ({
    nodeTrace: match(simulate)
      .with(
        { result: P.nonNullable },
        ({ result }) => result.trace[id] as SimulationTrace<SimulationTraceDataExpression>,
      )
      .otherwise(() => null),
    inputData: match(simulate)
      .with({ result: P.nonNullable }, ({ result }) => getNodeData(id, { trace: result.trace, decisionGraph }))
      .otherwise(() => null),
    nodeSnapshot: match(simulate)
      .with(
        { result: P.nonNullable },
        ({ result }) =>
          result.snapshot.nodes.find((n) => n.id === id)?.content as z.infer<typeof expressionNodeSchema>['content'],
      )
      .otherwise(() => null),
  }));

  const debug = useMemo(() => {
    if (!nodeTrace || !inputData || !nodeSnapshot) {
      return undefined;
    }

    if (!isWasmAvailable()) {
      return { trace: nodeTrace, snapshot: nodeSnapshot };
    }

    const $data = Object.fromEntries(Object.entries(nodeTrace.traceData).map(([k, v]) => [k, safeJson(v.result)]));
    const extendedInputData: GetNodeDataResult = {
      ...inputData,
      $: $data,
    };

    if (content?.inputField) {
      extendedInputData.data = get(extendedInputData.data, content.inputField, {});
    }

    return { trace: nodeTrace, inputData: extendedInputData, snapshot: nodeSnapshot };
  }, [nodeTrace, nodeSnapshot, inputData]);

  return (
    <div style={{ height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <Expression
        value={content?.expressions}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
        debug={debug}
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

const safeJson = (data: string): unknown => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};
