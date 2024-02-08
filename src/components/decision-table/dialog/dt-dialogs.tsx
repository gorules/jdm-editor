import React from 'react';

import { useDecisionTableDialog } from '../context/dt-dialog.context';
import {
  type ColumnType,
  type TableSchemaItem,
  useDecisionTableActions,
  useDecisionTableState,
} from '../context/dt-store.context';
import { FieldAdd } from './field-add-dialog';
import { FieldUpdate } from './field-update-dialog';
import { FieldsReorder } from './fields-reorder-dialog';

export const DecisionTableDialogs: React.FC = () => {
  const { dialog, setDialog, isDialogActive, getContainer } = useDecisionTableDialog();

  const id = 'test';
  const tableActions = useDecisionTableActions();
  const { decisionTable, inputsSchema, outputsSchema } = useDecisionTableState(
    ({ decisionTable, inputsSchema, outputsSchema }) => ({
      decisionTable,
      inputsSchema,
      outputsSchema,
    }),
  );

  return (
    <>
      <FieldAdd
        id={id}
        columnType={dialog?.columnType}
        isOpen={isDialogActive('add')}
        schema={dialog?.columnType === 'inputs' ? inputsSchema : outputsSchema}
        onDismiss={() => setDialog(undefined)}
        onSuccess={(data: TableSchemaItem) => {
          if (!dialog) return;
          tableActions.addColumn(dialog.columnType, data);
          setDialog(undefined);
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
          if (!dialog) return;
          tableActions.updateColumn(dialog.columnType, data.id, data);
          setDialog(undefined);
        }}
        getContainer={getContainer}
      />
      <FieldsReorder
        isOpen={isDialogActive('reorder')}
        fields={decisionTable?.[dialog?.columnType as ColumnType]}
        onDismiss={() => setDialog(undefined)}
        onSuccess={(data) => {
          if (!dialog) return;
          tableActions.reorderColumns(dialog.columnType, data);
          setDialog(undefined);
        }}
        getContainer={getContainer}
      />
    </>
  );
};
