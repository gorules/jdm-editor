import type { DecisionGraphType, SimulationTrace } from '../components';

type NodeDataParams = {
  trace: Record<string, SimulationTrace>;
  decisionGraph: DecisionGraphType;
};

export type GetNodeDataResult = { data: unknown; $nodes: unknown; $?: unknown };

export const getNodeData = (nodeId: string, { trace, decisionGraph }: NodeDataParams): GetNodeDataResult => {
  const data = Object.values(trace).find((t) => t.id === nodeId)?.input;
  const $nodes = Object.fromEntries(
    Object.values(trace)
      .map((t) => {
        const node = decisionGraph.nodes.find((n) => n.id === t.id);
        if (!node || node.type === 'outputNode') {
          return null;
        }

        return [t.name, t.output];
      })
      .filter((s) => !!s),
  );

  return { data, $nodes };
};
