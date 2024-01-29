import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { P, match } from 'ts-pattern';

import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { DecisionNodeProps } from './decision-node';
import { DecisionNode } from './decision-node';
import type { MinimalNodeSpecification } from './specification-types';

export type GraphNodeProps = {
  id: string;
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
  specification: MinimalNodeSpecification;
} & Partial<DecisionNodeProps>;

export const GraphNode: React.FC<GraphNodeProps> = ({
  id,
  handleLeft = true,
  handleRight = true,
  className,
  specification,
  ...decisionNodeProps
}) => {
  const graphActions = useDecisionGraphActions();
  const { nodeError, nodeTrace, disabled } = useDecisionGraphState(({ simulate, disabled }) => ({
    disabled,
    nodeTrace: simulate?.result?.trace?.[id],
    nodeError: simulate?.error?.data?.nodeId === id ? simulate?.error?.data : undefined,
  }));

  return (
    <div className={clsx('grl-graph-node', className)} style={{ minWidth: 250 }}>
      {handleLeft && (
        <Handle
          className='grl-graph-node__handle-left'
          type='target'
          position={Position.Left}
          {...(typeof handleLeft !== 'boolean' ? handleLeft : {})}
        />
      )}
      <DecisionNode
        {...decisionNodeProps}
        disabled={disabled}
        icon={specification.icon}
        color={specification.color}
        type={specification.displayName}
        onDelete={() => graphActions.removeNode(id)}
        status={match([nodeTrace, nodeError])
          .with([P.not(P.nullish), P._], () => 'success' as const)
          .with([P._, P.not(P.nullish)], () => 'error' as const)
          .otherwise(() => undefined)}
        onViewDocumentation={() => {
          window.open(specification.documentationUrl, '_href');
        }}
        onNameChange={(name) => {
          graphActions.updateNode(id, (draft) => {
            draft.name = name;
            return draft;
          });
        }}
        onDuplicate={() => {
          graphActions.duplicateNode(id);
        }}
      />
      {handleRight && (
        <Handle
          className='grl-graph-node__handle-right'
          type='source'
          position={Position.Right}
          {...(typeof handleRight !== 'boolean' ? handleRight : {})}
        />
      )}
    </div>
  );
};
