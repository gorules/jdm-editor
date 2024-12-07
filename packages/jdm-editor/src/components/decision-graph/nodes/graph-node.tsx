import { BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Modal, Typography } from 'antd';
import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { P, match } from 'ts-pattern';

import { platform } from '../../../helpers/platform';
import { usePersistentState } from '../../../helpers/use-persistent-state';
import { SpacedText } from '../../spaced-text';
import { useDecisionGraphActions, useDecisionGraphState, useNodeDiff } from '../context/dg-store.context';
import type { DecisionNodeProps } from './decision-node';
import { DecisionNode } from './decision-node';
import type { MinimalNodeSpecification } from './specifications/specification-types';

enum Details {
  Settings,
}

export type GraphNodeProps = {
  id: string;
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
  specification: MinimalNodeSpecification;
  displayError?: boolean;
} & Partial<DecisionNodeProps>;

export const GraphNode = React.forwardRef<HTMLDivElement, GraphNodeProps>(
  (
    {
      id,
      handleLeft = true,
      handleRight = true,
      className,
      specification,
      name,
      displayError,
      helper,
      actions,
      ...decisionNodeProps
    },
    ref,
  ) => {
    const [currentDetails, setCurrentDetails] = usePersistentState<Details>(`node:details:${id}`, Details.Settings);
    const [detailsOpen, setDetailsOpen] = usePersistentState<boolean>(`node:detailsOpen:${id}`, false);
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

    const { diff } = useNodeDiff(id);

    const Settings = specification.renderSettings;

    const menuItems = [
      specification.documentationUrl
        ? {
            key: 'documentation',
            label: <SpacedText left='Documentation' right={<BookOutlined />} />,
            onClick: () => window.open(specification.documentationUrl, '_href'),
          }
        : null,
      specification.documentationUrl ? { key: 'divider-1', type: 'divider' } : null,
      !displayError && {
        key: 'copy-clipboard',
        label: <SpacedText left='Copy to clipboard' right={platform.shortcut('Ctrl + C')} />,
        onClick: () => {},
      },
      !displayError && {
        key: 'duplicate',
        disabled,
        label: <SpacedText left='Duplicate' right={platform.shortcut('Ctrl + D')} />,
        onClick: () => graphActions.duplicateNodes([id]),
      },
      !displayError && { key: 'divider-2', type: 'divider' },
      {
        key: 'delete',
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
      <div
        className={clsx('grl-graph-node', className)}
        style={{ minWidth: 220, maxWidth: 220 }}
        ref={ref}
        onClick={(event) => {
          const isToggle = match(navigator.platform.includes('Mac'))
            .with(true, () => event.metaKey)
            .otherwise(() => event.ctrlKey);

          graphActions.triggerNodeSelect(id, isToggle ? 'toggle' : 'only');
        }}
      >
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
          helper={helper}
          name={name}
          details={Settings ? <Settings id={id} /> : undefined}
          detailsOpen={detailsOpen}
          detailsTitle={match(currentDetails)
            .with(Details.Settings, () => 'Settings')
            .otherwise(() => undefined)}
          onDetailsClose={() => setDetailsOpen(false)}
          actions={
            !Settings
              ? actions
              : [
                  ...(actions ?? []),
                  <Button
                    key='settings'
                    type='text'
                    style={{ marginLeft: 'auto' }}
                    onClick={() => {
                      setDetailsOpen(currentDetails === Details.Settings ? !detailsOpen : true);
                      setCurrentDetails(Details.Settings);
                    }}
                  >
                    Settings
                  </Button>,
                ]
          }
          status={match([nodeTrace, nodeError, displayError])
            .with([P._, P._, true], () => 'error' as const)
            .with([P._, P.not(P.nullish), P._], () => 'error' as const)
            .with([P.not(P.nullish), P._, P._], () => 'success' as const)
            .otherwise(() => undefined)}
          diffStatus={match([diff])
            .with([{ status: 'added' }], () => 'added' as const)
            .with([{ status: 'modified' }], () => 'modified' as const)
            .with([{ status: 'removed' }], () => 'removed' as const)
            .with([{ status: 'moved' }], () => 'moved' as const)
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
  },
);
