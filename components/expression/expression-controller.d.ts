import type React from 'react';
import type { ExpressionEntry } from './context/expression-store.context';
export type ExpressionControllerProps = {
    configurable?: boolean;
    disabled?: boolean;
    defaultValue?: ExpressionEntry[];
    value?: ExpressionEntry[];
    onChange?: (value: ExpressionEntry[]) => void;
};
export declare const ExpressionController: React.FC<ExpressionControllerProps>;
//# sourceMappingURL=expression-controller.d.ts.map