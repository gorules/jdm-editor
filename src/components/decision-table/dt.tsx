import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DecisionTableCommandBar } from './dt-command-bar'
import { DecisionTableDialogProvider } from './dt-dialog.context'
import { DecisionTableDialogs } from './dt-dialogs'
import { DecisionTableContextProps, DecisionTableProvider } from './dt.context'
import './dt.scss'
import { Table } from './table'

export const DecisionTable: React.FC<DecisionTableContextProps> = (props) => {
  return (
    <div className={'grl-dt'}>
      <DecisionTableProvider {...props}>
        <DecisionTableDialogProvider>
          <DecisionTableCommandBar />
          <DndProvider backend={HTML5Backend}>
            <Table />
          </DndProvider>
          <DecisionTableDialogs />
        </DecisionTableDialogProvider>
      </DecisionTableProvider>
    </div>
  )
}
