import React from 'react';

import { useDecisionTableDialog } from '../context/dt-dialog.context';
import { useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';
import { FieldsReorder } from './fields-reorder-dialog';

export const DecisionTableDialogs: React.FC = () => {
  const { dialog, setDialog, isDialogActive, getContainer } = useDecisionTableDialog();

  const tableActions = useDecisionTableActions();
  const { decisionTableFields } = useDecisionTableState(({ decisionTable }) => ({
    decisionTableFields: dialog?.columnType ? decisionTable[dialog.columnType] : undefined,
  }));

  return (
    <FieldsReorder
      isOpen={isDialogActive('reorder')}
      fields={decisionTableFields}
      onDismiss={() => setDialog(undefined)}
      onSuccess={(data) => {
        if (!dialog) return;
        tableActions.reorderColumns(dialog.columnType, data);
        setDialog(undefined);
      }}
      getContainer={getContainer}
    />
  );
};
