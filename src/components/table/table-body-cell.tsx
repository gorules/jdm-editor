import clsx from 'clsx'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import { TableCell as TableCellRef } from './table.context'

export type SpreadsheetCellProps = {
  as?: 'td' | 'th' | 'div'
  minWidth?: number
  maxWidth?: number
  editing?: boolean
  selected?: boolean
  children?: string | number | React.ReactNode
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange']
} & Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children' | 'onChange'>

const BodyCell = forwardRef<TableCellRef, SpreadsheetCellProps>(
  (props, ref) => {
    const {
      className,
      children,
      selected,
      editing,
      onChange,
      as: Td = 'td',
      minWidth,
      maxWidth,
      ...rest
    } = props
    const cell = useRef<HTMLTableCellElement>(null)
    useImperativeHandle(ref, () => cell.current as any)

    return (
      <Td
        ref={cell}
        style={{ minWidth, maxWidth }}
        className={clsx(
          'grl-table__body__cell',
          className,
          selected && 'selected',
          editing && 'editing'
        )}
        {...rest}
      >
        {editing ? (
          <input
            className='input'
            autoFocus
            tabIndex={0}
            type='text'
            value={children as string}
            onChange={onChange}
          />
        ) : (
          children
        )}
      </Td>
    )
  }
)

export const TableBodyCell = React.memo(BodyCell)
