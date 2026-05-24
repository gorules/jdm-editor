import type { ButtonProps } from 'antd';
import { Button, Tooltip } from 'antd';
import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { P, match } from 'ts-pattern';
import { useTranslation } from 'react-i18next';

export type ConfirmActionProps = {
  iconOnly?: boolean;
  text?: string;
  confirmText?: string;
  onConfirm?: () => void;
} & Omit<ButtonProps, 'children'>;

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  iconOnly = false,
  text,
  confirmText,
  icon = <TrashIcon size='1em' />,
  onClick,
  onBlur,
  onConfirm,
  disabled,
  ...props
}) => {
  // translation
  const { t } = useTranslation();
  const [isConfirming, setIsConfirming] = useState(false);
  const tooltipOpen = match([iconOnly, disabled])
    .with([P._, true], () => false)
    .with([false, P._], () => false)
    .otherwise(() => undefined);

  return (
    <Tooltip open={tooltipOpen} title={isConfirming ? (confirmText || t('confirmAction.confirmText')) : (text || t('confirmAction.text'))}>
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
