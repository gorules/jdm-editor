import { Select, type SelectProps, Space, type SpaceProps } from 'antd';
import clsx from 'clsx';
import React from 'react';

import { ArrowDiffIcon } from '../arrow-diff-icon';

export type DiffSelectProps = Omit<SelectProps, 'direction'> & {
  previousValue?: string;
  displayDiff?: boolean;
  direction?: SpaceProps['direction'];
};

export const DiffSelect: React.FC<DiffSelectProps> = ({
  direction = 'horizontal',
  previousValue,
  displayDiff,
  ...rest
}) => {
  return (
    <Space size={'small'} direction={direction}>
      {displayDiff && (
        <>
          <Select
            {...rest}
            disabled
            value={previousValue}
            className={clsx(rest.className, 'text-removed')}
            onChange={undefined}
          />
          <ArrowDiffIcon />
        </>
      )}
      <Select
        {...rest}
        disabled={rest.disabled || displayDiff}
        className={clsx(rest.className, displayDiff && 'text-added')}
      />
    </Space>
  );
};
