import { BookOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Modal, Typography } from 'antd';
import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { P, match } from 'ts-pattern';

import { platform } from '../../../helpers/platform';
import { SpacedText } from '../../spaced-text';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { DecisionNodeProps } from './decision-node';
import { DecisionNode } from './decision-node';
import type { MinimalNodeSpecification } from './specifications/specification-types';

export type GraphNodeProps = {
  id: string;
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
  specification: MinimalNodeSpecification;
  displayError?: boolean;
} & Partial<DecisionNodeProps>;

export const GraphNode: React.FC<GraphNodeProps> = ({
  id,
  handleLeft = true,
  handleRight = true,
  className,
  specification,
  name,
  displayError,
  ...decisionNodeProps
}) => {
  const graphActions = useDecisionGraphActions();
  const { nodeError, nodeTrace, disabled, compactMode } = useDecisionGraphState(
    ({ simulate, disabled, compactMode }) => ({
      disabled,
      nodeTrace: match(simulate)
        .with({ result: P._ }, ({ result }) => result?.trace?.[id])
        .otherwise(() => null),
      nodeError: match(simulate)
        .with({ error: { data: { nodeId: id } } }, ({ error }) => error)
        .otherwise(() => null),
      compactMode,
    }),
  );

  const menuItems = [
    specification.documentationUrl
      ? {
          key: 'documentation',
          icon: <BookOutlined />,
          label: 'Documentation',
          onClick: () => window.open(specification.documentationUrl, '_href'),
        }
      : null,
    specification.documentationUrl ? { key: 'divider-1', type: 'divider' } : null,
    !displayError && {
      key: 'copy-clipboard',
      icon: <BookOutlined />,
      label: <SpacedText left='Copy to clipboard' right={platform.shortcut('Ctrl + C')} />,
      onClick: () => {},
    },
    !displayError && {
      key: 'duplicate',
      icon: <CopyOutlined />,
      disabled,
      label: <SpacedText left='Duplicate' right={platform.shortcut('Ctrl + D')} />,
      onClick: () => graphActions.duplicateNodes([id]),
    },
    !displayError && { key: 'divider-2', type: 'divider' },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      label: <SpacedText left='Delete' right={platform.shortcut('Backspace')} />,
      disabled,
      onClick: () =>
        Modal.confirm({
          icon: null,
          title: 'Delete node',
          content: (
            <Typography.Text>
              Are you sure you want to delete <Typography.Text strong>{name}</Typography.Text> node.
            </Typography.Text>
          ),
          okButtonProps: { danger: true },
          onOk: () => graphActions.removeNodes([id]),
        }),
    },
  ].filter((i) => i !== false);

  return (
    <div className={clsx('grl-graph-node', className)} style={{ minWidth: 250 }}>
      {handleLeft && (
        <Handle
          className={clsx('grl-graph-node__handle-left', compactMode && 'compact')}
          type='target'
          position={Position.Left}
          {...(typeof handleLeft !== 'boolean' ? handleLeft : {})}
        />
      )}
      <DecisionNode
        menuItems={menuItems as MenuProps['items']}
        {...decisionNodeProps}
        disabled={disabled}
        icon={specification.icon}
        color={specification.color}
        type={specification.displayName}
        name={name}
        status={match([nodeTrace, nodeError, displayError])
          .with([P._, P._, true], () => 'error' as const)
          .with([P.not(P.nullish), P._, P._], () => 'success' as const)
          .with([P._, P.not(P.nullish), P._], () => 'error' as const)
          .otherwise(() => undefined)}
        onNameChange={(name) => {
          graphActions.updateNode(id, (draft) => {
            draft.name = name;
            return draft;
          });
        }}
        compactMode={compactMode}
      />
      {handleRight && (
        <Handle
          className={clsx('grl-graph-node__handle-right', compactMode && 'compact')}
          type='source'
          position={Position.Right}
          {...(typeof handleRight !== 'boolean' ? handleRight : {})}
        />
      )}
    </div>
  );
};
