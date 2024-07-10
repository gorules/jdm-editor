import type { Monaco } from '@monaco-editor/react';
import { Spin } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { P, match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphListeners, useDecisionGraphState } from '../context/dg-store.context';
import type { SimulationTrace, SimulationTraceDataFunction } from '../types/simulation.types';

const Function = React.lazy(async () => {
  const functionImport = await import('../../function');
  return { default: functionImport.Function };
});

export type TabFunctionProps = {
  id: string;
};

export const TabFunction: React.FC<TabFunctionProps> = ({ id }) => {
  const graphActions = useDecisionGraphActions();
  const onFunctionReady = useDecisionGraphListeners((s) => s.onFunctionReady);
  const [monaco, setMonaco] = useState<Monaco>();
  const { nodeTrace, disabled, content, additionalModules } = useDecisionGraphState(
    ({ simulate, disabled, configurable, decisionGraph }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id])
        .otherwise(() => null),
      disabled,
      configurable,
      content: (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content,
      additionalModules: (decisionGraph?.nodes ?? [])
        .filter((node) => node.type === 'functionNode')
        .map((node) => ({
          id: node.id,
          name: node.name,
          content: node.content,
        })),
    }),
  );

  useEffect(() => {
    if (!monaco) {
      return;
    }

    const extraLibs = monaco.languages.typescript.javascriptDefaults.getExtraLibs();
    const newExtraLibs = Object.entries(extraLibs)
      .map(([key, value]) => ({
        filePath: key,
        content: value.content,
      }))
      .filter((i) => !i.filePath.startsWith('node:'));

    additionalModules.forEach((module) => {
      newExtraLibs.push({
        filePath: `node:${module.name}`,
        content: `declare module 'node:${module.name}' { ${module.content} }`,
      });
    });

    monaco.languages.typescript.javascriptDefaults.setExtraLibs(newExtraLibs);
    onFunctionReady?.(monaco);
  }, [JSON.stringify(additionalModules), monaco, onFunctionReady]);

  return (
    <Suspense fallback={<Spin />}>
      <Function
        onMonacoReady={(monaco) => setMonaco(monaco)}
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
