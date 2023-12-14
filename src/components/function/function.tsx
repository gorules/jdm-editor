import { FormatPainterOutlined } from '@ant-design/icons';
import { Editor, useMonaco } from '@monaco-editor/react';
import { Button, Spin, theme } from 'antd';
import type { editor } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce';

import { Stack } from '../stack';
import { FunctionDebugger } from './function-debugger';
import './function.scss';
import { functionDefinitions } from './helpers/libs';
import './monaco';
import type { FunctionDebuggerTrace } from './types';

export type FunctionProps = {
  disabled?: boolean;
  defaultValue?: string;
  disableDebug?: boolean;
  language?: string;
  value?: string;
  onChange?: (value: string) => void;
  trace?: FunctionDebuggerTrace;
};

export const Function: React.FC<FunctionProps> = ({
  disabled = false,
  disableDebug,
  language = 'javascript',
  defaultValue,
  value,
  onChange,
  trace,
}) => {
  const monaco = useMonaco();
  const mountedRef = useRef(false);
  const { token } = theme.useToken();
  const [innerValue, setInnerValue] = useState<string>();

  const innerChange = useDebouncedCallback((val: string) => {
    onChange?.(val);
  }, 100);

  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const resizeEditor = useThrottledCallback(() => editor?.layout(), 100, { trailing: true });

  useEffect(() => {
    window.addEventListener('resize', resizeEditor);
    return () => window.removeEventListener('resize', resizeEditor);
  }, [resizeEditor, editor]);

  useEffect(() => {
    if (!monaco) return;

    const extraLibs = Object.keys(functionDefinitions).map(
      (pkg: keyof typeof functionDefinitions) => ({
        content: `declare module '${pkg}' { ${functionDefinitions[pkg]} }`,
      }),
      {},
    );

    monaco.languages.typescript.javascriptDefaults.setExtraLibs(extraLibs);
  }, [monaco]);

  useEffect(() => {
    if (mountedRef.current && value !== undefined && value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  useEffect(() => {
    setInnerValue(value === undefined ? defaultValue : value);
    mountedRef.current = true;
  }, []);

  return (
    <div
      className='grl-function'
      style={
        {
          'height': '100%',
          '--color-text': token.colorTextBase,
          '--color-background-elevated': token.colorBgElevated,
          '--color-border': token.colorBorder,
          '--line-height': token.lineHeight,
        } as any
      }
    >
      <Stack
        horizontal
        horizontalAlign={'space-between'}
        verticalAlign={'center'}
        className={'grl-function__command-bar'}
      >
        <Stack gap={8} horizontal className='full-width'>
          <Button
            type='default'
            size={'small'}
            color='secondary'
            icon={<FormatPainterOutlined />}
            disabled={disabled}
            onClick={() => {
              editor?.getAction?.('editor.action.formatDocument')?.run?.();
            }}
          >
            Format
          </Button>
        </Stack>
      </Stack>
      <div className={'grl-function__content'}>
        <Editor
          loading={<Spin size='large' />}
          language={language}
          value={innerValue}
          onMount={(editor) => setEditor(editor)}
          onChange={(value) => {
            setInnerValue(value ?? '');
            innerChange(value ?? '');
          }}
          theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
          height='100%'
          options={{
            automaticLayout: true,
            contextmenu: false,
            fontSize: 14,
            fontFamily: 'var(--mono-font-family)',
            readOnly: disabled,
            tabSize: 2,
          }}
        />
        {!disableDebug && <FunctionDebugger trace={trace} />}
      </div>
    </div>
  );
};
