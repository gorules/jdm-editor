import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React from 'react';
import { match } from 'ts-pattern';

import type { DiffStatus } from './decision-graph/dg-types';

export const DiffIcon: React.FC<
  {
    status?: DiffStatus;
  } & React.HTMLAttributes<HTMLSpanElement>
> = ({ status, ...rest }) => {
  return match(status)
    .with('removed', () => (
      <MinusSquareOutlined
        {...rest}
        style={{
          color: 'var(--grl-color-error)',
          ...(rest?.style || {}),
        }}
      />
    ))
    .with('added', () => (
      <PlusSquareOutlined
        {...rest}
        style={{
          color: 'var(--grl-color-success)',
          ...(rest?.style || {}),
        }}
      />
    ))
    .with('modified', () => (
      <div
        style={{
          width: rest?.style?.fontSize ?? 14,
          height: rest?.style?.fontSize ?? 14,
          border: '1.5px solid var(--grl-color-warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 3,
            height: 3,
            backgroundColor: 'var(--grl-color-warning)',
            borderRadius: '50%',
          }}
        />
      </div>
    ))
    .otherwise(() => null);
};
