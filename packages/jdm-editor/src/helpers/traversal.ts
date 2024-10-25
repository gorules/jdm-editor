import equal from 'fast-deep-equal/es6/react';
import { type Edge, type Node, getIncomers, getOutgoers } from 'reactflow';

import type { DecisionGraphType, DecisionNode } from '../components';
import { mapToGraphEdges, mapToGraphNodes } from '../components/decision-graph/dg-util';

type GraphWalkerCache = {
  digest: ReturnType<typeof decisionGraphPathDigest>;
  iterator: CachedGraphIterator;
};

export const createGraphWalker = () => {
  let cache: GraphWalkerCache | null = null;

  return {
    walk: function* (decisionGraph: DecisionGraphType): Generator<WalkGraphReturn> {
      const digest = decisionGraphPathDigest(decisionGraph);
      if (cache && equal(digest, cache.digest)) {
        yield* walkCachedGraph(decisionGraph, cache.iterator);
        return;
      }

      const iterator = [];
      for (const res of walkGraph(decisionGraph)) {
        iterator.push({ id: res.node.id, incomers: res.incomers.map((n) => n.id) });
        yield res;
      }

      cache = { digest, iterator };
    },
  };
};

export type GraphWalker = ReturnType<typeof createGraphWalker>;

const decisionGraphPathDigest = (graph: DecisionGraphType) => {
  const nodes = graph.nodes.map((n) => n.id);
  const edges = graph.edges;

  return { nodes, edges };
};

type WalkGraphReturn = {
  node: DecisionNode;
  incomers: DecisionNode[];
};

function* walkGraph(decisionGraph: DecisionGraphType): Generator<WalkGraphReturn> {
  const nodes = mapToGraphNodes(decisionGraph.nodes);
  const edges = mapToGraphEdges(decisionGraph.edges);

  const begin = decisionGraph.nodes.find((n) => n.type === 'inputNode');
  const beginRf = nodes.find((n) => n.id === begin?.id);
  if (!begin || !beginRf) {
    return;
  }

  // TODO: Perf - Skip recalculating has cycle, or find a nicer way to check (as it's blocked on graph level)
  if (hasCycle(beginRf, nodes, edges)) {
    return;
  }

  yield { node: begin, incomers: [] };
  const visited = new Set<string>();

  visited.add(begin.id);

  const stack = getOutgoers(beginRf, nodes, edges);
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visited.has(current.id)) {
      continue;
    }

    const incomers = getIncomers(current, nodes, edges);
    const unvisitedIncomers = incomers.filter((incomer) => !visited.has(incomer.id));

    if (unvisitedIncomers.length > 0) {
      stack.push(current, ...unvisitedIncomers);
      continue;
    }

    visited.add(current.id);
    const decisionNode = decisionGraph.nodes.find((n) => n.id === current.id);
    if (decisionNode) {
      const mappedIncomers = decisionGraph.nodes.filter((n) => incomers.some((inc) => inc.id === n.id));
      yield { node: decisionNode, incomers: mappedIncomers };
    }

    const outgoers = getOutgoers(current, nodes, edges);
    stack.push(...outgoers);
  }
}

type CachedGraphIterator = Array<{ id: string; incomers: string[] }>;

function* walkCachedGraph(decisionGraph: DecisionGraphType, path: CachedGraphIterator): Generator<WalkGraphReturn> {
  for (const part of path) {
    const node = decisionGraph.nodes.find((n) => n.id === part.id);
    if (!node) {
      continue;
    }

    const incomers = decisionGraph.nodes.filter((n) => part.incomers.includes(n.id));
    yield { node, incomers };
  }
}

const hasCycle = (begin: Node, nodes: Node[], edges: Edge[]): boolean => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const dfs = (node: Node): boolean => {
    visited.add(node.id);
    recursionStack.add(node.id);

    const outgoers = getOutgoers(node, nodes, edges);
    for (const outgoer of outgoers) {
      if (!visited.has(outgoer.id)) {
        if (dfs(outgoer)) {
          return true;
        }
      } else if (recursionStack.has(outgoer.id)) {
        return true;
      }
    }

    recursionStack.delete(node.id);
    return false;
  };

  return dfs(begin);
};
