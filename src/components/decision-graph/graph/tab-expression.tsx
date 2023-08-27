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
  const { node, updateNode, disabled, configurable } = useDecisionGraphStore(
    ({ decisionGraph, updateNode, disabled, configurable }) => ({
      node: (decisionGraph?.nodes ?? []).find((node) => node.id === id),
      updateNode,
      disabled,
      configurable,
    }),
    equal,
  );

  if (!node) return null;

  return (
    <div style={{ maxWidth: 900, height: '100%', overflowY: 'auto', boxSizing: 'border-box', paddingBottom: '1.5rem' }}>
      <Expression
        value={node?.content?.expressions}
        onChange={(val) =>
          updateNode(id, {
            expressions: val,
          })
        }
        disabled={disabled}
        configurable={configurable}
        manager={manager}
      />
    </div>
  );
};
