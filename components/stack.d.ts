import React from 'react';
export type StackAlignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';
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
export declare const Stack: React.FC<StackProps>;
//# sourceMappingURL=stack.d.ts.map