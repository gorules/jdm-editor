import { produce } from 'immer'
import React, { useMemo } from 'react'
import { v4 } from 'uuid'
import { StoreApi, UseBoundStore } from 'zustand'
import { create } from 'zustand'

import { SchemaSelectProps } from '../../../helpers/components'
import { TableCellProps } from '../table/table-default-cell'

export type TableExportOptions = {
  name?: string
}

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
  setDecisionTable: (val: DecisionTableType) => void

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

  inputsSchema?: SchemaSelectProps[]
  outputsSchema?: SchemaSelectProps[]

  // Props
  disabled?: boolean
  configurable?: boolean
  disableHitPolicy?: boolean

  minColWidth?: number
  colWidth: number

  onChange?: (val: DecisionTableType) => void

  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
}

export const DecisionTableStoreContext = React.createContext<
  UseBoundStore<StoreApi<DecisionTableStoreType>> & {
    setState: (partial: Partial<DecisionTableStoreType>) => void
  }
>({} as any)

export type DecisionTableContextProps = {
  //
}

export const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>> = (
  props
) => {
  const { children } = props
  const store = useMemo(
    () =>
      create<DecisionTableStoreType>((set, getState) => ({
        decisionTable: parseDecisionTable(),
        setDecisionTable: (val) => {
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.decisionTable = val
              return draft
            })
          )
        },
        cursor: null,
        colWidth: 200,
        minColWidth: 150,
        disabled: false,
        configurable: true,
        disableHitPolicy: false,
        setCursor: (cursor: TableCursor) =>
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = cursor
              return draft
            })
          ),
        commitData: (value: string, cursor: TableCursor) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              const { x, y } = cursor
              draft.rules[y][x] = value
              return draft
            })
          )
        },
        swapRows: (source: number, target: number) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              const input = draft?.rules?.[source]
              draft.rules.splice(source, 1)
              draft.rules.splice(target, 0, input)
              return draft
            })
          )
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = null
              return draft
            })
          )
        },
        addRowAbove: (target?: number) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              if (target === undefined) target = 0
              const _id = v4()
              draft.rules.splice(
                target,
                0,
                cleanupTableRule(
                  draft,
                  {
                    _id,
                  },
                  _id
                )
              )
              return draft
            })
          )
          const cursor = getState()?.cursor
          if (cursor && cursor?.y === target) {
            set(
              produce<DecisionTableStoreType>((draft) => {
                if (draft.cursor) {
                  draft.cursor = {
                    y: draft.cursor.y + 1,
                    x: draft.cursor.x,
                  }
                }
                return draft
              })
            )
          }
        },
        addRowBelow: (target?: number) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              if (target === undefined) {
                target = draft?.rules?.length
              } else {
                target += 1
              }
              const _id = v4()
              draft.rules.splice(
                target,
                0,
                cleanupTableRule(
                  draft,
                  {
                    _id,
                  },
                  _id
                )
              )
              return draft
            })
          )
          const cursor = getState()?.cursor
          if (cursor && cursor?.y === target) {
            set(
              produce<DecisionTableStoreType>((draft) => {
                if (draft.cursor) {
                  draft.cursor = {
                    y: draft.cursor.y - 1,
                    x: draft.cursor.x,
                  }
                }
                return draft
              })
            )
          }
        },
        removeRow: (target?: number) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              if (target === undefined) target = draft?.rules?.length || 0
              draft.rules.splice(target, 1)
              return draft
            })
          )
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = null
              return draft
            })
          )
        },
        addColumn: (type: ColumnType, column: TableSchemaItem) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              draft[type].push(column)
              draft.rules = cleanupTableRules(draft)
              return draft
            })
          )
        },
        updateColumn: (type: ColumnType, id: string, data: TableSchemaItem) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              draft[type] = draft[type].map((item) => {
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
              draft.rules = cleanupTableRules(draft)
              return draft
            })
          )
        },
        removeColumn: (type: ColumnType, id: string) => {
          getState()?.onChange?.(
            parseDecisionTable(
              produce(getState().decisionTable, (draft) => {
                draft[type] = (draft?.[type] || []).filter((item) => item?.id !== id)
                draft.rules = cleanupTableRules(draft)
                return draft
              })
            )
          )
          set(
            produce<DecisionTableStoreType>((draft) => {
              draft.cursor = null
              return draft
            })
          )
        },
        reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              draft[type] = columns
              draft.rules = cleanupTableRules(draft)
              return draft
            })
          )
        },
        updateHitPolicy: (hitPolicy: HitPolicy) => {
          getState()?.onChange?.(
            produce(getState().decisionTable, (draft) => {
              draft.hitPolicy = hitPolicy
              return draft
            })
          )
        },
      })),
    []
  )
  return (
    <DecisionTableStoreContext.Provider value={store}>
      {children}
    </DecisionTableStoreContext.Provider>
  )
}

export const useDecisionTableStore = (
  selector: (state: DecisionTableStoreType) => any,
  equals?: (a: any, b: any) => boolean
) => React.useContext(DecisionTableStoreContext)(selector, equals)

export const useDecisionTableRaw = () => React.useContext(DecisionTableStoreContext)
export default DecisionTableProvider
