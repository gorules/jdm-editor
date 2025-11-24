import type { HighlightStyle } from '@codemirror/language';
import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { highlightTree } from '@lezer/highlight';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import { CodeEditor } from './ce';
import { zenExtensions, zenStyleDark, zenStyleLight } from './extensions/zen';

const STYLE_ID = 'zen-highlight-styles';
const injectStyles = (style: HighlightStyle, theme: 'light' | 'dark') => {
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

export const highlightCode = (
  code: string,
  type: 'standard' | 'unary' | 'template' = 'standard',
  theme: 'light' | 'dark' = 'light',
): string => {
  if (!code) return '';

  try {
    const highlightStyle = theme === 'dark' ? zenStyleDark : zenStyleLight;
    injectStyles(highlightStyle, theme);

    const state = EditorState.create({
      doc: code,
      extensions: [zenExtensions({ type, lint: false })],
    });

    const tree = syntaxTree(state);
    if (!tree || tree.length === 0) return escapeHtml(code);

    let html = '';
    let pos = 0;

    // Use the HighlightStyle's matcher with highlightTree
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

interface HighlightedCodeProps {
  code: string;
  type?: 'standard' | 'unary' | 'template';
  theme?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({
  code,
  type = 'standard',
  theme = 'light',
  className,
  onClick,
}) => {
  const highlighted = useMemo(() => highlightCode(code, type, theme), [code, type, theme]);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={clsx('grl-ce-highlighter', 'no-style', className)}
      onClick={onClick}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {isFocused ? <CodeEditor noStyle value={code} /> : <span dangerouslySetInnerHTML={{ __html: highlighted }} />}
    </div>
  );
};
