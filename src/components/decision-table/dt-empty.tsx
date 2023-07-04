import React, { useEffect } from 'react'

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
  value?: DecisionTableType
  disabled?: boolean
  configurable?: boolean
  disableHitPolicy?: boolean
  activeRules?: string[]
  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
  schema?: {
    inputsSchema?: SchemaSelectProps[]
    outputsSchema?: SchemaSelectProps[]
  }
  onChange?: (val: DecisionTableType) => void
}
export const DecisionTableEmpty: React.FC<DecisionTableEmptyType> = ({
  id,
  value,
  disabled = false,
  configurable = true,
  disableHitPolicy = false,
  activeRules,
  schema,
  cellRenderer,
  onChange,
}) => {
  const store = useDecisionTableRaw()
  const setDecisionTable = useDecisionTableStore((store) => store.setDecisionTable)
  useEffect(() => {
    store.setState({
      id,
      disabled,
      configurable,
      disableHitPolicy,
      activeRules,
      schema,
      cellRenderer,
      onChange,
    })
  }, [id, disabled, configurable, disableHitPolicy, activeRules, schema, cellRenderer, onChange])

  useEffect(() => {
    setDecisionTable(parseDecisionTable(value))
  }, [value])
  return null
}
