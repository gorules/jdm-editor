import { HTMLAttributes } from 'react'

import { copyToClipboard, pasteFromClipboard } from '../../helpers/utility'
import { useTable } from './table.context'

type TableEvents = Partial<HTMLAttributes<HTMLDivElement>>

export const useTableEvents = (): TableEvents => {
  const {
    editing,
    setEditing,
    cursor,
    getElementsFromEvent,
    getCursorFromEvent,
    getCell,
    getColumnId,
    setCursor,
    trySetCursor,
    inputValue,
    setInputValue,
    commitData,
    value,
    addRowBelow,
    addRowAbove,
    removeRow,
    undo,
    redo,
    table,
    isLastElementFromEvent,
    isContentElementFromEvent,
    disabled,
  } = useTable()

  return {
    onContextMenuCapture: (e) => {
      if (disabled) return
      const target = e.target as HTMLElement

      const isLastElement = isLastElementFromEvent(e)
      if (isLastElement) return

      if (target.nodeName === 'TEXTAREA' || target.nodeName === 'INPUT') {
        e.preventDefault()
        return
      }

      const elements = getElementsFromEvent(e)
      const cursor = getCursorFromEvent(e)

      if (!elements) {
        return
      }

      e.preventDefault()

      if (cursor && editing) {
        commitData(inputValue, cursor)
        setEditing(false)
        setInputValue('')
      }

      setCursor(cursor)
    },
    onClickCapture: (e) => {
      const nextCursor = getCursorFromEvent(e)
      const isLastElement = isLastElementFromEvent(e)
      if (isLastElement) return
      if (nextCursor?.x === cursor?.x && nextCursor?.y === cursor?.y) return

      if (nextCursor) {
        if (cursor && editing) {
          commitData(inputValue, cursor)
          setEditing(false)
          setInputValue('')
        }

        setCursor(nextCursor)
        e.preventDefault()
      }
    },
    onDoubleClickCapture: (e) => {
      if (disabled || isLastElementFromEvent(e)) return

      if (isContentElementFromEvent(e)) {
        ;(e.target as HTMLDivElement).querySelector('button')?.click()
        return
      }

      if (cursor) {
        setEditing(true)
      }
    },
    onFocusCapture: (e) => {
      const target = e.target as HTMLElement
      if (isLastElementFromEvent(e) || isContentElementFromEvent(e)) {
        return
      }

      if (target.nodeName === 'TEXTAREA' || target.nodeName === 'INPUT') {
        return
      }

      const nextCursor = getCursorFromEvent(e)
      if (nextCursor) {
        if (cursor && editing) {
          commitData(inputValue, cursor)
          setEditing(false)
          setInputValue('')
          setCursor(nextCursor)
        }

        e.preventDefault()
      }
    },
    onKeyDownCapture: async (e) => {
      if (!cursor) return

      const preventDefault = () => {
        e.preventDefault()
        e.stopPropagation()
        table.current?.focus()
      }

      if (e.code === 'Escape' && editing) {
        setInputValue('')
        setEditing(false)
        return preventDefault()
      }

      const target = e.target as HTMLElement
      const isInput =
        target.nodeName === 'TEXTAREA' || target.nodeName === 'INPUT'

      const { x, y } = cursor
      const currentCell = getCell(cursor)

      if (e.code === 'KeyC' && (e.metaKey || e.ctrlKey) && !editing) {
        const columnId = getColumnId(x)
        if (!columnId) {
          return preventDefault()
        }

        await copyToClipboard(value.rules?.[y]?.[columnId] || '')
        return preventDefault()
      }

      if (e.code === 'KeyV' && (e.metaKey || e.ctrlKey) && !disabled) {
        const value = await pasteFromClipboard()
        commitData(value, cursor)
        return preventDefault()
      }

      if (e.code === 'KeyZ' && (e.metaKey || e.ctrlKey) && !disabled) {
        if (editing) {
          setEditing(false)
          setInputValue('')
        }

        e.shiftKey ? redo() : undo()
        return preventDefault()
      }

      if (e.code === 'KeyY' && (e.metaKey || e.ctrlKey) && !disabled) {
        if (editing) {
          setEditing(false)
          setInputValue('')
        }

        redo()
        return preventDefault()
      }

      if (e.code === 'Enter') {
        if (e.metaKey || e.altKey) {
          e.preventDefault()
          e.stopPropagation()
          return
        }

        if (e.ctrlKey) {
          if (!editing) {
            if (currentCell?.getAttribute('data-type') === 'content') {
              currentCell.querySelector('button')?.click()
            }

            return preventDefault()
          }

          commitData(inputValue, cursor)
          setEditing(false)
          setInputValue('')
          return preventDefault()
        }

        const dy = e.shiftKey ? -1 : 1

        if (editing) {
          commitData(inputValue, cursor)
          setEditing(false)
        }

        trySetCursor({ x, y: y + dy })
        setInputValue('')
        return preventDefault()
      }

      if (e.code === 'Tab') {
        if (editing) {
          commitData(inputValue, cursor)
          setEditing(false)
          setInputValue('')
        }

        const dx = e.shiftKey ? -1 : 1
        trySetCursor({ x: x + dx, y })
        return preventDefault()
      }

      if (isInput) return

      // Minor Events - Ignore if input
      if (e.code === 'ArrowUp') {
        if ((e.metaKey || e.altKey) && !disabled) {
          addRowAbove(y)
          return preventDefault()
        }

        trySetCursor({ x, y: y - 1 })
        return preventDefault()
      }
      if (e.code === 'ArrowDown') {
        if ((e.metaKey || e.altKey) && !disabled) {
          addRowBelow(y)
          return preventDefault()
        }

        trySetCursor({ x, y: y + 1 })
        return preventDefault()
      }
      if (e.code === 'ArrowLeft') {
        trySetCursor({ x: x - 1, y })
        return preventDefault()
      }
      if (e.code === 'ArrowRight') {
        trySetCursor({ x: x + 1, y })
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

      if (
        e.key.length === 1 &&
        !editing &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !disabled
      ) {
        setEditing(true)
        setInputValue(e.key)
        return preventDefault()
      }
    },
    onBlurCapture: (e) => {
      const tableElement = table.current
      if (!tableElement) return

      const preventDefault = () => {
        e.preventDefault()
        e.stopPropagation()
        const currentCell = getCell(cursor)
        if (currentCell && currentCell.querySelector('input')) {
          currentCell.querySelector('input')?.focus()
        } else {
          tableElement.focus()
        }
      }

      const { relatedTarget } = e
      if (!relatedTarget) {
        return preventDefault()
      }

      if (tableElement.contains(relatedTarget)) {
        return e.preventDefault()
      }

      if (editing && cursor) {
        commitData(inputValue, cursor)
        setEditing(false)
        setInputValue('')
      }
    },
  }
}
