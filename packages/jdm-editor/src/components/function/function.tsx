import { createVariableType } from '@gorules/zen-engine-wasm';
import { DiffEditor, Editor, type Monaco, useMonaco } from '@monaco-editor/react';
import { Spin, theme } from 'antd';
import { MarkerSeverity, type editor } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce';

import '../../helpers/monaco';
import { isWasmAvailable } from '../../helpers/wasm';
import type { SimulationTrace, SimulationTraceDataFunction } from '../decision-graph/simulator/simulation.types';
import { FunctionDebugger } from './function-debugger';
import './function.scss';
import { variableTypeToTypescript } from './helpers/determine-type';
import { type FunctionLibrary, functionDefinitions, functionLibraries } from './helpers/libs';

export type FunctionProps = {
  disabled?: boolean;
  defaultValue?: string;
  disableDebug?: boolean;
  language?: string;
  value?: string;
  previousValue?: string;
  onChange?: (value: string) => void;
  trace?: SimulationTrace<SimulationTraceDataFunction>;
  onMonacoReady?: (monaco: Monaco) => void;
  libraries?: FunctionLibrary[];
  inputData?: unknown;
  error?: {
    data: { nodeId: string; source?: string };
  };
};

export const Function: React.FC<FunctionProps> = ({
  disabled = false,
  disableDebug,
  language = 'javascript',
  defaultValue,
  value,
  onChange,
  trace,
  onMonacoReady,
  error,
  inputData,
  previousValue,
  libraries = functionLibraries,
}) => {
  const monaco = useMonaco();
  const mountedRef = useRef(false);
  const { token } = theme.useToken();
  const [innerValue, setInnerValue] = useState<string>();
  const [decorations, setDecorations] = useState<editor.IEditorDecorationsCollection>();

  const innerChange = useDebouncedCallback((val: string) => {
    onChange?.(val);
  }, 100);

  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [diffEditor, setDiffEditor] = useState<editor.IStandaloneDiffEditor>();
  const resizeEditor = useThrottledCallback(() => editor?.layout(), 100, { trailing: true });
  const resizeDiffEditor = useThrottledCallback(() => diffEditor?.layout(), 100, { trailing: true });

  useEffect(() => {
    window.addEventListener('resize', resizeEditor);
    return () => window.removeEventListener('resize', resizeEditor);
  }, [resizeEditor, editor]);

  useEffect(() => {
    window.addEventListener('resize', resizeDiffEditor);
    return () => window.removeEventListener('resize', resizeDiffEditor);
  }, [resizeDiffEditor, diffEditor]);

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowSyntheticDefaultImports: true,
      allowNonTsExtensions: true,
      allowJs: true,
      checkJs: true,
      lib: ['es2023'],
    });

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: false,
      noSemanticValidation: false,
      noSuggestionDiagnostics: false,
      onlyVisible: false,
    });

    monaco.languages.typescript.javascriptDefaults.setExtraLibs(
      functionLibraries.map((lib) => ({
        content: `declare module '${lib.name}' { ${lib.typeDef} }`,
        filePath: lib.name,
      })),
    );

    Object.entries(functionDefinitions.globals).forEach(([pkg, types]) => {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(types, `ts:${pkg}`);
    });

    onMonacoReady?.(monaco);
  }, [monaco, libraries]);

  useEffect(() => {
    if (mountedRef.current && value !== undefined && value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  useEffect(() => {
    setInnerValue(value === undefined ? defaultValue : value);
    mountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!monaco) return;

    let data = 'any';
    if (isWasmAvailable()) {
      data = variableTypeToTypescript(createVariableType(inputData));
    }

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
    type Input = ${data};
    type Output = Promise<any>;
    
    type Handler = (input: Input) => Output; 
    `,
      'ts:input.d.ts',
    );
  }, [monaco, inputData]);

  useEffect(() => {
    if (!monaco) {
      return;
    }

    const model = monaco.editor.getModels()?.[0];
    if (!model) {
      return;
    }

    monaco.editor.setModelMarkers(model, 'gorules', []);
  }, [innerValue, monaco]);

  useEffect(() => {
    if (!decorations) {
      return;
    }

    decorations.clear();
    setDecorations(undefined);
  }, [innerValue]);

  useEffect(() => {
    try {
      if (!error || !monaco) {
        return;
      }

      const results = /Error:(\[.*])?(:?\d+)?(:\d+)?(.*)/s.exec(error.data.source ?? '');
      if (!results || results.length === 0) {
        return;
      }

      const line = parseFloat((results?.[2] ?? '').replace(/^:/, ''));
      const errorMessage = results?.[4] ?? '';
      if (!line || !errorMessage) {
        return;
      }

      const model = monaco.editor.getModels()[0];
      if (!model) {
        return;
      }

      const range = new monaco.Range(
        line,
        model.getLineFirstNonWhitespaceColumn(line),
        line,
        model.getLineLastNonWhitespaceColumn(line),
      );

      monaco.editor.setModelMarkers(model, 'gorules', [
        {
          severity: MarkerSeverity.Error,
          message: errorMessage,
          startLineNumber: range.startLineNumber,
          endLineNumber: range.endLineNumber,
          startColumn: range.startColumn,
          endColumn: range.endColumn,
        },
      ]);

      const editor = monaco.editor.getEditors()[0];
      if (!editor) {
        return;
      }

      const decorations = editor.createDecorationsCollection([
        {
          range,
          options: {
            hoverMessage: { value: errorMessage },
            isWholeLine: true,
            className: 'grl-function__errorLineContent',
          },
        },
      ]);

      setDecorations((curr) => {
        curr?.clear?.();
        return decorations;
      });
    } catch {
      //
    }
  }, [error, editor]);

  return (
    <div
      className='grl-function'
      data-theme={token.mode}
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
      <PanelGroup className='grl-function__content' direction='horizontal' autoSaveId='jdm-editor:function:layout'>
        <Panel defaultSize={70} minSize={50}>
          {previousValue ? (
            <DiffEditor
              loading={<Spin size='large' />}
              language={language}
              original={previousValue}
              modified={innerValue}
              onMount={(editor) => setDiffEditor(editor)}
              theme={token.mode === 'dark' ? 'vs-dark' : 'light'}
              height='100%'
              options={{
                ...monacoOptions,
                readOnly: true,
              }}
            />
          ) : (
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
                ...monacoOptions,
                readOnly: disabled,
              }}
            />
          )}
        </Panel>
        {!disableDebug && (
          <>
            <PanelResizeHandle />
            <Panel minSize={25}>
              {!disableDebug && (
                <FunctionDebugger libraries={functionLibraries} trace={trace} editor={editor} editorValue={value} />
              )}
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
};

const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  contextmenu: false,
  fontSize: 13,
  fontFamily: 'var(--mono-font-family)',
  tabSize: 2,
  minimap: { enabled: false },
  overviewRulerBorder: false,
  scrollbar: {
    verticalSliderSize: 4,
    verticalScrollbarSize: 4,
    horizontalScrollbarSize: 4,
    horizontalSliderSize: 4,
  },
};
