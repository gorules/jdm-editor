import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type TextEditProps = {
  onChange?: (text: string) => void;
  value?: string;
  disabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>;

export const TextEdit: React.FC<TextEditProps> = ({ className, value, onChange, disabled, ...props }) => {
  const [contentEditing, setContentEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && contentEditing) {
      inputRef.current.value = value as string;
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [contentEditing]);

  return (
    <div className={clsx('grl-text-edit', className)} {...props}>
      {!contentEditing && (
        <Typography.Text
          className={clsx('grl-text-edit__text')}
          onClick={() => {
            if (!disabled) {
              setContentEditing(true);
            }
          }}
        >
          {value}
        </Typography.Text>
      )}
      {contentEditing && (
        <input
          ref={inputRef}
          className={clsx('grl-text-edit__input', 'nodrag')}
          onBlur={(e) => {
            if (e.target.value?.trim?.()?.length > 0) {
              onChange?.(inputRef?.current?.value as string);
            }
            e.preventDefault();
            setContentEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
              e.preventDefault();
            } else if (e.key === 'Escape') {
              if (inputRef.current) {
                inputRef.current.value = value as string;
              }
              setContentEditing(false);
              e.preventDefault();
            }
          }}
        />
      )}
    </div>
  );
};
