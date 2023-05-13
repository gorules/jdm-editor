import React, { useState } from 'react'

import { ColumnType, TableSchemaItem } from './table.context'

export type TableDialogType = 'add' | 'reorder' | 'edit'
export type TableDialogState = {
  type: TableDialogType
  item: TableSchemaItem | null
  columnType: ColumnType
}

export type TableDialogContextState = {
  setDialog: React.Dispatch<React.SetStateAction<TableDialogState | undefined>>
  dialog: TableDialogState | undefined
  isDialogActive: (type: TableDialogType) => boolean
}

export const TableDialogContext = React.createContext<TableDialogContextState>(
  {} as any
)

export const TableDialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<TableDialogState | undefined>(undefined)
  const isDialogActive = (type: TableDialogType) => {
    return dialog?.type === type
  }

  return (
    <TableDialogContext.Provider
      value={{
        dialog,
        setDialog,
        isDialogActive,
      }}
    >
      {children}
    </TableDialogContext.Provider>
  )
}

export const useTableDialog = () => React.useContext(TableDialogContext)
