import { ConfigProvider, theme } from 'antd'
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

const DecisionTableInner: React.FC<DecisionTableProps> = (props) => {
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
            <Table />
          </DndProvider>
          <DecisionTableDialogs />
        </DecisionTableDialogProvider>
      </DecisionTableProvider>
    </div>
  )
}

export const DecisionTable: React.FC<DecisionTableProps> = ({
  theme,
  ...rest
}) => {
  return (
    <ConfigProvider theme={theme}>
      <DecisionTableInner {...rest} />
    </ConfigProvider>
  )
}
