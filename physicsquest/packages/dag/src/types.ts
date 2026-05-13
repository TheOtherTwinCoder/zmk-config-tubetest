export type Strand =
  | "mechanics"
  | "thermal"
  | "waves_optics"
  | "em"
  | "fluids"
  | "energy"
  | "modern"
  | "astronomy"
  | "math_tools"
  | "meta";

export interface ConceptNode {
  id: string;
  label: string;
  /** Earliest level at which this concept is introduced (1–10) */
  level: number;
  strand: Strand;
}

export interface ConceptEdge {
  /** Prerequisite concept */
  from: string;
  /** Dependent concept */
  to: string;
}

export interface ConceptDAG {
  nodes: ConceptNode[];
  edges: ConceptEdge[];
}

/** Per-concept mastery score 0–1 */
export type MasteryMap = Record<string, number>;
