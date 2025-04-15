import type { DiffMetadata } from '../dg-types';

export const addStrikethrough = (text?: string): string => {
  if (!text) return '';
  const strikethroughChar = '\u0336';
  return Array.from(text)
    .map((char) => char + strikethroughChar)
    .join('');
};

export const buildDiffString = (currentValue: string, previousValue: string): string => {
  return [addStrikethrough(previousValue), '->', currentValue].join(' ');
};

export const compareStringFields = (field1?: string | null, field2?: string | null): boolean => {
  const value1 = (field1 ?? '').trim();
  const value2 = (field2 ?? '').trim();

  return value1 === value2;
};

type UnifiedItem<T> = T & {
  originalIndex: number;
  isRemoved?: boolean;
};

interface BaseItem {
  id?: string;
  _id?: string;

  [key: string]: any;
}

interface DiffOptions<T extends BaseItem> {
  idField?: 'id' | '_id';
  compareFields?: (
    current: T,
    previous: T,
  ) => {
    hasChanges: boolean;
    fields?: Record<string, DiffMetadata>;
  };
}

export const compareAndUnifyLists = <T extends BaseItem>(
  newList: T[],
  oldList: T[],
  options: DiffOptions<T> = {},
): T[] => {
  const { idField = 'id', compareFields } = options;

  const getId = (item: T) => item[idField] || item['_id'];

  const oldMap = new Map(oldList.map((item, index) => [getId(item), { ...item, index }]));
  const newMap = new Map(newList.map((item, index) => [getId(item), { ...item, index }]));

  const unifiedList: UnifiedItem<T>[] = [];

  const insertions = new Set<number>();
  const removals = new Set<number>();

  newList.forEach((item, index) => {
    if (!oldMap.has(getId(item))) {
      insertions.add(index);
    }
  });

  oldList.forEach((item, index) => {
    if (!newMap.has(getId(item))) {
      removals.add(index);
    }
  });

  const isRealPositionChange = (oldIndex: number, newIndex: number): boolean => {
    const insertionsBefore = Array.from(insertions).filter((i) => i < newIndex).length;
    const removalsBefore = Array.from(removals).filter((i) => i < oldIndex).length;

    const adjustedNewIndex = newIndex - insertionsBefore;
    const adjustedOldIndex = oldIndex - removalsBefore;

    return adjustedOldIndex !== adjustedNewIndex;
  };

  newList.forEach((item, newIndex) => {
    const oldItem = oldMap.get(getId(item));

    if (!oldItem) {
      unifiedList.push({
        ...item,
        originalIndex: newIndex,
        _diff: {
          status: 'added',
          newIndex,
        },
      });
    } else {
      const isPositionChanged = isRealPositionChange(oldItem.index, newIndex);
      const changes = compareFields ? compareFields(item, oldItem) : { hasChanges: false };

      if (changes.hasChanges || isPositionChanged) {
        unifiedList.push({
          ...item,
          originalIndex: newIndex,
          _diff: {
            status: 'modified',
            positionChanged: isPositionChanged,
            previousIndex: oldItem.index,
            newIndex,
            ...(changes.fields ? { fields: changes.fields } : {}),
          },
        });
      } else {
        unifiedList.push({
          ...item,
          originalIndex: newIndex,
          _diff: {
            status: 'unchanged',
          },
        });
      }
    }
  });

  oldList.forEach((item, oldIndex) => {
    if (!newMap.has(getId(item))) {
      let insertIndex = oldIndex;
      // @ts-expect-error error should not happen here
      while (insertIndex < unifiedList.length && oldMap.get(getId(unifiedList[insertIndex]))?.index < oldIndex) {
        insertIndex++;
      }

      unifiedList.splice(insertIndex, 0, {
        ...item,
        originalIndex: oldIndex,
        isRemoved: true,
        _diff: {
          status: 'removed',
          previousIndex: oldIndex,
        },
      });
    }
  });

  // Clean up utility properties before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return unifiedList.map(({ originalIndex, isRemoved, ...item }) => item as unknown as T);
};
