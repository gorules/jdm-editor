import {
  BookOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, type MenuProps, Modal, Typography, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import { platform } from '../../../helpers/platform';
import { SpacedText } from '../../spaced-text';
import './decision-node.scss';

export type DecisionNodeProps = {
  name?: string;
  icon: React.ReactNode;
  type: React.ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  status?: 'error' | 'success';
  noBodyPadding?: boolean;
  color?: 'primary' | 'secondary';
  mapActionMenu?: (items: MenuProps['items']) => MenuProps['items'];
  onNameChange?: (name: string) => void;
  onViewDocumentation?: () => void;
  onCopyToClipboard?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};

export const DecisionNode: React.FC<DecisionNodeProps> = ({
  icon,
  name,
  type,
  children,
  actions = [],
  disabled = false,
  isSelected = false,
  noBodyPadding = false,
  color = 'primary',
  onNameChange,
  mapActionMenu = (items) => items,
  onViewDocumentation,
  onCopyToClipboard,
  onDuplicate,
  onDelete,
  status,
}) => {
  const { token } = theme.useToken();
  const [contentEditing, setContentEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const actionMenuItems = mapActionMenu([
    { key: 'documentation', icon: <BookOutlined />, label: 'Documentation', onClick: onViewDocumentation },
    { key: 'divider-1', type: 'divider' },
    {
      key: 'copy-clipboard',
      icon: <BookOutlined />,
      label: <SpacedText left='Copy to clipboard' right={platform.shortcut('Ctrl + C')} />,
      onClick: onCopyToClipboard,
    },
    {
      key: 'duplicate',
      icon: <CopyOutlined />,
      label: <SpacedText left='Duplicate' right={platform.shortcut('Ctrl + D')} />,
      onClick: onDuplicate,
    },
    { key: 'divider-2', type: 'divider' },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      label: <SpacedText left='Delete' right={platform.shortcut('Backspace')} />,
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
          onOk: onDelete,
        }),
    },
  ]);

  useEffect(() => {
    if (nameRef.current && contentEditing) {
      nameRef.current.value = name as string;
      nameRef.current.focus();
      nameRef.current.select();
    }
  }, [contentEditing]);

  return (
    <div
      className={clsx(
        'grl-dn',
        `grl-dn--color--${color}`,
        isSelected && `grl-dn--selected`,
        status && `grl-dn--${status}`,
      )}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {status && (
        <div className={clsx('grl-dn__status-icon', `grl-dn__status-icon--${status}`)}>
          {match(status)
            .with('error', () => <CloseOutlined />)
            .with('success', () => <CheckOutlined />)
            .exhaustive()}
        </div>
      )}
      <div className='grl-dn__header'>
        <div className='grl-dn__header__icon'>{icon}</div>
        <div className='grl-dn__header__text'>
          {!contentEditing && (
            <Typography.Text
              className={clsx('grl-dn__header__text__name')}
              onClick={() => {
                !disabled && setContentEditing(true);
              }}
            >
              {name}
            </Typography.Text>
          )}
          {contentEditing && (
            <input
              ref={nameRef}
              className={clsx('grl-dn__header__text__name-input', 'nodrag')}
              onBlur={(e) => {
                if (e.target.value?.trim?.()?.length > 0) {
                  onNameChange?.(nameRef?.current?.value as string);
                }
                e.preventDefault();
                setContentEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                  e.preventDefault();
                } else if (e.key === 'Escape') {
                  if (nameRef.current) {
                    nameRef.current.value = name as string;
                  }
                  setContentEditing(false);
                  e.preventDefault();
                }
              }}
            />
          )}
          <Typography.Text type='secondary' style={{ fontSize: token.fontSizeSM }}>
            {type}
          </Typography.Text>
        </div>
        {(actionMenuItems?.length ?? 0) > 0 && (
          <div className='grl-dn__header__actions'>
            <Dropdown
              trigger={['click']}
              overlayStyle={{ minWidth: 250 }}
              menu={{
                items: actionMenuItems,
              }}
            >
              <Button type='text' icon={<MoreOutlined />} />
            </Dropdown>
          </div>
        )}
      </div>
      {children && (
        <div
          className={clsx(
            'grl-dn__body',
            actions.length === 0 && 'grl-dn__body--no-footer',
            noBodyPadding && 'grl-dn__body--no-padding',
          )}
        >
          {children}
        </div>
      )}
      {actions.length > 0 && (
        <div className='grl-dn__footer'>
          <div className='grl-dn__footer__actions'>{actions}</div>
        </div>
      )}
    </div>
  );
};
