import { produce } from 'immer'
import Papa from 'papaparse'
import React, { useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'

import { SchemaSelectProps } from '../../../helpers/components'
import { saveFile } from '../../../helpers/file-helpers'
import { TableCellProps } from '../table/table-default-cell'

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

export type TableCell = HTMLTableDataCellElement
export type TableData = Record<string, string>[]

export type TableEventElements = {
  cell: HTMLElement
}

export type TableExportOptions = {
  name?: string
}

export type TableImportOptions = {
  file: File
  replaceSchema?: boolean
}

export type HitPolicy = 'first' | 'collect'
export type ColumnType = 'inputs' | 'outputs'

const defaultColWidth = 200

export type DecisionTableState = {
  id?: string
  name?: string

  cursor: TableCursor | null
  setCursor: (cursor: TableCursor | null) => void

  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]

  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>

  value: DecisionTableProps

  // Actions
  commitData: (data: string, cursor: TableCursor) => void
  swapRows: (source: number, target: number) => void
  addRowAbove: (target: number) => void
  addRowBelow: (target: number) => void
  removeRow: (target: number) => void
  addColumn: (type: ColumnType, column: TableSchemaItem) => void
  updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void
  removeColumn: (type: ColumnType, id: string) => void
  reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void
  updateHitPolicy: (hitPolicy: HitPolicy) => void

  getColumnId: (x: string) => ({ colType: string } & TableSchemaItem) | undefined

  cells: React.MutableRefObject<Record<string, TableCell | null>>
  table: React.MutableRefObject<HTMLTableElement | null>
  namespace: string

  importCsv: () => void
  exportCsv: (options: TableExportOptions) => Promise<void>

  activeRules?: string[]

  inputsSchema?: SchemaSelectProps[]
  outputsSchema?: SchemaSelectProps[]

  disabled?: boolean
  configurable?: boolean
  disableHitPolicy?: boolean
  minColWidth: number

  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
}

export type DecisionTableProps = {
  hitPolicy: HitPolicy | string
  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]
  rules: Record<string, string>[]
}

export const DecisionTableContext = React.createContext<DecisionTableState>({} as any)

export type DecisionTableContextProps = {
  id?: string
  name?: string
  defaultValue?: DecisionTableProps
  value?: DecisionTableProps
  onChange?: (decisionTable: DecisionTableProps) => void
  namespace?: string
  activeRules?: string[]
  configurable?: boolean
  disabled?: boolean
  disableHitPolicy?: boolean
  inputsSchema?: SchemaSelectProps[]
  outputsSchema?: SchemaSelectProps[]
  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined
  minColWidth?: number
}

const parserOptions = {
  delimiter: ';',
}

const parserPipe = ' | '

