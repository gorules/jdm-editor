import { Input } from 'antd'
import React from 'react'

import { TableSchemaItem } from './dt.context'

export type CellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  onFocus: () => void
}

export const DefaultCell: React.FC<CellProps> = ({
  value,
  onChange,
  disabled,
  onFocus,
}) => {
  return (
    <Input
      className={'grl-dt__cell__input'}
      // data-x={id}
      // data-y={index}
      disabled={disabled}
      value={(value as string) || ''}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
  )
}
