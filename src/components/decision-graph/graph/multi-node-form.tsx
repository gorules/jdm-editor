import { CloseOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React, { FC } from 'react'
import { Edge, Node } from 'reactflow'

import { Stack } from '../../stack'

export type MultiNodeFormProps = {
  nodes: Node[]
  edges: Edge[]
  onCopy?: (node: Node[]) => void
  removeNodes?: (nodes: Node[]) => void
  removeEdges?: (edges: Edge[]) => void
  onClose?: () => void
}

export const MultiNodeForm: FC<MultiNodeFormProps> = ({
  nodes,
  edges,
  removeEdges,
  removeNodes,
  onClose,
  onCopy,
}) => {
  return (
    <div className={'node-form'}>
      <Button className={'button'} type='text' onClick={onClose} icon={<CloseOutlined />} />
      {nodes?.length > 0 && (
        <>
          <Typography.Text style={{ display: 'block' }}>Nodes selected:</Typography.Text>
          <ul style={{ padding: '0 1rem 0' }}>
            {nodes.map((n) => (
              <li key={n.id}>
                <Typography.Text strong>{n.data.name}</Typography.Text>
              </li>
            ))}
          </ul>
        </>
      )}
      {edges?.length > 0 && (
        <>
          <Typography.Text style={{ display: 'block', margin: '0.5rem 0 0' }}>
            Edges selected:
          </Typography.Text>
          <ul style={{ padding: '0 1rem 0' }}>
            {edges.map((n) => (
              <li key={n.id}>
                <Typography.Text strong>{n.id}</Typography.Text>
              </li>
            ))}
          </ul>
        </>
      )}
      <Stack gap={8} horizontal>
        {edges?.length === 0 && <Button onClick={() => onCopy?.(nodes)}>Copy</Button>}
        <Button
          danger
          onClick={() => {
            edges?.length > 0 && removeEdges?.(edges)
            nodes?.length > 0 && removeNodes?.(nodes)
          }}
        >
          Remove
        </Button>
      </Stack>
    </div>
  )
}
