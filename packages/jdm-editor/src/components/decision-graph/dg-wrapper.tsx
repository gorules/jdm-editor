import clsx from 'clsx';
import { createDragDropManager } from 'dnd-core';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';

import { useDecisionGraphState } from './context/dg-store.context';
import { GraphPanel } from './dg-panel';
import './dg.scss';
import type { GraphRef } from './graph/graph';
import { Graph } from './graph/graph';
import { GraphAside, type GraphAsideProps } from './graph/graph-aside';
import { GraphTabs } from './graph/graph-tabs';

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
        <GraphPanel />
      </>
    );
  }),
);

const TabContents: React.FC = React.memo(() => {
  const { openNodes, activeNodeId, tabs } = useDecisionGraphState(
    ({ decisionGraph, openTabs, activeTab, customTabs }) => {
      const activeNodeId = (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id;
      const openNodes = (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id));

      return {
        openNodes: openNodes.map(({ id, type }) => ({ id, type })),
        activeNodeId,
        tabs: customTabs,
      };
    },
  );

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
          {tabs.find((tab) => tab.type === node?.type)?.tab({ id: node.id, manager: dndManager })}
        </div>
      ))}
    </div>
  );
});
