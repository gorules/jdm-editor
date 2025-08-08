import React from 'react';
import { match } from 'ts-pattern';

import { getTrace } from '../../helpers/trace';
import { CodeEditorPreview } from '../code-editor/ce-preview';
import { useExpressionStore } from './context/expression-store.context';
import { walkExpressions } from './walker';

export const ExpressionLivePreview = React.memo<{ id: string; value: string }>(({ id, value }) => {
  const { inputData, initial } = useExpressionStore(({ debug, debugIndex, calculatedInputData }) => {
    const data = walkExpressions(debug?.snapshot?.expressions ?? []).find(({ entry }) => entry.id === id);
    const trace = data?.entry?.id
      ? getTrace(debug?.trace.traceData, debugIndex)?.expressions?.[data.entry.id]
      : undefined;

    return {
      inputData: calculatedInputData,
      initial: trace
        ? match(data)
            .with({ type: 'item' }, ({ entry }) => ({ expression: entry.value, result: safeJson(trace.result) }))
            .with({ type: 'rule' }, ({ entry }) => ({ expression: entry.if ?? '', result: safeJson(trace.result) }))
            .otherwise(() => undefined)
        : undefined,
    };
  });

  return (
    <div className='expression-item__livePreview'>
      <CodeEditorPreview expression={value} inputData={inputData} initial={initial} />
    </div>
  );
});

const safeJson = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (err: any) {
    return err.toString();
  }
};
