import React from 'react';
import { DecisionTableContextProps } from './dt.context';
import type { ThemeConfig } from '../../theme';
export type DecisionTableProps = {
    theme?: ThemeConfig;
    tableHeight: string | number;
} & DecisionTableContextProps;
export declare const DecisionTable: React.FC<DecisionTableProps>;
//# sourceMappingURL=dt.d.ts.map