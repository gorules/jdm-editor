import { describe, expect, it } from 'vitest';

import { variableTypeToTypescript } from '../determine-type';

const makeVariableType = (value: unknown) => ({ toJson: () => value }) as never;

describe('variableTypeToTypescript', () => {
  it('maps primitive variable types', () => {
    expect(variableTypeToTypescript(makeVariableType('String'))).toBe('string');
    expect(variableTypeToTypescript(makeVariableType('Bool'))).toBe('boolean');
    expect(variableTypeToTypescript(makeVariableType('Number'))).toBe('number');
    expect(variableTypeToTypescript(makeVariableType('Null'))).toBe('null');
    expect(variableTypeToTypescript(makeVariableType('Any'))).toBe('any');
  });

  it('maps array, object, const and enum variable types', () => {
    expect(variableTypeToTypescript(makeVariableType({ Array: 'String' }))).toBe('string[]');
    expect(variableTypeToTypescript(makeVariableType({ Object: { a: 'Number', b: { Array: 'Bool' } } }))).toBe(
      '{a:number,b:boolean[]}',
    );
    expect(variableTypeToTypescript(makeVariableType({ Const: 'usd' }))).toBe('"usd"');
    expect(variableTypeToTypescript(makeVariableType({ Enum: ['String', ['usd', 'eur']] }))).toBe('"usd" | "eur"');
  });
});
