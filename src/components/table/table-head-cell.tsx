import clsx from 'clsx'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Draggable from 'react-draggable'

import { TableCell as TableCellRef, TableSchemaItem } from './table.context'

export type TableHeadCellProps = {
  resizable?: boolean
  as?: 'td' | 'th' | 'div'
  onWidthChange?: (width?: number) => void
  field?: TableSchemaItem
} & Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'onChange'>

export const TableHeadCell = forwardRef<TableCellRef, TableHeadCellProps>(
  (props, ref) => {
    const {
      className,
      children,
      resizable,
      as: Td = 'td',
      onWidthChange,
      ...rest
    } = props
    const cell = useRef<HTMLTableCellElement>(null)

    useImperativeHandle(ref, () => cell.current as any)

    return (
      <Td
        ref={cell}
        className={clsx('grl-table__head__cell', className)}
        {...rest}
      >
        {children}
        {/*{field && (
        <IconButton className={classes.filterButton} iconProps={{ iconName: 'Filter', style: { fontSize: 14 } }} />
      )}*/}
        {resizable && (
          <>
            <Draggable
              axis='x'
              position={{ x: 0, y: 0 }}
              onDrag={(e, data) => {
                if (!cell.current) return
                onWidthChange?.(data.deltaX)
              }}
            >
              <div className='resizer' />
            </Draggable>
          </>
        )}
      </Td>
    )
  }
)
