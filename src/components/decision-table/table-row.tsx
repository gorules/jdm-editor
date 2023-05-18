import { Row, flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { useDecisionTable } from './dt.context'

const InnerTableRow: React.FC<{
  index: number
  row: Row<Record<string, string>>
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
  disabled?: boolean
}> = ({ index, row, reorderRow, disabled }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
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

  const { setCursor } = useDecisionTable()

  return (
    <tr
      ref={disabled ? undefined : previewRef} //previewRef could go here
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td
        className={clsx('sort-handler', !disabled && 'draggable')}
        ref={disabled ? undefined : dropRef}
        onContextMenuCapture={() => {
          setCursor({
            x: 'id',
            y: index,
          })
        }}
      >
        <div ref={disabled ? undefined : dragRef} className={'text'}>
          {index + 1}
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

export const TableRow = React.memo(InnerTableRow)
