import type { CellContext } from '@tanstack/react-table';
import React, { memo, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { columnIdSelector } from '../../../helpers/components';
import type { TableSchemaItem } from '../context/dt-store.context';
import { useDecisionTableStore } from '../context/dt-store.context';

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>;
} & React.HTMLAttributes<HTMLDivElement>;

export const TableDefaultCell = memo<TableDefaultCellProps>(({ context, ...props }) => {
  const {
    row: { index },
    column: { id },
    table,
  } = context;
  const value = useDecisionTableStore((store: any) => store.decisionTable?.rules?.[index]?.[id], shallow);

  const [inner, setInner] = useState(value);
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value);
    }
  }, [value]);

  const column = useDecisionTableStore(
    columnIdSelector(id),
    (a, b) => a?.id !== undefined && b?.id !== undefined && a?.id === b?.id,
  );

  const disabled = useDecisionTableStore((store) => store.disabled, shallow);
  const commitData = useDecisionTableStore((store) => store.commitData, shallow);
  const setCursor = useDecisionTableStore((store) => store.setCursor, shallow);

  const commit = (val: string) => {
    setInner(val);
    commitData(val, {
      x: id,
      y: index,
    });
  };

  return (
    <div className='cell-wrapper' onFocus={() => setCursor({ x: id, y: index })} {...props}>
      {(table.options.meta as any)?.getCell?.({
        disabled,
        column,
        value: inner,
        onChange: commit,
      }) || <TableInputCell disabled={disabled} column={column} value={inner} onChange={commit} />}
    </div>
  );
});

export type TableCellProps = {
  column?: { colType: string } & TableSchemaItem;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const recalculateRows = (node: HTMLTextAreaElement) => {
  const computedStyles = getComputedStyle(node);
  const lineHeight = parseInt(computedStyles.lineHeight);
  const paddingTop = parseInt(computedStyles.paddingTop);
  const paddingBottom = parseInt(computedStyles.paddingBottom);

  node.rows = 1;

  const contentHeight = node.scrollHeight - paddingTop - paddingBottom;
  const calculatedRows = Math.floor(contentHeight / lineHeight);

  node.rows = Math.min(calculatedRows, 3);
};

const TableInputCell: React.FC<TableCellProps> = ({ value, onChange, disabled }) => {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) {
        return;
      }

      recalculateRows(entries[0].target as HTMLTextAreaElement);
    });

    const parentContainer = textareaRef.current.closest('div.cell-wrapper')! as HTMLElement;
    const eventListener = (e: Event) => {
      if (e.target === textareaRef.current || !textareaRef.current) {
        return;
      }

      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    };

    parentContainer.style.cursor = 'text';
    parentContainer.addEventListener('click', eventListener);
    resizeObserver.observe(textareaRef.current);

    return () => {
      parentContainer.style.cursor = '';
      parentContainer.removeEventListener('click', eventListener);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    recalculateRows(textareaRef.current);
  }, [value]);

  return (
    <textarea
      id={id}
      className={'grl-dt__cell__input textarea-input'}
      ref={textareaRef}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
