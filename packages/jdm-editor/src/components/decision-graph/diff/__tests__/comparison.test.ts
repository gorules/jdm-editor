import { describe, expect, it } from 'vitest';

import {
  addStrikethrough,
  buildDiffString,
  compareAndUnifyLists,
  compareStringFields,
} from '../comparison';

const getDiffStatus = (item: unknown): unknown => {
  if (!item || typeof item !== 'object') return undefined;
  const diff = Reflect.get(item, '_diff');
  if (!diff || typeof diff !== 'object') return undefined;
  return Reflect.get(diff, 'status');
};

const getPreviousLabel = (item: unknown): unknown => {
  if (!item || typeof item !== 'object') return undefined;
  const diff = Reflect.get(item, '_diff');
  if (!diff || typeof diff !== 'object') return undefined;
  const fields = Reflect.get(diff, 'fields');
  if (!fields || typeof fields !== 'object') return undefined;
  const label = Reflect.get(fields, 'label');
  if (!label || typeof label !== 'object') return undefined;
  return Reflect.get(label, 'previousValue');
};

describe('diff/comparison helpers', () => {
  it('creates strikethrough content and diff strings', () => {
    expect(addStrikethrough()).toBe('');
    expect(addStrikethrough('ab')).toBe('a\u0336b\u0336');
    expect(buildDiffString('new', 'old')).toBe('o\u0336l\u0336d\u0336 -> new');
  });

  it('compares strings ignoring nullish values and whitespace', () => {
    expect(compareStringFields(' value ', 'value')).toBe(true);
    expect(compareStringFields(null, undefined)).toBe(true);
    expect(compareStringFields('a', 'b')).toBe(false);
  });

  it('unifies lists and marks added/removed/unchanged statuses', () => {
    const oldList = [
      { id: '1', label: 'one' },
      { id: '2', label: 'two' },
      { id: '3', label: 'three' },
    ];
    const newList = [
      { id: '1', label: 'one' },
      { id: '3', label: 'three' },
      { id: '4', label: 'four' },
    ];

    const unified = compareAndUnifyLists(newList, oldList);

    expect(unified.map((x) => x.id)).toEqual(['1', '2', '3', '4']);
    expect(unified.map(getDiffStatus)).toEqual(['unchanged', 'removed', 'unchanged', 'added']);
  });

  it('marks item as modified and includes field-level metadata from compareFields', () => {
    const oldList = [{ id: '1', label: 'old' }];
    const newList = [{ id: '1', label: 'new' }];

    const unified = compareAndUnifyLists(newList, oldList, {
      compareFields: (current, previous) => ({
        hasChanges: current.label !== previous.label,
        fields: {
          label: {
            status: 'modified',
            previousValue: previous.label,
          },
        },
      }),
    });

    expect(getDiffStatus(unified[0])).toBe('modified');
    expect(getPreviousLabel(unified[0])).toBe('old');
  });
});
