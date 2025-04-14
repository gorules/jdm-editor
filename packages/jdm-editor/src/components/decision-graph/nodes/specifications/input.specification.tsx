import { BookOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import { produce } from 'immer';
import _ from 'lodash';
import { ArrowRightToLineIcon } from 'lucide-react';
import React from 'react';
import type { z } from 'zod';

import { platform } from '../../../../helpers/platform';
import { type inputNodeSchema } from '../../../../helpers/schema';
import { SpacedText } from '../../../spaced-text';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import type { Diff, DiffMetadata } from '../../dg-types';
import { TabJsonSchema } from '../../graph/tab-json-schema';
import { GraphNode } from '../graph-node';
import { NodeColor } from './colors';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

type InferredContent = z.infer<typeof inputNodeSchema>['content'];

export type NodeInputData = InferredContent & Diff;

export const inputSpecification: NodeSpecification<NodeInputData> = {
  type: NodeKind.Input,
  icon: <ArrowRightToLineIcon size='1em' />,
  displayName: 'Request',
  color: NodeColor.Green,
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: 'Provides input context',
  generateNode: () => ({
    name: 'request',
    content: {
      schema: '',
    },
  }),
  renderTab: ({ id, manager }) => <TabJsonSchema id={id} manager={manager} type={'input'} />,
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
        actions={[
          <Button key='edit-table' type='text' onClick={() => graphActions.openTab(id)}>
            Configure
          </Button>,
        ]}
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
  getDiffContent: (current, previous): any => {
    const fields: DiffMetadata['fields'] = {};
    return produce(current || {}, (draft) => {
      if ((current?.schema || '')?.trim?.() !== (previous?.schema || '')?.trim?.()) {
        _.set(fields, 'schema', {
          previousValue: previous?.schema || '',
          status: 'modified',
        });
      }

      const hasModifications = Object.keys(fields).length > 0;

      if (hasModifications) {
        draft._diff = {
          status: 'modified',
          fields,
        };
      }
      return draft;
    });
  },
};
