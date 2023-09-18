import type { DragDropManager } from 'dnd-core';
import React from 'react';
import type { ExpressionControllerProps } from './expression-controller';
export type ExpressionRef = null;
export type ExpressionProps = {
    manager?: DragDropManager;
} & ExpressionControllerProps;
export declare const Expression: React.ForwardRefExoticComponent<{
    manager?: DragDropManager | undefined;
} & ExpressionControllerProps & React.RefAttributes<null>>;
//# sourceMappingURL=expression.d.ts.map