import { theme } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
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
  mountDialogsOnBody?: boolean
} & DecisionTableContextProps

export const DecisionTable: React.FC<DecisionTableProps> = ({
  tableHeight,
  mountDialogsOnBody = false,
  ...props
}) => {
  const { token } = theme.useToken()

  const [_, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getContainer = () => ref.current as HTMLElement

  return (
    <div ref={ref} className={'grl-dt'} style={{ background: token.colorBgElevated }}>
      {ref.current && (
        <DndProvider
          backend={HTML5Backend}
          options={{
            rootElement: ref.current,
          }}
        >
          <DecisionTableProvider {...props}>
            <DecisionTableDialogProvider
              getContainer={mountDialogsOnBody === true ? undefined : getContainer}
            >
              <DecisionTableCommandBar />
              <Table maxHeight={tableHeight} />
              <DecisionTableDialogs />
            </DecisionTableDialogProvider>
          </DecisionTableProvider>
        </DndProvider>
      )}
    </div>
  )
}
