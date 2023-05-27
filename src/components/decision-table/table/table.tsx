import { PlusOutlined } from '@ant-design/icons'
import { ColumnDef, Row, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Button, Typography, theme } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useVirtual } from 'react-virtual'

import { useDecisionTable } from '../context/dt.context'
import { TableContextMenu } from './table-context-menu'
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

export const Table: React.FC<TableProps> = ({ maxHeight }) => {
  const {
    configurable,
    disabled,
    inputs,
    outputs,
    value,
    commitData,
    swapRows,
    setCursor,
    addRowBelow,
    cellRenderer,
    addRowAbove,
    cursor,
    removeRow,
    minColWidth,
  } = useDecisionTable()

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: minColWidth,
        size: minColWidth,
        header: () => <TableHeadCellInput configurable={configurable} disabled={disabled} />,
        columns: [
          ...inputs.map((input) => {
            return {
              accessorKey: input.id,
              id: input.id,
              minSize: minColWidth,
              size: minColWidth,
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
          ...outputs.map((output) => {
            return {
              accessorKey: output.id,
              minSize: minColWidth,
              size: minColWidth,
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
      },
    ],
    [configurable, disabled, inputs, outputs]
  )

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    swapRows(draggedRowIndex, targetRowIndex)
  }

  const defaultColumn: Partial<ColumnDef<Record<string, string>, string>> = {
    cell: (context) => <TableDefaultCell context={context} />,
  }

  const table = useReactTable({
    data: value.rules,
    columnResizeMode: 'onChange',
    getRowId: (row) => row._id,
    defaultColumn,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      getCell: cellRenderer,
      updateData: (rowIndex: number, columnId: string, value: any) => {
        commitData(value, {
          x: columnId,
          y: rowIndex,
        })
      },
      setCursor: (x: string, y: number) => {
        setCursor({
          x,
          y,
        })
      },
    },
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 30,
  })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

  return (
    <div
      ref={tableContainerRef}
      className='grl-dt__container'
      style={{ maxHeight, overflowY: 'auto' }}
    >
      <StyledTable width={table.getCenterTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup, id) => {
            if (id !== 0) return null
            return <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
          })}
        </thead>
      </StyledTable>
      <StyledTable width={table.getCenterTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup, id) => {
            if (id === 0) return null
            return <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
          })}
        </thead>
        <TableContextMenu>
          <tbody
            onKeyDown={
              disabled
                ? undefined
                : (e) => {
                    if (cursor === null) return
                    if (e.code === 'ArrowUp' && (e.metaKey || e.altKey)) {
                      addRowAbove(cursor.y)
                    }
                    if (e.code === 'ArrowDown' && (e.metaKey || e.altKey)) {
                      addRowBelow(cursor.y)
                    }
                    if (e.code === 'Backspace' && (e.metaKey || e.altKey)) {
                      if (e.metaKey || e.altKey) {
                        removeRow(cursor.y)
                      }
                    }
                  }
            }
          >
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Record<string, string>>
              return (
                <TableRow
                  key={row.id}
                  index={virtualRow.index}
                  row={row}
                  reorderRow={reorderRow}
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
        </TableContextMenu>
        <tfoot>
          <tr>
            <td colSpan={inputs.length + outputs.length + 2}>
              <Button
                type='link'
                disabled={disabled}
                icon={<PlusOutlined />}
                onClick={() => addRowBelow(value.rules.length - 1)}
              >
                Add row
              </Button>
            </td>
          </tr>
        </tfoot>
      </StyledTable>
    </div>
  )
}

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
          ...style,
        } as any
      }
      {...props}
    />
  )
}
