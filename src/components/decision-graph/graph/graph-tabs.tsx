import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect } from 'react';

import { useDecisionGraphStore } from '../context/dg-store.context';

export type GraphTabsProps = {
  disabled?: boolean;
  onTabChange?: (val: string) => void;
};

type NonUndefined<T> = T extends undefined ? never : T;
type TabItem = NonUndefined<TabsProps['items']>[number];

export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled, onTabChange }) => {
  const { activeNode, openNodes, openTab, closeTab } = useDecisionGraphStore(
    ({ decisionGraph, openTab, closeTab, activeTab, openTabs }) => ({
      activeNode: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab),
      openNodes: (decisionGraph?.nodes ?? []).filter((node) => openTabs.includes(node.id)),
      openTab,
      closeTab,
    }),
    equal,
  );

  useEffect(() => {
    onTabChange?.(activeNode?.id || 'graph');
  }, [activeNode]);

  return (
    <Tabs
      hideAdd
      type={'editable-card'}
      size='small'
      className={'tabs'}
      activeKey={activeNode?.id || 'graph'}
      onEdit={(targetKey: any, action: 'add' | 'remove') => {
        if (action === 'remove') {
          closeTab(targetKey);
        }
      }}
      onChange={(val) => openTab(val)}
      items={[
        { closable: false, label: 'Graph', key: 'graph' },
        ...openNodes.map(
          (node) =>
            ({
              disabled,
              key: node.id,
              label: node?.name ?? node?.type,
              closable: true,
            }) satisfies TabItem,
        ),
      ]}
    />
  );
};
