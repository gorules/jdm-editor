import type {
  ExpressionEntry,
  ExpressionEntryGroup,
  ExpressionEntryGroupRule,
  ExpressionEntryItem,
} from './context/expression-store.context';

type WalkExpressionsGenerator = Generator<
  { path: string[] } & (
    | { type: 'item'; entry: ExpressionEntryItem }
    | { type: 'rule'; entry: ExpressionEntryGroupRule }
    | { type: 'group'; entry: ExpressionEntryGroup }
  )
>;

export function* walkExpressions(entries: ExpressionEntry[]): WalkExpressionsGenerator {
  yield* walkExpressionsInternal(entries, []);
}

function* walkExpressionsInternal(entries: ExpressionEntry[], path: string[]): WalkExpressionsGenerator {
  for (const [index, entry] of entries.entries()) {
    const currentPath = [...path, index.toString()];

    if (isExpressionEntryItem(entry)) {
      yield { type: 'item', entry, path: currentPath };
    } else if (isExpressionEntryGroup(entry)) {
      yield { type: 'group', entry, path: currentPath };

      for (const [ruleIndex, rule] of entry.rules.entries()) {
        const rulePath = [...currentPath, 'rules', ruleIndex.toString()];
        yield { type: 'rule', entry: rule, path: rulePath };
        yield* walkExpressionsInternal(rule.then, [...rulePath, 'then']);
      }
    }
  }
}

// Type guard functions
function isExpressionEntryItem(entry: ExpressionEntry): entry is ExpressionEntryItem {
  return 'key' in entry && 'value' in entry;
}

function isExpressionEntryGroup(entry: ExpressionEntry): entry is ExpressionEntryGroup {
  return 'rules' in entry;
}
