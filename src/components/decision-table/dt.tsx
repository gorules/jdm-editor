import { theme } from 'antd'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DecisionTableDialogProvider } from './context/dt-dialog.context'
import { DecisionTableContextProps, DecisionTableProvider } from './context/dt.context'
import { DecisionTableDialogs } from './dialog/dt-dialogs'
import { DecisionTableCommandBar } from './dt-command-bar'
import './dt.scss'
import { Table } from './table/table'

export type DecisionTableProps = {
  tableHeight: string | number
} & DecisionTableContextProps

export const DecisionTable: React.FC<DecisionTableProps> = ({ tableHeight, ...props }) => {
  const { token } = theme.useToken()

  return (
    <div className={'grl-dt'} style={{ background: token.colorBgElevated }}>
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
