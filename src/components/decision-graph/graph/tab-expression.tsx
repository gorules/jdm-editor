import type { DragDropManager } from 'dnd-core';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { Expression } from '../../expression/expression';
import { useDecisionGraphStore } from '../context/dg-store.context';

export type TabExpressionProps = {
  id: string;
  manager?: DragDropManager;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id, manager }) => {
  const { updateNode, disabled, configurable } = useDecisionGraphStore(
    ({ updateNode, disabled, configurable }) => ({
      updateNode,
      disabled,
      configurable,
    }),
    equal,
  );

  const content = useDecisionGraphStore(
    ({ decisionGraph }) => (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    equal,
  );

  return (
    <div style={{ maxWidth: 900, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Expression
        value={content?.expressions}
        onChange={(val) => {
          updateNode(id, (draft) => {
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
