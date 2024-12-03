import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import clsx from 'clsx';
import React from 'react';

export type DiffRadioProps = {
  previousValue?: string;
  displayDiff?: boolean;
} & RadioGroupProps;

export const DiffRadio: React.FC<DiffRadioProps> = ({ displayDiff, previousValue, options, ...rest }) => {
  return (
    <Radio.Group {...rest}>
      {(options || []).map((option: any) => (
        <Radio
          value={option.value}
          key={option.value}
          className={clsx([
            displayDiff && option.value === previousValue && 'text-removed',
            displayDiff && option.value === rest.value && 'text-added',
          ])}
        >
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};
