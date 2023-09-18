import React from 'react';
import type { StoreApi } from 'zustand';
export type ExpressionEntry = {
    id: string;
    key: string;
    value: string;
};
export type ExpressionStore = {
    configurable: boolean;
    disabled: boolean;
    addRowAbove: (index?: number, data?: Partial<ExpressionEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<ExpressionEntry>) => void;
    expressions: ExpressionEntry[];
    setExpressions: (expressions: ExpressionEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<ExpressionEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
};
type ExpressionStoreProviderProps = {};
export declare const createExpression: (data?: Partial<ExpressionEntry>) => ExpressionEntry;
export declare const ExpressionStoreProvider: React.FC<React.PropsWithChildren<ExpressionStoreProviderProps>>;
export declare function useExpressionStore<T>(selector: (state: ExpressionStore) => T, equals?: (a: any, b: any) => boolean): T;
export declare const useExpressionStoreRaw: () => {
    (): ExpressionStore;
    <U>(selector: (state: ExpressionStore) => U): U;
    <U_1>(selector: (state: ExpressionStore) => U_1, equalityFn: (a: U_1, b: U_1) => boolean): U_1;
} & StoreApi<ExpressionStore> & {
    setState: (partial: Partial<ExpressionStore>) => void;
};
export {};
//# sourceMappingURL=expression-store.context.d.ts.map