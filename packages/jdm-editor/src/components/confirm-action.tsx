import type { ButtonProps } from 'antd';
import { Button, Tooltip } from 'antd';
import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { P, match } from 'ts-pattern';

export type ConfirmActionProps = {
  iconOnly?: boolean;
  text?: string;
  confirmText?: string;
  onConfirm?: () => void;
} & Omit<ButtonProps, 'children'>;

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  iconOnly = false,
  text = 'Delete',
  confirmText = 'Really delete?',
  icon = <TrashIcon size='1em' />,
  onClick,
  onBlur,
  onConfirm,
  disabled,
  ...props
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const tooltipOpen = match([iconOnly, disabled])
    .with([P._, true], () => false)
    .with([false, P._], () => false)
    .otherwise(() => undefined);

  return (
    <Tooltip open={tooltipOpen} title={isConfirming ? confirmText : text}>
      <Button
        type='text'
        danger={isConfirming}
        icon={icon}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (isConfirming) {
            onConfirm?.();
            setIsConfirming(false);
            return;
          }

          setIsConfirming(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setIsConfirming(false);
        }}
        {...props}
      >
        {match([iconOnly, isConfirming])
          .with([false, true], () => confirmText)
          .with([false, false], () => text)
          .otherwise(() => undefined)}
      </Button>
    </Tooltip>
  );
};
