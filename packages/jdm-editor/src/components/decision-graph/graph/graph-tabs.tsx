import { DeploymentUnitOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Dropdown } from 'antd';
import { Avatar, Tabs } from 'antd';
import React from 'react';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { NodeColor } from '../nodes/specifications/colors';
import type { NodeKind } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';

export type GraphTabsProps = {
  disabled?: boolean;
};

type NonUndefined<T> = T extends undefined ? never : T;
type TabItem = NonUndefined<TabsProps['items']>[number];

export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled }) => {
  const graphActions = useDecisionGraphActions();
  const { openNodes, activeNodeId } = useDecisionGraphState(({ decisionGraph, activeTab, openTabs }) => ({
    activeNodeId: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id,
    openNodes: (openTabs || [])
      .map((tab) => {
        const node = (decisionGraph?.nodes ?? []).find((node) => node.id === tab);
        if (!node) return undefined;
        return {
          id: node?.id,
          name: node.name,
          type: node.type,
        };
      })
      .filter((node) => !!node),
  }));

  return (
    <div>
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
          {
            closable: false,
            key: 'graph',
            label: (
              <TabLabel
                total={openNodes?.length}
                icon={<DeploymentUnitOutlined />}
                name='Graph'
                onContextClick={(action) => {
                  graphActions.closeTab('graph', action);
                }}
              />
            ),
          },
          ...openNodes.map((node, index) => {
            const specification = nodeSpecification[node.type as NodeKind];

            return {
              disabled,
              key: node.id,
              label: (
                <TabLabel
                  onContextClick={(action) => {
                    graphActions.closeTab(node.id, action);
                  }}
                  icon={specification?.icon}
                  name={node?.name ?? node?.type}
                  color={specification?.color}
                  index={index}
                  total={openNodes?.length}
                />
              ),
              closable: true,
            } satisfies TabItem;
          }),
        ]}
      />
    </div>
  );
};

const TabLabel: React.FC<{
  index?: number;
  total?: number;
  icon?: React.ReactNode;
  name?: string;
  color?: string;
  onContextClick?: (action: string) => void;
}> = ({ total = 0, index = -1, icon, name, color = NodeColor.Blue, onContextClick }) => {
  const items = [
    total > 0 &&
      index !== -1 && {
        key: 'close',
        label: 'Close',
        onClick: () => onContextClick?.('close'),
      },
    total > 0 &&
      index !== -1 && {
        key: 'close-all',
        label: 'Close all Tabs',
        onClick: () => onContextClick?.('close-all'),
      },
    total > 0 && {
      key: 'close-other',
      label: 'Close other Tabs',
      onClick: () => onContextClick?.('close-other'),
    },
    total > 0 &&
      index + 1 < total && {
        key: 'close-right',
        label: 'Close Tabs to the right',
        onClick: () => onContextClick?.('close-right'),
      },
    total > 0 &&
      index > 0 &&
      index > 0 && {
        key: 'close-left',
        label: 'Close Tabs to the left',
        onClick: () => onContextClick?.('close-left'),
      },
  ].filter((item) => !!item);

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Avatar
          size='small'
          shape='square'
          style={{
            background: color,
            fontSize: 14,
            width: 20,
            height: 20,
            lineHeight: '18px',
          }}
          icon={icon}
        />
        {name}
      </div>
    </Dropdown>
  );
};
