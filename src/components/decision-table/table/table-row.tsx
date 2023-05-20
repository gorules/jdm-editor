import { Row, flexRender } from '@tanstack/react-table'
import { Typography } from 'antd'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { useDecisionTable } from '../context/dt.context'

const InnerTableRow: React.FC<{
  index: number
  row: Row<Record<string, string>>
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
  disabled?: boolean
}> = ({ index, row, reorderRow, disabled }) => {
  const { setCursor, cells, cursor } = useDecisionTable()
  const trRef = useRef<HTMLTableRowElement>(null)
  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => reorderRow(draggedRow.index, row.index),
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  })

  previewRef(dropRef(trRef))

  const isCurrentCursor = (idx: string) => cursor?.x === idx && cursor?.y === index

  return (
    <tr
      ref={disabled ? undefined : trRef}
      className={clsx(
        'table-row',
        cursor?.y === index && 'row-selected',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up'
      )}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <td
        className={clsx('sort-handler', !disabled && 'draggable')}
        ref={disabled ? undefined : dragRef}
        onContextMenuCapture={() => {
          setCursor({
            x: 'id',
            y: index,
          })
        }}
      >
        <div className={'text'}>
          <Typography>{index + 1}</Typography>
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          className={clsx(isCurrentCursor(cell.column.id) && 'selected')}
          key={cell.id}
          ref={(instance) => (cells.current[`${index}:${cell.column.id}`] = instance)}
          style={{ width: cell.column.getSize() }}
          data-x={cell.column.id}
          data-y={index}
          data-table-cell=''
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

export const TableRow = React.memo(InnerTableRow)
