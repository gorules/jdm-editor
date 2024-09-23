import type { Diagnostic } from '@codemirror/lint';
import { P, match } from 'ts-pattern';

import { codemirror } from '../../../helpers/codemirror';
import { renderDiagnosticMessage } from './diagnostic';
import { typeField, updateExpressionTypeEffect, updateVariableTypeEffect } from './types';

type ExpressionError = {
  type: string;
  source: string;
};

const extractPosition = (error: string): [number, number] | number | null => {
  try {
    const splitError = error.split(' at ');
    if (splitError.length <= 1) {
      return null;
    }

    const positions = splitError.pop()!;
    const trimmed = positions.replace('(', '').replace(')', '');
    const [left, right] = trimmed.split(', ');

    if (right) {
      return [parseInt(left), parseInt(right)];
    }

    return parseInt(left);
  } catch {
    return null;
  }
};

const lintExpression = (type: string, source: string): Diagnostic[] => {
  if (!window.zenWasm) {
    return [];
  }

  const error: ExpressionError = match(type)
    .with('standard', () => window.zenWasm!.validateExpression(source))
    .with('unary', () => window.zenWasm!.validateUnaryExpression(source))
    .otherwise(() => null);
  if (!error) {
    return [];
  }

  const position = match(extractPosition(error.source))
    .with(P.number, (n) => ({ from: n, to: n }))
    .with([P.number, P.number], ([l, r]) => ({ from: l, to: r }))
    .otherwise(() => ({ from: 0, to: source.length }));

  const errorSource = match(error.type)
    .with('parserError', () => 'Parser error')
    .with('lexerError', () => 'Lexer error')
    .with('compilerError', () => 'Compiler error')
    .with('vmError', () => 'VM error')
    .otherwise((n) => n);

  return [
    {
      from: position.from,
      to: position.to,
      message: error.source,
      source: errorSource,
      severity: 'error',
    },
  ];
};

export const zenLinter = (type: string) => {
  if (!window.zenWasm) {
    return [];
  }

  return codemirror.linter(
    (view) => {
      view.dom.setAttribute('data-severity', 'none');
      const tFields = view.state.field(typeField);

      const source = view.state.doc.toString();
      if (source.trim().length === 0) {
        return [];
      }

      const expressionDiagnostics = source ? lintExpression(type, source) : [];
      const typeDiagnostics: Diagnostic[] = tFields.types
        .filter((t) => !!t.error)
        .map((t) => {
          const diagnostic: Diagnostic = {
            from: t.span[0],
            to: t.span[1],
            severity: 'warning',
            message: t.error as string,
            source: 'Type check',
          };

          diagnostic.renderMessage = (_) => {
            const element = document.createElement('div');
            element.innerHTML = renderDiagnosticMessage({
              text: diagnostic.message,
              className: 'cm-diagnosticMessageToken',
            });

            return element;
          };

          return diagnostic;
        });

      const diagnostics = [...expressionDiagnostics, ...typeDiagnostics];
      if (diagnostics.length === 0) {
        return [];
      }

      if (expressionDiagnostics.length > 0) {
        view.dom.setAttribute('data-severity', 'error');
      } else {
        view.dom.setAttribute('data-severity', 'warning');
      }

      return diagnostics;
    },
    {
      needsRefresh: (update) => {
        return update.transactions.some((t) =>
          t.effects.some((effect) => effect.is(updateExpressionTypeEffect) || effect.is(updateVariableTypeEffect)),
        );
      },
    },
  );
};
