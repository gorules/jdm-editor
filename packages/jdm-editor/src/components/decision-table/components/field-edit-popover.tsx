import { Button, Popover, Typography } from 'antd';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

import { ConfirmAction } from '../../confirm-action';
import { Stack } from '../../stack';

type FieldEditPopoverProps = {
  value?: string;
  onSubmit: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerClassName?: string;
  children: React.ReactNode;
  mode?: 'edit' | 'create';
  trigger?: React.ReactNode;
};

export const FieldEditPopover: React.FC<FieldEditPopoverProps> = ({
  value,
  onSubmit,
  onRemove,
  disabled,
  open,
  onOpenChange,
  triggerClassName,
  children,
  mode = 'edit',
  trigger,
}) => (
  <Popover
    placement='bottomLeft'
    trigger={['click']}
    destroyTooltipOnHide
    arrow={false}
    open={open}
    onOpenChange={onOpenChange}
    content={
      <div
        style={{ width: 300 }}
        data-simulation='propagateWithTimeout'
        onKeyDownCapture={(e) => {
          const isSubmit = (e.ctrlKey || e.metaKey) && e.key === 'Enter';
          const isCancel = e.key === 'Escape';
          if (!isSubmit && !isCancel) return;

          e.preventDefault();
          e.stopPropagation();
          onOpenChange(false);
          if (!disabled && isSubmit) onSubmit();
        }}
      >
        {children}
        <div
          className='grl-field-edit__footer'
          style={{ marginTop: 16, justifyContent: mode === 'create' ? 'flex-end' : undefined }}
        >
          {mode === 'edit' && <ConfirmAction iconOnly onConfirm={onRemove} disabled={disabled} />}
          <Stack horizontal width='auto' verticalAlign='end'>
            <Button size='small' type='text' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button size='small' type='primary' disabled={disabled} onClick={onSubmit}>
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </Stack>
        </div>
      </div>
    }
  >
    {trigger ?? (
      <Typography.Text
        type={!value ? 'secondary' : undefined}
        className={clsx('grl-field-edit', triggerClassName)}
        onClick={() => onOpenChange(!open)}
      >
        <span className='span-overflow'>{value || '-'}</span>
        <ChevronDownIcon size={12} style={{ marginLeft: 4 }} />
      </Typography.Text>
    )}
  </Popover>
);
