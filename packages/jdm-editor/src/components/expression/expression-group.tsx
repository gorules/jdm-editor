import { type VariableType } from '@gorules/zen-engine-wasm';
import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import { ConnectDragSource } from 'react-dnd';
import { match } from 'ts-pattern';

import { ConfirmAction } from '../confirm-action';
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
  variableType?: VariableType;
};

export const ExpressionGroup: React.FC<ExpressionGroupProps> = ({ group, path, variableType }) => {
  const { dragRef, dropRef, dropDirection, isDragging, isDropping } = useExpressionDnd({
    type: 'group',
    accept: ['group', 'item'],
    path,
  });

  return (
    <div
      className={clsx('expression-group')}
      ref={dropRef}
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={isDropping ? dropDirection : undefined}
    >
      <ExpressionGroupLineButton dragRef={dragRef} alwaysVisible size='large' path={path} />
      {group.rules.map((r, index) => (
        <React.Fragment key={r.id}>
          <ExpressionCondition kind='If' path={[...path, `rules.${index}`]} />
          <ExpressionList expressions={r.then} path={[...path, `rules.${index}.then`]} />
        </React.Fragment>
      ))}
    </div>
  );
};

const ExpressionGroupLineButton: React.FC<
  React.ComponentProps<typeof ExpressionLineButton> & {
    dragRef: ConnectDragSource;
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
