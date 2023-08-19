import React, { useCallback, useEffect, useState } from 'react'

import { SchemaSelectProps } from '../../helpers/components'
import {
  DecisionTableType,
  parseDecisionTable,
  useDecisionTableRaw,
  useDecisionTableStore,
} from './context/dt-store.context'
import { TableCellProps } from './table/table-default-cell'

export type DecisionTableEmptyType = {
  id?: string
  defaultValue?: DecisionTableType
  value?: DecisionTableType
  disabled?: boolean
  configurable?: boolean
  disableHitPolicy?: boolean
  activeRules?: string[]
  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
  inputsSchema?: SchemaSelectProps[]
  outputsSchema?: SchemaSelectProps[]
  onChange?: (val: DecisionTableType) => void
  colWidth?: number
  minColWidth?: number
}
export const DecisionTableEmpty: React.FC<DecisionTableEmptyType> = ({
  id,
  defaultValue,
  value,
  disabled = false,
  configurable = true,
  disableHitPolicy = false,
  activeRules,
  inputsSchema,
  outputsSchema,
  colWidth= 200,
  minColWidth= 150,
  cellRenderer,
  onChange,
}) => {
  const store = useDecisionTableRaw()
  const setDecisionTable = useDecisionTableStore((store) => store.setDecisionTable)

  const changeHandler = useCallback(
    (val: DecisionTableType) => {
      if (value === undefined) {
        setDecisionTable(parseDecisionTable(val))
      }
      onChange?.(val)
    },
    [onChange, value, setDecisionTable]
  )

  useEffect(() => {
    store.setState({
      id,
      colWidth,
      minColWidth,
      disabled,
      configurable,
      disableHitPolicy,
      activeRules,
      inputsSchema,
      outputsSchema,
      cellRenderer,
      onChange: changeHandler,
    })
  }, [
    id,
    disabled,
    configurable,
    disableHitPolicy,
    activeRules,
    inputsSchema,
    outputsSchema,
    colWidth,
    minColWidth,
    cellRenderer,
    changeHandler,
  ])

  useEffect(() => {
    setDecisionTable(parseDecisionTable(value))
  }, [value])

  useEffect(() => {
    if (value === undefined) {
      setDecisionTable(parseDecisionTable(defaultValue))
    }
  }, [])

  return null
}
