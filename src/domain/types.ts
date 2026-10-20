export type RelevanceValue = 0 | 1 | null;

export interface Document {
  docId: string;
  familyId: string;
  title: string;
  body: string;
  version: string;
  current: boolean;
  topic: string;
}

export interface Query {
  queryId: string;
  text: string;
  intentFamily: string;
  split: 'dev' | 'held-out';
}

export interface Judgment {
  queryId: string;
  docId: string;
  relevance: RelevanceValue; // null means unjudged, never silently 0
  assessor: string;
  rationale: string;
  revision: number;
}

export interface TermContribution {
  term: string;
  tf: number;
  idf: number;
  scoreContribution: number;
}

export interface RankedDocument {
  rank: number;
  docId: string;
  score: number;
  familyId: string;
  title: string;
  version: string;
  current: boolean;
  termContributions?: TermContribution[];
  suppressed?: boolean;
}

export interface EvaluationMetrics {
  dcg5: number;
  idcg5: number;
  ndcg5: number;
  reciprocalRank5: number;
  poolRelevantCount: number;
  hasRelevantInPool: boolean;
}

export interface WitnessAssignment {
  labels: Record<string, 0 | 1>; // docId -> binary relevance
  scoreA: number;
  scoreB: number;
  difference: number; // scoreA - scoreB
  explanation?: string;
}

export interface NextJudgmentSuggestion {
  docId: string;
  title: string;
  familyId: string;
  expectedWorstCaseWidth: number;
  widthIfZero: number;
  widthIfOne: number;
  reasoning: string;
}

export interface JudgmentEnvelope {
  queryId: string;
  fixedPoolDocIds: string[];
  missingCount: number;
  totalCombinations: number;
  isExact: boolean;
  minDifference: number; // min(NDCG_A - NDCG_B)
  maxDifference: number; // max(NDCG_A - NDCG_B)
  minWitness: WitnessAssignment;
  maxWitness: WitnessAssignment;
  baselineDifference: number; // Conventional "unjudged treated as 0"
  verdict: 'strictly_positive' | 'strictly_negative' | 'unresolved' | 'tied_zero';
  suggestedNextJudgment?: NextJudgmentSuggestion;
}

export interface RankerConfig {
  name: string;
  type: 'bm25' | 'tfidf_baseline';
  k1: number;
  b: number;
  duplicateSuppression: boolean;
}

export interface QueryEvaluationResult {
  query: Query;
  rankingsA: RankedDocument[];
  rankingsB: RankedDocument[];
  metricsA_provisional: EvaluationMetrics;
  metricsB_provisional: EvaluationMetrics;
  envelope: JudgmentEnvelope;
}

export interface MacroEvaluationSummary {
  split: 'dev' | 'held-out';
  totalQueries: number;
  meanNdcgA_provisional: number;
  meanNdcgB_provisional: number;
  meanDifference_provisional: number;
  macroMinDifference: number;
  macroMaxDifference: number;
  unresolvedQueriesCount: number;
  strictlyPositiveCount: number;
  strictlyNegativeCount: number;
  tiedCount: number;
  queryResults: QueryEvaluationResult[];
}
