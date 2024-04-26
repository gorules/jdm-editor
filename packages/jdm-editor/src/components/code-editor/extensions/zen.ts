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

const applyCompletion = (view: EditorView, completion: Completion, from: number, to: number) => {
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
      }),
    );

  view.dispatch(transaction);
};

const extendedCompletion = completion.map((c) => ({
  ...c,
  apply: applyCompletion,
}));

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
    if (!context.explicit && (!word || word.empty)) {
      return null;
    }

    const node = tree.resolve(context.pos);
    if (node.name === 'String' || !hasAutoComplete(node)) {
      return null;
    }

    return {
      from: word?.from ?? 0,
      options: extendedCompletion,
    };
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
          dom.textContent = `${details.label}: ${details.detail}\n\n${details.info}`;
          return { dom };
        },
      };
    }

    return null;
  });

export const zenHighlightLight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.bracket, t.operator, t.variableName, t.propertyName, t.content], color: '#080808' },
    { tag: [t.number, t.bool], color: '#015cc5' },
    { tag: [t.function(t.variableName), t.keyword, t.self, t.special(t.brace)], color: '#6f42c1' },
    { tag: [t.string, t.meta, t.name, t.quote], color: '#077d16' },
    { tag: t.invalid, color: '#cb2431' },
  ]),
);

export const zenHighlightDark = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.bracket, t.operator, t.variableName, t.propertyName, t.content], color: '#bdbec4' },
    { tag: [t.number, t.bool], color: '#57a8f5' },
    { tag: [t.function(t.variableName), t.keyword, t.self, t.special(t.brace)], color: '#c87dbb' },
    { tag: [t.string, t.meta, t.name, t.quote], color: '#6aab73' },
    { tag: t.invalid, color: '#cb2431' },
  ]),
);

const zenLanguage = new LanguageSupport(
  LRLanguage.define({
    parser: zenParser,
    name: 'zen',
    languageData: {
      closeBrackets: { brackets: ['(', '[', "'", '"'] },
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
      closeBrackets: { brackets: ['(', '[', "'", '"', '{'] },
      wordChars: '$',
    },
  }),
);

type extensionOptions = {
  type: 'standard' | 'template';
};

export const zenExtensions = ({ type }: extensionOptions) => [
  type === 'standard' ? zenLanguage : zenTemplateLanguage,
  completionExtension(),
  hoverExtension(),
  closeBrackets(),
  keymap.of(closeBracketsKeymap),
];
