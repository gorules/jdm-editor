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
import i18nInstance from '../../../../i18n';

type InferredContent = z.infer<typeof inputNodeSchema>['content'];

export type NodeInputData = InferredContent & Diff;

// translation
const { t } = i18nInstance;

export const inputSpecification: NodeSpecification<NodeInputData> = {
  type: NodeKind.Input,
  icon: <ArrowRightToLineIcon size='1em' />,
  displayName: t('decisionGraph.nodes.inputSpecification.displayName'),
  color: NodeColor.Green,
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: t('decisionGraph.nodes.inputSpecification.shortDescription'),
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
            {t('decisionGraph.nodes.graphNode.Configure')}
          </Button>,
        ]}
        menuItems={[
          {
            key: 'documentation',
            icon: <BookOutlined />,
            label: t('decisionGraph.nodes.graphNode.Documentation'),
            onClick: () => window.open(specification.documentationUrl, '_href'),
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            danger: true,
            label: <SpacedText left={t('decisionGraph.nodes.graphNode.Delete')} right={platform.shortcut('Backspace')} />,
            disabled,
            onClick: () =>
              Modal.confirm({
                icon: null,
                title: t('decisionGraph.nodes.graphNode.DeleteNode'),
                content: (
                  <Typography.Text>
                    {t('decisionGraph.nodes.graphNode.DeleteConfirmText')} <Typography.Text strong>{data.name}</Typography.Text> {t('decisionGraph.nodes.graphNode.node')}.
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
