import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import type { EdgeProps } from 'reactflow';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from 'reactflow';

import { useDecisionGraphActions, useDecisionGraphState } from './context/dg-store.context';

export const CustomEdge: React.FC<EdgeProps> = (props) => {
  const graphActions = useDecisionGraphActions();
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd } = props;
  const { hoveredEdgeId, disabled } = useDecisionGraphState(({ hoveredEdgeId, disabled }) => ({
    hoveredEdgeId,
    disabled,
  }));

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className={'nodrag nopan edge-renderer'}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {!disabled && (
            <Button
              type='primary'
              shape='round'
              icon={<DeleteOutlined />}
              danger
              className={clsx('grl-edge-delete-button')}
              data-visible={id === hoveredEdgeId}
              onClick={() => graphActions.removeEdges([id])}
            />
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export const edgeFunction = (outer: any) => (props: any) => <CustomEdge {...props} {...outer} />;
