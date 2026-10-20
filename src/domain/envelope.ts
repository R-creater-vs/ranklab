import type {
  JudgmentEnvelope,
  WitnessAssignment,
  NextJudgmentSuggestion,
  Document,
} from './types.ts';
import { evaluateRankingOnPool } from './metrics.ts';

export function computeJudgmentEnvelope(
  queryId: string,
  rankedIdsA: string[],
  rankedIdsB: string[],
  knownJudgments: Record<string, 0 | 1>,
  allPoolDocIds: string[],
  documentsMap?: Map<string, Document>,
  k: number = 5,
  computeNextSuggestion: boolean = true
): JudgmentEnvelope {
  // Candidate pool is the union of top-k from both rankers plus known judgments in pool
  const poolSet = new Set<string>();
  rankedIdsA.slice(0, k).forEach((id) => poolSet.add(id));
  rankedIdsB.slice(0, k).forEach((id) => poolSet.add(id));
  allPoolDocIds.forEach((id) => poolSet.add(id));

  const poolDocIds = Array.from(poolSet).sort();

  // Find unjudged documents in this fixed pool
  const unjudgedDocIds = poolDocIds.filter((id) => knownJudgments[id] === undefined);
  const missingCount = unjudgedDocIds.length;

  // Maximum allowed for exact enumeration: 12 (2^12 = 4096 combinations)
  if (missingCount > 12) {
    // Return explicit non-exact notice
    return {
      queryId,
      fixedPoolDocIds: poolDocIds,
      missingCount,
      totalCombinations: Math.pow(2, missingCount),
      isExact: false,
      minDifference: -1,
      maxDifference: 1,
      minWitness: { labels: {}, scoreA: 0, scoreB: 0, difference: -1 },
      maxWitness: { labels: {}, scoreA: 0, scoreB: 0, difference: 1 },
      baselineDifference: 0,
      verdict: 'unresolved',
    };
  }

  // 1. Calculate conventional provisional baseline (unjudged treated as 0)
  const baselineLabels: Record<string, 0 | 1> = { ...knownJudgments };
  unjudgedDocIds.forEach((id) => (baselineLabels[id] = 0));
  const baseMetricsA = evaluateRankingOnPool(rankedIdsA, baselineLabels, poolDocIds, k);
  const baseMetricsB = evaluateRankingOnPool(rankedIdsB, baselineLabels, poolDocIds, k);
  const baselineDiff = Math.round((baseMetricsA.ndcg5 - baseMetricsB.ndcg5) * 10000) / 10000;

  // 2. Exact enumeration over 2^missingCount
  const totalCombinations = 1 << missingCount;
  let minDiff = Infinity;
  let maxDiff = -Infinity;
  let minWitnessLabels: Record<string, 0 | 1> = {};
  let maxWitnessLabels: Record<string, 0 | 1> = {};
  let minScoreA = 0;
  let minScoreB = 0;
  let maxScoreA = 0;
  let maxScoreB = 0;

  for (let mask = 0; mask < totalCombinations; mask++) {
    const currentLabels: Record<string, 0 | 1> = { ...knownJudgments };
    for (let bit = 0; bit < missingCount; bit++) {
      const bitVal = (mask >> bit) & 1;
      currentLabels[unjudgedDocIds[bit]] = bitVal as 0 | 1;
    }

    const evalA = evaluateRankingOnPool(rankedIdsA, currentLabels, poolDocIds, k);
    const evalB = evaluateRankingOnPool(rankedIdsB, currentLabels, poolDocIds, k);
    const diff = evalA.ndcg5 - evalB.ndcg5;

    if (diff < minDiff - 1e-9) {
      minDiff = diff;
      minWitnessLabels = { ...currentLabels };
      minScoreA = evalA.ndcg5;
      minScoreB = evalB.ndcg5;
    }
    if (diff > maxDiff + 1e-9) {
      maxDiff = diff;
      maxWitnessLabels = { ...currentLabels };
      maxScoreA = evalA.ndcg5;
      maxScoreB = evalB.ndcg5;
    }
  }

  minDiff = Math.round(minDiff * 10000) / 10000;
  maxDiff = Math.round(maxDiff * 10000) / 10000;

  // Classify verdict
  let verdict: 'strictly_positive' | 'strictly_negative' | 'unresolved' | 'tied_zero';
  const eps = 1e-4;
  if (minDiff > eps && maxDiff > eps) {
    verdict = 'strictly_positive';
  } else if (minDiff < -eps && maxDiff < -eps) {
    verdict = 'strictly_negative';
  } else if (Math.abs(minDiff) <= eps && Math.abs(maxDiff) <= eps) {
    verdict = 'tied_zero';
  } else {
    verdict = 'unresolved';
  }

  // 3. Minimax next-judgment recommendation
  let suggestedNextJudgment: NextJudgmentSuggestion | undefined = undefined;
  if (computeNextSuggestion && missingCount > 0 && missingCount <= 6) {
    let bestDocId = '';
    let bestWorstCaseWidth = Infinity;
    let bestWidthIfZero = Infinity;
    let bestWidthIfOne = Infinity;

    for (const testDocId of unjudgedDocIds) {
      // Sub-envelope if testDocId is 0
      const envZero = computeJudgmentEnvelope(
        queryId,
        rankedIdsA,
        rankedIdsB,
        { ...knownJudgments, [testDocId]: 0 },
        poolDocIds,
        undefined,
        k,
        false
      );
      const width0 = envZero.maxDifference - envZero.minDifference;

      // Sub-envelope if testDocId is 1
      const envOne = computeJudgmentEnvelope(
        queryId,
        rankedIdsA,
        rankedIdsB,
        { ...knownJudgments, [testDocId]: 1 },
        poolDocIds,
        undefined,
        k,
        false
      );
      const width1 = envOne.maxDifference - envOne.minDifference;

      const worstCaseWidth = Math.max(width0, width1);

      if (worstCaseWidth < bestWorstCaseWidth - 1e-5) {
        bestWorstCaseWidth = worstCaseWidth;
        bestDocId = testDocId;
        bestWidthIfZero = width0;
        bestWidthIfOne = width1;
      } else if (Math.abs(worstCaseWidth - bestWorstCaseWidth) <= 1e-5) {
        // Tie-break alphabetically by docId
        if (!bestDocId || testDocId.localeCompare(bestDocId) < 0) {
          bestWorstCaseWidth = worstCaseWidth;
          bestDocId = testDocId;
          bestWidthIfZero = width0;
          bestWidthIfOne = width1;
        }
      }
    }

    if (bestDocId) {
      const doc = documentsMap?.get(bestDocId);
      suggestedNextJudgment = {
        docId: bestDocId,
        title: doc ? doc.title : bestDocId,
        familyId: doc ? doc.familyId : 'unknown',
        expectedWorstCaseWidth: Math.round(bestWorstCaseWidth * 10000) / 10000,
        widthIfZero: Math.round(bestWidthIfZero * 10000) / 10000,
        widthIfOne: Math.round(bestWidthIfOne * 10000) / 10000,
        reasoning: `Judging ${bestDocId} guarantees reducing envelope width from ${(maxDiff - minDiff).toFixed(3)} to at most ${bestWorstCaseWidth.toFixed(3)} regardless of whether it is relevant or non-relevant.`,
      };
    }
  }

  return {
    queryId,
    fixedPoolDocIds: poolDocIds,
    missingCount,
    totalCombinations,
    isExact: true,
    minDifference: minDiff,
    maxDifference: maxDiff,
    minWitness: {
      labels: minWitnessLabels,
      scoreA: Math.round(minScoreA * 10000) / 10000,
      scoreB: Math.round(minScoreB * 10000) / 10000,
      difference: minDiff,
      explanation: `Worst-case for Ranker A (NDCG_A=${minScoreA.toFixed(3)}, NDCG_B=${minScoreB.toFixed(3)})`,
    },
    maxWitness: {
      labels: maxWitnessLabels,
      scoreA: Math.round(maxScoreA * 10000) / 10000,
      scoreB: Math.round(maxScoreB * 10000) / 10000,
      difference: maxDiff,
      explanation: `Best-case for Ranker A (NDCG_A=${maxScoreA.toFixed(3)}, NDCG_B=${maxScoreB.toFixed(3)})`,
    },
    baselineDifference: baselineDiff,
    verdict,
    suggestedNextJudgment,
  };
}
