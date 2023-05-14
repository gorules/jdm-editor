import React from 'react'

import { useDecisionTableDialog } from './dt-dialog.context'
import { ColumnType, TableSchemaItem, useDecisionTable } from './dt.context'
import { FieldAdd } from './field-add-dialog'
import { FieldUpdate } from './field-update-dialog'
import { FieldsReorder } from './fields-reorder-dialog'

export const DecisionTableDialogs: React.FC = () => {
  const { id, addColumn, updateColumn, reorderColumns, value } =
    useDecisionTable()
  const { dialog, setDialog, isDialogActive } = useDecisionTableDialog()

  return (
    <>
      <FieldAdd
        id={id}
        columnType={dialog?.columnType}
        isOpen={isDialogActive('add')}
        onSuccess={(data: TableSchemaItem) => {
          if (!dialog) return
          addColumn(dialog.columnType, data)
          setDialog(undefined)
        }}
        onDismiss={() => {
          setDialog(undefined)
        }}
      />
      <FieldUpdate
        id={id}
        isOpen={isDialogActive('edit')}
        onSuccess={(data) => {
          if (!dialog) return
          updateColumn(dialog.columnType, data.id, data)
          setDialog(undefined)
        }}
        field={dialog?.item as TableSchemaItem}
        onDismiss={() => {
          setDialog(undefined)
        }}
      />
      <FieldsReorder
        isOpen={isDialogActive('reorder')}
        onSuccess={(data) => {
          if (!dialog) return
          reorderColumns(dialog.columnType, data)
          setDialog(undefined)
        }}
        fields={value?.[dialog?.columnType as ColumnType]}
        onDismiss={() => {
          setDialog(undefined)
        }}
      />
    </>
  )
}
