import type { ColumnFiltersState } from '@tanstack/react-table';
import React from 'react';

export type DecisionTableFilterContextValue = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
  getUniqueValues: (columnId: string) => string[];
  rules: Record<string, string>[];
};

const DecisionTableFilterContext = React.createContext<DecisionTableFilterContextValue | null>(null);

export const DecisionTableFilterProvider = DecisionTableFilterContext.Provider;

export function useDecisionTableFilter(): DecisionTableFilterContextValue | null {
  return React.useContext(DecisionTableFilterContext);
}

export function useDecisionTableFilterOrThrow(): DecisionTableFilterContextValue {
  const ctx = React.useContext(DecisionTableFilterContext);
  if (!ctx) {
    throw new Error('useDecisionTableFilterOrThrow must be used within DecisionTableFilterProvider');
  }
  return ctx;
}
