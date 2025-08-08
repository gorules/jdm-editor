import { Typography } from 'antd';
import { GripVerticalIcon } from 'lucide-react';
import React, { useState } from 'react';
import type { ConnectDragSource } from 'react-dnd';

import { getTrace } from '../../helpers/trace';
import { ConfirmAction } from '../confirm-action';
import { DiffIcon } from '../diff-icon';
import { DiffAutosizeTextArea } from '../shared';
import { DiffCodeEditor } from '../shared/diff-ce';
import { useVisualDebug } from '../visual-debug.context';
import type { ExpressionEntryItem } from './context/expression-store.context';
import { useExpressionStore } from './context/expression-store.context';
import { ExpressionLivePreview } from './expression-live-preview';

export type ExpressionItemProps = {
  expression: ExpressionEntryItem;
  path: string[];
  dragRef?: ConnectDragSource;
};

export const ExpressionItem: React.FC<ExpressionItemProps> = ({ expression, path, dragRef }) => {
  const visualDebug = useVisualDebug();
  const [isFocused, setIsFocused] = useState(false);
  const { updateRow, removeRow, disabled, permission, calculatedVariableType } = useExpressionStore(
    ({ patchRow, removeRow, disabled, permission, calculatedVariableType }) => ({
      updateRow: patchRow,
      removeRow,
      disabled,
      permission,
      calculatedVariableType,
    }),
  );

  const onChange = (update: Partial<Omit<ExpressionEntryItem, 'id'>>) => {
    updateRow(path, update);
  };

  const onRemove = () => {
    removeRow(path);
  };

  return (
    <div className='expression-item' data-diff={expression?._diff?.status}>
      {visualDebug && (
        <div className='expression-item__visualDebug'>
          <Typography.Text type='secondary'>{path.join('.')}</Typography.Text>
        </div>
      )}
      <div ref={dragRef} className='expression-item__drag' aria-disabled={permission !== 'edit:full' || disabled}>
        {expression?._diff?.status ? (
          <DiffIcon status={expression?._diff?.status} style={{ fontSize: 16 }} />
        ) : (
          <GripVerticalIcon size={10} />
        )}
      </div>
      <div
        className='expression-item__key'
        aria-disabled={permission !== 'edit:full' || disabled}
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
          readOnly={permission !== 'edit:full' || disabled}
          displayDiff={expression?._diff?.fields?.key?.status === 'modified'}
          previousValue={expression?._diff?.fields?.key?.previousValue}
          value={expression?.key}
          onChange={(e) => onChange({ key: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div className='expression-item__code' style={{ position: 'relative' }}>
        <div>
          <DiffCodeEditor
            className='expression-item__value'
            placeholder='Expression'
            maxRows={9}
            disabled={disabled}
            value={expression?.value}
            variableType={calculatedVariableType}
            displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
            previousValue={expression?._diff?.fields?.value?.previousValue}
            onChange={(value) => onChange({ value })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            noStyle
          />
          <ResultOverlay expression={expression} />
        </div>
      </div>
      <div className='expression-item__action'>
        <ConfirmAction iconOnly disabled={permission !== 'edit:full' || disabled} onConfirm={onRemove} />
        {isFocused && <ExpressionLivePreview id={expression.id} value={expression.value} />}
      </div>
    </div>
  );
};

const ResultOverlay: React.FC<{ expression: ExpressionEntryItem }> = ({ expression }) => {
  const { trace } = useExpressionStore(({ debug, debugIndex }) => ({
    trace: getTrace(debug?.trace?.traceData, debugIndex)?.expressions?.[expression.id],
  }));
  if (!trace) {
    return null;
  }

  return (
    <div className='expression-item__resultOverlay'>
      <Typography.Text ellipsis={{ tooltip: trace.result }} style={{ maxWidth: 60, overflow: 'hidden' }}>
        = {trace.result as string}
      </Typography.Text>
    </div>
  );
};
