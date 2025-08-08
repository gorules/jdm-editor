import { Typography } from 'antd';
import { GripVerticalIcon } from 'lucide-react';
import React, { useState } from 'react';
import type { ConnectDragSource } from 'react-dnd';

import { getTrace } from '../../helpers/trace';
import { ConfirmAction } from '../confirm-action';
import { DiffCodeEditor } from '../shared';
import { useVisualDebug } from '../visual-debug.context';
import type { ExpressionEntryGroupRule } from './context/expression-store.context';
import { useExpressionStore, useExpressionStoreRaw } from './context/expression-store.context';
import { useExpressionDnd } from './dnd';
import { ExpressionLivePreview } from './expression-live-preview';

type ExpressionConditionProps = {
  id: string;
  kind?: string;
  path: string[];
  condition?: string;
  dragRef?: ConnectDragSource;
};

export const ExpressionCondition: React.FC<ExpressionConditionProps> = ({
  id,
  kind = 'If',
  path,
  dragRef,
  condition,
}) => {
  const visualDebug = useVisualDebug();
  const [isFocused, setIsFocused] = useState(false);
  const storeRaw = useExpressionStoreRaw();
  const { disabled, configurable, updateRow, calculatedVariableType } = useExpressionStore(
    ({ disabled, configurable, updateRow, calculatedVariableType }) => ({
      disabled,
      configurable,
      updateRow,
      calculatedVariableType,
    }),
  );

  const { dropRef, dropDirection } = useExpressionDnd({
    type: 'condition',
    accept: ['item', 'group'],
    dropDirection: ['down'],
    path: [...path, 'then', '-1'],
  });

  return (
    <div
      ref={dropRef}
      className='expression-item'
      data-kind='condition'
      data-dropping={dropDirection}
      // data-diff={expression?._diff?.status}
    >
      {visualDebug && (
        <div className='expression-item__visualDebug'>
          <Typography.Text type='secondary'>{path.join('.')}</Typography.Text>
        </div>
      )}
      <div ref={dragRef} className='expression-item__drag' aria-disabled={!configurable || disabled}>
        <GripVerticalIcon size={10} />
        {/*{expression?._diff?.status ? (*/}
        {/*  <DiffIcon status={expression?._diff?.status} style={{ fontSize: 16 }} />*/}
        {/*) : (*/}
        {/*  <GripVerticalIcon size={10} />*/}
        {/*)}*/}
      </div>
      <div className='expression-item__key'>
        <Typography.Text>{kind}</Typography.Text>
      </div>
      <div className='expression-item__code' style={{ position: 'relative' }}>
        <div>
          <DiffCodeEditor
            className='expression-item__value'
            placeholder='Condition'
            maxRows={9}
            disabled={disabled}
            value={condition}
            variableType={calculatedVariableType}
            expectedVariableType='Bool'
            // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
            // previousValue={expression?._diff?.fields?.value?.previousValue}
            onChange={(value) => {
              updateRow(path, (draft) => {
                (draft as unknown as ExpressionEntryGroupRule).if = value;
              });
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            noStyle
          />
          <ResultOverlay id={id} />
        </div>
      </div>
      <div className='expression-item__action'>
        <ConfirmAction
          iconOnly
          disabled={!configurable || disabled}
          onConfirm={() => {
            storeRaw.getState().removeRow(path);
          }}
        />
        {isFocused && <ExpressionLivePreview id='123' value={condition ?? ''} />}
      </div>
    </div>
  );
};

const ResultOverlay: React.FC<{ id: string }> = ({ id }) => {
  const { trace } = useExpressionStore(({ debug, debugIndex }) => ({
    trace: getTrace(debug?.trace?.traceData, debugIndex)?.expressions?.[id],
  }));
  if (!trace) {
    return null;
  }

  return <div className='expression-item__conditionCircle' data-result={trace.result === 'true' ? 'true' : 'false'} />;
};
