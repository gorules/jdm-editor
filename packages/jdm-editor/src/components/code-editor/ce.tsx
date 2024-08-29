import { bracketMatching } from '@codemirror/language';
import { Compartment, EditorState, type Extension, Text } from '@codemirror/state';
import { EditorView, placeholder as placeholderExt } from '@codemirror/view';
import { theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';

import { composeRefs } from '../../helpers/compose-refs';
import './ce.scss';
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
  fullHeight?: boolean;
  noStyle?: boolean;
  extension?: (params: ExtensionParams) => Extension;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange'>;

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      noStyle = false,
      fullHeight = false,
      maxRows,
      disabled,
      value,
      onChange,
      placeholder,
      className,
      onStateChange,
      type = 'standard',
      extension,
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
            bracketMatching(), // ADD THIS LINE
            compartment.zenExtension.of(zenExtensions({ type })),
            compartment.updateListener.of(updateListener(onChange, onStateChange)),
            compartment.theme.of(editorTheme(token.mode === 'dark')),
            compartment.placeholder.of(placeholder ? placeholderExt(placeholder) : []),
            compartment.readOnly.of(EditorView.editable.of(!disabled)),
            compartment.userProvided.of(extension?.({ type }) ?? []),
          ],
        }),
      });

      (codeMirror as any).current = editorView;

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
        effects: compartment.zenExtension.reconfigure(zenExtensions({ type })),
      });
    }, [type]);

    useEffect(() => {
      if (!codeMirror.current) {
        return;
      }

      codeMirror.current.dispatch({
        effects: compartment.userProvided.reconfigure(extension?.({ type }) ?? []),
      });
    }, [extension, type]);

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
        {...props}
      />
    );
  },
);
