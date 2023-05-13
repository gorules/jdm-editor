import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { AutoSizer, Index, List, ScrollSync } from 'react-virtualized'
import 'react-virtualized/styles.css'

import { TableBody } from './table-body'
import { TableContextMenu } from './table-context-menu'
import { useTableEvents } from './table-events'
import { TableHead, TableHeadRef } from './table-head'
import { useTable } from './table.context'

const loadTablePreferences = (namespace: string): any => {
  try {
    const stringData = localStorage.getItem(
      `decisionTable.preferences.${namespace}`
    )
    if (!stringData) return {}
    return JSON.parse(stringData)
  } catch (e) {
    return {}
  }
}

const saveTablePreferences = (namespace: string, preferences: any) => {
  try {
    const stringData = JSON.stringify(preferences)
    if (!stringData) return
    localStorage.setItem(`decisionTable.preferences.${namespace}`, stringData)
  } catch (e) {
    return
  }
}

const TableMain: React.VFC = () => {
  const { namespace, table, swapRows, value, inputs, outputs } = useTable()

  const preferences = useRef<any>(loadTablePreferences(namespace))
  const headerRef = useRef<TableHeadRef>(null)
  const bodyRef = useRef<List>(null)

  const schemaHash = [...inputs, ...outputs].map((i) => i.id).join('::')

  const recomputeSizes = () => {
    headerRef.current?.recomputeGridSize()
    bodyRef.current?.recomputeGridSize()

    saveTablePreferences(namespace, preferences.current)
  }

  useEffect(() => {
    recomputeSizes()
  }, [recomputeSizes, schemaHash])

  const columnWidth = ({ index }: Index) => {
    if (index === 0) return 50

    const schema = [...inputs, ...outputs]?.[index - 1]
    return preferences.current?.size?.[schema.id] || 200
  }

  const onDragEnd = (result: DropResult) => {
    if (
      isNaN(result.source.index as any) ||
      isNaN(result.destination?.index as any)
    )
      return

    if ((result?.destination?.index as number) < value?.rules?.length) {
      swapRows(result.source.index, result.destination!.index)
    }
  }

  const tableEvents = useTableEvents()

  const height1 = 48
  const height2 = 36

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={clsx('grl-table__main')}
        ref={table}
        tabIndex={0}
        {...tableEvents}
      >
        <AutoSizer>
          {({ width, height }) => (
            <ScrollSync>
              {({ scrollTop, scrollLeft, onScroll }) => (
                <>
                  <TableHead
                    ref={headerRef}
                    scrollLeft={scrollLeft}
                    scrollTop={scrollTop}
                    onScroll={onScroll}
                    width={width}
                    height={height1}
                    height2={height2}
                    columnWidth={columnWidth}
                    preferences={preferences}
                    onPreferencesChange={recomputeSizes}
                  />
                  {value?.inputs?.length > 0 && value?.outputs?.length > 0 && (
                    <TableContextMenu>
                      <div>
                        <TableBody
                          ref={bodyRef}
                          onScroll={onScroll}
                          width={width}
                          height={height - height1 - height2}
                          columnWidth={columnWidth}
                          preferences={preferences.current}
                        />
                      </div>
                    </TableContextMenu>
                  )}
                </>
              )}
            </ScrollSync>
          )}
        </AutoSizer>
      </div>
    </DragDropContext>
  )
}

export default TableMain
