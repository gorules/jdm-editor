import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space } from 'antd';
import { Card, Input, Typography } from 'antd';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import { type DecisionNode } from '../dg-types';
import { NodeColor } from '../nodes/specifications/colors';
import { NodeKind } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';

const { Title, Text } = Typography;

export type GraphComponentsProps = {
  className?: string;
};

export const GraphNodes: React.FC<GraphComponentsProps> = React.memo(({ className }) => {
  const { decisionGraph, customComponents, viewConfig } = useDecisionGraphState((store) => ({
    decisionGraph: store.decisionGraph || [],
    customComponents: store.components,
    activeTabId: store.activeTab,
    viewConfig: store.viewConfig,
  }));

  const { openTab } = useDecisionGraphActions();

  const nodes = useMemo(() => {
    return (decisionGraph?.nodes || [])
      .filter((node) => (viewConfig?.enabled ? !!viewConfig?.permissions?.[node.id] : true))
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
          _diff: node?._diff,
        };
      });
  }, [decisionGraph, viewConfig]);

  const [search, setSearch] = useState('');

  const ConfigItem = ({ node }: { node: DecisionNode }) => {
    const specification = nodeSpecification?.[node?.type as NodeKind];

    return (
      <Card
        hoverable
        className={clsx(['config-item-card', node?._diff?.status])}
        styles={{
          body: {
            padding: 20,
          },
        }}
        onClick={() => openTab(node.id)}
      >
        <div className={'config-item-card__content'}>
          <Avatar
            size='large'
            shape='square'
            style={{
              background: specification?.color || NodeColor.Blue,
              fontSize: 16,
              width: 24,
              height: 24,
              lineHeight: '22px',
              borderRadius: 3,
            }}
            icon={specification?.icon}
          />
          <div style={{ flex: 1 }}>
            <Text style={{ margin: 0, fontSize: 14, marginBottom: node?.description ? '4px' : 0 }}>{node.name}</Text>
            {node?.description && (
              <Text type='secondary' style={{ fontSize: '14px' }}>
                {node?.description}
              </Text>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const nodeGroups = useMemo(() => {
    const filtered = nodes.filter((node) =>
      search.trim()?.length > 0 ? node.name?.toLowerCase?.()?.indexOf?.(search?.trim?.()?.toLowerCase?.()) > -1 : true,
    );

    return [
      {
        title: 'Decision Tables',
        nodes: filtered.filter((node) => node.type === NodeKind.DecisionTable),
      },
      {
        title: 'Expressions',
        nodes: filtered.filter((node) => node.type === NodeKind.Expression),
      },
      {
        title: 'Functions',
        nodes: filtered.filter((node) => node.type === NodeKind.Function),
      },
    ];
  }, [search, nodes]);

  return (
    <div className={clsx(['grl-dg__view', className])}>
      <div className={'grl-dg__view__content'}>
        <div className={'grl-dg__view__content__heading'}>
          <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
            Decision View
          </Title>
          <Text type='secondary'>{viewConfig?.description || 'Configure business rules for your decision model'}</Text>
        </div>

        <div className={'grl-dg__view__content__search'}>
          <Space>
            <Input
              placeholder='Search configurations...'
              prefix={<SearchOutlined />}
              style={{ width: '400px' }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            {search?.trim()?.length > 0 && (
              <Button type='text' size={'small'} icon={<CloseOutlined />} onClick={() => setSearch('')}>
                Clear
              </Button>
            )}
          </Space>
          <Text type='secondary'>{nodes?.length || 0} configurable items</Text>
        </div>

        {nodeGroups
          .filter((group) => group?.nodes?.length > 0)
          .map((group) => (
            <div key={group.title} className={'grl-dg__view__content__node-groups'}>
              <Title level={5} style={{ marginBottom: '16px' }}>
                {group.title}
              </Title>
              <Row gutter={[16, 16]}>
                {group.nodes.map((node) => (
                  <Col key={node.id} xxl={8} md={8} sm={12} xs={24}>
                    <ConfigItem key={node.id} node={node} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
      </div>
    </div>
  );
});
