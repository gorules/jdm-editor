import React from 'react'
import { StoreApi, UseBoundStore } from 'zustand'

import { DecisionTableStoreType } from '../dt.hook'

export type TableExportOptions = {
  name?: string
}

export const DecisionTableContext = React.createContext<
  UseBoundStore<StoreApi<DecisionTableStoreType>> & {
    name?: string
    id?: string
  }
>({} as any)

export type DecisionTableContextProps = {
  store: UseBoundStore<StoreApi<DecisionTableStoreType>>
}

export const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>> = (
  props
) => {
  const { children, store } = props
  return <DecisionTableContext.Provider value={store}>{children}</DecisionTableContext.Provider>
}

export const useDecisionTableStore = (
  selector: (state: DecisionTableStoreType) => any,
  equals?: (a: any, b: any) => boolean
) => React.useContext(DecisionTableContext)(selector, equals)
export default DecisionTableProvider
