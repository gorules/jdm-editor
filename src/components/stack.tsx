import React, { useMemo } from 'react';

export type StackAlignment =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'baseline'
  | 'stretch';

export type StackProps = {
  horizontal?: boolean;
  reversed?: boolean;
  grow?: boolean;
  verticalAlign?: StackAlignment;
  horizontalAlign?: StackAlignment;
  gap?: string | number;
  height?: string | number;
  width?: string | number;
} & React.HTMLAttributes<HTMLDivElement>;

export const Stack: React.FC<StackProps> = (props) => {
  const {
    horizontal,
    reversed,
    verticalAlign = 'start',
    horizontalAlign = 'start',
    gap = 8,
    height = 'auto',
    width = '100%',
    grow,
    style,
    ...rest
  } = props;

  const flexDirection = useMemo(() => {
    if (horizontal) {
      return !reversed ? 'row' : 'row-reverse';
    }
    return !reversed ? 'column' : 'column-reverse';
  }, [horizontal, reversed]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection,
        justifyContent: !horizontal ? verticalAlign : horizontalAlign,
        alignItems: !horizontal ? horizontalAlign : verticalAlign,
        height,
        width,
        gap,
        flexGrow: grow ? 1 : undefined,
        ...style,
      }}
      {...rest}
    />
  );
};
