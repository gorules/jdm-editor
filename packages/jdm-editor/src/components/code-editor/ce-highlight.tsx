import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { createVariableType } from '@gorules/zen-engine-wasm';
import { highlightTree } from '@lezer/highlight';
import { theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { P, match } from 'ts-pattern';

import { isWasmAvailable } from '../../helpers/wasm';
import type { CodeEditorBaseProps } from './ce-base';
import { validateZenExpression } from './extensions/linter';
import { zenExtensions, zenStyleDark, zenStyleLight } from './extensions/zen';

const STYLE_ID = 'zen-highlight-styles';
const injectStyles = (theme: 'light' | 'dark') => {
  const style = theme === 'dark' ? zenStyleDark : zenStyleLight;
  const id = `${STYLE_ID}-${theme}`;
  if (typeof document === 'undefined' || document.getElementById(id)) {
    return;
  }

  if (style.module) {
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = style.module.getRules();

    document.head.appendChild(styleEl);
  }
};

type HighlightCodeParams = {
  code: string;
  type?: 'standard' | 'unary' | 'template';
  theme?: 'light' | 'dark';
};

export const highlightCode = ({ code, theme = 'light', type = 'standard' }: HighlightCodeParams): string => {
  if (!code.trim()) {
    return '';
  }

  try {
    const highlightStyle = theme === 'dark' ? zenStyleDark : zenStyleLight;
    const state = EditorState.create({
      doc: code,
      extensions: [zenExtensions({ type, lazy: true })],
    });

    const tree = syntaxTree(state);
    if (!tree || tree.length === 0) {
      return escapeHtml(code);
    }

    let html = '';
    let pos = 0;

    highlightTree(tree, highlightStyle, (from, to, classes) => {
      if (from > pos) {
        html += escapeHtml(code.slice(pos, from));
      }

      const tokenText = code.slice(from, to);
      if (classes) {
        html += `<span class="${classes}">${escapeHtml(tokenText)}</span>`;
      } else {
        html += escapeHtml(tokenText);
      }

      pos = to;
    });

    if (pos < code.length) {
      html += escapeHtml(code.slice(pos));
    }

    return html;
  } catch (error) {
    console.warn('Syntax highlighting failed:', error);
    return escapeHtml(code);
  }
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>');
};

export type CodeHighlighterProps = CodeEditorBaseProps;

export const CodeHighlighter = React.forwardRef<HTMLDivElement, CodeHighlighterProps>(
  (
    {
      noStyle = false,
      fullHeight = false,
      strict = false,
      maxRows,
      value,
      className,
      type = 'standard',
      variableType,
      expectedVariableType,
      lint = true,
      placeholder: _placeholder,
      extension: _extension,
      initialSelection: _initialSelection,
      onStateChange: _onStateChange,
      disabled: _disabled,
      onChange: _onChange,
      style = {},
      ...props
    },
    ref,
  ) => {
    const { token } = theme.useToken();

    useEffect(() => {
      injectStyles(token.mode);
    }, [token.mode]);

    const highlighted = useMemo(
      () => highlightCode({ code: value ?? '', type, theme: token.mode }),
      [value, type, token.mode],
    );

    const diagnostics = useMemo(() => {
      if (!value || !value.trim() || !lint || !isWasmAvailable()) {
        return [];
      }

      const types = match([type, variableType])
        .with(['unary', P.nonNullable], () => createVariableType(variableType).typeCheckUnary(value))
        .with(['standard', P.nonNullable], () => createVariableType(variableType).typeCheck(value))
        .otherwise(() => []);

      return validateZenExpression({
        source: value,
        expectedVariableType,
        expressionType: type as 'standard',
        strict,
        types,
      });
    }, [value, lint, variableType, expectedVariableType, type, strict]);

    const diagnosticSeverity = useMemo(() => {
      if (diagnostics.some((d) => d.severity === 'error')) {
        return 'error';
      } else if (diagnostics.some((d) => d.severity === 'warning')) {
        return 'warning';
      } else if (diagnostics.some((d) => d.severity === 'info')) {
        return 'info';
      } else if (diagnostics.some((d) => d.severity === 'hint')) {
        return 'hint';
      }

      return undefined;
    }, [diagnostics]);

    return (
      <div
        ref={ref}
        className={clsx(
          'grl-ce',
          'grl-ce-highlighter',
          noStyle && 'no-style',
          maxRows && !fullHeight && 'max-rows',
          fullHeight && 'full-height',
          className,
        )}
        style={{ '--editorMaxRows': maxRows, ...style } as any}
        {...props}
      >
        <div className={clsx('cm-editor')} data-severity={diagnosticSeverity}>
          <div className={clsx('cm-scroller')}>
            <div className={clsx('cm-content', 'cm-lineWrapping')}>
              <div className={clsx('cm-line')} dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
