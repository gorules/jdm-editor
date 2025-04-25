import { type Variable } from '@gorules/zen-engine-wasm';
import { Typography } from 'antd';
import stringifyPretty from 'json-stringify-pretty-compact';
import { BugIcon } from 'lucide-react';
import React, { useMemo } from 'react';

import { isWasmAvailable } from '../../helpers/wasm';
import { CodeEditor } from './ce';

export type CodeEditorPreviewProps = {
  initial?: { expression: string; result: unknown };
  expression: string;
  inputData?: Variable;
  noPreviewText?: string;
};

export const CodeEditorPreview: React.FC<CodeEditorPreviewProps> = ({
  initial,
  expression,
  inputData,
  noPreviewText = 'Run simulation to see the results',
}) => {
  const preview = useMemo(() => {
    if (!inputData) {
      return undefined;
    }

    if (!isWasmAvailable() || expression === initial?.expression) {
      return { type: 'initial' as const, value: stringifyPretty(initial?.result, { maxLength: 30 }) };
    }

    if (!expression) {
      return { type: 'none' as const, value: '-' };
    }

    try {
      const value = inputData.evaluateExpression(expression);
      return { type: 'success' as const, value: stringifyPretty(value, { maxLength: 30 }) };
    } catch (err) {
      return { type: 'error' as const, value: (err as any).toString() };
    }
  }, [inputData, expression, initial]);

  return (
    <div>
      <Typography.Text style={{ fontSize: 12 }}>
        Live Preview <BugIcon size='1em' opacity={0.5} color='#077D16' />
      </Typography.Text>
      <Typography.Text style={{ fontSize: 12, display: 'block' }} type='secondary'>
        {preview?.type === 'initial' ? 'Based on simulation data' : 'Based on live calculation'}
      </Typography.Text>
      <div className='grl-ce-preview'>
        {(preview?.type === 'success' || preview?.type === 'initial') && (
          <CodeEditor value={preview.value} disabled noStyle maxRows={3} />
        )}
        {preview?.type === 'none' && (
          <Typography.Text type='secondary' ellipsis>
            {preview.value}
          </Typography.Text>
        )}
        {preview?.type === 'error' && (
          <Typography.Text type='danger' ellipsis>
            {preview.value}
          </Typography.Text>
        )}
        {!preview && (
          <Typography.Text type='secondary' ellipsis>
            {noPreviewText}
          </Typography.Text>
        )}
      </div>
    </div>
  );
};
