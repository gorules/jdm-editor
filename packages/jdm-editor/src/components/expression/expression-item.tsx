import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import type { VariableType } from '@gorules/zen-engine-wasm';
import type { Row } from '@tanstack/react-table';
import { Button, Popconfirm, Typography } from 'antd';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

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
      <div ref={dragRef} className='expression-list-item__drag' aria-disabled={!configurable || disabled}>
        {expression?._diff?.status ? (
          <DiffIcon
            status={expression?._diff?.status}
            style={{
              fontSize: 16,
            }}
          />
        ) : (
          <MenuOutlined />
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
        <ResultOverlay expression={expression} />
      </div>
      <div>
        <Popconfirm
          title='Remove selected row?'
          okText='Remove'
          onConfirm={onRemove}
          disabled={!configurable || disabled}
        >
          <Button type='text' icon={<DeleteOutlined />} danger disabled={!configurable || disabled} />
        </Popconfirm>
      </div>
    </div>
  );
};

const ResultOverlay: React.FC<{ expression: ExpressionEntry }> = ({ expression }) => {
  const { trace } = useExpressionStore(({ traceData }) => ({
    trace: traceData?.[expression.key]?.result,
  }));
  if (!trace) {
    return null;
  }

  return (
    <div className='expression-list-item__resultOverlay'>
      <Typography.Text ellipsis={{ tooltip: trace }} style={{ maxWidth: 120 }}>
        = {trace as string}
      </Typography.Text>
    </div>
  );
};
