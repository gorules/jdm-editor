import { Input } from 'antd'
import debounce from 'lodash.debounce'
import React, { useCallback } from 'react'

import { TableSchemaItem } from '../context/dt.context'

export type CellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  onFocus: () => void
}

export const TableDefaultCell: React.FC<CellProps> = ({
  value,
  onChange,
  disabled,
  onFocus,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), [])
  return (
    <Input
      className={'grl-dt__cell__input'}
      disabled={disabled}
      defaultValue={(value as string) || ''}
      onChange={debouncedChangeHandler}
      onFocus={onFocus}
    />
  )
}
