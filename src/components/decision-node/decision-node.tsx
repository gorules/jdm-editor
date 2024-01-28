import { BookOutlined, CopyOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Modal, Typography, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { platform } from '../../helpers/platform';
import { SpacedText } from '../spaced-text';
import './decision-node.scss';

export type DecisionNodeProps = {
  name?: string;
  icon: React.ReactNode;
  type: React.ReactNode;
  isSelected?: boolean;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
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
  isSelected = false,
  noBodyPadding = false,
  color = 'primary',
  onNameChange,
  mapActionMenu = (items) => items,
  onViewDocumentation,
  onCopyToClipboard,
  onDuplicate,
  onDelete,
}) => {
  const { token } = theme.useToken();
  const [contentEditing, setContentEditing] = useState(false);
  const nameRef = useRef<HTMLSpanElement>(null);
  const actionMenuItems = mapActionMenu([
    { key: 'documentation', icon: <BookOutlined />, label: 'Documentation', onClick: onViewDocumentation },
    { type: 'divider' },
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
    { type: 'divider' },
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
      nameRef.current.focus();

      const selection = document.getSelection();
      if (!selection) {
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(nameRef.current);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [contentEditing]);

  return (
    <div className={clsx('grl-dn', `grl-dn--color--${color}`, isSelected && `grl-dn--selected`)}>
      <div className='grl-dn__header'>
        <div className='grl-dn__header__icon'>{icon}</div>
        <div className='grl-dn__header__text'>
          <Typography.Text
            ref={nameRef}
            className={clsx('grl-dn__header__text__name', contentEditing && 'nodrag')}
            contentEditable={contentEditing}
            onClick={() => setContentEditing(true)}
            onBlur={() => setContentEditing(false)}
            onInput={(e) => onNameChange?.(e.currentTarget.textContent ?? '')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
                e.preventDefault();
              }
            }}
          >
            {name}
          </Typography.Text>
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
