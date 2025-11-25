import type { VariableType } from '@gorules/zen-engine-wasm';
import type { Row } from '@tanstack/react-table';
import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { getTrace } from '../../helpers/trace';
import { CodeEditorPreview } from '../code-editor/ce-preview';
import { ConfirmAction } from '../confirm-action';
import { DiffIcon } from '../diff-icon';
import { DiffAutosizeTextArea } from '../shared';
import { DiffCodeEditor } from '../shared/diff-ce';
import type { ExpressionEntry } from './context/expression-store.context';
import { useExpressionStore } from './context/expression-store.context';
import { ExpressionItemContextMenu } from './expression-item-context-menu';

export type ExpressionItemProps = {
  expression: ExpressionEntry;
  index: number;
  variableType?: VariableType;
};

export const ExpressionItem: React.FC<ExpressionItemProps> = ({ expression, index, variableType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const expressionRef = useRef<HTMLDivElement>(null);
  const { updateRow, removeRow, swapRows, disabled, permission } = useExpressionStore(
    ({ updateRow, removeRow, swapRows, disabled, permission }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      permission,
    }),
  );

  const onChange = (update: Partial<Omit<ExpressionEntry, 'id'>>) => {
    updateRow(index, update);
  };

  const onRemove = () => {
    removeRow(index);
  };

  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => {
      swapRows(draggedRow.index, index);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    canDrag: permission === 'edit:full' && !disabled,
    item: () => ({ ...expression, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(expressionRef));

  return (
    <div
      ref={expressionRef}
      className={clsx(
        'expression-list-item',
        'expression-list__item',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        expression?._diff?.status && `expression-list__item--${expression?._diff?.status}`,
      )}
      style={{ opacity: !isDragging ? 1 : 0.5 }}
    >
      <div ref={dragRef} className='expression-list-item__drag' aria-disabled={permission !== 'edit:full' || disabled}>
        <div className='expression-list-item__drag__inner'>
          {expression?._diff?.status ? (
            <DiffIcon
              status={expression?._diff?.status}
              style={{
                fontSize: 16,
              }}
            />
          ) : (
            <GripVerticalIcon size={10} />
          )}
        </div>
      </div>
      <div className='expression-list-item__key'>
        <ExpressionItemContextMenu index={index}>
          <DiffAutosizeTextArea
            noStyle
            placeholder='Key'
            maxRows={10}
            readOnly={permission !== 'edit:full' || disabled}
            displayDiff={expression?._diff?.fields?.key?.status === 'modified'}
            previousValue={expression?._diff?.fields?.key?.previousValue}
            value={expression?.key}
            onChange={(e) => onChange({ key: e.target.value })}
          />
        </ExpressionItemContextMenu>
      </div>
      <div className='expression-list-item__code'>
        <ExpressionItemContextMenu index={index}>
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
              noStyle={true}
            />
            <ResultOverlay expression={expression} />
          </div>
        </ExpressionItemContextMenu>
      </div>
      <div className='expression-list-item__action'>
        <ConfirmAction iconOnly disabled={permission !== 'edit:full' || disabled} onConfirm={onRemove} />
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
      initial: snapshot && trace ? { expression: snapshot.value, result: trace.result } : undefined,
    };
  });

  return (
    <div className='expression-list-item__livePreview'>
      <CodeEditorPreview expression={value} inputData={inputData} initial={initial} />
    </div>
  );
});

const ResultOverlay: React.FC<{ expression: ExpressionEntry }> = ({ expression }) => {
  const { trace } = useExpressionStore(({ debug, debugIndex }) => ({
    trace: getTrace(debug?.trace?.traceData, debugIndex)?.[expression.key]?.result,
  }));
  if (trace === undefined) {
    return null;
  }

  return (
    <div className='expression-list-item__resultOverlay'>
      <Typography.Text ellipsis={{ tooltip: trace }} style={{ maxWidth: 60, overflow: 'hidden' }}>
        = {JSON.stringify(trace)}
      </Typography.Text>
    </div>
  );
};
