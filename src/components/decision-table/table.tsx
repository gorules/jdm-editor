import { DownOutlined } from '@ant-design/icons'
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {Button, Dropdown, Input, Modal, Typography} from 'antd'
import React from 'react'
import { useVirtual } from 'react-virtual'

import { Stack } from '../stack'
import { useDecisionTableDialog } from './dt-dialog.context'
import { useDecisionTable } from './dt.context'
import { TableContextMenu } from './table-context-menu'
import { TableRow } from './table-row'

export const Table: React.FC = () => {
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
  } = useDecisionTable()
  const { setDialog } = useDecisionTableDialog()

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'inputs',
        header: () => (
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
          >
            <Typography.Text strong>Inputs</Typography.Text>
            {configurable && (
              <div>
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
              header: () => (
                <Stack
                  horizontal
                  horizontalAlign={'space-between'}
                  verticalAlign={'center'}
                >
                  <Stack gap={2}>
                    <Typography.Text strong>{input?.name}</Typography.Text>
                    <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                      {input?.field}
                    </Typography.Text>
                  </Stack>
                  {configurable && (
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
        header: () => (
          <Stack
            horizontal
            horizontalAlign={'space-between'}
            verticalAlign={'center'}
          >
            <Typography.Text strong>Outputs</Typography.Text>
            {configurable && (
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
                  <Stack gap={2} verticalAlign={'center'}>
                    <Typography.Text strong>{output?.name}</Typography.Text>
                    <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                      {output?.field}
                    </Typography.Text>
                  </Stack>
                  {configurable && (
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
        header: () => <Typography.Text strong>Description</Typography.Text>,
        minSize: 200,
      },
    ],
    [configurable, inputs, outputs]
  )

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    swapRows(draggedRowIndex, targetRowIndex)
  }

  const defaultColumn: Partial<ColumnDef<Record<string, string>>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const value = getValue()

      const { disabled } = useDecisionTable()
      const update = (value: string) => {
        ;(table.options.meta as any)?.updateData?.(index, id, value)
      }

      const setCursor = () => {
        ;(table.options.meta as any)?.setCursor?.(id, index)
      }

      const keyboardEventHandler = () =>
        // e: React.KeyboardEvent<HTMLInputElement>
        {
          // Minor Events - Ignore if input
          // const { key, preventDefault } = e
          // if (e.code === 'ArrowUp') {
          //   if ((e.metaKey || e.altKey)) {
          //     addRowAbove(y)
          //     return preventDefault();
          //   }
          //
          //   trySetCursor({ x, y: y - 1 })
          //   return preventDefault()
          // }
          // if (e.code === 'ArrowDown') {
          //   if ((e.metaKey || e.altKey) && !disabled) {
          //     addRowBelow(y)
          //     return preventDefault()
          //   }
          //
          //   trySetCursor({ x, y: y + 1 })
          //   return preventDefault()
          // }
          // if (e.code === 'ArrowLeft') {
          //   trySetCursor({ x: x - 1, y })
          //   return preventDefault()
          // }
          // if (e.code === 'ArrowRight') {
          //   trySetCursor({ x: x + 1, y })
          //   return preventDefault()
          // }
          // if (e.code === 'Backspace') {
          //   if (e.metaKey || e.altKey) {
          //     removeRow(y)
          //     return preventDefault()
          //   }
          //   return preventDefault()
          // }
        }

      return (
        <Input
          className={'grl-dt__cell__input'}
          data-x={id}
          data-y={index}
          disabled={disabled}
          value={(value as string) || ''}
          onKeyDown={keyboardEventHandler}
          onChange={(e) => update(e.target.value)}
          onFocus={setCursor}
        />
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
    debugTable: true,
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
    <div ref={tableContainerRef} className='grl-dt__container'>
      <table
        style={{
          width: table.getCenterTotalSize(),
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th
                style={{
                  width: 60,
                  maxWidth: 60,
                }}
              />
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                      }}
                    />
                  </th>
                )
              })}
            </tr>
          ))}
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
      </table>
    </div>
  )
}
