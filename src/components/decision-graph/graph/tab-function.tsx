import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { Function } from '../../function/function';
import { useDecisionGraphStore } from '../context/dg-store.context';


export type TabFunctionProps = {
  id: string;
};

export const TabFunction: React.FC<TabFunctionProps> = ({ id }) => {
  const { node, nodeTrace, updateNode, disabled } = useDecisionGraphStore(
    ({ decisionGraph, simulate, updateNode, disabled }) => ({
      node: (decisionGraph?.nodes ?? []).find((node) => node.id === id),
      nodeTrace: simulate?.result?.trace?.[id],
      updateNode,
      disabled,
    }),
    equal
  );

  if (!node) return null;

  return (
    <Function
      value={typeof node?.content === 'string' ? node?.content : ''}
      onChange={(val) => updateNode(id, val)}
      disabled={disabled}
      trace={nodeTrace}
    />
  );
};