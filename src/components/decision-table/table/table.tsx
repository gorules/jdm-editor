import { PlusOutlined } from '@ant-design/icons'
import {
  ColumnDef,
  Table as ReactTable,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Button, Typography, theme } from 'antd'
import clsx from 'clsx'
import equal from 'fast-deep-equal/es6/react'
import React, { memo, useRef } from 'react'

import { useDecisionTableStore } from '../context/dt-store.context'
import { TableDefaultCell } from './table-default-cell'
import {
  TableHeadCellInput,
  TableHeadCellInputField,
  TableHeadCellOutput,
  TableHeadCellOutputField,
} from './table-head-cell'
import { TableHeadRow } from './table-head-row'
import { TableRow } from './table-row'


export type TableProps = {
  maxHeight: string | number
}

export const Table = memo<TableProps>(({ maxHeight }) => {
  const {
    configurable,
    disabled,
    cellRenderer,
    minColWidth,
    colWidth,
    addRowBelow,
    inputs,
    outputs,
  } = useDecisionTableStore(
    ({
      configurable,
      disabled,
      cellRenderer,
      minColWidth,
      colWidth,
      addRowBelow,
      decisionTable,
    }) => ({
      configurable,
      disabled,
      cellRenderer,
      minColWidth,
      colWidth,
      addRowBelow,
      inputs: decisionTable.inputs,
      outputs: decisionTable.outputs,
    }),
    equal
  )

  const { rules } = useDecisionTableStore(
    ({ decisionTable }) => ({
      rules: decisionTable.rules,
    }),
    (prev, curr) =>
      equal(
        prev.rules.map((i: any) => i?._id),
        curr.rules.map((i: any) => i?._id)
      )
  )

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: minColWidth,
        size: colWidth,
        enableResizing: false,
        header: () => <TableHeadCellInput configurable={configurable} disabled={disabled} />,
        columns: [
          ...(inputs || []).map((input: any) => {
            return {
              accessorKey: input.id,
              id: input.id,
              minSize: minColWidth,
              size: colWidth,
              header: () => (
                <TableHeadCellInputField
                  schema={input}
                  configurable={configurable}
                  disabled={disabled}
                />
              ),
            }
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
                <TableHeadCellOutputField
                  schema={output}
                  configurable={configurable}
                  disabled={disabled}
                />
              ),
            }
          }),
        ],
      },
      {
        id: '_description',
        accessorKey: '_description',
        header: () => <Typography.Text>Description</Typography.Text>,
        minSize: minColWidth,
        size: colWidth,
      },
    ],
    [configurable, disabled, inputs, outputs]
  )

  const defaultColumn: Partial<ColumnDef<Record<string, string>, string>> = {
    cell: (context) => <TableDefaultCell context={context} />,
  }

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
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={tableContainerRef}
      className='grl-dt__container'
      style={{ maxHeight, overflowY: 'auto' }}
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
                type='link'
                disabled={disabled}
                icon={<PlusOutlined />}
                onClick={() => addRowBelow()}
              >
                Add row
              </Button>
            </td>
          </tr>
        </tfoot>
      </StyledTable>
    </div>
  )
})

type TableBodyProps = {
  tableContainerRef: React.RefObject<HTMLDivElement>
  table: ReactTable<any>
} & Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'children'>

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ table, tableContainerRef, ...props }, ref) => {
    const { disabled, cursor, addRowAbove, addRowBelow, removeRow, swapRows } =
      useDecisionTableStore(
        ({ disabled, cursor, addRowAbove, addRowBelow, removeRow, swapRows }) => ({
          disabled,
          cursor,
          addRowAbove,
          addRowBelow,
          removeRow,
          swapRows,
        }),
        equal
      )

    const { rows } = table.getRowModel()
    const virtualizer = useVirtualizer({
      getScrollElement: () => tableContainerRef.current,
      estimateSize: () => 38,
      count: rows.length,
      overscan: 10,
    })

    const virtualItems = virtualizer.getVirtualItems()
    const totalSize = virtualizer.getTotalSize()

    const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0
    const paddingBottom =
      virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0

    return (
      <tbody
        ref={ref}
        {...props}
        onKeyDown={(e) => {
          if (disabled) {
            return
          }

          if (e.code === 'ArrowUp' && (e.metaKey || e.altKey)) {
            if (cursor) addRowAbove(cursor.y)
          }
          if (e.code === 'ArrowDown' && (e.metaKey || e.altKey)) {
            if (cursor) addRowBelow(cursor.y)
          }
          if (e.code === 'Backspace' && (e.metaKey || e.altKey)) {
            if (cursor) removeRow(cursor.y)
          }
        }}
      >
        {paddingTop > 0 && (
          <tr>
            <td style={{ height: `${paddingTop}px` }} />
          </tr>
        )}
        {virtualItems.map((item) => {
          const row = rows[item.index]

          return (
            <TableRow
              key={row.id}
              index={item.index}
              row={row}
              reorderRow={swapRows}
              disabled={disabled}
            />
          )
        })}
        {paddingBottom > 0 && (
          <tr>
            <td style={{ height: `${paddingBottom}px` }} />
          </tr>
        )}
      </tbody>
    )
  }
)

const StyledTable: React.FC<React.HTMLAttributes<HTMLTableElement> & { width: number }> = ({
  style,
  className,
  width,
  ...props
}) => {
  const { token } = theme.useToken()

  return (
    <table
      className={clsx('table', className)}
      style={
        {
          width,
          '--border-color': token.colorBorder,
          '--primary-color': token.colorPrimary,
          '--primary-color-bg': token.colorPrimaryBg,
          '--color-bg-layout': token.colorBgLayout,
          '--color-bg-elevated': token.colorBgElevated,
          '--color-bg-container': token.colorBgContainer,
          '--color-text': token.colorText,
          '--font-family': token.fontFamily,
          '--line-height': token.lineHeight,
          ...style,
        } as any
      }
      {...props}
    />
  )
}