import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDecisionTableDialog } from '../context/dt-dialog.context'
import { ColumnType, TableSchemaItem, useDecisionTable } from '../context/dt.context'
import { FieldAdd } from './field-add-dialog'
import { FieldUpdate } from './field-update-dialog'
import { FieldsReorder } from './fields-reorder-dialog'

export const DecisionTableDialogs: React.FC = () => {
  const { dialog, setDialog, isDialogActive, getContainer } = useDecisionTableDialog()
  const { id, addColumn, updateColumn, reorderColumns, value, inputsSchema, outputsSchema } =
    useDecisionTable()

  return (
    <>
      <FieldAdd
        id={id}
        columnType={dialog?.columnType}
        isOpen={isDialogActive('add')}
        schema={dialog?.columnType === 'inputs' ? inputsSchema : outputsSchema}
        onDismiss={() => setDialog(undefined)}
        onSuccess={(data: TableSchemaItem) => {
          if (!dialog) return
          addColumn(dialog.columnType, data)
          setDialog(undefined)
        }}
        getContainer={getContainer}
      />
      <FieldUpdate
        id={id}
        columnType={dialog?.columnType}
        isOpen={isDialogActive('edit')}
        schema={dialog?.columnType === 'inputs' ? inputsSchema : outputsSchema}
        field={dialog?.item as TableSchemaItem}
        onDismiss={() => setDialog(undefined)}
        onSuccess={(data) => {
          if (!dialog) return
          updateColumn(dialog.columnType, data.id, data)
          setDialog(undefined)
        }}
        getContainer={getContainer}
      />
      <FieldsReorder
        isOpen={isDialogActive('reorder')}
        fields={value?.[dialog?.columnType as ColumnType]}
        onDismiss={() => setDialog(undefined)}
        onSuccess={(data) => {
          if (!dialog) return
          reorderColumns(dialog.columnType, data)
          setDialog(undefined)
        }}
        getContainer={getContainer}
      />
    </>
  )
}
