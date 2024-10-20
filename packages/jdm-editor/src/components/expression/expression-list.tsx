import { PlusCircleOutlined } from '@ant-design/icons';
import type { VariableType } from '@gorules/zen-engine-wasm';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useState } from 'react';

import { isWasmAvailable } from '../../helpers/wasm';
import { useExpressionStore } from './context/expression-store.context';
import { ExpressionItem } from './expression-item';

export type ExpressionListProps = {
  //
};

export const ExpressionList: React.FC<ExpressionListProps> = ({}) => {
  const { expressions, addRowBelow, configurable, disabled, inputVariableType } = useExpressionStore(
    ({ expressions, addRowBelow, configurable, disabled, inputVariableType }) => ({
      expressions,
      addRowBelow,
      configurable,
      disabled,
      inputVariableType,
    }),
    equal,
  );

  const [variableType, setVariableType] = useState<VariableType>();

  useEffect(() => {
    if (!isWasmAvailable() || !inputVariableType) {
      return;
    }

    const resultingVariableType = inputVariableType.clone();
    expressions
      .filter((e) => e.key.length > 0)
      .forEach((expr) => {
        const calculatedType = resultingVariableType.calculateType(expr.value);
        resultingVariableType.set(`$.${expr.key}`, calculatedType);
      });

    setVariableType(resultingVariableType);
  }, [expressions, inputVariableType]);

  return (
    <div className={'expression-list'}>
      <div className={clsx('expression-list__item', 'expression-list__item--heading')}>
        <div />
        <Typography.Text type='secondary'>Key</Typography.Text>
        <Typography.Text type='secondary'>Expression</Typography.Text>
        <div />
      </div>
      {(expressions || []).map((expression, index) => (
        <ExpressionItem key={expression.id} expression={expression} index={index} variableType={variableType} />
      ))}
      {configurable && !disabled && (
        <div className={'expression-list__button-wrapper'}>
          <Button
            className='expression-list__button'
            icon={<PlusCircleOutlined />}
            type='link'
            onClick={() => addRowBelow()}
          >
            Add row
          </Button>
        </div>
      )}
    </div>
  );
};
