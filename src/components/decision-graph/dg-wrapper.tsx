import clsx from 'clsx';
import { createDragDropManager } from 'dnd-core';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';

import { useDecisionGraphState } from './context/dg-store.context';
import { GraphSimulator } from './dg-simulator';
import './dg.scss';
import type { GraphRef } from './graph/graph';
import { Graph } from './graph/graph';
import { GraphAside, type GraphAsideProps } from './graph/graph-aside';
import { GraphTabs } from './graph/graph-tabs';
import { TabDecisionTable } from './graph/tab-decision-table';
import { TabExpression } from './graph/tab-expression';
import { TabFunction } from './graph/tab-function';

export type DecisionGraphWrapperProps = {
  reactFlowProOptions?: ProOptions;
  defaultOpenMenu?: GraphAsideProps['defaultOpenMenu'];
};

export const DecisionGraphWrapper = React.memo(
  forwardRef<GraphRef, DecisionGraphWrapperProps>(({ reactFlowProOptions, defaultOpenMenu }, ref) => {
    const [disableTabs, setDisableTabs] = useState(false);
    const hasActiveNode = useDecisionGraphState(({ decisionGraph, activeTab }) => {
      return (decisionGraph?.nodes ?? []).some((node) => node.id === activeTab);
    });

    return (
      <>
        <GraphAside defaultOpenMenu={defaultOpenMenu} />
        <div className={'grl-dg__graph'}>
          <GraphTabs disabled={disableTabs} />
          <Graph
            ref={ref}
            className={clsx([!hasActiveNode && 'active'])}
            reactFlowProOptions={reactFlowProOptions}
            onDisableTabs={setDisableTabs}
          />
          <TabContents />
        </div>
        <GraphSimulator />
      </>
    );
  }),
);

const TabContents: React.FC = React.memo(() => {
  const { openNodes, activeNodeId } = useDecisionGraphState(({ decisionGraph, openTabs, activeTab }) => {
    const activeNodeId = (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id;
    const openNodes = (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id));

    return {
      openNodes: openNodes.map(({ id, type }) => ({ id, type })),
      activeNodeId,
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dndManager = useMemo(() => {
    return createDragDropManager(HTML5Backend, undefined, {
      rootElement: containerRef.current,
    });
  }, [containerRef.current]);

  return (
    <div style={{ display: 'contents' }} ref={containerRef}>
      {openNodes.map((node) => (
        <div key={node?.id} className={clsx(['tab-content', activeNodeId === node?.id && 'active'])}>
          {node?.type === 'decisionTableNode' && <TabDecisionTable id={node.id} manager={dndManager} />}
          {node?.type === 'expressionNode' && <TabExpression id={node.id} manager={dndManager} />}
          {node?.type === 'functionNode' && <TabFunction id={node.id} />}
        </div>
      ))}
    </div>
  );
});
