import type { DragDropManager } from 'dnd-core';
import React from 'react';

import { Expression } from '../../expression/expression';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const graphActions = useDecisionGraphActions();
  const { disabled, configurable, content } = useDecisionGraphState(({ disabled, configurable, decisionGraph }) => ({
    disabled,
    configurable,
    content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
  }));

  return (
    <div style={{ maxWidth: 900, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Expression
        value={content?.expressions}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            draft.content.expressions = val;
            return draft;
          });
        }}
        disabled={disabled}
        configurable={configurable}
        manager={manager}
      />
    </div>
  );
};
