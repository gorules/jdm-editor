import { DeploymentUnitOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Avatar, Tabs } from 'antd';
import React, { useEffect } from 'react';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { NodeKind } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export type GraphTabsProps = {
  disabled?: boolean;
  onTabChange?: (val: string) => void;
};

type NonUndefined<T> = T extends undefined ? never : T;
type TabItem = NonUndefined<TabsProps['items']>[number];

export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled, onTabChange }) => {
  const graphActions = useDecisionGraphActions();
  const { openNodes, activeNodeId } = useDecisionGraphState(({ decisionGraph, activeTab, openTabs }) => ({
    activeNodeId: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id,
    openNodes: (decisionGraph?.nodes ?? [])
      .filter((node) => openTabs.includes(node.id))
      .map(({ id, name, type }) => ({
        id,
        name,
        type,
      })),
  }));

  useEffect(() => {
    onTabChange?.(activeNodeId || 'graph');
  }, [activeNodeId]);

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
        { closable: false, key: 'graph', label: <TabLabel icon={<DeploymentUnitOutlined />} name='Graph' /> },
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
          background: 'var(--grl-color-primary-hover)',
          fontSize: 12,
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
