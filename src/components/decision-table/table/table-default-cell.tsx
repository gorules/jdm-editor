import { CellContext } from '@tanstack/react-table'
import React, { memo, useId, useLayoutEffect, useRef, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { columnIdSelector } from '../../../helpers/components'
import { TableSchemaItem, useDecisionTableStore } from '../context/dt-store.context'

export type TableDefaultCellProps = {
  context: CellContext<Record<string, string>, string>
} & React.HTMLAttributes<HTMLDivElement>

export const TableDefaultCell = memo<TableDefaultCellProps>(({ context, ...props }) => {
  const {
    row: { index },
    column: { id },
    table,
  } = context
  const value = useDecisionTableStore(
    (store: any) => store.decisionTable?.rules?.[index]?.[id],
    shallow
  )

  const [inner, setInner] = useState(value)
  useLayoutEffect(() => {
    if (inner !== value) {
      setInner(value)
    }
  }, [value])

  const column = useDecisionTableStore(
    columnIdSelector(id),
    (a, b) => a?.id !== undefined && b?.id !== undefined && a?.id === b?.id
  )

  const disabled = useDecisionTableStore((store) => store.disabled, shallow)
  const commitData = useDecisionTableStore((store) => store.commitData, shallow)
  const setCursor = useDecisionTableStore((store) => store.setCursor, shallow)

  const commit = (val: string) => {
    setInner(val)
    commitData(val, {
      x: id,
      y: index,
    })
  }

  return (
    <div
      className='cell-wrapper'
      onFocus={() =>
        setCursor({
          x: id,
          y: index,
        })
      }
      {...props}
    >
      {(table.options.meta as any)?.getCell?.({
        disabled,
        column,
        value: inner,
        onChange: commit,
      }) || <TableInputCell disabled={disabled} column={column} value={inner} onChange={commit} />}
    </div>
  )
})

export type TableCellProps = {
  column?: { colType: string } & TableSchemaItem
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const TableInputCell: React.FC<TableCellProps> = ({ value, onChange, disabled }) => {
  const id = useId()

  return (
    <textarea
      id={id}
      className={'grl-dt__cell__input textarea-input'}
      value={value}
      rows={Math.min(value?.split?.('\n')?.length || 1, 3)}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
