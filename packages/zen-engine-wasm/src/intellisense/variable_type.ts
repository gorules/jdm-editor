export type VariableTypeJson =
  | 'Any'
  | 'Null'
  | 'Bool'
  | 'String'
  | 'Number'
  | { Constant: any }
  | { Array: VariableTypeJson }
  | { Object: Record<string, VariableTypeJson> };
