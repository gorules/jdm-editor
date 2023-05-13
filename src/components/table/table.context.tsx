import produce, {
  Patch,
  PatchListener,
  applyPatches,
  enablePatches,
} from 'immer'
import { nanoid } from 'nanoid'
import Papa from 'papaparse'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { saveFile } from '../../helpers/file-helpers'

enablePatches()

export type TableCursor = {
  x: number
  y: number
}

type TableAction = {
  inversePatches: Patch[]
  patches: Patch[]
}

type TableActionStack = {
  past: TableAction[]
  future: TableAction[]
}

export type TableSchemaItem = {
  id: string
  name: string
  field?: string
  type: string
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
  name: string
}

export type TableImportOptions = {
  file: File
  replaceSchema?: boolean
}

export type HitPolicy = 'first' | 'collect'
export type ColumnType = 'inputs' | 'outputs'

export type TableState = {
  id?: string
  name?: string

  cursor: TableCursor | null
  setCursor: (cursor: TableCursor | null) => void
  trySetCursor: (cursor: TableCursor) => boolean

  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]

  actionStack: TableActionStack

  editing: boolean
  setEditing: (editing: boolean) => void

  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>

  getElementsFromEvent: (e: SyntheticEvent) => TableEventElements | null
  isLastElementFromEvent: (e: SyntheticEvent) => boolean
  isContentElementFromEvent: (e: SyntheticEvent) => boolean
  getCursorFromEvent: (e: SyntheticEvent) => TableCursor | null
  getCell: (cursor: TableCursor | null) => TableCell | null

  value: TableProps

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

  getColumnId: (x: number) => string | null

  cells: React.MutableRefObject<Record<string, TableCell | null>>
  table: React.MutableRefObject<HTMLTableElement | null>
  namespace: string

  undo: () => void
  redo: () => void

  importCsv: () => void
  exportCsv: (options: TableExportOptions) => Promise<void>

  activeRules?: string[]

  disabled?: boolean
  configurable?: boolean
}

export type TableProps = {
  hitPolicy: HitPolicy
  inputs: TableSchemaItem[]
  outputs: TableSchemaItem[]
  rules: Record<string, string>[]
}

const TableContext = React.createContext<TableState>({} as any)

export type TableContextProps = {
  id?: string
  name?: string
  value?: TableProps
  onChange?: (decisionTable: TableProps) => void
  namespace?: string
  activeRules?: string[]
  configurable?: boolean
  disabled?: boolean
}

const parserOptions = {
  delimiter: ';',
}

const parserPipe = ' | '

