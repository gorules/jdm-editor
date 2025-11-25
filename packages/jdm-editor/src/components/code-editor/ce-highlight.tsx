import { syntaxTree } from '@codemirror/language';
import type { Diagnostic } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import { createVariableType } from '@gorules/zen-engine-wasm';
import { highlightCode as lzHighlightCode } from '@lezer/highlight';
import { theme } from 'antd';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { P, match } from 'ts-pattern';

import { isWasmAvailable } from '../../helpers/wasm';
import type { CodeEditorBaseProps } from './ce-base';
import { escapeHtml, renderDiagnosticMessage } from './extensions/diagnostic';
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
  placeholder?: string;
};

export const highlightCode = ({
  code,
  theme = 'light',
  type = 'standard',
  placeholder,
}: HighlightCodeParams): string => {
  if (!code.trim()) {
    return `<span class="cm-line">${placeholder ? `<span class="cm-placeholder">${placeholder}</span>` : '<br />'}</span>`;
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

    let html = '<span class="cm-line"><span class="cm-lintRange">';

    lzHighlightCode(
      code,
      tree,
      highlightStyle,
      (text, classes) => {
        if (classes) {
          html += `<span class="${classes}">${escapeHtml(text)}</span>`;
        } else {
          html += escapeHtml(text);
        }
      },
      () => {
        html += '\n</span></span><span class="cm-line"><span class="cm-lintRange">';
      },
    );

    html += '</span></span>';

    return html;
  } catch (error) {
    console.warn('Syntax highlighting failed:', error);
    return escapeHtml(code);
  }
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
      placeholder,
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
    const [tooltip, setTooltip] = useState<{ x: number; y: number; diagnostics: Diagnostic[] } | null>(null);
    const [diagnostics, setDiagnostics] = useState<Diagnostic[] | null>(null);
    const [, startTransition] = useTransition();

    useEffect(() => {
      injectStyles(token.mode);
    }, [token.mode]);

    useEffect(() => {
      if (!diagnostics?.length) {
        setTooltip(null);
      }
    }, [diagnostics]);

    const highlighted = useMemo(
      () => highlightCode({ code: value ?? '', type, theme: token.mode, placeholder }),
      [value, type, token.mode, placeholder],
    );

    useEffect(() => {
      if (!value || !value.trim() || !lint || !isWasmAvailable()) {
        setDiagnostics(null);
        return;
      }

      startTransition(() => {
        const types = match([type, variableType])
          .with(['unary', P.nonNullable], () => createVariableType(variableType).typeCheckUnary(value))
          .with(['standard', P.nonNullable], () => createVariableType(variableType).typeCheck(value))
          .otherwise(() => []);

        setDiagnostics(
          validateZenExpression({
            source: value,
            expectedVariableType,
            expressionType: type as 'standard',
            strict,
            types,
          }),
        );
      });
    }, [value, lint, variableType, expectedVariableType, type, strict]);

    const diagnosticSeverity = useMemo(() => {
      if (!diagnostics) {
        return undefined;
      }

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

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent) => {
        if (!diagnostics?.length) return;

        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        setTooltip({
          x: rect.left,
          y: rect.bottom,
          diagnostics,
        });
      },
      [diagnostics],
    );

    const handleMouseLeave = useCallback(() => {
      setTooltip(null);
    }, []);

    return (
      <div
        ref={ref}
        tabIndex={0}
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
            <div
              className={clsx('cm-content', 'cm-lineWrapping')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
          {tooltip && (
            <div
              className='cm-tooltip-hover cm-tooltip cm-tooltip-below'
              style={{
                position: 'fixed',
                top: `${tooltip.y}px`,
                left: `${tooltip.x}px`,
              }}
            >
              <ul className='cm-tooltip-lint cm-tooltip-section'>
                {tooltip.diagnostics.map((diagnostic, idx) => (
                  <li key={idx} className={`cm-diagnostic cm-diagnostic-${diagnostic.severity}`}>
                    <span className='cm-diagnosticText'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderDiagnosticMessage({
                            text: diagnostic.message,
                            className: 'cm-diagnosticMessageToken',
                          }),
                        }}
                      />
                    </span>
                    {diagnostic.source && <div className='cm-diagnosticSource'>{diagnostic.source}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  },
);
