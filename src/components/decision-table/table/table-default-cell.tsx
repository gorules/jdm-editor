import { CellContext } from '@tanstack/react-table'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import { TableSchemaItem, useDecisionTable } from '../context/dt.context'

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>
} & React.HTMLAttributes<HTMLDivElement>

export const TableDefaultCell: React.FC<TableDefaultCellProps> = ({ context, ...props }) => {
  const {
    getValue,
    row: { index },
    column: { id },
    table,
  } = context
  const { disabled, getColumnId } = useDecisionTable()
  const value = getValue()
  const [internalValue, setInternalValue] = useState(value || '')

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const column = getColumnId(id)
  const update = (value: string) => {
    ;(table.options.meta as any)?.updateData?.(index, id, value)
  }

  const setCursor = () => {
    ;(table.options.meta as any)?.setCursor?.(id, index)
  }

  return (
    <div
      className='cell-wrapper'
      onFocus={setCursor}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          update(internalValue)
        }
      }}
      {...props}
    >
      {(table.options.meta as any)?.getCell?.({
        disabled,
        column,
        value: internalValue,
        onChange: setInternalValue,
      }) || (
        <TableInputCell
          disabled={disabled}
          column={column}
          value={internalValue}
          onChange={setInternalValue}
        />
      )}
    </div>
  )
}

export type TableCellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const TableInputCell: React.FC<TableCellProps> = ({ value, onChange, disabled }) => {
  return (
    <Input.TextArea
      className={'grl-dt__cell__input'}
      rows={1}
      disabled={disabled}
      value={value}
      autoSize={{
        minRows: 1,
        maxRows: 1,
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
