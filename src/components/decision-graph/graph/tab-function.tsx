import { Spin } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import React, { Suspense } from 'react';

import { useDecisionGraphStore } from '../context/dg-store.context';

const Function = React.lazy(async () => {
  const functionImport = await import('../../function');
  return { default: functionImport.Function };
});

export type TabFunctionProps = {
  id: string;
};

export const TabFunction: React.FC<TabFunctionProps> = ({ id }) => {
  const { nodeTrace, updateNode, disabled } = useDecisionGraphStore(
    ({ simulate, updateNode, disabled }) => ({
      nodeTrace: simulate?.result?.trace?.[id],
      updateNode,
      disabled,
    }),
    equal,
  );

  const content = useDecisionGraphStore(
    ({ decisionGraph }) => (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    equal,
  );

  return (
    <Suspense fallback={<Spin />}>
      <Function
        value={typeof content === 'string' ? content : ''}
        onChange={(val) => {
          updateNode(id, (draft) => {
            draft.content = val;
            return draft;
          });
        }}
        disabled={disabled}
        trace={nodeTrace}
      />
    </Suspense>
  );
};
