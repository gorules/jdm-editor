import type { VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import React, { useState } from 'react';
import { P, match } from 'ts-pattern';

import { ExpressionEntry, useExpressionStore } from './context/expression-store.context';
import { ExpressionGroup } from './expression-group';
import { ExpressionItem } from './expression-item';
import { ExpressionLineButton } from './expression-line-button';

export type ExpressionListProps = {
  expressions: ExpressionEntry[];
  path?: string[];
};

export const ExpressionList: React.FC<ExpressionListProps> = ({ expressions, path = [] }) => {
  const { addRowBelow, configurable, disabled, inputVariableType } = useExpressionStore(
    ({ addRowBelow, configurable, disabled, inputVariableType }) => ({
      expressions,
      addRowBelow,
      configurable,
      disabled,
      inputVariableType,
    }),
    equal,
  );

  const [variableType, setVariableType] = useState<VariableType>();

  const isRoot = path.length === 0;

  // useEffect(() => {
  //   if (!isWasmAvailable() || !inputVariableType) {
  //     return;
  //   }
  //
  //   const resultingVariableType = inputVariableType.clone();
  //   expressions
  //     .filter((e) => e.key.length > 0)
  //     .forEach((expr) => {
  //       const calculatedType = resultingVariableType.calculateType(expr.value);
  //       resultingVariableType.set(`$.${expr.key}`, calculatedType);
  //     });
  //
  //   setVariableType(resultingVariableType);
  // }, [expressions, inputVariableType]);

  return (
    <>
      <div className={'expression-list'}>
        <ExpressionLineButton path={path} />
        {(expressions || []).map((expression, expressionIndex) => (
          <React.Fragment key={expression.id}>
            {match(expression)
              .with({ rules: P.array() }, (group) => (
                <ExpressionGroup key={group.id} group={group} path={[...path, expressionIndex.toString()]} />
              ))
              .otherwise((item) => (
                <ExpressionItem
                  expression={item}
                  path={[...path, expressionIndex.toString()]}
                  variableType={variableType}
                />
              ))}

            {(!isRoot || expressionIndex !== expressions.length - 1) && (
              <ExpressionLineButton path={[...path, (expressionIndex + 1).toString()]} />
            )}
          </React.Fragment>
        ))}
        {isRoot && (
          <ExpressionLineButton
            className='expression-list__lineButton--bottom'
            path={[expressions.length.toString()]}
            alwaysVisible
            size='large'
          />
        )}
      </div>
    </>
  );
};
