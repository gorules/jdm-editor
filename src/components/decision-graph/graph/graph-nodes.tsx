import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { NodeKind } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export type GraphComponentsProps = {
  components?: React.ReactNode[];
  disabled?: boolean;
};

export const GraphNodes: React.FC<GraphComponentsProps> = React.memo(() => {
  const { decisionGraph, customComponents, activeTabId, graphConfig } = useDecisionGraphState((store) => ({
    decisionGraph: store.decisionGraph || [],
    customComponents: store.components,
    activeTabId: store.activeTab,
    graphConfig: store.graphConfig,
  }));

  const { openTab } = useDecisionGraphActions();

  const nodes = useMemo(() => {
    return (decisionGraph?.nodes || [])
      .filter((node) => (graphConfig ? !!graphConfig[node.id] : true))
      .map((node) => {
        const kind = node.type as NodeKind;
        const specification =
          nodeSpecification[node.type as NodeKind] || (customComponents || []).find((cmp) => cmp.type === node.type);
        return {
          id: node.id,
          type: node.type,
          name: node.name,
          disabled: match(kind)
            .with(NodeKind.Function, () => false)
            .with(NodeKind.DecisionTable, () => false)
            .with(NodeKind.Expression, () => false)
            .otherwise(() => true),
          position: node.position,
          icon: specification?.icon,
        };
      });
  }, [decisionGraph, graphConfig]);

  return (
    <div className={'grl-dg__aside__menu__nodes'}>
      {!(nodes.length > 0) && (
        <div className={'grl-dg__aside__menu__nodes__empty'}>
          <Typography.Text type='secondary'>No nodes</Typography.Text>
        </div>
      )}
      {nodes.map((node) => {
        const isEnabled = match(node.type)
          .with(P.union(NodeKind.DecisionTable, NodeKind.Function, NodeKind.Expression), () => true)
          .otherwise(() => false);

        return (
          <div
            key={node.id}
            className={clsx(
              'grl-dg__aside__menu__nodes__node',
              activeTabId === node.id && 'active',
              !isEnabled && 'disabled',
            )}
            onClick={() => {
              if (isEnabled) {
                openTab(node.id);
              }
            }}
          >
            <div className={clsx('node__icon')}>{node.icon}</div>
            <div className={'node__name'}>
              <Typography.Text type={isEnabled ? undefined : 'secondary'}>{node.name}</Typography.Text>
            </div>
          </div>
        );
      })}
    </div>
  );
});
