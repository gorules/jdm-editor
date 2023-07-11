import { Dropdown } from 'antd'
import React from 'react'

import { platform } from '../../../helpers/platform'
import { SpacedText } from '../../spaced-text'
import { useDecisionTableStore } from '../context/dt-store.context'

const ContextMenu: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props

  const cursor = useDecisionTableStore((store) => store.cursor)
  const removeRow = useDecisionTableStore((store) => store.removeRow)
  const addRowAbove = useDecisionTableStore((store) => store.addRowAbove)
  const addRowBelow = useDecisionTableStore((store) => store.addRowBelow)
  const disabled = useDecisionTableStore((store) => store.disabled)

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
            label: <SpacedText left='Add row above' right={platform.shortcut('Ctrl + Up')} />,
            onClick: () => {
              if (cursor) addRowAbove(cursor?.y)
            },
          },
          {
            key: 'addRowBelow',
            label: <SpacedText left='Add row below' right={platform.shortcut('Ctrl + Down')} />,
            onClick: () => {
              if (cursor) addRowBelow(cursor?.y)
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'remove',
            label: <SpacedText left='Remove row' right={platform.shortcut('Ctrl + Backspace')} />,
            onClick: () => {
              if (cursor) removeRow(cursor?.y)
            },
          },
        ],
      }}
      trigger={['contextMenu']}
    >
      {children}
    </Dropdown>
  )
}

export const TableContextMenu = React.memo(ContextMenu)
