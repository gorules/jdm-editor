import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';

export const ArrowDiffIcon: React.FC<{ direction?: 'right' | 'down'; size?: 'small' | 'medium' }> = ({
  direction = 'right',
  size = 'small',
}) => {
  const fontSize = size === 'small' ? 12 : 16;
  if (direction === 'down')
    return (
      <ArrowDownOutlined
        className={'text-modified'}
        style={{
          fontSize,
        }}
      />
    );
  return (
    <ArrowRightOutlined
      className={'text-modified'}
      style={{
        fontSize,
      }}
    />
  );
};
