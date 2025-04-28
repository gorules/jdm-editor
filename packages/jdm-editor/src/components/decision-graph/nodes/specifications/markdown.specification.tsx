import { produce } from 'immer';
import _ from 'lodash';
import { StickyNote } from 'lucide-react';
import React from 'react';
import type { z } from 'zod';

import type { markdownSchema } from '../../../../helpers/schema';
import type { Diff, DiffMetadata } from '../../dg-types';
import { NodeKind } from './specification-types';
import type { NodeSpecification } from './specification-types';

type InferredContent = z.infer<typeof markdownSchema>['content'];

export type NodeDecisionTableData = InferredContent &
  Diff & {
    source: string;
  };

export const markdownSpecification: NodeSpecification<NodeDecisionTableData> = {
  type: NodeKind.Markdown,
  icon: <StickyNote size='1em' />,
  displayName: 'Markdown',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/decision-tables',
  shortDescription: 'Comments block',
  getDiffContent: (current, previous) => {
    return produce(current, (draft) => {
      const fields: DiffMetadata['fields'] = {};

      if ((current?.source ?? '') !== (previous?.source ?? '')) {
        _.set(fields, 'source', {
          previousValue: previous.source,
          status: 'modified',
        });
      }

      if (Object.keys(fields).length > 0) {
        draft._diff = {
          status: 'modified',
          fields,
        };
      }

      return draft;
    });
  },
  generateNode: ({ index }) => ({
    name: `markdown${index}`,
    content: {
      source: '',
    },
  }),
  renderNode: () => {
    return null;
  },
};
