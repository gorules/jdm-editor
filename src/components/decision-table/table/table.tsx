import { PlusOutlined } from '@ant-design/icons'
import { ColumnDef, Row, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Button, Typography, theme } from 'antd'
import clsx from 'clsx'
import React, { memo } from 'react'
import { useVirtual } from 'react-virtual'

import { useDecisionTableStore } from '../context/dt-store.context'
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

export const Table = memo<TableProps>(({ maxHeight }) => {
  const configurable = useDecisionTableStore((store) => store.configurable)
  const disabled = useDecisionTableStore((store) => store.disabled)
  const cellRenderer = useDecisionTableStore((store) => store.cellRenderer)

  const minColWidth = useDecisionTableStore((store) => store.minColWidth)
  const colWidth = useDecisionTableStore((store) => store.colWidth)

  const inputs = useDecisionTableStore((store) => store.decisionTable?.inputs)
  const outputs = useDecisionTableStore((store) => store.decisionTable?.outputs)
  const rules = useDecisionTableStore(
    (store) => store?.decisionTable?.rules,
    (prevState, newState) =>
      (prevState || []).map((rule: any) => rule._id).join('') ===
      (newState || []).map((rule: any) => rule._id).join('')
  )

  const removeRow = useDecisionTableStore((store) => store.removeRow)
  const addRowAbove = useDecisionTableStore((store) => store.addRowAbove)
  const addRowBelow = useDecisionTableStore((store) => store.addRowBelow)
  const swapRows = useDecisionTableStore((store) => store.swapRows)

  const cursor = useDecisionTableStore(
    (store) => store.cursor,
    (prevState, newState) => prevState?.y === newState?.y
  )

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: minColWidth,
        size: colWidth,
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

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    swapRows(draggedRowIndex, targetRowIndex)
  }

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
                    if (e.code === 'ArrowUp' && (e.metaKey || e.altKey)) {
                      if (cursor) addRowAbove(cursor?.y)
                    }
                    if (e.code === 'ArrowDown' && (e.metaKey || e.altKey)) {
                      if (cursor) addRowBelow(cursor?.y)
                    }
                    if (e.code === 'Backspace' && (e.metaKey || e.altKey)) {
                      if (cursor) removeRow(cursor?.y)
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
