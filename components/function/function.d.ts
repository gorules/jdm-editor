import React from 'react';
import type { FunctionDebuggerTrace } from './types';
export type FunctionProps = {
    disabled?: boolean;
    defaultValue?: string;
    disableDebug?: boolean;
    language?: string;
    value?: string;
    onChange?: (value: string) => void;
    trace?: FunctionDebuggerTrace;
};
export declare const Function: React.FC<FunctionProps>;
//# sourceMappingURL=function.d.ts.map