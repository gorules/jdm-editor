import { Row, flexRender } from '@tanstack/react-table'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { useDecisionTable } from './dt.context'

const InnerTableRow: React.FC<{
  index: number
  row: Row<Record<string, string>>
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
}> = ({ index, row, reorderRow }) => {
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
      ref={previewRef} //previewRef could go here
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td
        className={'sort-handler'}
        ref={dropRef}
        onContextMenuCapture={() => {
          setCursor({
            x: 'id',
            y: index,
          })
        }}
      >
        <div ref={dragRef} className={'text'}>
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
