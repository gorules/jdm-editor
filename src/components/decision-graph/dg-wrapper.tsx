import { theme } from 'antd'
import clsx from 'clsx'
import equal from 'fast-deep-equal/es6/react'
import React from 'react'
import 'reactflow/dist/style.css'

import { DecisionNode, useDecisionGraphStore } from './context/dg-store.context'
import './dg.scss'
import { Graph } from './graph/graph'
import { GraphTabs } from './graph/graph-tabs'
import { TabDecisionTable } from './graph/tab-decision-table'
import { TabExpression } from './graph/tab-expression'
import { TabFunction } from './graph/tab-function'

export const DecisionGraphWrapper: React.FC = () => {
  const activeNode: DecisionNode = useDecisionGraphStore((store) => {
    return (store.decisionGraph?.nodes || []).find((node) => node.id === store.activeTab)
  }, equal)
  const openedNodes: DecisionNode[] = useDecisionGraphStore((store) => {
    return store.openTabs
      .map((id) => (store.decisionGraph?.nodes || []).find((node) => node?.id === id))
      .filter((node) => !!node)
  }, equal)

  return (
    <div className={'grl-dg__wrapper'}>
      <div className={'grl-dg__graph'}>
        <GraphTabs />
        <Graph className={clsx([!activeNode && 'active'])} />
        {(openedNodes || []).map((node) => {
          return (
            <div
              key={node?.id}
              className={clsx(['tab-content', activeNode?.id === node?.id && 'active'])}
            >
              {node?.type === 'decisionTableNode' && <TabDecisionTable id={node.id} />}
              {node?.type === 'expressionNode' && <TabExpression id={node.id} />}
              {node?.type === 'functionNode' && <TabFunction id={node.id} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
