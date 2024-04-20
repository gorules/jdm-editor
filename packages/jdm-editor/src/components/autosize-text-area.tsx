import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { composeRefs } from '../helpers/compose-refs';

export type AutosizeTextAreaProps = {
  maxRows: number;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const recalculateRows = (node: HTMLTextAreaElement, maxRows: number) => {
  const computedStyles = getComputedStyle(node);
  const lineHeight = parseInt(computedStyles.lineHeight);
  const paddingTop = parseInt(computedStyles.paddingTop);
  const paddingBottom = parseInt(computedStyles.paddingBottom);

  node.rows = 1;

  const contentHeight = node.scrollHeight - paddingTop - paddingBottom;
  const calculatedRows = Math.floor(contentHeight / lineHeight);

  node.rows = Math.min(Math.max(calculatedRows, 1), maxRows);
};

export const AutosizeTextArea = React.forwardRef<HTMLTextAreaElement, AutosizeTextAreaProps>(
  ({ maxRows, className, value, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (!textareaRef.current) {
        return;
      }

      recalculateRows(textareaRef.current, maxRows);
    }, [value, maxRows]);

    useEffect(() => {
      if (!textareaRef.current) {
        return;
      }

      const observerCallback: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
        window.requestAnimationFrame((): void | undefined => {
          if (!Array.isArray(entries) || entries.length === 0) {
            return;
          }

          recalculateRows(entries[0].target as HTMLTextAreaElement, maxRows);
        });
      };

      const resizeObserver = new ResizeObserver(observerCallback);
      resizeObserver.observe(textareaRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [maxRows]);

    return (
      <textarea
        className={clsx('grl-textarea-input', className)}
        ref={composeRefs(textareaRef, ref)}
        value={value}
        {...props}
      />
    );
  },
);
