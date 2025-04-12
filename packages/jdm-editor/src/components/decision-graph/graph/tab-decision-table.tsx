import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { getNodeData } from '../../../helpers/node-data';
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
  const { nodeTrace, inputData } = useDecisionGraphState(({ simulate, decisionGraph }) => ({
    nodeTrace: match(simulate)
      .with({ result: P.nonNullable }, ({ result }) => result.trace[id] as SimulationTrace<SimulationTraceDataTable>)
      .otherwise(() => null),
    inputData: match(simulate)
      .with({ result: P.nonNullable }, ({ result }) => getNodeData(id, { trace: result.trace, decisionGraph }))
      .otherwise(() => null),
  }));

  const { disabled, configurable, content, globalType } = useDecisionGraphState(
    ({ disabled, configurable, decisionGraph, globalType }) => ({
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData,
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

  const debug = useMemo(() => {
    if (!nodeTrace || !inputData) {
      return undefined;
    }

    return { trace: nodeTrace, inputData };
  }, [nodeTrace, inputData]);

  return (
    <DecisionTable
      id={id}
      tableHeight={'100%'}
      value={content as any}
      manager={manager}
      disabled={disabled}
      configurable={configurable}
      inputData={computedType}
      debug={debug}
      onChange={(val) => {
        graphActions.updateNode(id, (draft) => {
          Object.assign(draft.content, val);
          return draft;
        });
      }}
    />
  );
};
