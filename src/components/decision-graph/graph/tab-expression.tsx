// import equal from 'fast-deep-equal/es6/react';
import React from 'react';

// import { useDecisionGraphStore } from '../context/dg-store.context';

export type TabExpressionProps = {
  id: string;
};

export const TabExpression: React.FC<TabExpressionProps> = (/* { id } */) => {
  // const node = useDecisionGraphStore(
  //   (store) => (store.decisionGraph?.nodes || []).find((node) => node.id === id),
  //   equal
  // );
  // const nodeTrace = useDecisionGraphStore((store) => store.simulate?.result?.trace?.[id], equal);
  // const updateNode = useDecisionGraphStore((store) => store.updateNode, equal);
  //
  // const { disabled, configurable } = useDecisionGraphStore(
  //   (store) => ({
  //     disabled: store.disabled,
  //     configurable: store.configurable,
  //   }),
  //   equal
  // );
  // if (!node) return null;

  return null;
};
