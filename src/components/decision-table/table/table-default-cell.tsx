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
    <Input
      className={'grl-dt__cell__input'}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
