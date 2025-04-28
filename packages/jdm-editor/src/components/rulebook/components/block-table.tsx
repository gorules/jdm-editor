import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { DecisionTable } from '../../decision-table';
import { useRulebookActions, useRulebookState } from '../context/rb-store.context';

export type BlockDecisionTableProps = {
  id: string;
  manager?: DragDropManager;
};

export const BlockDecisionTable: React.FC<BlockDecisionTableProps> = ({ id, manager }) => {
  const blockActions = useRulebookActions();

  const { disabled, configurable, content } = useRulebookState(({ disabled, configurable, rulebook }) => ({
    disabled,
    configurable,
    content: (rulebook?.blocks ?? []).find((b) => b.id === id)?.content,
  }));

  return (
    <DecisionTable
      id={id}
      tableHeight={'100%'}
      value={content as any}
      manager={manager}
      disabled={disabled}
      configurable={configurable}
      onChange={(val) => {
        blockActions.updateBlock(id, (draft) => {
          Object.assign(draft.content, val);
          return draft;
        });
      }}
    />
  );
};
