import { Variable } from '@gorules/zen-engine-wasm';
import type { DragDropManager } from 'dnd-core';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { getNodeData } from '../../../helpers/node-data';
import { useNodeType } from '../../../helpers/node-type';
import { isWasmAvailable } from '../../../helpers/wasm';
import type { DecisionTableType } from '../../decision-table';
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
  const { nodeName, nodeTrace, inputData, nodeSnapshot } = useDecisionGraphState(({ simulate, decisionGraph }) => ({
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
        ({ result }) => result.snapshot.nodes.find((n) => n.id === id)?.content as DecisionTableType,
      )
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
    if (!nodeTrace || !inputData || !nodeSnapshot) {
      return undefined;
    }

    if (!isWasmAvailable()) {
      return { trace: nodeTrace, snapshot: nodeSnapshot };
    }

    return { trace: nodeTrace, inputData: new Variable(inputData), snapshot: nodeSnapshot };
  }, [nodeTrace, nodeSnapshot, inputData]);

  return (
    <DecisionTable
      id={id}
      name={nodeName}
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
