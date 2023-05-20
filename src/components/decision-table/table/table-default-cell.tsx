import { Input, InputRef } from 'antd'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { TableSchemaItem } from '../context/dt.context'

export type CellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (val: string) => void
  onKeyDown?: (e: any) => void
  disabled?: boolean
}

export const TableDefaultCell: React.FC<CellProps> = ({ value, onChange, disabled, onKeyDown }) => {
  const self = useRef<InputRef>(null)
  const [readOnly, setReadOnly] = useState(true)
  const [internalValue, setInternalValue] = useState(value || '')

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), [])

  return (
    <Input
      ref={self}
      tabIndex={-1}
      className={'grl-dt__cell__input'}
      disabled={disabled}
      value={internalValue}
      onKeyDown={onKeyDown}
      readOnly={readOnly}
      onFocus={() => setReadOnly(false)}
      onBlur={() => setReadOnly(true)}
      onMouseDown={(e) => e.preventDefault()}
      onChange={(e) => {
        debouncedChangeHandler(e)
        setInternalValue(e.target.value)
      }}
      onDoubleClick={() => {
        setReadOnly(false)
        self.current?.focus()
      }}
      data-typeable=''
    />
  )
}
