import React from 'react';
import { P, match } from 'ts-pattern';

import type { ExpressionEntry, ExpressionEntryGroup, ExpressionEntryItem } from './context/expression-store.context';
import { useExpressionDnd } from './dnd';
import { ExpressionGroup } from './expression-group';
import { ExpressionItem } from './expression-item';
import { ExpressionLineButton } from './expression-line-button';

export type ExpressionListProps = {
  expressions: ExpressionEntry[];
  path?: string[];
};

export const ExpressionList: React.FC<ExpressionListProps> = ({ expressions, path = [] }) => {
  const isRoot = path.length === 0;

  return (
    <>
      <div className={'expression-list'}>
        {(expressions || []).map((expression, expressionIndex) => {
          const showTopButton = expressionIndex === 0;
          const showBottomButton = !isRoot || expressionIndex !== expressions.length - 1;

          return match(expression)
            .with({ rules: P.array() }, (group) => (
              <ExpressionListGroup
                key={group.id}
                basePath={path}
                group={group}
                index={expressionIndex}
                showTopButton={showTopButton}
                showBottomButton={showBottomButton}
              />
            ))
            .otherwise((item) => (
              <ExpressionListItem
                key={item.id}
                basePath={path}
                item={item}
                showTopButton={showTopButton}
                showBottomButton={showBottomButton}
                index={expressionIndex}
              />
            ));
        })}
        {(isRoot || expressions.length === 0) && (
          <ExpressionLineButton
            className='expression-list__lineButton--bottom'
            path={[...path, expressions.length.toString()]}
            alwaysVisible
            size='large'
          />
        )}
      </div>
    </>
  );
};

const ExpressionListItem: React.FC<{
  basePath: string[];
  item: ExpressionEntryItem;
  index: number;
  showTopButton?: boolean;
  showBottomButton?: boolean;
}> = ({ basePath, item, index, showTopButton = false, showBottomButton = true }) => {
  const path = [...basePath, index.toString()];
  const { dropRef, dragRef, isDragging, dropDirection } = useExpressionDnd({
    path,
    type: 'item',
    accept: ['item', 'group'],
  });

  return (
    <div
      ref={dropRef}
      className='expression-list__item'
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={dropDirection}
      data-top-button={showTopButton}
      data-bottom-button={showBottomButton}
    >
      {showTopButton && <ExpressionLineButton path={basePath} />}
      <ExpressionItem expression={item} path={path} dragRef={dragRef} />
      {showBottomButton && <ExpressionLineButton path={[...basePath, (index + 1).toString()]} />}
    </div>
  );
};

const ExpressionListGroup: React.FC<{
  basePath: string[];
  group: ExpressionEntryGroup;
  index: number;
  showTopButton?: boolean;
  showBottomButton?: boolean;
}> = ({ basePath, group, index, showTopButton = false, showBottomButton = true }) => {
  const path = [...basePath, index.toString()];
  const { dropRef, dragRef, isDragging, dropDirection } = useExpressionDnd({
    path,
    type: 'group',
    accept: ['item', 'group'],
  });

  return (
    <div
      ref={dropRef}
      className='expression-list__group'
      data-dragging={isDragging ? 'true' : 'false'}
      data-dropping={dropDirection}
      data-top-button={showTopButton}
      data-bottom-button={showBottomButton}
    >
      {showTopButton && <ExpressionLineButton path={basePath} />}
      <ExpressionGroup key={group.id} group={group} path={path} dragRef={dragRef} />
      {showBottomButton && <ExpressionLineButton path={[...basePath, (index + 1).toString()]} />}
    </div>
  );
};
