import { Dropdown } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SpacedText } from '../../spaced-text';
import { useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';

const ContextMenu: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  // translation
  const { t } = useTranslation();

  const tableActions = useDecisionTableActions();
  const { cursor, disabled } = useDecisionTableState(({ cursor, disabled }) => ({
    cursor,
    disabled,
  }));

  return (
    <Dropdown
      destroyPopupOnHide
      transitionName=''
      disabled={disabled}
      overlayStyle={{
        minWidth: 270,
      }}
      menu={{
        items: [
          {
            key: 'addRowAbove',
            label: <SpacedText left={t('decisionTable.table.contextMenu.addRowAbove')} />,
            onClick: () => {
              if (cursor) tableActions.addRowAbove(cursor?.y);
            },
          },
          {
            key: 'addRowBelow',
            label: <SpacedText left={t('decisionTable.table.contextMenu.addRowBelow')} />,
            onClick: () => {
              if (cursor) tableActions.addRowBelow(cursor?.y);
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'remove',
            label: <SpacedText left={t('decisionTable.table.contextMenu.removeRow')} />,
            onClick: () => {
              if (cursor) tableActions.removeRow(cursor?.y);
            },
          },
        ],
      }}
      trigger={['contextMenu']}
    >
      {children}
    </Dropdown>
  );
};

export const TableContextMenu = React.memo(ContextMenu);
