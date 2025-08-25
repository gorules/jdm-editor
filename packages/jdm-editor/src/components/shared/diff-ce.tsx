import clsx from 'clsx';
import React from 'react';

import type { CodeEditorProps, CodeEditorRef } from '../code-editor';
import { CodeEditor } from '../code-editor';

export type DiffCodeEditorProps = CodeEditorProps & {
  displayDiff?: boolean;
  previousValue?: string;
  noStyle?: boolean;
  ref?: React.Ref<CodeEditorRef>;
};

export const DiffCodeEditor = ({ displayDiff, previousValue, noStyle, ref, ...rest }: DiffCodeEditorProps) => {
  if (displayDiff) {
    return (
      <div className={clsx('diff-code-editor', noStyle && 'no-style')}>
        {(previousValue || '')?.length > 0 && (
          <CodeEditor
            {...rest}
            className={clsx(rest.className, 'previous-input')}
            value={previousValue}
            onChange={undefined}
            disabled={true}
            noStyle
            lint={false}
          />
        )}
        {(rest?.value || '')?.length > 0 && (
          <CodeEditor
            {...rest}
            className={clsx(rest.className, 'current-input')}
            disabled={true}
            noStyle
            lint={false}
          />
        )}
      </div>
    );
  }

  return <CodeEditor ref={ref} noStyle={noStyle} {...rest} />;
};
