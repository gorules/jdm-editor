import { produce } from 'immer'
import { useMemo } from 'react'
import { v4 } from 'uuid'
import { StoreApi, UseBoundStore, create } from 'zustand'

import { SchemaSelectProps } from '../../helpers/components'
import { TableCellProps } from './table/table-default-cell'

export type TableCursor = {
  x: string
  y: number
}

export type TableSchemaItem = {
  id: string
  name: string
  field?: string
  type: string
  defaultValue?: string
}

export type TableSchema = {
  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]
}

export type HitPolicy = 'first' | 'collect'
export type ColumnType = 'inputs' | 'outputs'

export type DecisionTableType = {
  hitPolicy: HitPolicy | string
  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]
  rules: Record<string, string>[]
}

const cleanupTableRule = (
  decisionTable: DecisionTableType,
  rule: Record<string, string>,
  defaultId?: string
): Record<string, string> => {
  const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs]
  const newRule: Record<string, string> = {
    _id: rule._id || v4(),
    _description: rule._description,
  }
  schemaItems.forEach((schemaItem) => {
    if (defaultId && newRule._id === defaultId) {
      return (newRule[schemaItem.id] = rule?.[schemaItem.id] || schemaItem?.defaultValue || '')
    }
    newRule[schemaItem.id] = rule?.[schemaItem.id] || ''
  })
  return newRule
}

const cleanupTableRules = (
  decisionTable: DecisionTableType,
  defaultId?: string
): Record<string, string>[] => {
  const rules = decisionTable?.rules || []
  const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs]
  return rules.map((rule) => {
    const newRule: Record<string, string> = {
      _id: rule._id || v4(),
      _description: rule._description,
    }
    schemaItems.forEach((schemaItem) => {
      if (defaultId && newRule._id === defaultId) {
        return (newRule[schemaItem.id] = rule?.[schemaItem.id] || schemaItem?.defaultValue || '')
      }
      newRule[schemaItem.id] = rule?.[schemaItem.id] || ''
    })
    return newRule
  })
}

export const parseDecisionTable = (decisionTable?: DecisionTableType) => {
  const dt: DecisionTableType = {
    hitPolicy: decisionTable?.hitPolicy || 'first',
    inputs: decisionTable?.inputs || [],
    outputs: decisionTable?.outputs || [],
    rules: decisionTable?.rules || [],
  }

  if (dt.inputs?.length === 0) {
    dt.inputs = [
      {
        id: v4(),
        name: 'Input',
        type: 'expression',
      },
    ]
  }

  if (dt.outputs?.length === 0) {
    dt.outputs = [
      {
        id: v4(),
        field: 'output',
        name: 'Output',
        type: 'expression',
      },
    ]
  }

  return dt
}

export type DecisionTableStoreType = {
  id?: string
  name?: string

  decisionTable: DecisionTableType
  setDecisionTable: (val?: DecisionTableType) => void

  cursor: TableCursor | null
  setCursor: (cursor: TableCursor | null) => void

  // Actions
  commitData: (data: string, cursor: TableCursor) => void
  swapRows: (source: number, target: number) => void
  addRowAbove: (target?: number) => void
  addRowBelow: (target?: number) => void
  removeRow: (target?: number) => void
  addColumn: (type: ColumnType, column: TableSchemaItem) => void
  updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void
  removeColumn: (type: ColumnType, id: string) => void
  reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void
  updateHitPolicy: (hitPolicy: HitPolicy) => void

  activeRules?: string[]
  setActiveRules?: (activeRules?: string[]) => void

  schema?: {
    inputsSchema?: SchemaSelectProps[]
    outputsSchema?: SchemaSelectProps[]
  }
  setSchema?: (schema: {
    inputsSchema?: SchemaSelectProps[]
    outputsSchema?: SchemaSelectProps[]
  }) => void

  // Props
  disabled?: boolean
  setDisabled?: (val: boolean) => void
  configurable?: boolean
  setConfigurable?: (val: boolean) => void
  disableHitPolicy?: boolean
  setDisableHitPolicy?: (val: boolean) => void

  minColWidth?: number
  setMinColWidth?: (val: number) => void

  colWidth: number
  setColWidth?: (val: number) => void

  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
  setCellRenderer?: (fn: (props: TableCellProps) => JSX.Element | null | undefined) => void
}

