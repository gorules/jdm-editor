import {
  type Completion,
  type CompletionContext,
  type CompletionResult,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
} from '@codemirror/autocomplete';
import { HighlightStyle, LRLanguage, LanguageSupport, syntaxHighlighting, syntaxTree } from '@codemirror/language';
import type { EditorView } from '@codemirror/view';
import { hoverTooltip, keymap } from '@codemirror/view';
import { parser as zenParser } from '@gorules/lezer-zen';
import { parser as zenTemplateParser } from '@gorules/lezer-zen-template';
import { NodeProp, type SyntaxNode, parseMixed } from '@lezer/common';
import { tags as t } from '@lezer/highlight';
import { match } from 'ts-pattern';

import completion from '../../../completion.json';
import { renderDiagnosticMessage } from './diagnostic';
import { zenLinter } from './linter';
import { buildTypeCompletion, typeField, zenKindToString } from './types';

export const applyCompletion = (view: EditorView, completion: Completion, from: number, to: number) => {
  const transaction = match(completion.type)
    .with('function', () => {
      const insert = `${completion.label}()`;

      return view.state.update({
        changes: { from: from, to: to, insert },
        selection: { anchor: from + insert.length - 1 }, // Place the caret inside the parentheses
      });
    })
    .otherwise(() =>
      view.state.update({
        changes: { from: from, to: to, insert: completion.label },
        selection: { anchor: from + completion.label.length },
      }),
    );

  view.dispatch(transaction);
};

const extendedCompletion = completion.map(
  (c) =>
    ({
      ...c,
      detail: c.detail.replaceAll('`', ''),
      apply: applyCompletion,
    }) satisfies Completion,
);

const hasAutoComplete = (n: SyntaxNode | null): boolean => {
  if (!n) {
    return false;
  }

  const isAutoComplete = n?.type.prop(NodeProp.group)?.includes('autoComplete') || false;
  return isAutoComplete || hasAutoComplete(n?.parent);
};

const makeExpressionCompletion =
  () =>
  (context: CompletionContext): CompletionResult | null => {
    const tree = syntaxTree(context.state);

    const word = context.state.wordAt(context.pos);
    const node = tree.resolveInner(context.pos, -1);
    if (
      !hasAutoComplete(node) ||
      (!context.explicit && context.pos === 0) ||
      (!context.explicit && !word && node.name !== '.')
    ) {
      return null;
    }

    const from = word?.from ?? context.pos;
    switch (node.name) {
      case 'Standard':
      case 'VariableName': {
        const tField = context.state.field(typeField);

        return {
          from,
          options: [...buildTypeCompletion({ type: 'variable', kind: tField.rootKind }), ...extendedCompletion],
        };
      }
      case 'String': {
        const tField = context.state.field(typeField);
        const tBase = autoCompleteSpan(node);
        const targetType = (tField.types ?? []).find((t) => t.span[0] === tBase?.[0] && t.span[1] === tBase[1]);
        if (!targetType) {
          return null;
        }

        return {
          from: node.from + 1,
          options: buildTypeCompletion({ kind: targetType.kind }),
        };
      }
      case '.':
      case 'PropertyName': {
        const tField = context.state.field(typeField);
        const tBase = autoCompleteSpan(node);
        const targetType = (tField.types ?? []).find((t) => t.span[0] === tBase?.[0] && t.span[1] === tBase[1]);
        if (!targetType) {
          return null;
        }

        return {
          from,
          options: buildTypeCompletion({ kind: targetType.kind }),
        };
      }
      default:
        return null;
    }
  };

const autoCompleteSpan = (node: SyntaxNode): [number, number] | null => {
  let lastNode = node;
  if (['PropertyExpression', 'PropertyAccess'].includes(lastNode.parent?.name ?? '') && lastNode.parent?.prevSibling) {
    lastNode = lastNode.parent.prevSibling;
  }

  let firstNode = lastNode;
  while (firstNode.prevSibling) {
    firstNode = firstNode.prevSibling;
  }

  return [firstNode.from, lastNode.to];
};

