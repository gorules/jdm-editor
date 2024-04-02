import { BookOutlined, DeleteOutlined, LoginOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React from 'react';

import { platform } from '../../../../helpers/platform';
import { SpacedText } from '../../../spaced-text';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeInputData = never;

export const inputSpecification: NodeSpecification<NodeInputData> = {
  type: NodeKind.Input,
  icon: <LoginOutlined />,
  displayName: 'Request',
  color: 'secondary',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: 'Provides input context',
  generateNode: () => ({ name: 'request' }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const { disabled } = useDecisionGraphState(({ disabled }) => ({
      disabled,
    }));

    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        handleLeft={false}
        menuItems={[
          {
            key: 'documentation',
            icon: <BookOutlined />,
            label: 'Documentation',
            onClick: () => window.open(specification.documentationUrl, '_href'),
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            danger: true,
            label: <SpacedText left='Delete' right={platform.shortcut('Backspace')} />,
            disabled,
            onClick: () =>
              Modal.confirm({
                icon: null,
                title: 'Delete node',
                content: (
                  <Typography.Text>
                    Are you sure you want to delete <Typography.Text strong>{data.name}</Typography.Text> node.
                  </Typography.Text>
                ),
                okButtonProps: { danger: true },
                onOk: () => graphActions.removeNodes([id]),
              }),
          },
        ]}
      />
    );
  },
};
