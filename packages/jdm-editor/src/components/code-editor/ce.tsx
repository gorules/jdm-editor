import React, { useCallback, useRef, useState } from 'react';

import { composeRefs } from '../../helpers/compose-refs';
import type { CodeEditorBaseProps, CodeEditorBaseRef } from './ce-base';
import { CodeEditorBase } from './ce-base';
import { CodeHighlighter } from './ce-highlight';
import './ce.scss';

export type CodeEditorRef = CodeEditorBaseRef;

export type CodeEditorProps = CodeEditorBaseProps & {
  lazy?: boolean;
};

const getCursorPositionFromClick = (
  event: React.MouseEvent,
  containerElement: HTMLElement,
): CodeEditorProps['initialSelection'] | null => {
  const selection = document.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    const startRange = document.createRange();
    startRange.selectNodeContents(containerElement);
    startRange.setEnd(range.startContainer, range.startOffset);

    const endRange = document.createRange();
    endRange.selectNodeContents(containerElement);
    endRange.setEnd(range.endContainer, range.endOffset);

    return {
      anchor: startRange.toString().length,
      head: endRange.toString().length,
    };
  }

  const position = document.caretPositionFromPoint(event.clientX, event.clientY);
  if (!position) {
    return null;
  }

  const preRange = document.createRange();
  preRange.selectNodeContents(containerElement);
  preRange.setEnd(position.offsetNode, position.offset);

  return { anchor: preRange.toString().length };
};

type EditorState = { type: 'lazy' } | { type: 'edit'; initialSelection?: CodeEditorProps['initialSelection'] };

export const CodeEditor = React.forwardRef<CodeEditorRef, CodeEditorProps>(
  ({ lazy = false, value = '', type = 'standard', disabled, onBlur, ...props }, ref) => {
    const [editorState, setEditorState] = useState<EditorState>(() => (lazy ? { type: 'lazy' } : { type: 'edit' }));
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (disabled || editorState.type !== 'lazy') return;

        const selection = containerRef.current
          ? (getCursorPositionFromClick(event, containerRef.current) ?? undefined)
          : undefined;

        setEditorState({ type: 'edit', initialSelection: selection });
      },
      [disabled, editorState.type],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement, HTMLDivElement>) => {
        onBlur?.(e);

        if (lazy) {
          setEditorState({ type: 'lazy' });
        }
      },
      [lazy, onBlur],
    );

    if (editorState.type === 'edit' || !lazy) {
      return (
        <CodeEditorBase
          ref={ref}
          value={value}
          type={type}
          disabled={disabled}
          onBlur={handleBlur}
          initialSelection={editorState.type === 'edit' ? editorState.initialSelection : undefined}
          {...props}
        />
      );
    }

    return (
      <CodeHighlighter
        ref={composeRefs(containerRef, ref)}
        type={type}
        value={value}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      />
    );
  },
);
