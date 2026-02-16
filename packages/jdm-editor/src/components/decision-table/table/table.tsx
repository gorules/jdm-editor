import { PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnDef, ColumnFiltersState, Table as ReactTable } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button, Typography, theme } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

import { DecisionTableFilterProvider } from '../context/dt-filter.context';
import { useDecisionTableActions, useDecisionTableListeners, useDecisionTableState } from '../context/dt-store.context';
import { TableContextMenu } from './table-context-menu';
import { TableColumnFilter } from './table-column-filter';
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
  id?: string;
  maxHeight: string | number;
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
};

type ColumnSizing = Record<string, number>;

const columnSizeKey = (id: string) => `jdm-editor:decisionTable:columns:${id}`;

const loadColumnSizing = (id?: string) => {
  if (!id) {
    return {};
  }

  try {
    const sizeData = localStorage.getItem(columnSizeKey(id));
    const jsonData = JSON.parse(sizeData ?? '{}');
    return z.record(z.string(), z.number()).parse(jsonData);
  } catch {
    return {};
  }
};

const globalFilterFn = (row: any, _columnId: string, filterValue: string) => {
  if (!filterValue || typeof filterValue !== 'string') return true;
  const q = filterValue.toLowerCase().trim();
  if (!q) return true;
  const obj = row.original as Record<string, unknown>;
  return Object.values(obj).some((v) => String(v ?? '').toLowerCase().includes(q));
};

const columnFilterInArrayFn = (row: any, columnId: string, filterValue: unknown) => {
  const selected = Array.isArray(filterValue) ? filterValue : filterValue != null ? [String(filterValue)] : [];
  if (selected.length === 0) return true;
  const cell = String(row.getValue(columnId) ?? '');
  return selected.includes(cell);
};

export const Table: React.FC<TableProps> = ({ id, maxHeight, globalFilter = '', setGlobalFilter }) => {
  const { token } = theme.useToken();

  const tableActions = useDecisionTableActions();
  const { cellRenderer } = useDecisionTableListeners(({ cellRenderer }) => ({ cellRenderer }));
  const [columnSizing, setColumnSizing] = useState<ColumnSizing>(() => loadColumnSizing(id));
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { permission, disabled, inputs, outputs, colWidth, minColWidth } = useDecisionTableState(
    ({ permission, disabled, minColWidth, colWidth, decisionTable }) => ({
      permission,
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

  /** Chunk size for async unique-value computation; yields to main thread between chunks */
  const UNIQUE_VALUES_CHUNK_SIZE = 10000;

  const getUniqueValuesAsync = useCallback(
    (columnId: string): Promise<{ values: string[] }> => {
      const list = rules ?? [];
      const set = new Set<string>();

      const processChunk = (start: number): Promise<void> => {
        const end = Math.min(start + UNIQUE_VALUES_CHUNK_SIZE, list.length);
        for (let i = start; i < end; i++) {
          const v = list[i][columnId];
          set.add(String(v ?? ''));
        }
        if (end >= list.length) return Promise.resolve();
        return new Promise<void>((r) => setTimeout(r, 0)).then(() => processChunk(end));
      };

      return processChunk(0).then(() => {
        const values = Array.from(set).sort((a, b) =>
          a === '' ? 1 : b === '' ? -1 : a.localeCompare(b),
        );
        return { values };
      });
    },
    [rules],
  );

  const filterContextValue = useMemo(
    () => ({
      globalFilter: globalFilter ?? '',
      setGlobalFilter: setGlobalFilter ?? (() => {}),
      columnFilters,
      setColumnFilters,
      getUniqueValuesAsync,
    }),
    [globalFilter, setGlobalFilter, columnFilters, getUniqueValuesAsync],
  );

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: minColWidth,
        size: colWidth,
        enableResizing: true,
        header: () => <TableHeadCellInput permission={permission} disabled={disabled} />,
        columns: [
          ...(inputs || []).map((input: any) => {
            return {
              accessorKey: input.id,
              id: input.id,
              minSize: minColWidth,
              size: colWidth,
              filterFn: columnFilterInArrayFn,
              header: () => <TableHeadCellInputField schema={input} permission={permission} disabled={disabled} />,
            };
          }),
        ],
      },
      {
        id: 'outputs',
        minSize: minColWidth,
        size: minColWidth,
        header: () => <TableHeadCellOutput disabled={disabled} permission={permission} />,
        columns: [
          ...(outputs || []).map((output: any) => {
            return {
              accessorKey: output.id,
              id: output.id,
              minSize: minColWidth,
              size: colWidth,
              filterFn: columnFilterInArrayFn,
              header: () => <TableHeadCellOutputField schema={output} permission={permission} disabled={disabled} />,
            };
          }),
        ],
      },
      {
        id: '_description',
        accessorKey: '_description',
        filterFn: columnFilterInArrayFn,
        header: () => (
          <div className={'head-cell head-cell--with-filter'}>
            <Typography.Text className='grl-dt-text-primary'>Description</Typography.Text>
            <TableColumnFilter columnId="_description" columnName="Description" disabled={disabled} />
          </div>
        ),
        minSize: minColWidth,
        size: colWidth,
      },
    ],
    [permission, disabled, inputs, outputs],
  );

  const table = useReactTable({
    data: rules,
    columnResizeMode: 'onChange',
    getRowId: (row) => row._id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    defaultColumn: {
      cell: (context) => <TableDefaultCell context={context} />,
    },
    meta: {
      getCell: cellRenderer,
    },
    state: {
      ...(id ? { columnSizing } : {}),
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter ? (updater) => setGlobalFilter(typeof updater === 'function' ? updater(globalFilter) : updater) : undefined,
    onColumnFiltersChange: setColumnFilters,
    ...(id ? { onColumnSizingChange: setColumnSizing } : {}),
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

  useEffect(() => {
    if (!id) {
      return;
    }

    setColumnSizing(loadColumnSizing(id));
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    localStorage.setItem(columnSizeKey(id), JSON.stringify(columnSizing));
  }, [columnSizing]);

  return (
    <DecisionTableFilterProvider value={filterContextValue}>
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
        <TableContextMenu>
          <TableBody tableContainerRef={tableContainerRef} table={table} />
        </TableContextMenu>
        <tfoot>
          <tr>
            <td colSpan={inputs.length + outputs.length + 2}>
              <div className='grl-dt__add-row-wrapper'>
                <Button
                  className='grl-dt__add-row'
                  type='link'
                  disabled={disabled}
                  icon={<PlusCircleOutlined />}
                  onClick={() => tableActions.addRowBelow()}
                >
                  Add row
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </StyledTable>
      </div>
    </DecisionTableFilterProvider>
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
      overscan: 5,
    });

    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();

    const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
    const paddingBottom = virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0;

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
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
    }, []);

    return (
      <tbody ref={ref} {...props} onKeyDown={onKeyDown}>
        {paddingTop > 0 && (
          <tr>
            <td style={{ height: `${paddingTop}px` }} />
          </tr>
        )}
        {virtualItems.map((item) => {
          const row = rows[item.index];

          return (
            <TableRow
              key={item.key}
              virtualItem={item}
              row={row}
              disabled={disabled}
              onResize={virtualizer.measureElement}
            />
          );
        })}
        {paddingBottom > 0 && (
          <tr>
            <td style={{ height: `${paddingBottom}px` }} />
          </tr>
        )}
      </tbody>
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
