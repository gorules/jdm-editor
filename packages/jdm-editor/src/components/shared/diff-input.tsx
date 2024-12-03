import { Input, type InputProps } from 'antd';
import clsx from 'clsx';
import React from 'react';

export type DiffInputProps = InputProps & {
  previousValue?: string;
  displayDiff?: boolean;
};

export const DiffInput: React.FC<DiffInputProps> = ({ previousValue, displayDiff, ...rest }) => {
  if (displayDiff) {
    return (
      <div className={'diff-input-group'}>
        {(previousValue || '')?.length > 0 && (
          <Input
            {...rest}
            value={previousValue}
            onChange={undefined}
            className={clsx(rest.className, 'previous-input')}
          />
        )}
        {((rest?.value || '') as string)?.length > 0 && (
          <Input {...rest} className={clsx(rest.className, 'current-input')} />
        )}
      </div>
    );
  }
  return <Input {...rest} />;
};
