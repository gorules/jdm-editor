import equal from 'fast-deep-equal/es6/react'
import React from 'react'

import { DecisionTable } from '../../decision-table'
import { useDecisionGraphStore } from '../context/dg-store.context'

export type TabDecisionTableProps = {
  id: string
}

export const TabDecisionTable: React.FC<TabDecisionTableProps> = ({ id }) => {
  const node = useDecisionGraphStore(
    (store) => (store.decisionGraph?.nodes || []).find((node) => node.id === id),
    equal
  )
  const nodeTrace = useDecisionGraphStore((store) => store.simulate?.result?.trace?.[id], equal)
  const updateNode = useDecisionGraphStore((store) => store.updateNode, equal)

  const { disabled, configurable } = useDecisionGraphStore(
    (store) => ({
      disabled: store.disabled,
      configurable: store.configurable,
    }),
    equal
  )

  const activeRules: string[] =
    nodeTrace?.traceData !== undefined
      ? Array.isArray(nodeTrace?.traceData)
        ? nodeTrace?.traceData?.map((d: any) => d?.rule?._id)
        : [nodeTrace?.traceData?.rule?._id]
      : []

  if (!node) return null

  return (
    <DecisionTable
      tableHeight={'100%'}
      value={node?.content as any}
      onChange={(val) => {
        updateNode(id, val)
      }}
      disabled={disabled}
      configurable={configurable}
      activeRules={(activeRules || []).filter((id) => !!id)}
    />
  )
}
