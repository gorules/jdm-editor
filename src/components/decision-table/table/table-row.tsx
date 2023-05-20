import { Row, flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDecisionTable } from '../context/dt.context'
import { Typography } from 'antd'

const InnerTableRow: React.FC<{
  index: number
  row: Row<Record<string, string>>
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
  disabled?: boolean
}> = ({ index, row, reorderRow, disabled }) => {
  const { setCursor } = useDecisionTable()
  const trRef = useRef<HTMLTableRowElement>(null)
  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction:
        (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) =>
      reorderRow(draggedRow.index, row.index),
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  })

  previewRef(dropRef(trRef))

  return (
    <tr
      ref={disabled ? undefined : trRef}
      className={clsx(
        'table-row',
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
        <td key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

export const TableRow = React.memo(InnerTableRow)
