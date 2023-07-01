import clsx from 'clsx'
import React from 'react'
import { getBezierPath } from 'reactflow'

export const CustomEdge: React.FC<any> = (props) => {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  } = props

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path
        style={style}
        className={clsx(['react-flow__edge-path-selector'])}
        d={edgePath}
        markerEnd={markerEnd}
        fillRule='evenodd'
      />
      <path
        style={style}
        className={clsx(['react-flow__edge-path'])}
        d={edgePath}
        markerEnd={markerEnd}
        fillRule='evenodd'
      />
    </>
  )
}

export const edgeFunction = (outer: any) => (props: any) => <CustomEdge {...props} {...outer} />
