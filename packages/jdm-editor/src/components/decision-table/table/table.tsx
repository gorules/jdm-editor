import { PlusOutlined } from '@ant-design/icons';
import type { ColumnDef, Table as ReactTable } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button, Typography, theme } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useRef } from 'react';

import { useDecisionTableActions, useDecisionTableListeners, useDecisionTableState } from '../context/dt-store.context';
import { TableContextMenu } from './table-context-menu';
import { TableDefaultCell } from './table-default-cell';
import {
  TableHeadCellInput,
  TableHeadCellInputField,
  TableHeadCellOutput,
  TableHeadCellOutputField,
} from './table-head-cell';
import { TableHeadRow } from './table-head-row';
import { TableRow } from './table-row';

export type TableProps = {
  maxHeight: string | number;
};

export const Table: React.FC<TableProps> = ({ maxHeight }) => {
  const { token } = theme.useToken();

  const tableActions = useDecisionTableActions();
  const { cellRenderer } = useDecisionTableListeners(({ cellRenderer }) => ({ cellRenderer }));

  const { configurable, disabled, inputs, outputs, colWidth, minColWidth } = useDecisionTableState(
    ({ configurable, disabled, minColWidth, colWidth, decisionTable }) => ({
      configurable,
      disabled,
      minColWidth,
      colWidth,
      inputs: decisionTable.inputs,
      outputs: decisionTable.outputs,
    }),
  );

  const { rules } = useDecisionTableState(
    ({ decisionTable }) => ({
      rules: decisionTable.rules,
    }),
    (prev, curr) =>
      equal(
        prev.rules.map((i: any) => i?._id),
        curr.rules.map((i: any) => i?._id),
      ),
  );

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: minColWidth,
        size: colWidth,
        enableResizing: true,
        header: () => <TableHeadCellInput configurable={configurable} disabled={disabled} />,
        columns: [
          ...(inputs || []).map((input: any) => {
            return {
              accessorKey: input.id,
              id: input.id,
              minSize: minColWidth,
              size: colWidth,
              header: () => <TableHeadCellInputField schema={input} configurable={configurable} disabled={disabled} />,
            };
          }),
        ],
      },
      {
        id: 'outputs',
        minSize: minColWidth,
        size: minColWidth,
        header: () => <TableHeadCellOutput disabled={disabled} configurable={configurable} />,
        columns: [
          ...(outputs || []).map((output: any) => {
            return {
              accessorKey: output.id,
              minSize: minColWidth,
              size: colWidth,
              header: () => (
                <TableHeadCellOutputField schema={output} configurable={configurable} disabled={disabled} />
              ),
            };
          }),
        ],
      },
      {
        id: '_description',
        accessorKey: '_description',
        header: () => <Typography.Text className='grl-dt-text-primary'>Description</Typography.Text>,
        minSize: minColWidth,
        size: colWidth,
      },
    ],
    [configurable, disabled, inputs, outputs],
  );

  const defaultColumn: Partial<ColumnDef<Record<string, string>, string>> = {
    cell: (context) => <TableDefaultCell context={context} />,
  };

  const table = useReactTable({
    data: rules,
    columnResizeMode: 'onChange',
    getRowId: (row) => row._id,
    defaultColumn,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      getCell: cellRenderer,
    },
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableContainerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLDivElement) {
          entry.target.style.setProperty('--dt-container-width', `${entry.contentRect.width}px`);
        }
      }
    });

    resizeObserver.observe(tableContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={tableContainerRef}
      className='grl-dt__container'
      style={{ maxHeight, overflowY: 'auto' }}
      data-theme={token.mode}
    >
      <StyledTable width={table.getCenterTotalSize()}>
        <thead>
          {table
            .getHeaderGroups()
            .filter((_, i) => i === 0)
            .map((headerGroup) => (
              <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
            ))}
        </thead>
      </StyledTable>
      <StyledTable width={table.getCenterTotalSize()}>
        <thead>
          {table
            .getHeaderGroups()
            .filter((_, i) => i === 1)
            .map((headerGroup) => (
              <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
            ))}
        </thead>
        <TableBody tableContainerRef={tableContainerRef} table={table} />
        <tfoot>
          <tr>
            <td colSpan={inputs.length + outputs.length + 2}>
              <Button
                className='grl-dt__add-row'
                type='text'
                disabled={disabled}
                icon={<PlusOutlined />}
                onClick={() => tableActions.addRowBelow()}
              />
            </td>
          </tr>
        </tfoot>
      </StyledTable>
    </div>
  );
};

type TableBodyProps = {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  table: ReactTable<any>;
} & Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'children'>;

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ table, tableContainerRef, ...props }, ref) => {
    const tableActions = useDecisionTableActions();
    const { disabled, cursor } = useDecisionTableState(({ disabled, cursor }) => ({
      disabled,
      cursor,
    }));

    const { rows } = table.getRowModel();
    const virtualizer = useVirtualizer({
      getScrollElement: () => tableContainerRef.current,
      estimateSize: () => 38,
      indexAttribute: 'data-virtual-index',
      count: rows.length,
      overscan: 10,
    });

    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();

    const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
    const paddingBottom = virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0;

    return (
      <TableContextMenu>
        <tbody
          ref={ref}
          {...props}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.code === 'ArrowUp' && (e.metaKey || e.altKey)) {
              if (cursor) tableActions.addRowAbove(cursor.y);
            }
            if (e.code === 'ArrowDown' && (e.metaKey || e.altKey)) {
              if (cursor) tableActions.addRowBelow(cursor.y);
            }
            if (e.code === 'Backspace' && (e.metaKey || e.altKey)) {
              if (cursor) tableActions.removeRow(cursor.y);
            }
          }}
        >
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualItems.map((item) => {
            const row = rows[item.index];

            return (
              <TableRow
                key={row.id}
                virtualItem={item}
                row={row}
                reorderRow={tableActions.swapRows}
                disabled={disabled}
                onResize={(node) => virtualizer.measureElement(node)}
              />
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </TableContextMenu>
    );
  },
);

const StyledTable: React.FC<React.HTMLAttributes<HTMLTableElement> & { width: number }> = ({
  style,
  className,
  width,
  ...props
}) => {
  return <table className={clsx('table', className)} style={{ width, ...style }} {...props} />;
};
