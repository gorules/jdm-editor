import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { DecisionTable } from '../../decision-table';
import { NodeTypeKind, useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeDecisionTableData } from '../nodes/specifications/decision-table.specification';
import type { SimulationTrace, SimulationTraceDataTable } from '../types/simulation.types';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { nodeTrace, disabled, configurable, content, inferredType } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph, nodeTypes }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id] as SimulationTrace<SimulationTraceDataTable>)
        .otherwise(() => null),
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData,
      inferredType: nodeTypes[id]?.[NodeTypeKind.Input] ?? nodeTypes[id]?.[NodeTypeKind.InferredInput],
    }),
  );

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : [];

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
    <DecisionTable
      tableHeight={'100%'}
      value={content as any}
      onChange={(val) => {
        graphActions.updateNode(id, (draft) => {
          draft.content = val;
          return draft;
        });
      }}
      manager={manager}
      disabled={disabled}
      configurable={configurable}
      inputData={computedType}
      activeRules={(activeRules || []).filter((id) => !!id)}
    />
  );
};
