import type { InputRef } from 'antd';
import { Button, Input, Popover, Typography } from 'antd';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { ConfirmAction } from '../../confirm-action';
import { Stack } from '../../stack';

type OutputFieldEditProps = {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onRemove?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'>;

export const OutputFieldEdit: React.FC<OutputFieldEditProps> = ({
  disabled,
  value,
  onChange,
  onRemove,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(value);
  const input = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      setInnerValue(value);
      if (!input.current) {
        return;
      }

      input.current.focus();
      input.current.select();
    }
  }, [open]);

  return (
    <Popover
      placement='bottomLeft'
      trigger={['click']}
      destroyTooltipOnHide
      arrow={false}
      open={open}
      onOpenChange={(o) => setOpen(o)}
      content={
        <div
          style={{ width: 300 }}
          data-simulation='propagateWithTimeout'
          onKeyDownCapture={(e) => {
            const isSubmit = (e.ctrlKey || e.metaKey) && e.key === 'Enter';
            const isCancel = e.key === 'Escape';
            if (!isSubmit && !isCancel) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
            if (!disabled && isSubmit && innerValue && innerValue.trim()) {
              onChange?.(innerValue.trim());
            }
          }}
        >
          <Typography.Text style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>Output Field</Typography.Text>
          <Input ref={input} value={innerValue} onChange={(e) => setInnerValue(e.target.value)} readOnly={disabled} />
          <div className='grl-field-edit__footer'>
            <ConfirmAction iconOnly onConfirm={onRemove} disabled={disabled} />
            <Stack horizontal width='auto' verticalAlign='end'>
              <Button size='small' type='text' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={disabled}
                size='small'
                type='primary'
                onClick={() => {
                  onChange?.(innerValue ?? '');
                  setOpen(false);
                }}
              >
                Set value
              </Button>
            </Stack>
          </div>
        </div>
      }
    >
      <Typography.Text
        type={!value ? 'secondary' : undefined}
        className={clsx('grl-field-edit', 'grl-field-edit--output', className)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span className='span-overflow'>{value}</span>
        <ChevronDownIcon size={12} style={{ marginLeft: 4 }} />
      </Typography.Text>
    </Popover>
  );
};
