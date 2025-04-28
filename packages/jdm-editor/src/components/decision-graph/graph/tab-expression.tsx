import { Variable } from '@gorules/zen-engine-wasm';
import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';
import type { z } from 'zod';

import { getNodeData } from '../../../helpers/node-data';
import { useNodeType } from '../../../helpers/node-type';
import type { expressionNodeSchema } from '../../../helpers/schema';
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
  const nodeType = useNodeType(id, { attachGlobals: false });
  const { disabled, configurable, content, globalType } = useDecisionGraphState(
    ({ disabled, configurable, decisionGraph, globalType }) => ({
      disabled,
      configurable,
      globalType,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeExpressionData,
    }),
  );

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

  const debug = useMemo(() => {
    if (!nodeTrace || !inputData || !nodeSnapshot) {
      return undefined;
    }

    if (!isWasmAvailable()) {
      return { trace: nodeTrace, snapshot: nodeSnapshot };
    }

    const $data = Object.fromEntries(Object.entries(nodeTrace.traceData).map(([k, v]) => [k, safeJson(v.result)]));

    return { trace: nodeTrace, inputData: new Variable({ ...inputData, $: $data }), snapshot: nodeSnapshot };
  }, [nodeTrace, nodeSnapshot, inputData]);

  return (
    <div style={{ height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <Expression
        value={content?.expressions}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
        inputData={computedType}
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
