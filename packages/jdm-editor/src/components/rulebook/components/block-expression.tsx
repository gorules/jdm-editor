import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Expression } from '../../expression';
import { useRulebookActions, useRulebookState } from '../context/rb-store.context';

export type BlockExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const BlockExpression: React.FC<BlockExpressionProps> = ({ id, manager }) => {
  const blockActions = useRulebookActions();

  const { disabled, configurable, content } = useRulebookState(({ disabled, configurable, rulebook }) => ({
    disabled,
    configurable,
    content: (rulebook?.blocks ?? []).find((b) => b.id === id)?.content,
  }));

  return (
    <Expression
      value={content?.expressions}
      disabled={disabled}
      configurable={configurable}
      manager={manager}
      onChange={(val) => {
        blockActions.updateBlock(id, (draft) => {
          draft.content.expressions = val;
          return draft;
        });
      }}
    />
  );
};
