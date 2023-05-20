import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  HeaderGroup,
} from '@tanstack/react-table'
import { Button, Dropdown, Modal, theme, Typography } from 'antd'
import React from 'react'
import { useVirtual } from 'react-virtual'

import { Stack } from '../stack'
import { useDecisionTableDialog } from './dt-dialog.context'
import { useDecisionTable } from './dt.context'
import { TableContextMenu } from './table-context-menu'
import { DefaultCell } from './table-default-cell'
import { TableRow } from './table-row'
import clsx from 'clsx'

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
    removeColumn,
    commitData,
    swapRows,
    setCursor,
    addRowBelow,
    cellRenderer,
  } = useDecisionTable()
  const { setDialog } = useDecisionTableDialog()

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        minSize: 200,
        size: 200,
        header: () => (
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
          >
            <Typography.Text>Inputs</Typography.Text>
            {configurable && !disabled && (
              <div>
                {inputs?.length > 1 && (
                  <Button
                    size={'small'}
                    type={'link'}
                    disabled={disabled}
                    onClick={() => {
                      setDialog({
                        type: 'reorder',
                        columnType: 'inputs',
                        item: null,
                      })
                    }}
                  >
                    Reorder
                  </Button>
                )}
                <Button
                  size={'small'}
                  type={'link'}
                  disabled={disabled}
                  onClick={() => {
                    setDialog({
                      type: 'add',
                      columnType: 'inputs',
                      item: null,
                    })
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </Stack>
        ),
        columns: [
          ...inputs.map((input) => {
            return {
              accessorKey: input.id,
              id: input.id,
              minSize: 200,
              size: 200,
              header: () => (
                <Stack
                  horizontal
                  horizontalAlign={'space-between'}
                  verticalAlign={'center'}
                >
                  <Stack gap={0}>
                    <Typography.Text>{input?.name}</Typography.Text>
                    <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                      {input?.field}
                    </Typography.Text>
                  </Stack>
                  {configurable && !disabled && (
                    <div>
                      <Dropdown
                        trigger={['click']}
                        overlayStyle={{ minWidth: 140 }}
                        disabled={disabled}
                        menu={{
                          items: [
                            {
                              key: 'edit',
                              label: 'Edit column',
                              onClick: () => {
                                setDialog({
                                  type: 'edit',
                                  columnType: 'inputs',
                                  item: input,
                                })
                              },
                            },
                            {
                              key: 'remove',
                              label: 'Remove column',
                              onClick: () => {
                                Modal.confirm({
                                  title: 'Remove column',
                                  content: (
                                    <Typography.Paragraph>
                                      You are about to delete{' '}
                                      <strong>{input.name}</strong> column.
                                    </Typography.Paragraph>
                                  ),
                                  icon: false,
                                  okText: 'Remove',
                                  okButtonProps: {
                                    danger: true,
                                  },
                                  onOk: () => {
                                    removeColumn('inputs', input.id)
                                  },
                                })
                              },
                            },
                          ],
                        }}
                      >
                        <Button
                          type='link'
                          size={'small'}
                          icon={<DownOutlined />}
                        />
                      </Dropdown>
                    </div>
                  )}
                </Stack>
              ),
            }
          }),
        ],
      },
      {
        id: 'outputs',
        minSize: 200,
        size: 200,
        header: () => (
          <Stack
            horizontal
            horizontalAlign={'space-between'}
            verticalAlign={'center'}
          >
            <Typography.Text>Outputs</Typography.Text>
            {configurable && !disabled && (
              <div>
                <Button
                  size={'small'}
                  type={'link'}
                  disabled={disabled}
                  onClick={() => {
                    setDialog({
                      type: 'add',
                      columnType: 'outputs',
                      item: null,
                    })
                  }}
                >
                  Add
                </Button>
                {outputs?.length > 1 && (
                  <Button
                    size={'small'}
                    type={'link'}
                    disabled={disabled}
                    onClick={() => {
                      setDialog({
                        type: 'reorder',
                        columnType: 'outputs',
                        item: null,
                      })
                    }}
                  >
                    Reorder
                  </Button>
                )}
              </div>
            )}
          </Stack>
        ),
        columns: [
          ...outputs.map((output) => {
            return {
              accessorKey: output.id,
              minSize: 200,
              header: () => (
                <Stack
                  horizontal
                  horizontalAlign='space-between'
                  verticalAlign={'center'}
                >
                  <Stack gap={0} verticalAlign={'center'}>
                    <Typography.Text>{output?.name}</Typography.Text>
                    <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                      {output?.field}
                    </Typography.Text>
                  </Stack>
                  {configurable && !disabled && (
                    <div>
                      <Dropdown
                        trigger={['click']}
                        overlayStyle={{ minWidth: 140 }}
                        disabled={disabled}
                        menu={{
                          items: [
                            {
                              key: 'edit',
                              label: 'Edit column',
                              onClick: () => {
                                setDialog({
                                  type: 'edit',
                                  columnType: 'outputs',
                                  item: output,
                                })
                              },
                            },
                            {
                              key: 'remove',
                              label: 'Remove column',
                              onClick: () => {
                                Modal.confirm({
                                  title: 'Remove column',
                                  content: (
                                    <Typography.Paragraph>
                                      You are about to delete{' '}
                                      <strong>{output.name}</strong> column.
                                    </Typography.Paragraph>
                                  ),
                                  icon: false,
                                  okText: 'Remove',
                                  okButtonProps: {
                                    danger: true,
                                  },
                                  onOk: () => {
                                    removeColumn('outputs', output.id)
                                  },
                                })
                              },
                            },
                          ],
                        }}
                      >
                        <Button
                          type='link'
                          size={'small'}
                          icon={<DownOutlined />}
                        />
                      </Dropdown>
                    </div>
                  )}
                </Stack>
              ),
            }
          }),
        ],
      },
      {
        id: '_description',
        accessorKey: '_description',
        header: () => <Typography.Text>Description</Typography.Text>,
        minSize: 200,
      },
    ],
    [configurable, disabled, inputs, outputs]
  )

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    swapRows(draggedRowIndex, targetRowIndex)
  }

  const defaultColumn: Partial<ColumnDef<Record<string, string>>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const value = getValue() as string

      const { disabled, getColumnId } = useDecisionTable()
      const column = getColumnId(id)
      const update = (value: string) => {
        ;(table.options.meta as any)?.updateData?.(index, id, value)
      }

      const setCursor = () => {
        ;(table.options.meta as any)?.setCursor?.(id, index)
      }

      // const keyboardEventHandler = () =>
      //   // e: React.KeyboardEvent<HTMLInputElement>
      //   {
      //     // Minor Events - Ignore if input
      //     // const { key, preventDefault } = e
      //     // if (e.code === 'ArrowUp') {
      //     //   if ((e.metaKey || e.altKey)) {
      //     //     addRowAbove(y)
      //     //     return preventDefault();
      //     //   }
      //     //
      //     //   trySetCursor({ x, y: y - 1 })
      //     //   return preventDefault()
      //     // }
      //     // if (e.code === 'ArrowDown') {
      //     //   if ((e.metaKey || e.altKey) && !disabled) {
      //     //     addRowBelow(y)
      //     //     return preventDefault()
      //     //   }
      //     //
      //     //   trySetCursor({ x, y: y + 1 })
      //     //   return preventDefault()
      //     // }
      //     // if (e.code === 'ArrowLeft') {
      //     //   trySetCursor({ x: x - 1, y })
      //     //   return preventDefault()
      //     // }
      //     // if (e.code === 'ArrowRight') {
      //     //   trySetCursor({ x: x + 1, y })
      //     //   return preventDefault()
      //     // }
      //     // if (e.code === 'Backspace') {
      //     //   if (e.metaKey || e.altKey) {
      //     //     removeRow(y)
      //     //     return preventDefault()
      //     //   }
      //     //   return preventDefault()
      //     // }
      //   }

      return (
        (table.options.meta as any)?.getCell?.({
          disabled,
          column,
          value,
          onChange: update,
          onFocus: setCursor,
        }) || (
          <DefaultCell
            disabled={disabled}
            column={column}
            value={value}
            onChange={update}
            onFocus={setCursor}
          />
        )
      )
    },
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
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

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
            return (
              <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
            )
          })}
        </thead>
      </StyledTable>
      <StyledTable width={table.getCenterTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup, id) => {
            if (id === 0) return null
            return (
              <TableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
            )
          })}
        </thead>
        <TableContextMenu>
          <tbody>
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

const StyledTable: React.FC<
  React.HTMLAttributes<HTMLTableElement> & { width: number }
> = ({ style, className, width, ...props }) => {
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

const TableHeadRow: React.FC<{ headerGroup: HeaderGroup<any> }> = ({
  headerGroup,
}) => (
  <tr key={headerGroup.id}>
    <th colSpan={1} style={{ width: 48 }} />
    {headerGroup.headers.map((header) => {
      return (
        <th
          key={header.id}
          colSpan={header.colSpan}
          style={{
            width: header.getSize(),
          }}
        >
          {!header.isPlaceholder &&
            flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getCanResize() && (
            <div
              className={clsx(
                'resizer',
                header.column.getIsResizing() && 'isResizing'
              )}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
            />
          )}
        </th>
      )
    })}
  </tr>
)
