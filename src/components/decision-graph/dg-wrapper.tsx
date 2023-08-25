import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { forwardRef } from 'react';
import type { ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';

import { useDecisionGraphStore } from './context/dg-store.context';
import './dg.scss';
import type { GraphRef } from './graph/graph';
import { Graph } from './graph/graph';
import { GraphTabs } from './graph/graph-tabs';
import { TabDecisionTable } from './graph/tab-decision-table';
import { TabExpression } from './graph/tab-expression';
import { TabFunction } from './graph/tab-function';

export type DecisionGraphWrapperProps = {
  reactFlowProOptions?: ProOptions;
};

export const DecisionGraphWrapper = forwardRef<GraphRef, DecisionGraphWrapperProps>(({ reactFlowProOptions }, ref) => {
  const { activeNode, openNodes } = useDecisionGraphStore(
    ({ decisionGraph, activeTab, openTabs }) => ({
      activeNode: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab),
      openNodes: (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id)),
    }),
    equal,
  );

  return (
    <div className={'grl-dg__wrapper'}>
      <div className={'grl-dg__graph'}>
        <GraphTabs />
        <Graph ref={ref} className={clsx([!activeNode && 'active'])} reactFlowProOptions={reactFlowProOptions} />
        {openNodes.map((node) => (
          <div key={node?.id} className={clsx(['tab-content', activeNode?.id === node?.id && 'active'])}>
            {node?.type === 'decisionTableNode' && <TabDecisionTable id={node.id} />}
            {node?.type === 'expressionNode' && <TabExpression id={node.id} />}
            {node?.type === 'functionNode' && <TabFunction id={node.id} />}
          </div>
        ))}
      </div>
    </div>
  );
});
