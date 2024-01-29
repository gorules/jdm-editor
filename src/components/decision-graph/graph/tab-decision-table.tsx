import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { DecisionTable } from '../../decision-table';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { nodeTrace, disabled, configurable, content } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph }) => ({
      nodeTrace: simulate?.result?.trace?.[id],
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
      activeRules={(activeRules || []).filter((id) => !!id)}
    />
  );
};
