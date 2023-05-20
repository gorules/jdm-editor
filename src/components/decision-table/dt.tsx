import { theme } from 'antd'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DecisionTableCommandBar } from './dt-command-bar'
import { DecisionTableDialogProvider } from './dt-dialog.context'
import { DecisionTableDialogs } from './dt-dialogs'
import { DecisionTableContextProps, DecisionTableProvider } from './dt.context'
import './dt.scss'
import { Table } from './table'

export type DecisionTableProps = {
  tableHeight: string | number
} & DecisionTableContextProps

export const DecisionTable: React.FC<DecisionTableProps> = ({
  tableHeight,
  ...props
}) => {
  const { token } = theme.useToken()

  return (
    <div
      className={'grl-dt'}
      style={{
        background: token.colorBgElevated,
      }}
    >
      <DecisionTableProvider {...props}>
        <DecisionTableDialogProvider>
          <DecisionTableCommandBar />
          <DndProvider backend={HTML5Backend}>
            <Table maxHeight={tableHeight} />
          </DndProvider>
          <DecisionTableDialogs />
        </DecisionTableDialogProvider>
      </DecisionTableProvider>
    </div>
  )
}
