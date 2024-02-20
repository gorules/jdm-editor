import { Button, Typography } from 'antd';
import React, { useMemo } from 'react';
import { match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { DecisionNode } from '../nodes/decision-node';
import { NodeKind } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export const GraphEmpty = () => {
  const { decisionGraph, customComponents, graphConfig } = useDecisionGraphState((store) => ({
    decisionGraph: store.decisionGraph || [],
    customComponents: store.components,
    graphConfig: store.graphConfig,
  }));

  const { openTab } = useDecisionGraphActions();

  const nodes = useMemo(() => {
    return (decisionGraph?.nodes || [])
      .filter((node) => !!graphConfig?.[node.id])
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
    <div>
      {!(nodes.length > 0) && (
        <div className={'grl-dg__graph__empty__message'}>
          <Typography.Text type={'secondary'}>No nodes configured</Typography.Text>
        </div>
      )}
      {nodes?.length > 0 && (
        <div className={'grl-dg__graph__empty__content'}>
          <Typography.Title className={'grl-dg__graph__empty__title'} level={5}>
            Click Edit to modify
          </Typography.Title>
          <div className={'grl-dg__graph__empty__list'}>
            {nodes.map((node) => {
              return (
                <DecisionNode
                  key={node.id}
                  icon={nodeSpecification[node.type as NodeKind]?.icon}
                  name={node.name}
                  type={nodeSpecification[node.type as NodeKind]?.displayName}
                  actions={[
                    <Button key='edit-table' type='link' onClick={() => openTab(node.id)}>
                      {match(node.type)
                        .with(NodeKind.DecisionTable, () => 'Edit Table')
                        .with(NodeKind.Function, () => 'Edit Function')
                        .with(NodeKind.Expression, () => 'Edit Expression')
                        .otherwise(() => null)}
                    </Button>,
                  ]}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