const TableProvider: React.FC<React.PropsWithChildren<TableContextProps>> = (
  props
) => {
  const {
    id,
    name,
    namespace = 'default',
    children,
    activeRules,
    configurable,
    disabled,
    onChange,
    value: defaultDecisionTable,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [cursor, setCursor] = useState<TableCursor | null>(null)

  const [editing, setEditing] = useState<boolean>(false)
  const cells = useRef<Record<string, TableCell | null>>({})
  const table = useRef<HTMLTableElement | null>(null)
  const actionStack = useRef<TableActionStack>({ future: [], past: [] })

  const [decisionTable, setDecisionTable] = useState<TableProps>({
    hitPolicy: defaultDecisionTable?.hitPolicy || 'first',
    inputs: defaultDecisionTable?.inputs || [],
    outputs: defaultDecisionTable?.outputs || [],
    rules: defaultDecisionTable?.rules || [],
  })

  const inputs: TableSchemaItem[] =
    decisionTable?.inputs?.length > 0
      ? decisionTable?.inputs || []
      : [
          {
            id: `${id}_input`,
            name: 'No Inputs',
            type: '',
          },
        ]

  const outputs: TableSchemaItem[] =
    decisionTable?.outputs?.length > 0
      ? decisionTable?.outputs || []
      : [
          {
            id: `${id}_output`,
            name: 'No Outputs',
            type: '',
          },
        ]

  const cleanupTableRule = (
    rule: Record<string, string>
  ): Record<string, string> => {
    const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs]
    const newRule: Record<string, string> = {
      _id: rule._id || nanoid(10),
      _description: rule._description,
    }
    schemaItems.forEach((schemaItem) => {
      newRule[schemaItem.id || ''] = rule?.[schemaItem.id || ''] || ''
    })
    return newRule
  }

  const cleanupTableRules = (
    decisionTable: TableProps
  ): Record<string, string>[] => {
    const rules = decisionTable?.rules || []
    const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs]
    return rules.map((rule) => {
      const newRule: Record<string, string> = {
        _id: rule._id || nanoid(10),
        _description: rule._description,
      }
      schemaItems.forEach((schemaItem) => {
        newRule[schemaItem.id || ''] = rule?.[schemaItem.id || ''] || ''
      })
      return newRule
    })
  }

  useEffect(() => {
    onChange?.(decisionTable)
  }, [decisionTable])

  const getColumnId = (x: number) => [...inputs, ...outputs]?.[x]?.id || null

  const patchListener: PatchListener = (patches, inversePatches) => {
    actionStack.current.future = []
    actionStack.current.past = actionStack.current.past
      .reverse()
      .slice(0, 10)
      .reverse()
    actionStack.current.past.push({ patches, inversePatches })
  }

  const undo = () => {
    const action = actionStack.current.past.pop()
    if (!action) return

    actionStack.current.future.push(action)
    setDecisionTable((data) => applyPatches(data, action.inversePatches))
  }

  const redo = () => {
    const action = actionStack.current.future.pop()
    if (!action) return

    actionStack.current.past.push(action)
    setDecisionTable((data) => applyPatches(data, action.patches))
  }

  const _setEditing = (value: boolean) => {
    if (value === editing) return

    if (value && cursor) {
      const columnId = getColumnId(cursor.x)
      setInputValue(
        columnId ? decisionTable?.rules?.[cursor.y]?.[columnId] || '' : ''
      )
    }

    setEditing(value)
  }

  const trySetCursor = (newCursor: TableCursor) => {
    const { x, y } = newCursor
    const columnId = getColumnId(x)

    if (!columnId) return false

    const rowExists = !!decisionTable?.rules?.[y]
    if (!rowExists) return false

    setCursor(newCursor)
    return true
  }

  const getElementsFromEvent = (
    e: SyntheticEvent
  ): TableEventElements | null => {
    const target = e.target as HTMLElement
    const cell = target.hasAttribute('data-table-cell')
      ? target
      : target.closest('[data-table-cell]')

    if (!cell) {
      return null
    }

    return { cell: cell as HTMLDivElement }
  }

  const getCursorFromEvent = (e: SyntheticEvent): TableCursor | null => {
    const elements = getElementsFromEvent(e)

    if (!elements) {
      return null
    }

    const { cell } = elements

    const x = Number.parseInt(cell.getAttribute('data-x')!, 10)
    const y = Number.parseInt(cell.getAttribute('data-y')!, 10)

    return { x, y }
  }

  const isLastElementFromEvent = (e: SyntheticEvent): boolean => {
    const elements = getElementsFromEvent(e)

    if (!elements) {
      return false
    }

    const { cell } = elements
    const y = Number.parseInt(cell.getAttribute('data-y') || '', 10)
    return y === decisionTable?.rules?.length
  }

  const isContentElementFromEvent = (e: SyntheticEvent): boolean => {
    const elements = getElementsFromEvent(e)

    if (!elements) {
      return false
    }

    const { cell } = elements
    return cell.getAttribute('data-type') === 'content'
  }

  const getCell = (cursor: TableCursor | null): TableCell | null => {
    if (!cursor) return null

    const { x, y } = cursor
    const columnId = getColumnId(x)

    if (!columnId) return null

    const cell = cells.current?.[`${y}:${columnId}`]

    if (!cell) return null

    return cell
  }

  const commitData = (value: string, cursor: TableCursor) => {
    const { x, y } = cursor
    const column = getColumnId(x)

    if (!column) return

    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.rules[y][column] = value
          return draft
        },
        patchListener
      )
    )
  }

  const swapRows = (source: number, target: number) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          const input = draft?.rules?.[source]
          draft.rules.splice(source, 1)
          draft.rules.splice(target, 0, input)
          return draft
        },
        patchListener
      )
    )

    setCursor(null)
  }

  const addRowAbove = (target: number) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.rules.splice(
            target,
            0,
            cleanupTableRule({
              _id: nanoid(10),
            })
          )
          return draft
        },
        patchListener
      )
    )

    setCursor((cursor) =>
      cursor
        ? {
            ...cursor,
            y: cursor.y + 1,
          }
        : null
    )
  }

  const addRowBelow = (target: number) => {
    target += 1
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.rules.splice(
            target,
            0,
            cleanupTableRule({
              _id: nanoid(10),
            })
          )
          return draft
        },
        patchListener
      )
    )
  }

  const removeRow = (target: number) => {
    setCursor(null)
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.rules.splice(target, 1)
          return draft
        },
        patchListener
      )
    )

    if (cursor) {
      if (!trySetCursor({ x: cursor.x, y: cursor.y - 1 })) {
        trySetCursor({ x: cursor.x, y: cursor.y })
      }
    }
  }

  const addColumn = (type: ColumnType, column: TableSchemaItem) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft[type].push(column)
          draft.rules = cleanupTableRules(draft)
          return draft
        },
        patchListener
      )
    )
  }

  const updateColumn = (
    type: ColumnType,
    id: string,
    data: TableSchemaItem
  ) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft[type] = draft[type].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name: data?.name,
                field: data?.field,
              }
            }
            return item
          })
          draft.rules = cleanupTableRules(draft)
          return draft
        },
        patchListener
      )
    )
  }

  const removeColumn = (type: ColumnType, id: string) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft[type] = (draft?.[type] || []).filter((item) => item?.id !== id)
          draft.rules = cleanupTableRules(draft)
          return draft
        },
        patchListener
      )
    )
    setCursor(null)
  }

  const reorderColumns = (type: ColumnType, columns: TableSchemaItem[]) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft[type] = columns
          draft.rules = cleanupTableRules(draft)
          return draft
        },
        patchListener
      )
    )
  }

  const updateHitPolicy = (hitPolicy: HitPolicy) => {
    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.hitPolicy = hitPolicy
          return draft
        },
        patchListener
      )
    )
  }

  const exportCsv = async (options: TableExportOptions) => {
    const { name } = options
    const schemaMeta = [
      ...inputs.map((input) =>
        [input.name, input.field, 'INPUT', input.id].join(parserPipe)
      ),
      ...outputs.map((output) =>
        [output.name, output.field, 'OUTPUT', output.id, output.type].join(
          parserPipe
        )
      ),
    ]

    const schemaItems = [...inputs, ...outputs]
    const formatted = decisionTable?.rules.map((record) => {
      const newDataPoint: string[] = []
      schemaItems.forEach((schemaItem) => {
        const val = record?.[schemaItem.id || '']
        const formattedVal =
          typeof val === 'object' && val !== null ? JSON.stringify(val) : val
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
      const [name, field, _type, id, type] = header
        .split(parserPipe)
        .map((s) => (s || '').trim())
      return {
        name,
        field,
        _type,
        type: type || 'expression',
        id,
      }
    })

    const inputs = columns
      .filter((column) => column._type === 'INPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
      }))

    const outputs = columns
      .filter((column) => column._type === 'OUTPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
      }))

    const rules = spreadsheetData.map((data) => {
      const dataPoint: Record<string, string> = {
        _id: nanoid(10),
      }

      columns.forEach((col, index) => {
        dataPoint[col.id] = data?.[index] || ''
      })
      return dataPoint
    })

    setDecisionTable(
      produce(
        decisionTable,
        (draft) => {
          draft.inputs = inputs
          draft.outputs = outputs
          draft.rules = rules
          return draft
        },
        patchListener
      )
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
    <TableContext.Provider
      value={{
        id,
        name,
        cursor,
        setCursor,
        trySetCursor,

        value: decisionTable,
        actionStack: actionStack.current,
        inputs,
        outputs,
        namespace,

        editing,
        setEditing: _setEditing,
        inputValue,
        setInputValue,
        getElementsFromEvent,
        getCursorFromEvent,
        isLastElementFromEvent,
        isContentElementFromEvent,
        getCell,
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

        undo,
        redo,

        importCsv,
        exportCsv,

        activeRules,

        disabled,
        configurable,
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
    </TableContext.Provider>
  )
}

export const useTable = () => React.useContext(TableContext)

export default TableProvider
