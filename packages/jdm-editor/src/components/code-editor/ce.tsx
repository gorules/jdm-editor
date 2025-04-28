import { bracketMatching } from '@codemirror/language';
import { Compartment, EditorState, type Extension, Text } from '@codemirror/state';
import { EditorView, placeholder as placeholderExt } from '@codemirror/view';
import { createVariableType } from '@gorules/zen-engine-wasm';
import { theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { match } from 'ts-pattern';

import { composeRefs } from '../../helpers/compose-refs';
import { isWasmAvailable } from '../../helpers/wasm';
import './ce.scss';
import {
  updateExpectedVariableTypeEffect,
  updateExpressionTypeEffect,
  updateStrictModeEffect,
  updateVariableTypeEffect,
} from './extensions/types';
import { zenExtensions, zenHighlightDark, zenHighlightLight } from './extensions/zen';

const updateListener = (onChange?: (data: string) => void, onStateChange?: (state: EditorState) => void) =>
  EditorView.updateListener.of((update) => {
    onStateChange?.(update.state);
    if (!update.docChanged) {
      return;
    }

    onChange?.(update.state.doc.toString());
  });

const editorTheme = (isDark = false) => (isDark ? zenHighlightDark : zenHighlightLight);

type ExtensionParams = {
  type?: 'standard' | 'unary' | 'template';
};

export type CodeEditorProps = {
  maxRows?: number;
  value?: string;
  onChange?: (value: string) => void;
  onStateChange?: (state: EditorState) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'unary' | 'standard' | 'template';
  lint?: boolean;
  strict?: boolean;
  fullHeight?: boolean;
  noStyle?: boolean;
  extension?: (params: ExtensionParams) => Extension;
  livePreview?: { input: unknown; fromSimulation: boolean; result?: unknown };
  variableType?: any;
  expectedVariableType?: any;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange'>;

export type CodeEditorRef = HTMLDivElement & {
  codeMirror: EditorView | null;
};

export const CodeEditor = React.forwardRef<CodeEditorRef, CodeEditorProps>(
  (
    {
      noStyle = false,
      fullHeight = false,
      strict = false,
      maxRows,
      disabled,
      value,
      onChange,
      placeholder,
      className,
      onStateChange,
      type = 'standard',
      extension,
      variableType,
      expectedVariableType,
      lint = true,
      ...props
    },
    ref,
  ) => {
    const container = useRef<HTMLDivElement>(null);
    const codeMirror = useRef<EditorView>(null);
    const { token } = theme.useToken();

    const compartment = useMemo(
      () => ({
        zenExtension: new Compartment(),
        theme: new Compartment(),
        placeholder: new Compartment(),
        readOnly: new Compartment(),
        updateListener: new Compartment(),
        userProvided: new Compartment(),
      }),
      [],
    );

    useEffect(() => {
      if (!container.current) {
        return;
      }

      const editorView = new EditorView({
        parent: container.current,
        state: EditorState.create({
          doc: value,
          extensions: [
            EditorView.lineWrapping,
            bracketMatching(),
            compartment.zenExtension.of(zenExtensions({ type, lint })),
            compartment.updateListener.of(updateListener(onChange, onStateChange)),
            compartment.theme.of(editorTheme(token.mode === 'dark')),
            compartment.placeholder.of(placeholder ? placeholderExt(placeholder) : []),
            compartment.readOnly.of(EditorView.editable.of(!disabled)),
            compartment.userProvided.of(extension?.({ type }) ?? []),
          ],
        }),
      });

      (codeMirror as any).current = editorView;
      if (container.current) {
        (container.current as CodeEditorRef).codeMirror = editorView;
      }

      return () => {
        editorView.destroy();
        (codeMirror as any).current = null;
      };
    }, []);

    useEffect(() => {
      if (!codeMirror.current || value === undefined) {
        return;
      }

      const cm = codeMirror.current;
      if (cm.state.doc.eq(Text.of(value.split('\n')))) {
        return;
      }

      cm.dispatch({
        changes: {
          from: 0,
          to: cm.state.doc.length,
          insert: value,
        },
      });
    }, [value]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.theme.reconfigure(editorTheme(token.mode === 'dark')),
      });
    }, [token.mode]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.placeholder.reconfigure(placeholder ? placeholderExt(placeholder) : []),
      });
    }, [placeholder]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.readOnly.reconfigure(EditorView.editable.of(!disabled)),
      });
    }, [disabled]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.updateListener.reconfigure(updateListener(onChange, onStateChange)),
      });
    }, [onChange, onStateChange]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: [
          compartment.zenExtension.reconfigure(zenExtensions({ type, lint })),
          updateExpressionTypeEffect.of(
            match(type)
              .with('unary', () => 'unary' as const)
              .otherwise(() => 'standard' as const),
          ),
        ],
      });
    }, [type, lint]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.userProvided.reconfigure(extension?.({ type }) ?? []),
      });
    }, [extension, type]);

    useEffect(() => {
      if (!codeMirror.current || !isWasmAvailable()) {
        return;
      }

      if (variableType === null || variableType === undefined) {
        codeMirror.current.dispatch({
          effects: updateVariableTypeEffect.of(null),
        });
        return;
      }

      codeMirror.current.dispatch({
        effects: updateVariableTypeEffect.of(createVariableType(variableType)),
      });
    }, [variableType]);

    useEffect(() => {
      if (!codeMirror.current || !isWasmAvailable()) {
        return;
      }

      if (expectedVariableType === null || expectedVariableType === undefined) {
        codeMirror.current.dispatch({
          effects: updateExpectedVariableTypeEffect.of(null),
        });
        return;
      }

      codeMirror.current.dispatch({
        effects: updateExpectedVariableTypeEffect.of(createVariableType(expectedVariableType)),
      });
    }, [expectedVariableType]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: updateStrictModeEffect.of(strict),
      });
    }, [strict]);

    return (
      <div
        ref={composeRefs(container, ref)}
        className={clsx(
          'grl-ce',
          maxRows && !fullHeight && 'max-rows',
          fullHeight && 'full-height',
          noStyle && 'no-style',
          className,
        )}
        style={{ '--editorMaxRows': maxRows } as any}
        data-type={type}
        {...props}
      />
    );
  },
);
