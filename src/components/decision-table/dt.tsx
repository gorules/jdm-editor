import { theme } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DecisionTableDialogProvider } from './context/dt-dialog.context'
import { DecisionTableContextProps, DecisionTableProvider } from './context/dt-store.context'
import { DecisionTableDialogs } from './dialog/dt-dialogs'
import { DecisionTableCommandBar } from './dt-command-bar'
import { DecisionTableEmpty, DecisionTableEmptyType } from './dt-empty'
import './dt.scss'
import { Table } from './table/table'

export type DecisionTableProps = {
  tableHeight: string | number
  mountDialogsOnBody?: boolean
  manager?: any
} & DecisionTableContextProps &
  DecisionTableEmptyType

export const DecisionTable: React.FC<DecisionTableProps> = ({
  tableHeight,
  mountDialogsOnBody = false,
  manager,
  ...props
}) => {
  const { token } = theme.useToken()

  const [_, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getContainer = () => ref.current as HTMLElement

  const dndProps = useMemo(() => {
    if (manager) {
      return {
        manager,
      }
    }

    return {
      backend: HTML5Backend,
      options: {
        rootElement: ref.current,
      },
    }
  }, [])

  return (
    <div ref={ref} className={'grl-dt'} style={{ background: token.colorBgElevated }}>
      {ref.current && (
        <DndProvider {...dndProps}>
          <DecisionTableProvider>
            <DecisionTableDialogProvider
              getContainer={mountDialogsOnBody === true ? undefined : getContainer}
            >
              <DecisionTableCommandBar />
              <Table maxHeight={tableHeight} />
              <DecisionTableDialogs />
              <DecisionTableEmpty {...props} />
            </DecisionTableDialogProvider>
          </DecisionTableProvider>
        </DndProvider>
      )}
    </div>
  )
}
