import { Compartment, EditorState, Text } from '@codemirror/state';
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

const maxRowsFilter = (maxRows: number) => [
  EditorState.transactionFilter.of((tr) => (tr.newDoc.lines > maxRows ? [] : [tr])),
  EditorView.lineWrapping,
];

const editorTheme = (isDark = false) => (isDark ? zenHighlightDark : zenHighlightLight);

export type CodeEditorProps = {
  maxRows?: number;
  value?: string;
  onChange?: (value: string) => void;
  onStateChange?: (state: EditorState) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'standard' | 'template';
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange'>;

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    { maxRows = 3, disabled, value, onChange, placeholder, className, onStateChange, type = 'standard', ...props },
    ref,
  ) => {
    const container = useRef<HTMLDivElement>(null);
    const codeMirror = useRef<EditorView>(null);
    const { token } = theme.useToken();

    const compartment = useMemo(
      () => ({
        zenExtension: new Compartment(),
        theme: new Compartment(),
        maxRows: new Compartment(),
        placeholder: new Compartment(),
        readOnly: new Compartment(),
        updateListener: new Compartment(),
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
            compartment.zenExtension.of(zenExtensions({ type })),
            compartment.updateListener.of(updateListener(onChange, onStateChange)),
            compartment.maxRows.of(maxRowsFilter(maxRows)),
            compartment.theme.of(editorTheme(token.mode === 'dark')),
            compartment.placeholder.of(placeholder ? placeholderExt(placeholder) : []),
            compartment.readOnly.of(EditorView.editable.of(!disabled)),
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
        effects: compartment.maxRows.reconfigure(maxRowsFilter(maxRows)),
      });
    }, [maxRows]);

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

    return <div ref={composeRefs(container, ref)} className={clsx('grl-ce', className)} {...props} />;
  },
);
