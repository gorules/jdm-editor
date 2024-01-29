import type { CellContext } from '@tanstack/react-table';
import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { columnIdSelector } from '../../../helpers/components';
import { AutosizeTextArea } from '../../autosize-text-area';
import { type TableSchemaItem, useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>;
} & React.HTMLAttributes<HTMLDivElement>;

export const TableDefaultCell = memo<TableDefaultCellProps>(({ context, ...props }) => {
  const {
    row: { index },
    column: { id },
    table,
  } = context;

  const tableActions = useDecisionTableActions();
  const { disabled, value } = useDecisionTableState(({ decisionTable, disabled }) => ({
    value: decisionTable?.rules?.[index]?.[id],
    disabled,
  }));

  const column = useDecisionTableState(
    columnIdSelector(id),
    (a, b) => a?.id !== undefined && b?.id !== undefined && a?.id === b?.id,
  );

  const [inner, setInner] = useState(value);
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value);
    }
  }, [value]);

  const commit = (val: string) => {
    setInner(val);
    tableActions.commitData(val, { x: id, y: index });
  };

  return (
    <div
      className='cell-wrapper'
      onFocus={() => tableActions.setCursor({ x: id, y: index })}
      onContextMenu={() => tableActions.setCursor({ x: id, y: index })}
      {...props}
    >
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

const TableInputCell: React.FC<TableCellProps> = ({ value, onChange, disabled }) => {
  const id = useMemo(() => v4(), []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

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

    return () => {
      parentContainer.style.cursor = '';
      parentContainer.removeEventListener('click', eventListener);
    };
  }, []);

  return (
    <AutosizeTextArea
      id={id}
      ref={textareaRef}
      className='grl-dt__cell__input'
      maxRows={3}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
