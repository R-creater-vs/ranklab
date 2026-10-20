import type { EvaluationMetrics } from './types.ts';

export function calculateDCG(relevanceAtRanks: number[], k: number = 5): number {
  let dcg = 0;
  const limit = Math.min(relevanceAtRanks.length, k);
  for (let i = 0; i < limit; i++) {
    const rel = relevanceAtRanks[i] || 0;
    if (rel > 0) {
      dcg += rel / Math.log2(i + 2); // i=0 is rank 1, log2(1 + 1) = log2(2) = 1
    }
  }
  return dcg;
}

export function calculateIDCG(relevantCountInPool: number, k: number = 5): number {
  let idcg = 0;
  const limit = Math.min(relevantCountInPool, k);
  for (let j = 0; j < limit; j++) {
    idcg += 1 / Math.log2(j + 2);
  }
  return idcg;
}

export function calculateNDCG(dcg: number, idcg: number): number {
  if (idcg <= 0) return 0;
  return dcg / idcg;
}

export function calculateReciprocalRank(relevanceAtRanks: number[], k: number = 5): number {
  const limit = Math.min(relevanceAtRanks.length, k);
  for (let i = 0; i < limit; i++) {
    if ((relevanceAtRanks[i] || 0) > 0) {
      return 1 / (i + 1);
    }
  }
  return 0;
}

export function evaluateRankingOnPool(
  rankedDocIds: string[],
  completedRelevance: Record<string, 0 | 1>,
  poolDocIds: string[],
  k: number = 5
): EvaluationMetrics {
  const relevanceAtRanks = rankedDocIds.slice(0, k).map((id) => completedRelevance[id] || 0);
  const dcg5 = calculateDCG(relevanceAtRanks, k);

  // Total relevant in fixed candidate pool
  let poolRelevantCount = 0;
  for (const docId of poolDocIds) {
    if ((completedRelevance[docId] || 0) === 1) {
      poolRelevantCount++;
    }
  }

  const idcg5 = calculateIDCG(poolRelevantCount, k);
  const ndcg5 = calculateNDCG(dcg5, idcg5);
  const reciprocalRank5 = calculateReciprocalRank(relevanceAtRanks, k);

  return {
    dcg5: Math.round(dcg5 * 10000) / 10000,
    idcg5: Math.round(idcg5 * 10000) / 10000,
    ndcg5: Math.round(ndcg5 * 10000) / 10000,
    reciprocalRank5: Math.round(reciprocalRank5 * 10000) / 10000,
    poolRelevantCount,
    hasRelevantInPool: poolRelevantCount > 0,
  };
}
