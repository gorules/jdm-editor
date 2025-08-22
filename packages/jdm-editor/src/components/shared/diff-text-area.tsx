import clsx from 'clsx';
import React from 'react';

import { AutosizeTextArea, type AutosizeTextAreaProps } from '../autosize-text-area';

export type DiffAutosizeTextAreaProps = AutosizeTextAreaProps & {
  previousValue?: string;
  displayDiff?: boolean;
  noStyle?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export const DiffAutosizeTextArea: React.FC<DiffAutosizeTextAreaProps> = (
  { previousValue, displayDiff, noStyle, ref, ...rest }: DiffAutosizeTextAreaProps
) => {
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
};
