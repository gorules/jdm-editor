import type { VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useState } from 'react';

import { isWasmAvailable } from '../../helpers/wasm';
import { useExpressionStore } from './context/expression-store.context';
import { ExpressionCondition } from './expression-condition';
import { ExpressionHeading } from './expression-heading';
import { ExpressionItem } from './expression-item';
import { ExpressionLineButton } from './expression-line-button';

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
    <>
      <ExpressionHeading />
      <div className={'expression-list'}>
        <ExpressionLineButton index={0} />
        {(expressions || []).map((expression, index) => (
          <React.Fragment key={expression.id}>
            <ExpressionItem expression={expression} index={index} variableType={variableType} />
            {index !== expressions.length - 1 && <ExpressionLineButton index={index + 1} />}
          </React.Fragment>
        ))}
        <ExpressionLineButton index={0} />

        <ExpressionCondition kind='If' />
        <div>
          <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
          <div className="hello" style={{ paddingLeft: 20 }}>
            {(expressions || []).map((expression, index) => (
              <React.Fragment key={expression.id}>
                <ExpressionItem squares={1} expression={expression} index={index} variableType={variableType} />
                {index !== expressions.length - 1 && <ExpressionLineButton index={index + 1} />}
              </React.Fragment>
            ))}
            <ExpressionLineButton index={0} />

            <ExpressionCondition kind='If' />
            <div>
              <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
              <div style={{ paddingLeft: 20 }}>
                {(expressions || []).map((expression, index) => (
                  <React.Fragment key={expression.id}>
                    <ExpressionItem squares={2} expression={expression} index={index} variableType={variableType} />
                    {index !== expressions.length - 1 && <ExpressionLineButton index={index + 1} />}
                  </React.Fragment>
                ))}
              </div>
              <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
            </div>
          </div>
          <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
        </div>

        <ExpressionCondition kind='Else if' />
        <div>
          <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
          <div style={{ paddingLeft: 20 }}>
            {(expressions || []).map((expression, index) => (
              <React.Fragment key={expression.id}>
                <ExpressionItem squares={1} expression={expression} index={index} variableType={variableType} />
                {index !== expressions.length - 1 && <ExpressionLineButton index={index + 1} />}
              </React.Fragment>
            ))}
          </div>
          <ExpressionLineButton index={0} style={{ paddingLeft: 20 }} />
        </div>

        <ExpressionLineButton
          className='expression-list__lineButton--bottom'
          index={expressions.length}
          alwaysVisible
          size='large'
        />
      </div>
    </>
  );
};
