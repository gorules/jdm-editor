// import equal from 'fast-deep-equal/es6/react';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { Expression } from '../../expression/expression';
import { useDecisionGraphStore } from '../context/dg-store.context';

export type TabExpressionProps = {
  id: string;
};

export const TabExpression: React.FC<TabExpressionProps> = ({ id }) => {
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
    <div style={{ maxWidth: 900 }}>
      <Expression
        value={Array.isArray(node?.content) ? node?.content : []}
        onChange={(val) => updateNode(id, val)}
        disabled={disabled}
        configurable={configurable}
      />
    </div>
  );
};
