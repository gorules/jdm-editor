import { Editor, useMonaco } from '@monaco-editor/react';
import { Spin, theme } from 'antd';
import { editor } from 'monaco-editor';
import React, { useEffect, useState } from 'react';
import { useThrottledCallback } from 'use-debounce';

import { FunctionDebugger } from './function-debugger';
import './function.scss';
import { functionDefinitions } from './helpers/libs';
import { FunctionDebuggerTrace } from './types';


import IStandaloneCodeEditor = editor.IStandaloneCodeEditor

export type FunctionProps = {
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  trace?: FunctionDebuggerTrace;
};

export const Function: React.FC<FunctionProps> = ({ disabled = false, defaultValue, value, onChange, trace }) => {
  const monaco = useMonaco();
  const { token } = theme.useToken();
  const [editor, setEditor] = useState<IStandaloneCodeEditor>();
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
      {}
    );

    monaco.languages.typescript.javascriptDefaults.setExtraLibs(extraLibs);
  }, [monaco]);

  return (
    <div
      className='grl-function'
      style={
        {
          'height': '100%',
          '--color-text': token.colorTextBase,
          '--color-border': token.colorBorder,
          '--line-height': token.lineHeight,
        } as any
      }
    >
      <Editor
        loading={<Spin size='large' />}
        language='javascript'
        defaultValue={defaultValue}
        value={value}
        onMount={(editor) => setEditor(editor)}
        onChange={(value) => onChange?.(value ?? '')}
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
      <FunctionDebugger trace={trace} />
    </div>
  );
};