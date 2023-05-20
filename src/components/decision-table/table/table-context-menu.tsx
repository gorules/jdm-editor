import { Dropdown } from 'antd'
import React from 'react'

import { platform } from '../../../helpers/platform'
import { copyToClipboard, pasteFromClipboard } from '../../../helpers/utility'
import { SpacedText } from '../../spaced-text'
import { useDecisionTable } from '../context/dt.context'

const ContextMenu: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props
  const {
    disabled,
    cursor,
    addRowBelow,
    addRowAbove,
    removeRow,
    getColumnId,
    value,
    commitData,
  } = useDecisionTable()

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
            label: (
              <SpacedText
                left='Add row above'
                right={platform.shortcut('Ctrl + Up')}
              />
            ),
            onClick: () => {
              if (!cursor) return
              addRowAbove(cursor.y)
            },
          },
          {
            key: 'addRowBelow',
            label: (
              <SpacedText
                left='Add row below'
                right={platform.shortcut('Ctrl + Down')}
              />
            ),
            onClick: () => {
              if (!cursor) return
              addRowBelow(cursor.y)
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'remove',
            label: (
              <SpacedText
                left='Remove row'
                right={platform.shortcut('Ctrl + Backspace')}
              />
            ),
            onClick: () => {
              if (!cursor) return
              removeRow(cursor.y)
            },
          },
          {
            type: 'divider',
          },
          {
            key: 'copy',
            label: (
              <SpacedText left='Copy' right={platform.shortcut('Ctrl + C')} />
            ),
            onClick: async () => {
              if (!cursor) return
              const columnId = getColumnId(cursor.x)
              if (!columnId) {
                return
              }

              await copyToClipboard(
                value.rules?.[cursor.y]?.[columnId.id] || ''
              )
            },
          },
          {
            key: 'paste',
            label: (
              <SpacedText left='Paste' right={platform.shortcut('Ctrl + V')} />
            ),
            onClick: async () => {
              if (!cursor) return

              const value = await pasteFromClipboard()
              commitData(value, cursor)
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
