import type { DragDropManager } from 'dnd-core';
import React from 'react';
import { P, match } from 'ts-pattern';

import { DecisionTable } from '../../decision-table';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { SimulationTrace, SimulationTraceDataTable } from '../types/simulation.types';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { nodeTrace, disabled, configurable, content } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id] as SimulationTrace<SimulationTraceDataTable>)
        .otherwise(() => null),
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    }),
  );

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : [];

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
      inputData={nodeTrace?.input}
      activeRules={(activeRules || []).filter((id) => !!id)}
    />
  );
};
