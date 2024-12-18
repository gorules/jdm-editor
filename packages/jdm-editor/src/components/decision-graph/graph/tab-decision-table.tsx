import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { useNodeType } from '../../../helpers/node-type';
import { DecisionTable } from '../../decision-table';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeDecisionTableData } from '../nodes/specifications/decision-table.specification';
import type { SimulationTrace, SimulationTraceDataTable } from '../simulator/simulation.types';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const nodeType = useNodeType(id, { attachGlobals: false });
  const { nodeTrace, disabled, configurable, content, globalType } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph, globalType }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id] as SimulationTrace<SimulationTraceDataTable>)
        .otherwise(() => null),
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData,
      globalType,
    }),
  );

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : [];

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
    <DecisionTable
      id={id}
      tableHeight={'100%'}
      value={content as any}
      manager={manager}
      disabled={disabled}
      configurable={configurable}
      inputData={computedType}
      activeRules={(activeRules || []).filter((id) => !!id)}
      onChange={(val) => {
        graphActions.updateNode(id, (draft) => {
          Object.assign(draft.content, val);
          return draft;
        });
      }}
    />
  );
};
