import { MoreOutlined } from '@ant-design/icons';
import { Button, Typography, theme } from 'antd';
import clsx from 'clsx';
import React from 'react';

import './decision-node.scss';

export type DecisionNodeProps = {
  name?: string;
  icon: React.ReactNode;
  type: string;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  noBodyPadding?: boolean;
  color?: 'primary' | 'secondary';
  onNameChange?: (name: string) => void;
};

export const DecisionNode: React.FC<DecisionNodeProps> = ({
  icon,
  name,
  type,
  children,
  actions = [],
  noBodyPadding = false,
  color = 'primary',
  onNameChange,
}) => {
  const { token } = theme.useToken();

  return (
    <div className={clsx('grl-dn', `grl-dn--color--${color}`)}>
      <div className='grl-dn__header'>
        <div className='grl-dn__header__icon'>{icon}</div>
        <div className='grl-dn__header__text'>
          <Typography.Text
            className='grl-dn__header__text__name'
            editable={{ onChange: onNameChange, triggerType: ['text'] }}
          >
            {name}
          </Typography.Text>
          <Typography.Text type='secondary' style={{ fontSize: token.fontSizeSM }}>
            {type}
          </Typography.Text>
        </div>
        <div className='grl-dn__header__actions'>
          <Button type='text' icon={<MoreOutlined />} />
        </div>
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
