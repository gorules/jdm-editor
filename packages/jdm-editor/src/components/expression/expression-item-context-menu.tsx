import { Dropdown } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SpacedText } from '../spaced-text';
import { useExpressionStore } from './context/expression-store.context';

type ExpressionItemContextMenuProps = {
  index: number;
  children: React.ReactNode;
};

export const ExpressionItemContextMenu: React.FC<ExpressionItemContextMenuProps> = ({ index, children }) => {
  const { addRowAbove, addRowBelow, disabled } = useExpressionStore(({ addRowBelow, addRowAbove, disabled }) => ({
    addRowBelow,
    addRowAbove,
    disabled,
  }));
  // translation
  const { t } = useTranslation();

  return (
    <Dropdown
      destroyPopupOnHide
      transitionName=''
      disabled={disabled}
      overlayStyle={{ minWidth: 200 }}
      trigger={['contextMenu']}
      menu={{
        items: [
          {
            key: 'addRowAbove',
            label: <SpacedText left={t('expression.expressionItemContextMenu.addRowAbove')} />,
            onClick: () => {
              addRowAbove(index);
            },
          },
          {
            key: 'addRowBelow',
            label: <SpacedText left={t('expression.expressionItemContextMenu.addRowBelow')} />,
            onClick: () => {
              addRowBelow(index);
            },
          },
        ],
      }}
    >
      {children}
    </Dropdown>
  );
};
