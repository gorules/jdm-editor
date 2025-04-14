import type { DecisionGraphType, SimulationTrace } from '../components';

type NodeDataParams = {
  trace: Record<string, SimulationTrace>;
  decisionGraph: DecisionGraphType;
};

export const getNodeData = (nodeId: string, { trace, decisionGraph }: NodeDataParams) => {
  const nodeInput = Object.values(trace).find((t) => t.id === nodeId)?.input;
  if (typeof nodeInput !== 'object' || Array.isArray(nodeInput)) {
    return nodeInput;
  }

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

  return {
    ...nodeInput,
    $nodes,
  };
};
