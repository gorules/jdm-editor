import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, type MenuProps, Typography, theme } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import './decision-node.scss';
import { PRIMARY_BLUE_COLOR } from './specifications/colors';

export type DecisionNodeProps = {
  name?: string;
  icon: React.ReactNode;
  type: React.ReactNode;
  helper?: React.ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  status?: 'error' | 'success';
  noBodyPadding?: boolean;
  color?: 'primary' | 'secondary' | string;
  menuItems?: MenuProps['items'];
  onNameChange?: (name: string) => void;
  compactMode?: boolean;
  listMode?: boolean;
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
  compactMode,
  listMode,
  helper,
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

  const nodeColor = match(color)
    .with('primary', () => PRIMARY_BLUE_COLOR)
    .otherwise((c) => c);

  return (
    <div
      className={clsx(
        'grl-dn',
        compactMode && 'grl-dn--compact',
        listMode && 'grl-dn--list',
        isSelected && `grl-dn--selected`,
        status && `grl-dn--${status}`,
      )}
      style={
        {
          '--node-color': nodeColor,
        } as any
      }
      onKeyDown={(e) => e.stopPropagation()}
    >
      {status === 'error' && (
        <div className={clsx('grl-dn__status-icon', `grl-dn__status-icon--${status}`)}>
          <CloseOutlined />
        </div>
      )}
      {status !== 'error' && helper && <div className={clsx('grl-dn__status-icon')}>{helper}</div>}
      <div className={clsx('grl-dn__header', compactMode && 'compact')}>
        <div className={clsx('grl-dn__header__icon', compactMode && 'compact')}>{icon}</div>
        <div className='grl-dn__header__text'>
          {!contentEditing && (
            <Typography.Text
              className={clsx('grl-dn__header__text__name')}
              onClick={() => {
                if (!disabled) {
                  setContentEditing(true);
                }
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
          {false && !compactMode && (
            <Typography.Text type='secondary' style={{ fontSize: token.fontSizeSM }}>
              {type}
            </Typography.Text>
          )}
        </div>
        {menuItems.length > 0 && (
          <div className='grl-dn__header__actions'>
            <Dropdown trigger={['click']} overlayStyle={{ minWidth: 250 }} menu={{ items: menuItems }}>
              <Button type='text' size={'small'} icon={<MoreOutlined />} />
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
