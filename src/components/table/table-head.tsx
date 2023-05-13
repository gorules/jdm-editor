import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Modal, Space, Typography } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Grid, GridProps, Index } from 'react-virtualized'

import { Stack } from '../stack'
import { useTableDialog } from './table-dialog.context'
import { TableHeadCell } from './table-head-cell'
import { ColumnType, useTable } from './table.context'

export type TableHeadProps = {
  preferences: any
  width: number
  height: number
  height2: number
  scrollTop: number
  scrollLeft: number
  onScroll: GridProps['onScroll']
  onPreferencesChange?: () => void
  columnWidth: (params: Index) => number
}

export type TableHeadRef = {
  recomputeGridSize: () => void
}

export const TableHead = forwardRef<TableHeadRef, TableHeadProps>(
  (props, ref) => {
    const topRef = useRef<Grid>(null)
    const bottomRef = useRef<Grid>(null)

    const { value, inputs, outputs, configurable, disabled, removeColumn } =
      useTable()
    const { setDialog } = useTableDialog()
    const {
      preferences,
      onPreferencesChange,
      width,
      height,
      height2,
      scrollLeft,
      scrollTop,
      columnWidth,
    } = props

    useImperativeHandle(ref, () => ({
      recomputeGridSize: () => {
        topRef.current?.recomputeGridSize()
        bottomRef.current?.recomputeGridSize()
      },
    }))

    return (
      <div>
        <Grid
          ref={topRef}
          className='grl-table__head'
          style={{ overflow: 'hidden !important' }}
          tabIndex={null}
          cellRenderer={(cellProps) => {
            const { columnIndex: x, style, key } = cellProps

            switch (x) {
              case 0:
                return (
                  <TableHeadCell
                    key={key}
                    style={style}
                    as='div'
                    className='cell'
                  >
                    <div>ID</div>
                  </TableHeadCell>
                )
              case 1:
                return (
                  <TableHeadCell
                    key={key}
                    style={style}
                    as='div'
                    className='cell'
                  >
                    <div>
                      <div>Inputs</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      {configurable && !disabled && (
                        <Space>
                          {value?.inputs?.length > 1 && (
                            <Button
                              type='link'
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
                            type='link'
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
                        </Space>
                      )}
                    </div>
                  </TableHeadCell>
                )
              case 2:
                return (
                  <TableHeadCell
                    key={key}
                    style={style}
                    as='div'
                    className={'cell'}
                  >
                    <div>Outputs</div>
                    <div style={{ marginLeft: 'auto' }}>
                      {configurable && !disabled && (
                        <Space>
                          {value?.outputs?.length > 1 && (
                            <Button
                              type='link'
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
                          <Button
                            type='link'
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
                        </Space>
                      )}
                    </div>
                  </TableHeadCell>
                )
              case 3:
              default:
                return (
                  <TableHeadCell
                    key={key}
                    style={style}
                    as='div'
                    className={'cell'}
                  >
                    <div>Description</div>
                  </TableHeadCell>
                )
            }
          }}
          rowCount={1}
          rowHeight={height2}
          width={width}
          height={height2}
          columnCount={4}
          columnWidth={({ index }) => {
            const inputsWidth = inputs.reduce(
              (acc, _, i) => acc + columnWidth({ index: i + 1 }),
              0
            )
            const outputsWidth = outputs.reduce(
              (acc, _, i) =>
                acc + columnWidth({ index: i + inputs.length + 1 }),
              0
            )
            switch (index) {
              case 0:
                return columnWidth({ index: 0 })
              case 1:
                return inputsWidth < 200 ? 200 : inputsWidth
              case 2:
                return outputsWidth < 200 ? 200 : outputsWidth
              case 3:
              default:
                return 0
            }
          }}
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
        />
        <Grid
          ref={bottomRef}
          className={'grl-table__head'}
          style={{ overflow: 'hidden !important' }}
          tabIndex={null}
          cellRenderer={(cellProps) => {
            const { columnIndex: x, style, key } = cellProps

            if (x === 0) {
              return (
                <TableHeadCell
                  as='div'
                  key={key}
                  className={'cell'}
                  style={style}
                />
              )
            }

            const column = [...inputs, ...outputs]?.[x - 1]
            const columnType: ColumnType = value.inputs.includes(column)
              ? 'inputs'
              : 'outputs'

            return (
              <TableHeadCell
                key={key}
                style={style}
                as='div'
                resizable
                className={clsx(
                  'cell',
                  value.inputs.includes(column) && 'input',
                  value.outputs.includes(column) && 'output'
                )}
                onWidthChange={(width) => {
                  preferences.current = {
                    ...(preferences.current || {}),
                    size: {
                      ...(preferences.current?.size || {}),
                      [column.id]: Math.max(
                        (preferences.current?.size?.[column.id] || 200) + width,
                        200
                      ),
                    },
                  }

                  onPreferencesChange?.()
                }}
              >
                {column?.field ? (
                  <Stack
                    horizontal
                    horizontalAlign='space-between'
                    verticalAlign='center'
                  >
                    <div>
                      <Typography.Text style={{ display: 'block' }}>
                        {column?.name}
                      </Typography.Text>
                      <Typography.Text
                        type='secondary'
                        style={{ fontSize: 12, fontWeight: 300 }}
                      >
                        {column?.field}
                      </Typography.Text>
                    </div>
                    {configurable && !disabled && (
                      <Dropdown
                        trigger={['click']}
                        overlayStyle={{ minWidth: 140 }}
                        overlay={
                          <Menu
                            items={[
                              {
                                key: 'edit',
                                label: 'Edit column',
                                onClick: () => {
                                  setDialog({
                                    type: 'edit',
                                    columnType,
                                    item: column,
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
                                        <strong>{column.name}</strong> column.
                                      </Typography.Paragraph>
                                    ),
                                    icon: false,
                                    okText: 'Remove',
                                    okButtonProps: {
                                      danger: true,
                                    },
                                    onOk: () => {
                                      removeColumn(columnType, column.id)
                                    },
                                  })
                                },
                              },
                            ]}
                          />
                        }
                      >
                        <Button
                          type='link'
                          style={{
                            height: 'auto',
                            lineHeight: '1em',
                            padding: '0.5rem 0.25rem',
                          }}
                        >
                          <DownOutlined style={{ fontSize: 16 }} />
                        </Button>
                      </Dropdown>
                    )}
                  </Stack>
                ) : (
                  <Typography.Text>{column?.name}</Typography.Text>
                )}
              </TableHeadCell>
            )
          }}
          rowCount={1}
          rowHeight={height}
          width={width}
          height={height}
          columnCount={
            1 +
            (inputs?.length > 0 ? inputs?.length : 1) +
            (outputs?.length > 0 ? outputs?.length : 1)
          }
          columnWidth={columnWidth}
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
        />
      </div>
    )
  }
)
