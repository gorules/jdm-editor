import { DeploymentUnitOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Avatar, Tabs } from 'antd';
import React, { useMemo } from 'react';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeKind } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export type GraphTabsProps = {
  disabled?: boolean;
};

type NonUndefined<T> = T extends undefined ? never : T;
type TabItem = NonUndefined<TabsProps['items']>[number];

export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled }) => {
  const graphActions = useDecisionGraphActions();
  const { openNodes, activeNodeId, graphConfig } = useDecisionGraphState(
    ({ decisionGraph, activeTab, openTabs, graphConfig }) => ({
      activeNodeId: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id,
      openNodes: (decisionGraph?.nodes ?? [])
        .filter((node) => openTabs.includes(node.id))
        .map(({ id, name, type }) => ({
          id,
          name,
          type,
        })),
      graphConfig,
    }),
  );

  const defaultItems = useMemo(() => {
    return [
      {
        closable: false,
        key: 'graph',
        label: (
          <TabLabel
            icon={graphConfig ? <UnorderedListOutlined /> : <DeploymentUnitOutlined />}
            name={graphConfig ? 'Nodes' : 'Graph'}
          />
        ),
      },
    ];
  }, [graphConfig]);

  return (
    <Tabs
      hideAdd
      type={'editable-card'}
      size='small'
      className={'tabs'}
      activeKey={activeNodeId || 'graph'}
      onEdit={(targetKey: any, action: 'add' | 'remove') => {
        if (action === 'remove') {
          graphActions.closeTab(targetKey);
        }
      }}
      onChange={(val) => graphActions.openTab(val)}
      items={[
        ...defaultItems,
        ...openNodes.map((node) => {
          const specification = nodeSpecification[node.type as NodeKind];

          return {
            disabled,
            key: node.id,
            label: <TabLabel icon={specification?.icon} name={node?.name ?? node?.type} />,
            closable: true,
          } satisfies TabItem;
        }),
      ]}
    />
  );
};

const TabLabel: React.FC<{ icon?: React.ReactNode; name?: string }> = ({ icon, name }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Avatar
        size='small'
        shape='square'
        style={{
          color: 'var(--grl-color-primary)',
          background: 'transparent',
          fontSize: 16,
          width: 20,
          height: 20,
          lineHeight: '18px',
        }}
        icon={icon}
      />
      {name}
    </div>
  );
};
