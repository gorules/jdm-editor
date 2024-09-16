import { decisionTableSpecification } from './decision-table.specification';
import { expressionSpecification } from './expression.specification';
import { functionSpecification } from './function.specification';
import { inputSpecification } from './input.specification';
import { outputSpecification } from './output.specification';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';
import { switchSpecification } from './switch.specification';

function makeNodeSpecification<T extends Record<NodeKind, V>, V extends NodeSpecification>(o: T): Readonly<T> {
  return o;
}

export const nodeSpecification = makeNodeSpecification({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  [NodeKind.Input]: inputSpecification,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  [NodeKind.Output]: outputSpecification,
  [NodeKind.DecisionTable]: decisionTableSpecification,
  [NodeKind.Expression]: expressionSpecification,
  [NodeKind.Function]: functionSpecification,
  [NodeKind.Switch]: switchSpecification,
});
