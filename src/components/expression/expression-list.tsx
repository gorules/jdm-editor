import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography, theme } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';

import { useExpressionStore } from './context/expression-store.context';
import { ExpressionItem } from './expression-item';


export type ExpressionListProps = {
  //
};

export const ExpressionList: React.FC<ExpressionListProps> = ({}) => {
  const { token } = theme.useToken();
  const { expressions, addRowBelow, configurable } = useExpressionStore(
    ({ expressions, addRowBelow, configurable, disabled }) => ({
      expressions,
      addRowBelow,
      configurable,
      disabled,
    }),
    equal
  );

  return (
    <div
      className={'expression-list'}
      style={
        {
          '--color-border': token.colorBorder,
          '--color-text-secondary': token.colorTextSecondary,
          '--color-background': token.colorBgElevated,
        } as any
      }
    >
      <div className={clsx('expression-list__item', 'expression-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Key</Typography.Text>
        <Typography.Text type='secondary'>Expression</Typography.Text>
        <div />
      </div>
      {expressions.map((expression, index) => (
        <ExpressionItem key={expression.id} expression={expression} index={index} />
      ))}
      {configurable && (
        <div className={clsx('expression-list__item')}>
          <Button
            className='expression-list__button'
            icon={<PlusOutlined />}
            type='dashed'
            onClick={() => addRowBelow()}
          >
            Add row
          </Button>
        </div>
      )}
    </div>
  );
};