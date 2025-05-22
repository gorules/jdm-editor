export type VariableTypeJson =
  | 'Any'
  | 'Null'
  | 'Bool'
  | 'String'
  | 'Number'
  | { Const: string }
  | { Enum: [string | undefined, string[]] }
  | { Array: VariableTypeJson }
  | { Object: Record<string, VariableTypeJson> };
