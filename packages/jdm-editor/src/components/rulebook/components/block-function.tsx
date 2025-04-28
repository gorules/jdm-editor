import type { Monaco } from '@monaco-editor/react';
import { Spin } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { P, match } from 'ts-pattern';

import type { SimulationTrace, SimulationTraceDataFunction } from '../../decision-graph';
import { useRulebookActions, useRulebookListeners, useRulebookState } from '../context/rb-store.context';

const Function = React.lazy(async () => {
  const functionImport = await import('../../function');
  return { default: functionImport.Function };
});

export type BlockFunctionProps = {
  id: string;
};

export const BlockFunction: React.FC<BlockFunctionProps> = ({ id }) => {
  const rulebookActions = useRulebookActions();
  const onFunctionReady = useRulebookListeners((s) => s.onFunctionReady);
  const [monaco, setMonaco] = useState<Monaco>();

  const { nodeTrace, disabled, content, nodeError } = useRulebookState(
    ({ simulate, disabled, configurable, rulebook }) => ({
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id])
        .otherwise(() => null),
      nodeError: match(simulate)
        .with({ error: { data: { nodeId: id } } }, ({ error }) => error)
        .otherwise(() => null),
      disabled,
      configurable,
      content: (rulebook?.blocks ?? []).find((block) => block.id === id)?.content,
    }),
  );

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
        value={content?.source}
        error={nodeError ?? undefined}
        onChange={(val) => {
          rulebookActions.updateBlock(id, (draft) => {
            draft.content = { source: val };
            return draft;
          });
        }}
        disabled={disabled}
        trace={nodeTrace as SimulationTrace<SimulationTraceDataFunction>}
      />
    </Suspense>
  );
};
