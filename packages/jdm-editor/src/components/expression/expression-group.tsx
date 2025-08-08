import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import type { ConnectDragSource } from 'react-dnd';
import { match } from 'ts-pattern';

import { ConfirmAction } from '../confirm-action';
import type { ExpressionEntryGroupRule } from './context/expression-store.context';
import {
  type ExpressionEntryGroup,
  createExpression,
  useExpressionStore,
  useExpressionStoreRaw,
} from './context/expression-store.context';
import { useExpressionDnd } from './dnd';
import { ExpressionCondition } from './expression-condition';
import type { ExpressionLineButton } from './expression-line-button';
import { ExpressionList } from './expression-list';

export type ExpressionGroupProps = {
  group: ExpressionEntryGroup;
  path: string[];
  dragRef?: ConnectDragSource;
};

export const ExpressionGroup: React.FC<ExpressionGroupProps> = ({ group, path, dragRef }) => {
  return (
    <div className='expression-group'>
      <ExpressionGroupLineButton dragRef={dragRef} alwaysVisible size='large' path={path} />
      {group.rules.map((r, index) => (
        <ExpressionGroupRule key={r.id} basePath={path} index={index} rule={r} />
      ))}
    </div>
  );
};

const ExpressionGroupLineButton: React.FC<
  React.ComponentProps<typeof ExpressionLineButton> & {
    dragRef?: ConnectDragSource;
  }
> = ({ dragRef, path = [], alwaysVisible, size: _size = 'default', className, ...props }) => {
  const storeRaw = useExpressionStoreRaw();
  const { disabled, configurable } = useExpressionStore(({ disabled, configurable }) => ({
    disabled,
    configurable,
  }));

  const size = match(_size)
    .with('default', () => 12)
    .with('large', () => 14)
    .exhaustive();

  return (
    <div
      className={clsx('expression-list__lineButton', 'expression-list__lineButton--group', className)}
      data-visible={alwaysVisible ? 'always' : undefined}
      data-size={_size}
      {...props}
    >
      <div ref={dragRef} role='button' className={clsx('expression-list__lineButton__option')} data-option='grip'>
        <GripVerticalIcon size={12} />
      </div>
      <div
        role='button'
        className={clsx('expression-list__lineButton__option')}
        data-option='condition'
        onClick={() => {
          storeRaw.getState().updateRow(path, (draft) => {
            if (!('rules' in draft)) {
              return;
            }

            draft.rules.push({
              id: crypto.randomUUID(),
              if: '',
              then: [createExpression('item')],
            });
          });
        }}
      >
        <PlusIcon size={size} strokeWidth={1} />
        <Typography.Text style={{ fontSize: size - 2, fontWeight: 300 }}>Add condition</Typography.Text>
      </div>
      <ConfirmAction
        iconOnly
        disabled={!configurable || disabled}
        onConfirm={() => {
          storeRaw.getState().removeRow(path);
        }}
      />
    </div>
  );
};

const ExpressionGroupRule: React.FC<{
  basePath: string[];
  index: number;
  rule: ExpressionEntryGroupRule;
}> = ({ basePath, index, rule }) => {
  const conditionPath = [...basePath, `rules.${index}`];
  const { dragRef, dropRef, isDragging, dropDirection } = useExpressionDnd({
    type: 'condition',
    accept: ['condition'],
    path: conditionPath,
  });

  return (
    <div
      ref={dropRef}
      className='expression-group__rule'
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={dropDirection}
      data-top-button={index === 0}
    >
      <ExpressionCondition
        id={rule.id}
        condition={rule.if}
        kind={index === 0 ? 'If' : 'Else if'}
        path={conditionPath}
        dragRef={dragRef}
      />
      <ExpressionList expressions={rule.then} path={[...conditionPath, 'then']} />
    </div>
  );
};
