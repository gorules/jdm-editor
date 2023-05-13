import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from '@hello-pangea/dnd'
import composeRefs from '@seznam/compose-react-refs'
import React, { forwardRef, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { GridProps, Index, List } from 'react-virtualized'

import { StrictModeDroppable } from '../strict-mode-droppable'
import { TableBodyRow } from './table-body-row'
import { useTable } from './table.context'

export type TableBodyProps = {
  onScroll: GridProps['onScroll']
  width: number
  height: number
  columnWidth: (params: Index) => number
  preferences: any
}

export const TableBody = forwardRef<List, TableBodyProps>((props, ref) => {
  const list = useRef<List>(null)
  const {
    activeRules,
    value,
    cursor,
    setInputValue,
    getCell,
    addRowAbove,
    setCursor,
    disabled,
  } = useTable()

  const { columnWidth, onScroll, height, width } = props

  const onRowAdd = (y: number) => {
    if (disabled) return
    setCursor?.(null)
    setInputValue('')
    addRowAbove?.(y)
  }

  useEffect(() => {
    if (!list.current) return

    // TODO fix
    // eslint-disable-next-line react/no-find-dom-node
    const scrollingContainer = ReactDOM.findDOMNode(
      list.current
    ) as HTMLDivElement

    if (!(scrollingContainer instanceof HTMLElement)) return

    const innerContainer = scrollingContainer.firstChild as HTMLDivElement

    if (!innerContainer) return

    const listener = () => onScroll?.(innerContainer)
    innerContainer.addEventListener('scroll', listener)

    return () => {
      innerContainer.removeEventListener('scroll', listener)
    }
  }, [onScroll, list])

  useEffect(() => {
    if (!list.current || !cursor) return

    const cell = getCell(cursor)

    if (!cell) return

    // TODO fix
    // eslint-disable-next-line react/no-find-dom-node
    const scrollingContainer = ReactDOM.findDOMNode(
      list.current
    ) as HTMLDivElement

    if (scrollingContainer instanceof HTMLElement) {
      const innerContainer = scrollingContainer.firstChild as HTMLDivElement

      const containerScroll = innerContainer.scrollLeft
      const containerWidth = width

      const cellOffset = cell.offsetLeft
      const cellWidth = cell.clientWidth

      if (cursor.x === 0) {
        innerContainer.scrollLeft = 0
      } else if (cellOffset < containerScroll) {
        innerContainer.scrollLeft = cellOffset
      } else if (
        cellOffset >= containerScroll &&
        cellOffset + cellWidth > containerScroll + containerWidth
      ) {
        if (cellOffset > cell.offsetLeft - width + cell.clientWidth) {
          innerContainer.scrollLeft = cell.offsetLeft - width + cell.clientWidth
        }
      }

      list.current.scrollToRow(cursor.y)
    }
  }, [cursor, getCell, width])

  return (
    <>
      <div className={'grl-table__body'}>
        <StrictModeDroppable
          droppableId='droppableList'
          mode='virtual'
          isDropDisabled={disabled}
          renderClone={(provided, snapshot, rubric) => (
            <TableBodyRow
              className='dragging'
              onRowAdd={onRowAdd}
              ref={provided.innerRef}
              columnWidth={columnWidth}
              index={rubric.source.index}
              dragHandleProps={
                provided.dragHandleProps as DraggableProvidedDragHandleProps
              }
              {...provided.draggableProps}
              style={{
                ...provided.draggableProps.style,
                zIndex: 99999999,
                fontWeight: 300,
              }}
            />
          )}
        >
          {(provided) => (
            <List
              rowCount={(value?.rules?.length || 0) + 1}
              rowHeight={36}
              width={width}
              height={height}
              scrollToColumn={
                (cursor?.x || 0) + 1 === 1 ? 0 : (cursor?.x || 0) + 1
              }
              scrollToRow={cursor?.y}
              className='list'
              tabIndex={null}
              ref={composeRefs(ref, list, (ref) => {
                if (ref) {
                  // TODO fix
                  // eslint-disable-next-line react/no-find-dom-node
                  const domNode = ReactDOM.findDOMNode(ref)
                  if (domNode instanceof HTMLElement) {
                    provided.innerRef(domNode)
                  }
                }
              })}
              rowRenderer={({ key, style, index }) => (
                <Draggable
                  key={key}
                  draggableId={key}
                  index={index}
                  isDragDisabled={disabled || index === value?.rules?.length}
                >
                  {(provided) => (
                    <TableBodyRow
                      className={
                        activeRules?.includes(value?.rules?.[index]?._id)
                          ? 'active'
                          : ''
                      }
                      onRowAdd={onRowAdd}
                      ref={provided.innerRef}
                      columnWidth={columnWidth}
                      index={index}
                      dragHandleProps={
                        provided.dragHandleProps as DraggableProvidedDragHandleProps
                      }
                      {...provided.draggableProps}
                      style={{
                        ...style,
                        ...provided.draggableProps.style,
                        zIndex: 999999,
                      }}
                    />
                  )}
                </Draggable>
              )}
            />
          )}
        </StrictModeDroppable>
      </div>
    </>
  )
})
