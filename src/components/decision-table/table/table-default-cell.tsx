import { CellContext } from '@tanstack/react-table'
import { Input } from 'antd'
import React, { memo, useRef } from 'react'
import { shallow } from 'zustand/shallow'

import { useDecisionTableStore } from '../context/dt-store.context'
import { TableSchemaItem, columnIdSelector } from '../dt.hook'

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>
} & React.HTMLAttributes<HTMLDivElement>

export const TableDefaultCell = memo<TableDefaultCellProps>(({ context, ...props }) => {
  const {
    row: { index },
    column: { id },
    table,
  } = context
  const value = useDecisionTableStore(
    (store: any) => store.decisionTable?.rules?.[index]?.[id],
    shallow
  )

  const column = useDecisionTableStore(columnIdSelector(id), shallow)

  const disabled = useDecisionTableStore((store) => store.disabled, shallow)
  const commitData = useDecisionTableStore((store) => store.commitData, shallow)
  const setCursor = useDecisionTableStore((store) => store.setCursor, shallow)

  const commit = (val: string) => {
    commitData(val, {
      x: id,
      y: index,
    })
  }

  return (
    <div
      className='cell-wrapper'
      onFocus={() =>
        setCursor({
          x: id,
          y: index,
        })
      }
      {...props}
    >
      {(table.options.meta as any)?.getCell?.({
        disabled,
        column,
        value,
        onChange: commit,
      }) || <TableInputCell disabled={disabled} column={column} value={value} onChange={commit} />}
    </div>
  )
})

export type TableCellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const TableInputCell: React.FC<TableCellProps> = ({ value, onChange, disabled }) => {
  const ref = useRef<any>(null)
  return (
    <Input.TextArea
      ref={ref}
      className={'grl-dt__cell__input'}
      value={value}
      rows={1}
      disabled={disabled}
      autoSize={{
        minRows: 1,
        maxRows: 3,
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
