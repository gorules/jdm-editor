import clsx from 'clsx';
import { createDragDropManager } from 'dnd-core';
import equal from 'fast-deep-equal/es6/react';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeNode, openNodes } = useDecisionGraphStore(
    ({ decisionGraph, activeTab, openTabs }) => ({
      activeNode: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab),
      openNodes: (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id)),
    }),
    equal,
  );

  const [disableTabs, setDisableTabs] = useState(false);

  const dndManager = useMemo(() => {
    return createDragDropManager(HTML5Backend, undefined, {
      rootElement: containerRef.current,
    });
  }, [containerRef.current]);

  return (
    <div className={'grl-dg__wrapper'}>
      <div className={'grl-dg__graph'}>
        <GraphTabs disabled={disableTabs} />
        <Graph
          ref={ref}
          className={clsx([!activeNode && 'active'])}
          reactFlowProOptions={reactFlowProOptions}
          onDisableTabs={setDisableTabs}
        />
        <div style={{ display: 'contents' }} ref={containerRef}>
          {openNodes.map((node) => (
            <div key={node?.id} className={clsx(['tab-content', activeNode?.id === node?.id && 'active'])}>
              {node?.type === 'decisionTableNode' && <TabDecisionTable id={node.id} manager={dndManager} />}
              {node?.type === 'expressionNode' && <TabExpression id={node.id} manager={dndManager} />}
              {node?.type === 'functionNode' && <TabFunction id={node.id} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
