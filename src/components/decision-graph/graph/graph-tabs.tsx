import { Tabs } from 'antd'
import equal from 'fast-deep-equal/es6/react'
import React, { useEffect } from 'react'

import { DecisionNode, useDecisionGraphStore } from '../context/dg-store.context'

export type GraphTabsProps = {
  disabled?: boolean
  onTabChange?: (val: string) => void
}
export const GraphTabs: React.FC<GraphTabsProps> = ({ disabled, onTabChange }) => {
  const closeTab = useDecisionGraphStore((store) => store.closeTab, equal)
  const openTab = useDecisionGraphStore((store) => store.openTab, equal)

  const activeNode: DecisionNode = useDecisionGraphStore((store) => {
    return (store.decisionGraph?.nodes || []).find((node) => node.id === store.activeTab)
  }, equal)
  const openedNodes: DecisionNode[] = useDecisionGraphStore((store) => {
    return store.openTabs
      .map((id) => (store.decisionGraph?.nodes || []).find((node) => node?.id === id))
      .filter((node) => !!node)
  }, equal)

  useEffect(() => {
    onTabChange?.(activeNode?.id || 'graph')
  }, [activeNode])

  return (
    <Tabs
      hideAdd
      type={'editable-card'}
      size='small'
      className={'tabs'}
      activeKey={activeNode?.id || 'graph'}
      onEdit={(targetKey: any, action: 'add' | 'remove') => {
        if (action === 'remove') {
          closeTab(targetKey)
        }
      }}
      onChange={(val) => {
        openTab(val)
      }}
    >
      <Tabs.TabPane closable={false} tab={'Graph'} key='graph' />
      {openedNodes?.map((node) => (
        <Tabs.TabPane
          disabled={disabled}
          key={node?.id}
          tab={node?.name || node?.type}
          closable={true}
        />
      ))}
    </Tabs>
  )
}
