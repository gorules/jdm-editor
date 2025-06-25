import { Typography } from 'antd';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import React from 'react';

import { DiffCodeEditor } from '../shared';

type ExpressionConditionProps = {
  kind?: string;
}

export const ExpressionCondition: React.FC<ExpressionConditionProps> = ({ kind = 'If' }) => {
  return (
    <div className="expression-list-item" data-kind="condition">
      <div className='expression-list-item__drag'>
        <GripVerticalIcon size={10} />
      </div>
      <div className='expression-list-item__key'>
        <Typography.Text>{kind}</Typography.Text>
      </div>
      <div className='expression-list-item__code' style={{ position: 'relative' }}>
        <div>
          <DiffCodeEditor
            className='expression-list-item__value'
            placeholder='Condition'
            maxRows={9}
            // disabled={disabled}
            // value={expression?.value}
            // displayDiff={expression?._diff?.fields?.value?.status === 'modified'}
            // previousValue={expression?._diff?.fields?.value?.previousValue}
            // onChange={(value) => onChange({ value })}
            // variableType={variableType}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            noStyle
          />
          {/*<ResultOverlay expression={expression} />*/}
        </div>
      </div>
      <div className='expression-list-condition__body'></div>
    </div>
  );
};
