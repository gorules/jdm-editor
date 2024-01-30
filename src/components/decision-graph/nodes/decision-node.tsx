import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps, Typography, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

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
  menuItems?: MenuProps['items'];
  onNameChange?: (name: string) => void;
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
  menuItems = [],
  status,
}) => {
  const { token } = theme.useToken();
  const [contentEditing, setContentEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

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
      {status === 'error' && (
        <div className={clsx('grl-dn__status-icon', `grl-dn__status-icon--${status}`)}>
          <CloseOutlined />
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
        {menuItems.length > 0 && (
          <div className='grl-dn__header__actions'>
            <Dropdown trigger={['click']} overlayStyle={{ minWidth: 250 }} menu={{ items: menuItems }}>
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
