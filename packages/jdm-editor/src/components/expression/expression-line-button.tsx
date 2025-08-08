import { Typography } from 'antd';
import clsx from 'clsx';
import { CalculatorIcon, GitBranchIcon } from 'lucide-react';
import React from 'react';
import { match } from 'ts-pattern';

import { useExpressionStoreRaw } from './context/expression-store.context';

type ExpressionLineButtonProps = {
  path?: string[];
  alwaysVisible?: boolean;
  size?: 'default' | 'large';
} & React.HTMLAttributes<HTMLDivElement>;

export const ExpressionLineButton: React.FC<ExpressionLineButtonProps> = ({
  path,
  alwaysVisible,
  size: _size = 'default',
  className,
  ...props
}) => {
  const storeRaw = useExpressionStoreRaw();
  const size = match(_size)
    .with('default', () => 12)
    .with('large', () => 14)
    .exhaustive();

  return (
    <div
      className={clsx('expression-list__lineButton', className)}
      data-visible={alwaysVisible ? 'always' : undefined}
      data-size={_size}
      {...props}
    >
      <div
        role='button'
        className={clsx('expression-list__lineButton__option')}
        data-option='expression'
        onClick={() => {
          storeRaw.getState().addRowAbove({ path });
        }}
      >
        <CalculatorIcon size={size} strokeWidth={1} />
        <Typography.Text style={{ fontSize: size - 2, fontWeight: 300 }}>Add Expression</Typography.Text>
      </div>
      <div
        role='button'
        className={clsx('expression-list__lineButton__option')}
        data-option='branch'
        onClick={() => {
          storeRaw.getState().addRowAbove({ path, kind: 'group' });
        }}
      >
        <GitBranchIcon size={size} strokeWidth={1} />
        <Typography.Text style={{ fontSize: size - 2, fontWeight: 300 }}>Add Branch</Typography.Text>
      </div>
    </div>
  );
};
