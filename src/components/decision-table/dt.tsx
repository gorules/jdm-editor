import { ConfigProvider } from 'antd'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DecisionTableCommandBar } from './dt-command-bar'
import { DecisionTableDialogProvider } from './dt-dialog.context'
import { DecisionTableDialogs } from './dt-dialogs'
import { DecisionTableContextProps, DecisionTableProvider } from './dt.context'
import './dt.scss'
import { Table } from './table'
import type { ThemeConfig } from '../../theme'

export type DecisionTableProps = {
  theme?: ThemeConfig
} & DecisionTableContextProps

export const DecisionTable: React.FC<DecisionTableProps> = ({
  theme,
  ...rest
}) => {
  return (
    <div className={'grl-dt'}>
      <ConfigProvider theme={theme}>
        <DecisionTableProvider {...rest}>
          <DecisionTableDialogProvider>
            <DecisionTableCommandBar />
            <DndProvider backend={HTML5Backend}>
              <Table />
            </DndProvider>
            <DecisionTableDialogs />
          </DecisionTableDialogProvider>
        </DecisionTableProvider>
      </ConfigProvider>
    </div>
  )
}
