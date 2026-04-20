import { CloseOutlined, DeploymentUnitOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Avatar, Button, Dropdown, Tabs } from 'antd';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { DiffIcon } from '../../diff-icon';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { DiffStatus } from '../dg-types';
import { NodeColor } from '../nodes/specifications/colors';
import type { NodeKind } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';
import { useTranslation } from 'react-i18next';

export type GraphTabsProps = {
  disabled?: boolean;
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
};

type NonUndefined<T> = T extends undefined ? never : T;
type TabItem = NonUndefined<TabsProps['items']>[number];

export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled, tabBarExtraContent }) => {
  const graphActions = useDecisionGraphActions();
  const { openNodes, activeNodeId, viewConfig } = useDecisionGraphState(
    ({ decisionGraph, activeTab, openTabs, viewConfig }) => ({
      activeNodeId: (decisionGraph?.nodes ?? []).find((node) => node.id === activeTab)?.id,
      openNodes: (openTabs || [])
        .map((tab) => {
          const node = (decisionGraph?.nodes ?? []).find((node) => node.id === tab);
          if (!node) return undefined;
          return {
            id: node?.id,
            name: node.name,
            type: node.type,
            diff: node?._diff,
          };
        })
        .filter((node) => !!node),
      viewConfig,
    }),
  );
  const { t } = useTranslation();

  const defaultItems = useMemo(() => {
    return [
      {
        closable: false,
        key: 'graph',
        label: (
          <TabLabel
            total={openNodes?.length}
            icon={viewConfig?.enabled ? <UnorderedListOutlined /> : <DeploymentUnitOutlined />}
            name={viewConfig?.enabled ? t('decisionGraph.graph.graphTabs.tabLabel.Nodes') : t('decisionGraph.graph.graphTabs.tabLabel.Graph')}
            active={!activeNodeId || activeNodeId === 'graph'}
            onContextClick={(action) => {
              graphActions.closeTab('graph', action);
            }}
          />
        ),
      },
    ];
  }, [viewConfig]);

  return (
    <div>
      <Tabs
        type='line'
        size='small'
        className={clsx('grl-graph-tabs')}
        activeKey={activeNodeId || 'graph'}
        onChange={(val) => graphActions.openTab(val)}
        tabBarExtraContent={tabBarExtraContent}
        items={[
          ...defaultItems,
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
                  diffStatus={node?.diff?.status}
                  color={specification?.color}
                  index={index}
                  active={node.id === activeNodeId}
                  total={openNodes?.length}
                  onClose={() => graphActions.closeTab(node.id)}
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
  diffStatus?: string;
  onClose?: () => void;
  active?: boolean;
  onContextClick?: (action: string) => void;
}> = ({ total = 0, index = -1, icon, name, active, diffStatus, color = NodeColor.Blue, onClose, onContextClick }) => {
  const { t } = useTranslation();
  const items = [
    total > 0 &&
    index !== -1 && {
      key: 'close',
      label: t('decisionGraph.graph.graphTabs.tabLabel.Close'),
      onClick: () => onContextClick?.('close'),
    },
    total > 0 &&
    index !== -1 && {
      key: 'close-all',
      label: t('decisionGraph.graph.graphTabs.tabLabel.CloseAllTabs'),
      onClick: () => onContextClick?.('close-all'),
    },
    total > 0 &&
    index !== -1 && {
      key: 'close-other',
      label: t('decisionGraph.graph.graphTabs.tabLabel.CloseOtherTabs'),
      onClick: () => onContextClick?.('close-other'),
    },
    total > 0 &&
    index + 1 < total && {
      key: 'close-right',
      label: t('decisionGraph.graph.graphTabs.tabLabel.CloseRight'),
      onClick: () => onContextClick?.('close-right'),
    },
    total > 0 &&
    index > 0 &&
    index > 0 && {
      key: 'close-left',
      label: t('decisionGraph.graph.graphTabs.tabLabel.CloseLeft'),
      onClick: () => onContextClick?.('close-left'),
    },
  ].filter((item) => !!item);

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div className='grl-graph-tabs__tab' data-active={active}>
        {/*<span style={{ color: 'black' }}>{icon}</span>*/}
        <Avatar
          size='small'
          shape='square'
          style={{
            background: color,
            fontSize: 11,
            width: 18,
            height: 18,
            lineHeight: '18px',
            borderRadius: 3,
          }}
          icon={icon}
        />
        {name}
        <DiffIcon
          status={diffStatus as DiffStatus}
          style={{
            fontSize: 16,
          }}
        />
        {onClose && (
          <Button
            className='grl-graph-tabs__closeIcon'
            type='text'
            size='small'
            style={{ height: 20, width: 20, color: 'black', borderRadius: '50%', lineHeight: 0 }}
            icon={<CloseOutlined style={{ fontSize: 10 }} />}
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
          />
        )}
      </div>
    </Dropdown>
  );
};
