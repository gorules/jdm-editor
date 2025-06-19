import { type VariableType } from '@gorules/zen-engine-wasm';
import { PlusIcon } from 'lucide-react';
import type React from 'react';

import { DiffCodeEditor } from '../shared';
import type { ExpressionEntryGroup } from './context/expression-store.context';
import { ExpressionItem } from './expression-item';

export type ExpressionGroupProps = {
  group: ExpressionEntryGroup;
  index: number;
  variableType?: VariableType;
};

export const ExpressionGroup: React.FC<ExpressionGroupProps> = ({ group, index, variableType }) => {
  return (
    <div>
      {(group.rules || []).map((rule) => (
        <div className='expression-list'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                background: 'rgb(172, 204, 236)',
                width: 46,
                display: 'flex',
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'var(--grl-font-family)',
                fontSize: 13,
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              if
            </div>
            <DiffCodeEditor
              className={'expression-list-item__value'}
              placeholder='If condition'
              maxRows={9}
              variableType={variableType}
              noStyle={true}
              style={{ width: '100%' }}
              // disabled={disabled}
              // value={expression?.value}
              // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
              // previousValue={expression?._diff?.fields?.value?.previousValue}
              // onChange={(value) => onChange({ value })}
              // onFocus={() => setIsFocused(true)}
              // onBlur={() => setIsFocused(false)}
            />
          </div>
          <div className='expression-list' style={{ paddingLeft: 44 }}>
            {rule.then.map((expression, index) => (
              <ExpressionItem key={expression.id} expression={expression} index={index} variableType={variableType} />
            ))}
          </div>
          <div style={{ paddingLeft: 44 }}>
            {(group.rules || []).map((rule) => (
              <div className='expression-list'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      background: 'rgb(172, 204, 236)',
                      width: 46,
                      display: 'flex',
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'var(--grl-font-family)',
                      fontSize: 13,
                      color: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    if
                  </div>
                  <DiffCodeEditor
                    className={'expression-list-item__value'}
                    placeholder='If condition'
                    maxRows={9}
                    variableType={variableType}
                    noStyle={true}
                    style={{ width: '100%' }}
                    // disabled={disabled}
                    // value={expression?.value}
                    // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
                    // previousValue={expression?._diff?.fields?.value?.previousValue}
                    // onChange={(value) => onChange({ value })}
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                  />
                </div>
                <div className='expression-list' style={{ paddingLeft: 44, background: '#dfe3eb' }}>
                  {rule.then.map((expression, index) => (
                    <ExpressionItem key={expression.id} expression={expression} index={index} variableType={variableType} />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      background: 'rgb(172, 204, 236)',
                      width: 46,
                      display: 'flex',
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'var(--grl-font-family)',
                      fontSize: 13,
                      color: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    elif
                  </div>
                  <DiffCodeEditor
                    className={'expression-list-item__value'}
                    placeholder='If condition'
                    maxRows={9}
                    variableType={variableType}
                    noStyle={true}
                    style={{ width: '100%' }}
                    // disabled={disabled}
                    // value={expression?.value}
                    // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
                    // previousValue={expression?._diff?.fields?.value?.previousValue}
                    // onChange={(value) => onChange({ value })}
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                  />
                </div>
                <div className='expression-list' style={{ paddingLeft: 44, background: '#dfe3eb' }}>
                  {rule.then.map((expression, index) => (
                    <ExpressionItem key={expression.id} expression={expression} index={index} variableType={variableType} />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      background: 'rgb(172, 204, 236)',
                      width: 46,
                      display: 'flex',
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'var(--grl-font-family)',
                      fontSize: 13,
                      color: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    else
                  </div>
                  <DiffCodeEditor
                    className={'expression-list-item__value'}
                    maxRows={9}
                    variableType={variableType}
                    noStyle={true}
                    style={{ width: '100%' }}
                    disabled
                  />
                </div>
                <div className='expression-list' style={{ paddingLeft: 44, background: '#dfe3eb' }}>
                  {rule.then.map((expression, index) => (
                    <ExpressionItem key={expression.id} expression={expression} index={index} variableType={variableType} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