const hoverSpan = (node: SyntaxNode): [number, number] | null => {
  let lastNode = node;
  if (lastNode.parent && ['PropertyExpression', 'PropertyAccess'].includes(lastNode.parent.name)) {
    lastNode = lastNode.parent;
  }

  let firstNode = lastNode;
  while (firstNode.prevSibling) {
    firstNode = firstNode.prevSibling;
  }

  return [firstNode.from, lastNode.to];
};

export const completionExtension = () =>
  autocompletion({
    override: [makeExpressionCompletion()],
  });

export const hoverExtension = () =>
  hoverTooltip((view, pos) => {
    const word = view.state.wordAt(pos);
    if (!word) {
      return null;
    }

    const data = view.state.doc.sliceString(word.from, word.to);
    const details = completion.find((cmp) => cmp.label === data);
    if (details) {
      return {
        pos: word.from,
        end: word.to,
        above: true,
        create() {
          const dom = document.createElement('div');
          dom.classList.add('grl-ce-hover-tooltip');
          dom.style.whiteSpace = 'pre';
          dom.innerHTML = renderDiagnosticMessage({
            text: `<span style="font-size: 12px">${details.info}</span>\n${details.label}: ${details.detail}\n`,
            className: 'cm-hoverTooltipMessageToken',
          });
          return { dom };
        },
      };
    }

    const tree = syntaxTree(view.state);
    const node = tree.resolveInner(pos, -1);

    const tField = view.state.field(typeField);
    const tBase = hoverSpan(node);
    const targetType = (tField.types ?? []).find((t) => t.span[0] === tBase?.[0] && t.span[1] === tBase[1]);
    if (targetType && tBase) {
      const source = view.state.doc.toString();

      return {
        pos: tBase[0],
        end: tBase[1],
        above: true,
        create() {
          const dom = document.createElement('div');
          dom.classList.add('grl-ce-hover-tooltip');
          dom.style.whiteSpace = 'pre';
          dom.innerHTML = renderDiagnosticMessage({
            text: `${source.slice(tBase[0], tBase[1])}: \`${zenKindToString(targetType.kind)}\``,
            className: 'cm-hoverTooltipMessageToken',
          });
          return { dom };
        },
      };
    }

    return null;
  });

export const zenHighlightLight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.bracket, t.operator, t.variableName, t.propertyName, t.content, t.punctuation], color: '#080808' },
    { tag: [t.number, t.bool], color: '#015cc5' },
    { tag: [t.function(t.variableName), t.keyword, t.self, t.special(t.brace), t.logicOperator], color: '#6f42c1' },
    { tag: [t.string, t.meta, t.name, t.quote], color: '#077d16' },
    { tag: t.invalid, color: '#cb2431' },
  ]),
);

export const zenHighlightDark = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.bracket, t.operator, t.variableName, t.propertyName, t.content, t.punctuation], color: '#bdbec4' },
    { tag: [t.number, t.bool], color: '#57a8f5' },
    { tag: [t.function(t.variableName), t.keyword, t.self, t.special(t.brace), t.logicOperator], color: '#c87dbb' },
    { tag: [t.string, t.meta, t.name, t.quote], color: '#6aab73' },
    { tag: t.invalid, color: '#cb2431' },
  ]),
);

const zenLanguage = new LanguageSupport(
  LRLanguage.define({
    parser: zenParser,
    name: 'zen',
    languageData: {
      closeBrackets: { brackets: ['(', '[', '{', "'", '"', '`'] },
      wordChars: '$',
    },
  }),
);

const zenTemplateLanguage = new LanguageSupport(
  LRLanguage.define({
    parser: zenTemplateParser.configure({
      wrap: parseMixed((node) => {
        if (node.name === 'ExpressionInner') {
          return { parser: zenParser };
        }

        return null;
      }),
    }),
    name: 'zenTemplate',
    languageData: {
      closeBrackets: { brackets: ['(', '[', "'", '"', '{', '`'] },
      wordChars: '$',
    },
  }),
);

type extensionOptions = {
  type: 'unary' | 'standard' | 'template';
};

export const zenExtensions = ({ type }: extensionOptions) => [
  type !== 'template' ? zenLanguage : zenTemplateLanguage,
  completionExtension(),
  hoverExtension(),
  closeBrackets(),
  zenLinter(type),
  typeField,
  keymap.of(closeBracketsKeymap),
];
