import type { CellContext } from '@tanstack/react-table';
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import { columnIdSelector } from '../../../helpers/components';
import { AutosizeTextArea } from '../../autosize-text-area';
import { LocalCodeEditor } from '../../code-editor/local-ce';
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

  const commit = useCallback(
    (val: string) => {
      setInner(val);
      tableActions.commitData(val, { x: id, y: index });
    },
    [tableActions, setInner],
  );

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

const TableInputCell: React.FC<TableCellProps> = ({ column, value, onChange, disabled }) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const textareaRef = useRef<HTMLTextAreaElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    const parentContainer = textareaRef.current.closest('div.cell-wrapper')! as HTMLElement;
    const eventListener = (e: Event) => {
      if (e.target === textareaRef.current || !textareaRef.current) {
        return;
      }

      if ('selectionStart' in textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.value.length;
      } else {
        textareaRef.current.querySelector<HTMLDivElement>('.cm-editor')!.focus();
      }
    };

    parentContainer.style.cursor = 'text';
    parentContainer.addEventListener('click', eventListener);

    return () => {
      parentContainer.style.cursor = '';
      parentContainer.removeEventListener('click', eventListener);
    };
  }, []);

  if (!column) {
    return (
      <AutosizeTextArea
        id={id}
        ref={textareaRef as any}
        className='grl-dt__cell__input'
        maxRows={3}
        value={value}
        disabled={disabled}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <LocalCodeEditor
      ref={textareaRef as any}
      id={id}
      type={match(column.colType)
        .with('input', () => 'unary' as const)
        .otherwise(() => 'standard' as const)}
      className='grl-dt__cell__input'
      maxRows={3}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
