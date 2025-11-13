import clsx from 'clsx';
import { createDragDropManager } from 'dnd-core';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { ProOptions } from 'reactflow';
import 'reactflow/dist/style.css';
import { match } from 'ts-pattern';

import { useDecisionGraphState } from './context/dg-store.context';
import { GraphPanel } from './dg-panel';
import './dg.scss';
import type { GraphRef } from './graph/graph';
import { Graph } from './graph/graph';
import { GraphNodes } from './graph/graph-nodes';
import { GraphSideToolbar } from './graph/graph-side-toolbar';
import type { GraphTabsProps } from './graph/graph-tabs';
import { GraphTabs } from './graph/graph-tabs';
import { decisionTableSpecification } from './nodes/specifications/decision-table.specification';
import { expressionSpecification } from './nodes/specifications/expression.specification';
import { functionSpecification } from './nodes/specifications/function.specification';
import { inputSpecification } from './nodes/specifications/input.specification';
import { outputSpecification } from './nodes/specifications/output.specification';
import { NodeKind } from './nodes/specifications/specification-types';

export type DecisionGraphWrapperProps = {
  reactFlowProOptions?: ProOptions;
  tabBarExtraContent?: GraphTabsProps['tabBarExtraContent'];
};

export const DecisionGraphWrapper = React.memo(
  forwardRef<GraphRef, DecisionGraphWrapperProps>(function DecisionGraphWrapperInner(
    { reactFlowProOptions, tabBarExtraContent },
    ref,
  ) {
    const [disableTabs, setDisableTabs] = useState(false);
    const { hasActiveNode, viewConfig, hideLeftToolbar } = useDecisionGraphState(
      ({ decisionGraph, activeTab, viewConfig, hideLeftToolbar }) => {
        return {
          hasActiveNode: (decisionGraph?.nodes ?? []).some((node) => node.id === activeTab),
          viewConfig,
          hideLeftToolbar,
        };
      },
    );

    return (
      <>
        {!hideLeftToolbar && <GraphSideToolbar />}
        <div className={'grl-dg__graph'}>
          <GraphTabs disabled={disableTabs} tabBarExtraContent={tabBarExtraContent} />

          <Graph
            ref={ref}
            className={clsx([!hasActiveNode && !viewConfig?.enabled && 'active'])}
            reactFlowProOptions={reactFlowProOptions}
            onDisableTabs={setDisableTabs}
          />
          <GraphNodes className={clsx([!hasActiveNode && viewConfig?.enabled && 'active'])} />
          <TabContents />
        </div>
        <GraphPanel />
      </>
    );
  }),
);

const TabContents: React.FC = React.memo(() => {
  const { openNodes, activeNodeId, components } = useDecisionGraphState(
    ({ decisionGraph, openTabs, activeTab, components }) => {
      const activeNodeId = (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id;
      const openNodes = (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id));

      return {
        openNodes: openNodes.map(({ id, type }) => ({ id, type })),
        activeNodeId,
        components,
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
          {match(node?.type)
            .with(NodeKind.DecisionTable, () =>
              decisionTableSpecification?.renderTab?.({ id: node?.id, manager: dndManager }),
            )
            .with(NodeKind.Function, () => functionSpecification?.renderTab?.({ id: node?.id, manager: dndManager }))
            .with(NodeKind.Expression, () =>
              expressionSpecification?.renderTab?.({ id: node?.id, manager: dndManager }),
            )
            .with(NodeKind.Input, () => inputSpecification?.renderTab?.({ id: node?.id, manager: dndManager }))
            .with(NodeKind.Output, () => outputSpecification?.renderTab?.({ id: node?.id, manager: dndManager }))

            .otherwise(() => {
              const component = components.find((cmp) => cmp.type === node.type);
              if (component) {
                return component?.renderTab?.({ id: node.id, manager: dndManager });
              }

              return null;
            })}
        </div>
      ))}
    </div>
  );
});
