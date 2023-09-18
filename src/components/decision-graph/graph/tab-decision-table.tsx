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
  const { node, nodeTrace, updateNode, disabled, configurable } = useDecisionGraphStore(
    ({ decisionGraph, simulate, updateNode, disabled, configurable }) => ({
      node: (decisionGraph?.nodes ?? []).find((node) => node.id === id),
      nodeTrace: simulate?.result?.trace?.[id],
      updateNode,
      disabled,
      configurable,
    }),
    equal,
  );

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : [];

  if (!node) return null;

  return (
    <DecisionTable
      tableHeight={'100%'}
      value={node?.content as any}
      onChange={(val) => updateNode(id, val)}
      manager={manager}
      disabled={disabled}
      configurable={configurable}
      activeRules={(activeRules || []).filter((id) => !!id)}
    />
  );
};
