import { Spin } from 'antd';
import React, { Suspense } from 'react';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';

const Function = React.lazy(async () => {
  const functionImport = await import('../../function');
  return { default: functionImport.Function };
});

export type TabFunctionProps = {
  id: string;
};

export const TabFunction: React.FC<TabFunctionProps> = ({ id }) => {
  const graphActions = useDecisionGraphActions();
  const { nodeTrace, disabled, content } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph }) => ({
      nodeTrace: simulate?.result?.trace?.[id],
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    }),
  );

  return (
    <Suspense fallback={<Spin />}>
      <Function
        value={typeof content === 'string' ? content : ''}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
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
