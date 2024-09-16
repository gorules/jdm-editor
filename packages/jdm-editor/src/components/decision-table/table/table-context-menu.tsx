import { Dropdown } from 'antd';
import React from 'react';

import { SpacedText } from '../../spaced-text';
import { useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';

const ContextMenu: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

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
            label: <SpacedText left='Add row above' />,
            onClick: () => {
              if (cursor) tableActions.addRowAbove(cursor?.y);
            },
          },
          {
            key: 'addRowBelow',
            label: <SpacedText left='Add row below' />,
            onClick: () => {
              if (cursor) tableActions.addRowBelow(cursor?.y);
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'remove',
            label: <SpacedText left='Remove row' />,
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
