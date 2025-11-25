import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { Compartment, EditorState, type Extension, Text } from '@codemirror/state';
import { EditorView, placeholder as placeholderExt } from '@codemirror/view';
import { createVariableType } from '@gorules/zen-engine-wasm';
import { theme } from 'antd';
import clsx from 'clsx';
import { clamp } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { match } from 'ts-pattern';

import { composeRefs } from '../../helpers/compose-refs';
import { isWasmAvailable } from '../../helpers/wasm';
import {
  updateExpectedVariableTypeEffect,
  updateExpressionTypeEffect,
  updateStrictModeEffect,
  updateVariableTypeEffect,
} from './extensions/types';
import { zenExtensions, zenStyleDark, zenStyleLight } from './extensions/zen';

const zenHighlightDark = syntaxHighlighting(zenStyleDark);
const zenHighlightLight = syntaxHighlighting(zenStyleLight);

const editorTheme = (isDark = false) => (isDark ? zenHighlightDark : zenHighlightLight);

const updateListener = (onChange?: (data: string) => void, onStateChange?: (state: EditorState) => void) =>
  EditorView.updateListener.of((update) => {
    onStateChange?.(update.state);
    if (!update.docChanged) {
      return;
    }

    onChange?.(update.state.doc.toString());
  });

type ExtensionParams = {
  type?: 'standard' | 'unary' | 'template';
};

export type CodeEditorBaseProps = {
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
  lazy?: boolean;
  initialSelection?: { anchor: number; head?: number };
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange'>;

export type CodeEditorBaseRef = HTMLDivElement & {
  codeMirror: EditorView | null;
};

export const CodeEditorBase = React.forwardRef<CodeEditorBaseRef, CodeEditorBaseProps>(
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
      initialSelection,
      style = {},
      ...props
    },
    ref,
  ) => {
    const container = useRef<HTMLDivElement>(null);
    const codeMirror = useRef<EditorView | null>(null);
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
      if (!container.current || codeMirror.current) {
        return;
      }

      // Strict Mode workaround: defer cleanup to avoid destroying editorView
      let didMount = false;
      queueMicrotask(() => {
        didMount = true;
      });

      const clampSelection = (n: number) => clamp(n, 0, value?.length ?? 0);

      const editorView = new EditorView({
        parent: container.current,
        state: EditorState.create({
          doc: value,
          selection: initialSelection
            ? {
                head: initialSelection.head ? clampSelection(initialSelection.head) : undefined,
                anchor: clampSelection(initialSelection.anchor),
              }
            : undefined,
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

      if (initialSelection) {
        editorView.focus();
      }

      codeMirror.current = editorView;
      if (container.current) {
        (container.current as CodeEditorBaseRef).codeMirror = editorView;
      }

      return () => {
        if (!didMount) return;

        editorView.destroy();
        codeMirror.current = null;
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

      const currentHead = cm.state.selection.main.head;
      const newLength = value.length;

      cm.dispatch({
        changes: {
          from: 0,
          to: cm.state.doc.length,
          insert: value,
        },
        // Adjust the selection if it would be out of bounds
        ...(currentHead > newLength && { selection: { anchor: newLength } }),
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
        style={{ '--editorMaxRows': maxRows, ...style } as any}
        data-type={type}
        {...props}
      />
    );
  },
);
