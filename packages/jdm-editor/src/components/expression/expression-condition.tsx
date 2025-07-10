import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import React from 'react';

import { ConfirmAction } from '../confirm-action';
import { DiffCodeEditor } from '../shared';
import { useExpressionStore, useExpressionStoreRaw } from './context/expression-store.context';
import { useExpressionDnd } from './dnd';

type ExpressionConditionProps = {
  kind?: string;
  path: string[];
};

export const ExpressionCondition: React.FC<ExpressionConditionProps> = ({ kind = 'If', path }) => {
  const storeRaw = useExpressionStoreRaw();
  const { disabled, configurable } = useExpressionStore(({ disabled, configurable }) => ({
    disabled,
    configurable,
  }));

  const { isDropping, isDragging, dragRef, dropRef, dropDirection } = useExpressionDnd({
    type: 'condition',
    accept: ['condition'],
    path,
  });

  return (
    <div
      ref={dropRef}
      className={clsx('expression-list-item')}
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={isDropping ? dropDirection : undefined}
      data-kind='condition'
      // data-diff={expression?._diff?.status}
    >
      <div ref={dragRef} className='expression-list-item__drag' aria-disabled={!configurable || disabled}>
        <GripVerticalIcon size={10} />
        {/*{expression?._diff?.status ? (*/}
        {/*  <DiffIcon status={expression?._diff?.status} style={{ fontSize: 16 }} />*/}
        {/*) : (*/}
        {/*  <GripVerticalIcon size={10} />*/}
        {/*)}*/}
      </div>
      <div className='expression-list-item__key'>
        <Typography.Text>{kind}</Typography.Text>
      </div>
      <div className='expression-list-item__code' style={{ position: 'relative' }}>
        <div>
          <DiffCodeEditor
            className='expression-list-item__value'
            placeholder='Condition'
            maxRows={9}
            // disabled={disabled}
            // value={expression?.value}
            // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
            // previousValue={expression?._diff?.fields?.value?.previousValue}
            // onChange={(value) => onChange({ value })}
            // variableType={variableType}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            noStyle
          />
          {/*<ResultOverlay expression={expression} />*/}
        </div>
      </div>
      <div className='expression-list-item__action'>
        <ConfirmAction
          iconOnly
          disabled={!configurable || disabled}
          onConfirm={() => {
            storeRaw.getState().removeRow(path);
          }}
        />
        {/*{isFocused && <LivePreview id={expression.id} value={expression.value} />}*/}
      </div>
    </div>
  );
};
