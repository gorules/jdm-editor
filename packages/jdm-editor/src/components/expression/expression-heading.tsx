import { Typography } from 'antd';
import clsx from 'clsx';
import React from 'react';

export const ExpressionHeading: React.FC = () => (
  <div className={clsx('expression-list__heading')}>
    <div />
    <Typography.Text type='secondary' className={'expression-list__heading__key'}>
      Key
    </Typography.Text>
    <Typography.Text type='secondary' className={'expression-list__heading__th expression-list__heading__expression'}>
      Expression
    </Typography.Text>
    <div />
  </div>
);
