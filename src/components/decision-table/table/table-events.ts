import React, { HTMLAttributes, SyntheticEvent } from 'react'

import { copyToClipboard, pasteFromClipboard } from '../../../helpers/utility'
import { TableCell, TableCursor, useDecisionTable } from '../context/dt.context'

type DecisionTableEvents = Partial<HTMLAttributes<HTMLDivElement>> & {
  onKeyDownCell: (e: React.KeyboardEvent<HTMLElement>) => void
}

type TableEventElement = {
  cell: HTMLElement
}

const incrementSchemaBy = (
  schema: string[],
  current: string,
  amount: number
): string | undefined => {
  const currentIndex = schema.indexOf(current)
  if (currentIndex === -1) {
    return schema[0]
  }

  return schema?.[currentIndex + amount]
}

export const useTableEvents = (): DecisionTableEvents => {
  const {
    cursor,
    commitData,
    value: decisionTable,
    addRowBelow,
    addRowAbove,
    removeRow,
    table,
    disabled,
    cells,
    schemaIds,
    trySetCursor,
  } = useDecisionTable()

  const moveCursor = (cursor: Partial<TableCursor> | null) => {
    if (trySetCursor(cursor)) {
      scrollToCursor(cursor as TableCursor)
      return true
    }

    return false
  }

  const scrollToCursor = (cursor: TableCursor) => {
    table.current
      ?.querySelector(`[data-x="${cursor.x}"][data-y="${cursor.y}"]`)
      ?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' })
  }

  const getCell = (cursor: TableCursor | null): TableCell | null => {
    if (!cursor) return null

    const { x, y } = cursor
    const cell = cells.current?.[`${y}:${x}`]
    if (!cell) return null

    return cell
  }

  const getElementsFromEvent = (e: SyntheticEvent): TableEventElement | null => {
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

    const x = cell.getAttribute('data-x')!
    const y = Number.parseInt(cell.getAttribute('data-y')!, 10)

    return { x, y }
  }

  return {
    onKeyDownCell: (e: React.KeyboardEvent<HTMLElement>) => {
      const cursor = getCursorFromEvent(e)
      if (!cursor) return
      const { x, y } = cursor

      if (e.key === 'Escape') {
        table.current?.focus()
        return e.preventDefault()
      }

      if (e.key === 'Tab') {
        const dx = e.shiftKey ? -1 : 1
        moveCursor({ x: incrementSchemaBy(schemaIds, x, dx), y })
        table.current?.focus()
        return e.preventDefault()
      }

      if (e.key === 'Enter') {
        if (e.metaKey || e.altKey) {
          e.preventDefault()
          e.stopPropagation()
          return
        }

        table.current?.focus()
        if (e.ctrlKey) {
          return e.preventDefault()
        }

        const dy = e.shiftKey ? -1 : 1
        moveCursor({ x, y: y + dy })
        return e.preventDefault()
      }
    },
    onContextMenuCapture: (e) => {
      if (disabled) return
      const elements = getElementsFromEvent(e)
      const cursor = getCursorFromEvent(e)
      moveCursor(cursor!)

      if (!elements) {
        return
      }

      e.preventDefault()
    },
    onClick: (e) => {
      const nextCursor = getCursorFromEvent(e)
      if (!nextCursor) {
        return
      }

      const cell = getCell(nextCursor)
      if (!cell) {
        return
      }

      trySetCursor(nextCursor)
      if (cell.querySelector('input[readonly]')) {
        table.current?.focus({ preventScroll: true })
        return e.preventDefault()
      }
    },
    onKeyDownCapture: async (e) => {
      if (!cursor) return
      const editing = e.target instanceof HTMLInputElement
      if (editing) {
        return
      }

      const preventDefault = () => {
        e.preventDefault()
        e.stopPropagation()
        table.current?.focus()
      }

      const { x, y } = cursor
      const currentCell = getCell(cursor)

      if (e.code === 'KeyC' && (e.metaKey || e.ctrlKey) && !editing) {
        const cell = decisionTable.rules?.[y]?.[x]
        if (!cell) {
          return preventDefault()
        }

        await copyToClipboard(cell || '')
        return preventDefault()
      }

      if (e.code === 'KeyV' && (e.metaKey || e.ctrlKey) && !disabled) {
        const value = await pasteFromClipboard()
        commitData(value, cursor)
        return preventDefault()
      }

      if (e.code === 'Enter') {
        if (e.metaKey || e.altKey) {
          e.preventDefault()
          e.stopPropagation()
          return
        }

        const inputElement = currentCell?.querySelector('input[data-typeable]')
        if (inputElement instanceof HTMLInputElement) {
          inputElement.focus({ preventScroll: true })
        }

        return
      }

      if (e.code === 'Tab') {
        const dx = e.shiftKey ? -1 : 1
        moveCursor({ x: incrementSchemaBy(schemaIds, x, dx), y })
        return preventDefault()
      }

      // Minor Events - Ignore if input
      if (e.code === 'ArrowUp') {
        if ((e.metaKey || e.altKey) && !disabled) {
          addRowAbove(y)
          return preventDefault()
        }

        moveCursor({ x, y: y - 1 })
        scrollToCursor({ x, y: y - 1 })
        return preventDefault()
      }
      if (e.code === 'ArrowDown') {
        if ((e.metaKey || e.altKey) && !disabled) {
          addRowBelow(y)
          return preventDefault()
        }

        moveCursor({ x, y: y + 1 })
        scrollToCursor({ x, y: y + 1 })
        return preventDefault()
      }
      if (e.code === 'ArrowLeft') {
        moveCursor({ x: incrementSchemaBy(schemaIds, x, -1), y })
        return preventDefault()
      }
      if (e.code === 'ArrowRight') {
        moveCursor({ x: incrementSchemaBy(schemaIds, x, 1), y })
        return preventDefault()
      }
      if (e.code === 'Backspace' && !editing && currentCell && !disabled) {
        if (e.metaKey || e.altKey) {
          removeRow(y)
          return preventDefault()
        }

        commitData('', cursor)
        return preventDefault()
      }

      if (e.key.length === 1 && !editing && !e.metaKey && !e.ctrlKey && !e.altKey && !disabled) {
        const inputElement = currentCell?.querySelector('input[data-typeable]')
        if (inputElement instanceof HTMLInputElement) {
          inputElement.focus({ preventScroll: true })
          inputElement.value = inputElement.value + e.key
        }

        return
      }
    },
    onBlurCapture: (e) => {
      const tableElement = table.current
      if (!tableElement) return

      const { relatedTarget } = e
      if (!relatedTarget || tableElement.contains(relatedTarget)) {
        const currentCell = getCell(cursor)
        const inputElement = currentCell?.querySelector<HTMLInputElement>('input')

        if (!(inputElement instanceof HTMLInputElement)) {
          tableElement.focus({ preventScroll: true })
          e.preventDefault()
          e.stopPropagation()
        }
      }
    },
  }
}
