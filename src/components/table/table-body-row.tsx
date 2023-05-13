import { PlusOutlined } from '@ant-design/icons'
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'
import { Button } from 'antd'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { Index } from 'react-virtualized'

import { TableBodyCell } from './table-body-cell'
import { useTable } from './table.context'

export type TableBodyRowProps = {
  columnWidth: (params: Index) => number
  onRowAdd: (y: number) => void
  dragHandleProps?: DraggableProvidedDragHandleProps
  index: number
  disabled?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const TableBodyRow = forwardRef<HTMLDivElement, TableBodyRowProps>(
  (props, ref) => {
    const {
      cursor,
      inputs,
      outputs,
      editing,
      value,
      inputValue,
      setInputValue,
      cells,
      disabled,
    } = useTable()

    const {
      columnWidth,
      onRowAdd,
      dragHandleProps,
      index: y,
      className,
      ...rest
    } = props

    const firstWidth = columnWidth({ index: 0 })

    const isLastRow = value?.rules?.length === y

    return (
      <div
        ref={ref}
        className={clsx('grl-table__body__row', className)}
        {...rest}
      >
        <TableBodyCell
          as='div'
          className={clsx(
            'cell',
            y === cursor?.y && 'cursor',
            isLastRow && 'button',
            'index'
          )}
          minWidth={firstWidth}
          width={firstWidth}
          {...(dragHandleProps || {})}
          tabIndex={undefined}
        >
          {isLastRow
            ? ((
                <Button
                  type='link'
                  className='add-row-above'
                  disabled={disabled}
                  onClick={() => onRowAdd(y)}
                >
                  <PlusOutlined style={{ fontSize: 16 }} />
                </Button>
              ) as any)
            : y + 1}
        </TableBodyCell>
        {[...inputs, ...outputs].map((schema, x) => {
          const columnId = schema.id
          const selected = cursor?.x === x && cursor.y === y
          const cellEdit =
            selected &&
            editing &&
            schema.type !== 'content' &&
            schema.type !== 'form'
          const innerValue = cellEdit
            ? inputValue
            : value?.rules?.[y]?.[columnId] || ''
          const width = columnWidth({ index: x + 1 })

          return (
            <TableBodyCell
              as='div'
              className={clsx('cell', isLastRow && 'noAction')}
              ref={(instance) => (cells.current[`${y}:${columnId}`] = instance)}
              key={x}
              selected={selected}
              editing={selected && editing}
              onChange={(e) => setInputValue(e.target.value)}
              data-table-cell=''
              data-x={x}
              data-y={y}
              width={width}
              minWidth={width}
              maxWidth={width}
            >
              {isLastRow ? '' : innerValue}
            </TableBodyCell>
          )
        })}
      </div>
    )
  }
)