export const useDecisionTable = (): UseBoundStore<StoreApi<DecisionTableStoreType>> => {
  const store = useMemo(
    () =>
      create<DecisionTableStoreType>((set) => ({
        decisionTable: parseDecisionTable(),
        cursor: null,
        colWidth: 200,
        minColWidth: 150,
        setColWidth: (width: number) =>
          set(
            produce((draft) => {
              draft.colWidth = width
              return draft
            })
          ),
        setMinColWidth: (width: number) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.minColWidth = width
              return draft
            })
          ),
        disabled: false,
        setDisabled: (val: boolean) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.disabled = val
              return draft
            })
          ),
        configurable: true,
        setConfigurable: (val: boolean) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.configurable = val
              return draft
            })
          ),
        disableHitPolicy: false,
        setDisableHitPolicy: (val: boolean) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.disableHitPolicy = val
              return draft
            })
          ),
        setDecisionTable: (payload: DecisionTableType) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable = payload
              return draft
            })
          ),
        setCursor: (cursor: TableCursor) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = cursor
              return draft
            })
          ),
        commitData: (value: string, cursor: TableCursor) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              const { x, y } = cursor
              draft.decisionTable.rules[y][x] = value
              return draft
            })
          ),
        swapRows: (source: number, target: number) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = null
              const input = draft?.decisionTable?.rules?.[source]
              draft.decisionTable.rules.splice(source, 1)
              draft.decisionTable.rules.splice(target, 0, input)
              return draft
            })
          ),
        addRowAbove: (target?: number) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              if (target === undefined) target = 0
              const _id = v4()
              draft.decisionTable.rules.splice(
                target,
                0,
                cleanupTableRule(
                  draft.decisionTable,
                  {
                    _id,
                  },
                  _id
                )
              )
              if (draft?.cursor && draft?.cursor?.y === target) {
                draft.cursor = {
                  y: draft.cursor.y + 1,
                  x: draft.cursor.x,
                }
              }
              return draft
            })
          ),
        addRowBelow: (target?: number) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              if (target === undefined) {
                target = draft?.decisionTable?.rules?.length
              } else {
                target += 1
              }
              const _id = v4()
              draft.decisionTable.rules.splice(
                target,
                0,
                cleanupTableRule(
                  draft.decisionTable,
                  {
                    _id,
                  },
                  _id
                )
              )
              if (draft?.cursor && draft?.cursor?.y === target) {
                draft.cursor = {
                  y: draft.cursor.y - 1,
                  x: draft.cursor.x,
                }
              }
              return draft
            })
          ),
        removeRow: (target?: number) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              if (target === undefined) target = draft?.decisionTable?.rules?.length || 0
              draft.cursor = null
              draft.decisionTable.rules.splice(target, 1)
              return draft
            })
          ),
        addColumn: (type: ColumnType, column: TableSchemaItem) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable[type].push(column)
              draft.decisionTable.rules = cleanupTableRules(draft.decisionTable)
              return draft
            })
          ),
        updateColumn: (type: ColumnType, id: string, data: TableSchemaItem) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable[type] = draft.decisionTable[type].map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    name: data?.name,
                    field: data?.field,
                    defaultValue: data?.defaultValue,
                  }
                }
                return item
              })
              draft.decisionTable.rules = cleanupTableRules(draft.decisionTable)
              return draft
            })
          ),
        removeColumn: (type: ColumnType, id: string) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable[type] = (draft.decisionTable?.[type] || []).filter(
                (item) => item?.id !== id
              )
              draft.decisionTable.rules = cleanupTableRules(draft.decisionTable)
              draft.decisionTable = parseDecisionTable(draft.decisionTable)
              draft.cursor = null
              return draft
            })
          ),
        reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable[type] = columns
              draft.decisionTable.rules = cleanupTableRules(draft.decisionTable)
              return draft
            })
          ),
        updateHitPolicy: (hitPolicy: HitPolicy) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable.hitPolicy = hitPolicy
              return draft
            })
          ),
        setSchema: (schema) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.schema = schema
              return draft
            })
          ),
        setCellRenderer: (cellRenderer) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cellRenderer = cellRenderer
              return draft
            })
          ),
      })),
    []
  )

  return store
}

export const columnIdSelector = (x: string) => (state: DecisionTableStoreType) =>
  [
    ...state.decisionTable.inputs.map((i) => ({
      ...i,
      colType: 'input',
    })),
    ...state.decisionTable.inputs.map((i) => ({
      ...i,
      colType: 'output',
    })),
  ].find((c) => c.id === x)
