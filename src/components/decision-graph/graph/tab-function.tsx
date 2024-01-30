import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { P, match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type {
  SimulationTrace,
  SimulationTraceDataExpression,
  SimulationTraceDataFunction,
} from '../types/simulation.types';

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
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id])
        .otherwise(() => null),
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
        trace={nodeTrace as SimulationTrace<SimulationTraceDataFunction>}
      />
    </Suspense>
  );
};
