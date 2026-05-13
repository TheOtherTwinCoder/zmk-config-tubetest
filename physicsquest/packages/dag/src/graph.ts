import type { ConceptDAG, ConceptNode, MasteryMap } from "./types.js";

export function buildAdjacency(dag: ConceptDAG): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const node of dag.nodes) adj.set(node.id, new Set());
  for (const edge of dag.edges) {
    if (!adj.has(edge.from)) adj.set(edge.from, new Set());
    adj.get(edge.from)!.add(edge.to);
  }
  return adj;
}

export function buildReverseAdjacency(dag: ConceptDAG): Map<string, Set<string>> {
  const rev = new Map<string, Set<string>>();
  for (const node of dag.nodes) rev.set(node.id, new Set());
  for (const edge of dag.edges) {
    if (!rev.has(edge.to)) rev.set(edge.to, new Set());
    rev.get(edge.to)!.add(edge.from);
  }
  return rev;
}

/** All direct prerequisites of a concept */
export function getPrereqs(dag: ConceptDAG, conceptId: string): string[] {
  return dag.edges.filter((e) => e.to === conceptId).map((e) => e.from);
}

/** All direct dependents of a concept */
export function getDependents(dag: ConceptDAG, conceptId: string): string[] {
  return dag.edges.filter((e) => e.from === conceptId).map((e) => e.to);
}

/** All transitive prerequisites (ancestors) */
export function getAllPrereqs(dag: ConceptDAG, conceptId: string): Set<string> {
  const visited = new Set<string>();
  const stack = getPrereqs(dag, conceptId);
  while (stack.length > 0) {
    const id = stack.pop()!;
    if (visited.has(id)) continue;
    visited.add(id);
    stack.push(...getPrereqs(dag, id));
  }
  return visited;
}

/** Kahn's topological sort — throws if a cycle is detected */
export function topologicalOrder(dag: ConceptDAG): string[] {
  const inDegree = new Map<string, number>();
  for (const node of dag.nodes) inDegree.set(node.id, 0);
  for (const edge of dag.edges) {
    inDegree.set(edge.to, (inDegree.get(edge.to) ?? 0) + 1);
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) if (deg === 0) queue.push(id);

  const result: string[] = [];
  const adj = buildAdjacency(dag);

  while (queue.length > 0) {
    const id = queue.shift()!;
    result.push(id);
    for (const neighbor of adj.get(id) ?? []) {
      const newDeg = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) queue.push(neighbor);
    }
  }

  if (result.length !== dag.nodes.length) {
    throw new Error("Cycle detected in concept DAG");
  }
  return result;
}

/** Validate: no cycles, all edge endpoints exist */
export function validate(dag: ConceptDAG): void {
  const ids = new Set(dag.nodes.map((n) => n.id));
  for (const edge of dag.edges) {
    if (!ids.has(edge.from))
      throw new Error(`Edge references unknown node: ${edge.from}`);
    if (!ids.has(edge.to))
      throw new Error(`Edge references unknown node: ${edge.to}`);
  }
  topologicalOrder(dag); // throws if cycle
}

/** Find the weakest prerequisite ancestor given a mastery map */
export function weakestAncestor(
  dag: ConceptDAG,
  conceptId: string,
  mastery: MasteryMap
): ConceptNode | null {
  const ancestors = getAllPrereqs(dag, conceptId);
  let weakest: ConceptNode | null = null;
  let weakestScore = Infinity;

  for (const id of ancestors) {
    const score = mastery[id] ?? 0;
    if (score < weakestScore) {
      weakestScore = score;
      weakest = dag.nodes.find((n) => n.id === id) ?? null;
    }
  }
  return weakest;
}

/** Return concepts for a given level, in topological order */
export function conceptsForLevel(dag: ConceptDAG, level: number): ConceptNode[] {
  const order = topologicalOrder(dag);
  const nodeById = new Map(dag.nodes.map((n) => [n.id, n]));
  return order
    .map((id) => nodeById.get(id)!)
    .filter((n) => n.level === level);
}

/** Overall mastery percentage across all concepts (0–100) */
export function overallMastery(dag: ConceptDAG, mastery: MasteryMap): number {
  if (dag.nodes.length === 0) return 0;
  const total = dag.nodes.reduce((sum, n) => sum + (mastery[n.id] ?? 0), 0);
  return Math.round((total / dag.nodes.length) * 100);
}