const parseDecisionTable = (decisionTable?: DecisionTableProps) => {
  const dt: DecisionTableProps = {
    hitPolicy: decisionTable?.hitPolicy || 'first',
    inputs: decisionTable?.inputs || [],
    outputs: decisionTable?.outputs || [],
    rules: decisionTable?.rules || [],
  }

  if (dt.inputs?.length === 0) {
    dt.inputs = [
      {
        id: v4(),
        field: 'input',
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

export const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>> = (
  props
) => {
  const {
    id,
    name,
    namespace = 'default',
    children,
    activeRules,
    configurable = true,
    disabled,
    disableHitPolicy = false,
    onChange,
    value,
    defaultValue,
    inputsSchema,
    outputsSchema,
    cellRenderer,
    minColWidth = defaultColWidth,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [cursor, setCursor] = useState<TableCursor | null>(null)

  const cells = useRef<Record<string, TableCell | null>>({})
  const table = useRef<HTMLTableElement | null>(null)

  const [decisionTable, setDecisionTable] = useState<DecisionTableProps>(
    value ? parseDecisionTable(value) : parseDecisionTable(defaultValue)
  )
  const updateDecisionTable = (decisionTable: DecisionTableProps) => {
    if (!value || !onChange) {
      setDecisionTable(parseDecisionTable(decisionTable))
    }
    onChange?.(decisionTable)
  }

  useEffect(() => {
    if (value) {
      setDecisionTable(parseDecisionTable(value))
    }
  }, [value])

  const inputs: TableSchemaItem[] = decisionTable?.inputs || []
  const outputs: TableSchemaItem[] = decisionTable?.outputs || []

  const cleanupTableRule = (
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
    decisionTable: DecisionTableProps,
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

  const getColumnId = (x: string) =>
    [
      ...inputs.map((i) => ({
        ...i,
        colType: 'input',
      })),
      ...outputs.map((i) => ({
        ...i,
        colType: 'output',
      })),
    ].find((c) => c.id === x)

  const commitData = (value: string, cursor: TableCursor) => {
    const { x, y } = cursor
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft.rules[y][x] = value
        return draft
      })
    )
  }

  const swapRows = (source: number, target: number) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        const input = draft?.rules?.[source]
        draft.rules.splice(source, 1)
        draft.rules.splice(target, 0, input)
        return draft
      })
    )

    setCursor(null)
  }

  const addRowAbove = (target: number) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        const _id = v4()
        draft.rules.splice(
          target,
          0,
          cleanupTableRule(
            {
              _id,
            },
            _id
          )
        )
        return draft
      })
    )
    if (cursor?.y === target) {
      setCursor({
        y: cursor.y + 1,
        x: cursor.x,
      })
    }
  }

  const addRowBelow = (target: number) => {
    target += 1
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        const _id = v4()
        draft.rules.splice(
          target,
          0,
          cleanupTableRule(
            {
              _id,
            },
            _id
          )
        )
        return draft
      })
    )
    if (cursor?.y === target) {
      setCursor({
        y: cursor.y - 1,
        x: cursor.x,
      })
    }
  }

  const removeRow = (target: number) => {
    setCursor(null)
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft.rules.splice(target, 1)
        return draft
      })
    )
  }

  const addColumn = (type: ColumnType, column: TableSchemaItem) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft[type].push(column)
        draft.rules = cleanupTableRules(draft)
        return draft
      })
    )
  }

  const updateColumn = (type: ColumnType, id: string, data: TableSchemaItem) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
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
  }

  const removeColumn = (type: ColumnType, id: string) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft[type] = (draft?.[type] || []).filter((item) => item?.id !== id)
        draft.rules = cleanupTableRules(draft)
        return draft
      })
    )
    setCursor(null)
  }

  const reorderColumns = (type: ColumnType, columns: TableSchemaItem[]) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft[type] = columns
        draft.rules = cleanupTableRules(draft)
        return draft
      })
    )
  }

  const updateHitPolicy = (hitPolicy: HitPolicy) => {
    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft.hitPolicy = hitPolicy
        return draft
      })
    )
  }

  const exportCsv = async (options: TableExportOptions) => {
    const { name } = options
    const schemaMeta = [
      ...inputs.map((input) =>
        [input.name, input.field, 'INPUT', input.id, input.defaultValue].join(parserPipe)
      ),
      ...outputs.map((output) =>
        [output.name, output.field, 'OUTPUT', output.id, output.defaultValue].join(parserPipe)
      ),
    ]

    const schemaItems = [...inputs, ...outputs]
    const formatted = decisionTable?.rules.map((record) => {
      const newDataPoint: string[] = []
      schemaItems.forEach((schemaItem) => {
        const val = record?.[schemaItem.id || '']
        const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : val
        newDataPoint.push(formattedVal || '')
      })
      return newDataPoint
    })

    const csv = Papa.unparse(
      {
        fields: schemaMeta,
        data: formatted,
      },
      {
        ...parserOptions,
        header: true,
      }
    )

    const blob = new Blob([csv], { type: 'text/csv' })
    saveFile(`${name}.csv`, blob)
  }

  const importCsv = () => {
    fileInput?.current?.click?.()
  }

  const handleCsv = async (content: string) => {
    const spreadsheetData = await new Promise<any[]>((resolve, reject) =>
      Papa.parse(content, {
        ...parserOptions,
        header: false,
        complete: (results: Papa.ParseResult<Record<string, string>>) => {
          if (results.errors.length) {
            return reject('failed to parse csv file')
          }

          resolve(results.data)
        },
      })
    )

    const headers: any[] = spreadsheetData?.splice(0, 1)?.[0]
    const columns = headers.map((header: string) => {
      const [name, field, _type, id, defaultValue] = header
        .split(parserPipe)
        .map((s) => (s || '').trim())
      return {
        name,
        field,
        _type,
        type: 'expression',
        id,
        defaultValue,
      }
    })

    const inputs = columns
      .filter((column) => column._type === 'INPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      }))

    const outputs = columns
      .filter((column) => column._type === 'OUTPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      }))

    const rules = spreadsheetData.map((data) => {
      const dataPoint: Record<string, string> = {
        _id: v4(),
      }

      columns.forEach((col, index) => {
        dataPoint[col.id] = data?.[index] || ''
      })
      return dataPoint
    })

    updateDecisionTable(
      produce(decisionTable, (draft) => {
        draft.inputs = inputs
        draft.outputs = outputs
        draft.rules = rules
        return draft
      })
    )
  }

  const handleUploadInput = async (event: any) => {
    const fileList = event?.target?.files as FileList
    const reader = new FileReader()
    reader.onload = function (e) {
      handleCsv((e as any)?.target?.result)
    }

    reader.readAsText(Array.from(fileList)?.[0])
  }

  return (
    <DecisionTableContext.Provider
      value={{
        id,
        name,
        cursor,
        setCursor,

        value: decisionTable,
        inputs,
        outputs,
        namespace,
        inputValue,
        setInputValue,
        cells,
        table,

        // Actions
        commitData,
        swapRows,

        addRowAbove,
        addRowBelow,
        removeRow,

        addColumn,
        removeColumn,
        updateColumn,
        reorderColumns,
        updateHitPolicy,
        // end actions

        getColumnId,

        importCsv,
        exportCsv,

        activeRules,

        disabled,
        configurable,
        disableHitPolicy,

        minColWidth,

        inputsSchema,
        outputsSchema,
        cellRenderer,
      }}
    >
      <input
        multiple
        hidden
        accept='.csv'
        type='file'
        ref={fileInput}
        onChange={handleUploadInput}
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
      />
      {children}
    </DecisionTableContext.Provider>
  )
}

export const useDecisionTable = () => React.useContext(DecisionTableContext)

export default DecisionTableProvider
