import type { VariableType } from '@gorules/zen-engine-wasm';
import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import React, { useState } from 'react';

import { getTrace } from '../../helpers/trace';
import { CodeEditorPreview } from '../code-editor/ce-preview';
import { ConfirmAction } from '../confirm-action';
import { DiffIcon } from '../diff-icon';
import { DiffAutosizeTextArea } from '../shared';
import { DiffCodeEditor } from '../shared/diff-ce';
import type { ExpressionEntryItem } from './context/expression-store.context';
import { useExpressionStore } from './context/expression-store.context';
import { useExpressionDnd } from './dnd';

export type ExpressionItemProps = {
  expression: ExpressionEntryItem;
  path: string[];
  variableType?: VariableType;
};

export const ExpressionItem: React.FC<ExpressionItemProps> = ({ expression, path, variableType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { updateRow, removeRow, disabled, configurable } = useExpressionStore(
    ({ patchRow, removeRow, disabled, configurable }) => ({
      updateRow: patchRow,
      removeRow,
      disabled,
      configurable,
    }),
  );

  const onChange = (update: Partial<Omit<ExpressionEntryItem, 'id'>>) => {
    updateRow(path, update);
  };

  const onRemove = () => {
    removeRow(path);
  };

  const { dropRef, dragRef, isDragging, isDropping, dropDirection } = useExpressionDnd({
    type: 'item',
    accept: ['item', 'group'],
    path,
  });

  return (
    <div
      ref={dropRef}
      className={clsx('expression-list-item')}
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={isDropping ? dropDirection : undefined}
      data-diff={expression?._diff?.status}
    >
      <div ref={dragRef} className='expression-list-item__drag' aria-disabled={!configurable || disabled}>
        {expression?._diff?.status ? (
          <DiffIcon status={expression?._diff?.status} style={{ fontSize: 16 }} />
        ) : (
          <GripVerticalIcon size={10} />
        )}
      </div>
      <div
        className='expression-list-item__key'
        aria-disabled={!configurable || disabled}
        onClick={(e) => {
          if (e.target instanceof HTMLTextAreaElement) {
            return;
          }

          const inputElement = e.currentTarget.querySelector<HTMLTextAreaElement>('textarea');
          if (!inputElement) {
            return;
          }

          inputElement.focus();
          const inputLength = inputElement.value.length;
          inputElement.setSelectionRange(inputLength, inputLength);
        }}
      >
        <DiffAutosizeTextArea
          noStyle
          placeholder='Key'
          maxRows={10}
          readOnly={!configurable || disabled}
          displayDiff={expression?._diff?.fields?.key?.status === 'modified'}
          previousValue={expression?._diff?.fields?.key?.previousValue}
          value={expression?.key}
          onChange={(e) => onChange({ key: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div className='expression-list-item__code' style={{ position: 'relative' }}>
        <div>
          <DiffCodeEditor
            className='expression-list-item__value'
            placeholder='Expression'
            maxRows={9}
            disabled={disabled}
            value={expression?.value}
            displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
            previousValue={expression?._diff?.fields?.value?.previousValue}
            onChange={(value) => onChange({ value })}
            variableType={variableType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            noStyle
          />
          <ResultOverlay expression={expression} />
        </div>
      </div>
      <div className='expression-list-item__action'>
        <ConfirmAction iconOnly disabled={!configurable || disabled} onConfirm={onRemove} />
        {isFocused && <LivePreview id={expression.id} value={expression.value} />}
      </div>
    </div>
  );
};

const LivePreview = React.memo<{ id: string; value: string }>(({ id, value }) => {
  const { inputData, initial } = useExpressionStore(({ debug, debugIndex, calculatedInputData }) => {
    const snapshot = (debug?.snapshot?.expressions ?? []).find((e) => e.id === id);
    const trace = snapshot?.key ? getTrace(debug?.trace.traceData, debugIndex)?.[snapshot.key] : undefined;

    return {
      inputData: calculatedInputData,
      initial: snapshot && trace ? { expression: snapshot.value, result: safeJson(trace.result) } : undefined,
    };
  });

  return (
    <div className='expression-list-item__livePreview'>
      <CodeEditorPreview expression={value} inputData={inputData} initial={initial} />
    </div>
  );
});

const ResultOverlay: React.FC<{ expression: ExpressionEntryItem }> = ({ expression }) => {
  const { trace } = useExpressionStore(({ debug, debugIndex }) => ({
    trace: getTrace(debug?.trace?.traceData, debugIndex)?.[expression.key]?.result,
  }));
  if (!trace) {
    return null;
  }

  return (
    <div className='expression-list-item__resultOverlay'>
      <Typography.Text ellipsis={{ tooltip: trace }} style={{ maxWidth: 60, overflow: 'hidden' }}>
        = {trace as string}
      </Typography.Text>
    </div>
  );
};

const safeJson = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (err: any) {
    return err.toString();
  }
};
