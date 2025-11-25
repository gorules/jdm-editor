import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { AutosizeTextArea, type AutosizeTextAreaProps } from '../autosize-text-area';

export type DiffAutosizeTextAreaProps = AutosizeTextAreaProps & {
  previousValue?: string;
  displayDiff?: boolean;
  noStyle?: boolean;
};

export const DiffAutosizeTextArea = forwardRef<HTMLDivElement, DiffAutosizeTextAreaProps>(
  ({ previousValue, displayDiff, noStyle, ...rest }, ref) => {
    if (displayDiff) {
      return (
        <div className={clsx('diff-text-area-group', noStyle && 'no-style')}>
          {(previousValue || '')?.length > 0 && (
            <AutosizeTextArea
              {...rest}
              value={previousValue}
              onChange={undefined}
              className={clsx(rest.className, 'previous-input')}
            />
          )}
          {((rest.value || '') as string)?.length > 0 && (
            <AutosizeTextArea {...rest} className={clsx(rest.className, 'current-input')} />
          )}
        </div>
      );
    }
    return <AutosizeTextArea ref={ref} {...rest} />;
  },
);
