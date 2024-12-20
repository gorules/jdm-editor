import type { Monaco } from '@monaco-editor/react';
import { Spin } from 'antd';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { P, match } from 'ts-pattern';

import { useNodeType } from '../../../helpers/node-type';
import {
  useDecisionGraphActions,
  useDecisionGraphListeners,
  useDecisionGraphState,
  useNodeDiff,
} from '../context/dg-store.context';
import { FunctionKind, useFunctionKind } from '../nodes/specifications/function.specification';
import type { SimulationTrace, SimulationTraceDataFunction } from '../simulator/simulation.types';

const Function = React.lazy(async () => {
  const functionImport = await import('../../function');
  return { default: functionImport.Function };
});

export type TabFunctionProps = {
  id: string;
};

export const TabFunction: React.FC<TabFunctionProps> = ({ id }) => {
  const kind = useFunctionKind(id);
  const graphActions = useDecisionGraphActions();
  const onFunctionReady = useDecisionGraphListeners((s) => s.onFunctionReady);
  const [monaco, setMonaco] = useState<Monaco>();
  const nodeType = useNodeType(id);
  const { nodeTrace, disabled, content, nodeError } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id])
        .otherwise(() => null),
      nodeError: match(simulate)
        .with({ error: { data: { nodeId: id } } }, ({ error }) => error)
        .otherwise(() => null),
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
    }),
  );

  const { diff, contentDiff } = useNodeDiff(id);

  const previousValue = useMemo(() => {
    return kind === FunctionKind.Stable
      ? contentDiff?.fields?.source?.previousValue
      : diff?.fields?.content?.previousValue;
  }, [diff, contentDiff]);

  useEffect(() => {
    if (!monaco) {
      return;
    }

    const extraLibs = monaco.languages.typescript.javascriptDefaults.getExtraLibs();
    const newExtraLibs = Object.entries(extraLibs).map(([key, value]) => ({
      filePath: key,
      content: value.content,
    }));

    monaco.languages.typescript.javascriptDefaults.setExtraLibs(newExtraLibs);
    onFunctionReady?.(monaco);
  }, [monaco, onFunctionReady]);

  return (
    <Suspense fallback={<Spin />}>
      <Function
        onMonacoReady={(monaco) => setMonaco(monaco)}
        value={kind === FunctionKind.Stable ? content.source : content}
        previousValue={typeof previousValue === 'string' ? previousValue : undefined}
        error={nodeError ?? undefined}
        inputData={nodeType}
        onChange={(val) => {
          graphActions.updateNode(id, (draft) => {
            if (kind === FunctionKind.Stable) {
              draft.content = { source: val };
            } else {
              draft.content = val;
            }

            return draft;
          });
        }}
        disabled={disabled}
        trace={nodeTrace as SimulationTrace<SimulationTraceDataFunction>}
      />
    </Suspense>
  );
};
