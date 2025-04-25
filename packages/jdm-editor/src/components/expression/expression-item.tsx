import type { VariableType } from '@gorules/zen-engine-wasm';
import type { Row } from '@tanstack/react-table';
import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { CodeEditorPreview } from '../code-editor/ce-preview';
import { ConfirmAction } from '../confirm-action';
import { DiffIcon } from '../diff-icon';
import { DiffCodeEditor } from '../shared/diff-ce';
import { DiffInput } from '../shared/diff-input';
import type { ExpressionEntry } from './context/expression-store.context';
import { useExpressionStore } from './context/expression-store.context';

export type ExpressionItemProps = {
  expression: ExpressionEntry;
  index: number;
  variableType?: VariableType;
};

export const ExpressionItem: React.FC<ExpressionItemProps> = ({ expression, index, variableType }) => {
  const expressionRef = useRef<HTMLDivElement>(null);
  const { updateRow, removeRow, swapRows, disabled, configurable } = useExpressionStore(
    ({ updateRow, removeRow, swapRows, disabled, configurable }) => ({
      updateRow,
      removeRow,
      swapRows,
      disabled,
      configurable,
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
    canDrag: configurable && !disabled,
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
      <div style={{ paddingTop: 4 }}>
        <Typography.Text type='secondary' style={{ fontSize: 12 }}>
          {index + 1}
        </Typography.Text>
      </div>
      <div ref={dragRef} className='expression-list-item__drag' aria-disabled={!configurable || disabled}>
        {expression?._diff?.status ? (
          <DiffIcon
            status={expression?._diff?.status}
            style={{
              fontSize: 16,
            }}
          />
        ) : (
          <GripVerticalIcon size={14} />
        )}
      </div>
      <div>
        <DiffInput
          placeholder='Key'
          readOnly={!configurable || disabled}
          displayDiff={expression?._diff?.fields?.key?.status === 'modified'}
          previousValue={expression?._diff?.fields?.key?.previousValue}
          value={expression?.key}
          onChange={(e) => onChange({ key: e.target.value })}
          autoComplete='off'
        />
      </div>
      <div className='expression-list-item__code'>
        <DiffCodeEditor
          placeholder='Expression'
          maxRows={9}
          disabled={disabled}
          value={expression?.value}
          displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
          previousValue={expression?._diff?.fields?.value?.previousValue}
          onChange={(value) => onChange({ value })}
          variableType={variableType}
        />
        <ResultOverlay id={expression.id} value={expression.value} />
      </div>
      <div>
        <ConfirmAction iconOnly disabled={!configurable || disabled} onConfirm={onRemove} />
      </div>
    </div>
  );
};

const ResultOverlay = React.memo<{ id: string; value: string }>(({ id, value }) => {
  const { inputData, initial } = useExpressionStore(({ debug }) => {
    const snapshot = (debug?.snapshot?.expressions ?? []).find((e) => e.id === id);
    const trace = debug?.trace.traceData[id];

    return {
      inputData: debug?.inputData,
      initial: snapshot && trace ? { expression: snapshot.value, result: trace.result } : undefined,
    };
  });

  return (
    <div className='expression-list-item__resultOverlay'>
      <CodeEditorPreview expression={value} inputData={inputData} initial={initial} />
    </div>
  );
});
