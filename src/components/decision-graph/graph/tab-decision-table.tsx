import type { DragDropManager } from 'dnd-core';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { DecisionTable } from '../../decision-table';
import { useDecisionGraphStore } from '../context/dg-store.context';

export type TabDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id, manager }) => {
  const { nodeTrace, updateNode, disabled, configurable } = useDecisionGraphStore(
    ({ simulate, updateNode, disabled, configurable }) => ({
      nodeTrace: simulate?.result?.trace?.[id],
      updateNode,
      disabled,
      configurable,
    }),
    equal,
  );

  const content = useDecisionGraphStore(
    ({ decisionGraph }) => (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    equal,
  );

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : [];

  // if (!content) return null;

  return (
    <DecisionTable
      tableHeight={'100%'}
      value={content as any}
      onChange={(val) => {
        updateNode(id, (draft) => {
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
