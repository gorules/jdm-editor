import { Button } from 'antd';
import { produce } from 'immer';
import _ from 'lodash';
import { ArrowRightFromLineIcon } from 'lucide-react';
import React from 'react';
import type { z } from 'zod';

import type { outputNodeSchema } from '../../../../helpers/schema';
import { useDecisionGraphActions } from '../../context/dg-store.context';
import type { Diff, DiffMetadata } from '../../dg-types';
import { TabJsonSchema } from '../../graph/tab-json-schema';
import { GraphNode } from '../graph-node';
import { NodeColor } from './colors';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

type InferredContent = z.infer<typeof outputNodeSchema>['content'];

export type NodeOutputData = InferredContent & Diff;

export const outputSpecification: NodeSpecification<NodeOutputData> = {
  type: NodeKind.Output,
  icon: <ArrowRightFromLineIcon size='1em' />,
  color: NodeColor.Green,
  displayName: 'Response',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions',
  shortDescription: 'Outputs the context',
  generateNode: () => ({ name: 'response', content: { schema: '' } }),
  renderTab: ({ id, manager }) => <TabJsonSchema id={id} manager={manager} type={'output'} />,
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    return (
      <GraphNode
        id={id}
        specification={specification}
        name={data.name}
        isSelected={selected}
        handleRight={false}
        actions={[
          <Button key='edit-table' type='text' onClick={() => graphActions.openTab(id)}>
            Configure
          </Button>,
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
