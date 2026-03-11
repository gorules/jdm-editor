export type SimpleOperator =
  | { type: 'any' }
  | { type: 'eq' }
  | { type: 'neq' }
  | { type: 'gt' }
  | { type: 'gte' }
  | { type: 'lt' }
  | { type: 'lte' }
  | { type: 'in' }
  | { type: 'notIn' }
  | { type: 'between' }
  | { type: 'null' }
  | { type: 'notNull' }
  | { type: 'startsWith' }
  | { type: 'endsWith' }
  | { type: 'contains' }
  | { type: 'dateAfter' }
  | { type: 'dateBefore' }
  | { type: 'dateSame' }
  | { type: 'dateSameOrAfter' }
  | { type: 'dateSameOrBefore' }
  | { type: 'dateIsToday' }
  | { type: 'timeGt' }
  | { type: 'timeGte' }
  | { type: 'timeLt' }
  | { type: 'timeLte' }
  | { type: 'dayOfWeekIn' }
  | { type: 'quarterIn' };

export type SimpleValue =
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'boolean'; value: boolean }
  | { type: 'stringArray'; values: string[] }
  | { type: 'numberArray'; values: number[] }
  | { type: 'intArray'; values: number[] }
  | { type: 'interval'; left: number; right: number; leftInclusive: boolean; rightInclusive: boolean }
  | { type: 'date'; value: string; granularity?: string }
  | { type: 'time'; hour: number; minute: number };

export type ExpressionBuilderData =
  | { kind: 'simple'; operator: SimpleOperator; value: SimpleValue | null }
  | { kind: 'complex'; raw: string };

export type StandardExpressionData =
  | { kind: 'string'; value: string }
  | { kind: 'number'; value: number }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'date'; value: string }
  | { kind: 'expression' };
