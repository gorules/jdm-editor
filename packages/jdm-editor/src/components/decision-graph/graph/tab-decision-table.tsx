import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { getNodeData } from '../../../helpers/node-data';
import { get } from '../../../helpers/utility';
import { isWasmAvailable } from '../../../helpers/wasm';
import type { DecisionTableType } from '../../decision-table';
import { DecisionTable } from '../../decision-table';
import type { DecisionTablePermission } from '../../decision-table/context/dt-store.context';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeDecisionTableData } from '../nodes/specifications/decision-table.specification';
import type { SimulationTrace, SimulationTraceDataTable } from '../simulator/simulation.types';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { nodeName, nodeTrace, inputData, nodeSnapshot, viewConfig, dictionaries, mode } = useDecisionGraphState(
    ({ simulate, decisionGraph, viewConfig, dictionaries, mode }) => ({
      nodeName: decisionGraph.nodes.find((n) => n.id === id)?.name,
      nodeTrace: match(simulate)
        .with({ result: P.nonNullable }, ({ result }) => result.trace[id] as SimulationTrace<SimulationTraceDataTable>)
        .otherwise(() => null),
      inputData: match(simulate)
        .with({ result: P.nonNullable }, ({ result }) => getNodeData(id, { trace: result.trace, decisionGraph }))
        .otherwise(() => null),
      nodeSnapshot: match(simulate)
        .with(
          { result: P.nonNullable },
          ({ result }) => (result.snapshot?.nodes || []).find((n) => n.id === id)?.content as DecisionTableType,
        )
        .otherwise(() => null),
      viewConfig,
      dictionaries,
      mode,
    }),
  );

  const { disabled, content } = useDecisionGraphState(({ disabled, decisionGraph }) => ({
    disabled,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeDecisionTableData,
  }));

  const debug = useMemo(() => {
    if (!nodeTrace || !inputData || !nodeSnapshot) {
      return undefined;
    }

    if (!isWasmAvailable()) {
      return { trace: nodeTrace, snapshot: nodeSnapshot };
    }

    const extendedInputData = { ...inputData };
    if (content?.inputField) {
      extendedInputData.data = get(extendedInputData.data, content.inputField, {});
    }

    return { trace: nodeTrace, inputData: extendedInputData, snapshot: nodeSnapshot };
  }, [nodeTrace, nodeSnapshot, inputData]);

  return (
    <DecisionTable
      id={id}
      name={nodeName}
      tableHeight={'100%'}
      value={content as any}
      manager={manager}
      disabled={disabled}
      permission={viewConfig?.enabled ? (viewConfig?.permissions?.[id] as DecisionTablePermission) : 'edit:full'}
      dictionaries={dictionaries}
      mode={mode}
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
