import React, { useState, useMemo } from 'react';
import { HeaderRail } from '../components/HeaderRail';
import { SearchDuelView } from '../features/duel/SearchDuelView';
import { EvidenceEnvelopeView } from '../features/envelope/EvidenceEnvelopeView';
import { JudgmentDeskView } from '../features/desk/JudgmentDeskView';
import { RegressionMapView } from '../features/regression/RegressionMapView';
import { RunNotebookView } from '../features/notebook/RunNotebookView';

import { InvertedIndex } from '../domain/bm25';
import { computeJudgmentEnvelope } from '../domain/envelope';
import { CAMPUS_DOCUMENTS, CAMPUS_QUERIES, INITIAL_JUDGMENTS } from '../domain/corpus';
import { Judgment, QueryEvaluationResult, RankerConfig } from '../domain/types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('duel');
  const [selectedQueryId, setSelectedQueryId] = useState<string>('q-01');
  const [judgments, setJudgments] = useState<Judgment[]>(INITIAL_JUDGMENTS);

  // Initialize Inverted Index once
  const index = useMemo(() => new InvertedIndex(CAMPUS_DOCUMENTS), []);

  const selectedQuery = useMemo(
    () => CAMPUS_QUERIES.find((q) => q.queryId === selectedQueryId) || CAMPUS_QUERIES[0],
    [selectedQueryId]
  );

  const rankerBM25: RankerConfig = useMemo(
    () => ({ name: 'BM25', type: 'bm25', k1: 1.2, b: 0.75, duplicateSuppression: true }),
    []
  );

  const rankerTFIDF: RankerConfig = useMemo(
    () => ({ name: 'TFIDF_Baseline', type: 'tfidf_baseline', k1: 1.2, b: 0.75, duplicateSuppression: false }),
    []
  );

  // Current query retrieval
  const rankingsA = useMemo(
    () => index.search(selectedQuery.text, rankerBM25, 5),
    [index, selectedQuery, rankerBM25]
  );

  const rankingsB = useMemo(
    () => index.search(selectedQuery.text, rankerTFIDF, 5),
    [index, selectedQuery, rankerTFIDF]
  );

  // Pool document IDs for current query
  const currentPoolDocIds = useMemo(() => {
    const set = new Set<string>();
    rankingsA.forEach((r) => set.add(r.docId));
    rankingsB.forEach((r) => set.add(r.docId));
    judgments.filter((j) => j.queryId === selectedQuery.queryId).forEach((j) => set.add(j.docId));
    return Array.from(set).sort();
  }, [rankingsA, rankingsB, judgments, selectedQuery]);

  // Judgments lookup map for current query
  const judgmentsMap = useMemo(() => {
    const map: Record<string, 0 | 1> = {};
    judgments
      .filter((j) => j.queryId === selectedQuery.queryId && j.relevance !== null)
      .forEach((j) => {
        map[j.docId] = j.relevance as 0 | 1;
      });
    return map;
  }, [judgments, selectedQuery]);

  // Current query envelope
  const currentEnvelope = useMemo(() => {
    return computeJudgmentEnvelope(
      selectedQuery.queryId,
      rankingsA.map((r) => r.docId),
      rankingsB.map((r) => r.docId),
      judgmentsMap,
      currentPoolDocIds,
      index.docs,
      5,
      true
    );
  }, [selectedQuery, rankingsA, rankingsB, judgmentsMap, currentPoolDocIds, index.docs]);

  // Handle judgment update from desk
  const handleUpdateJudgment = (docId: string, rel: 0 | 1 | null, rationale?: string) => {
    setJudgments((prev) => {
      const existingIdx = prev.findIndex(
        (j) => j.queryId === selectedQuery.queryId && j.docId === docId
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          relevance: rel,
          rationale: rationale || updated[existingIdx].rationale,
          revision: updated[existingIdx].revision + 1,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            queryId: selectedQuery.queryId,
            docId,
            relevance: rel,
            assessor: 'interactive_assessor',
            rationale: rationale || 'Assessed during interactive session',
            revision: 1,
          },
        ];
      }
    });
  };

  // Apply hypothetical witness labels
  const handleApplyHypothetical = (labels: Record<string, 0 | 1>) => {
    setJudgments((prev) => {
      const copy = [...prev];
      Object.entries(labels).forEach(([docId, rel]) => {
        const idx = copy.findIndex(
          (j) => j.queryId === selectedQuery.queryId && j.docId === docId
        );
        if (idx >= 0) {
          copy[idx] = {
            ...copy[idx],
            relevance: rel,
            rationale: 'Applied temporarily from witness assignment',
            revision: copy[idx].revision + 1,
          };
        } else {
          copy.push({
            queryId: selectedQuery.queryId,
            docId,
            relevance: rel,
            assessor: 'witness_replay',
            rationale: 'Applied temporarily from witness assignment',
            revision: 1,
          });
        }
      });
      return copy;
    });
  };

  // Pre-calculate all 30 queries for Regression Map
  const allEvaluationResults: QueryEvaluationResult[] = useMemo(() => {
    return CAMPUS_QUERIES.map((q) => {
      const rA = index.search(q.text, rankerBM25, 5);
      const rB = index.search(q.text, rankerTFIDF, 5);

      const qJudgments = judgments.filter((j) => j.queryId === q.queryId);
      const qKnownMap: Record<string, 0 | 1> = {};
      const poolSet = new Set<string>();
      rA.forEach((r) => poolSet.add(r.docId));
      rB.forEach((r) => poolSet.add(r.docId));
      qJudgments.forEach((j) => {
        poolSet.add(j.docId);
        if (j.relevance !== null) {
          qKnownMap[j.docId] = j.relevance;
        }
      });

      const env = computeJudgmentEnvelope(
        q.queryId,
        rA.map((r) => r.docId),
        rB.map((r) => r.docId),
        qKnownMap,
        Array.from(poolSet),
        index.docs,
        5,
        false
      );

      return {
        query: q,
        rankingsA: rA,
        rankingsB: rB,
        metricsA_provisional: { dcg5: 0, idcg5: 0, ndcg5: 0, reciprocalRank5: 0, poolRelevantCount: 0, hasRelevantInPool: true },
        metricsB_provisional: { dcg5: 0, idcg5: 0, ndcg5: 0, reciprocalRank5: 0, poolRelevantCount: 0, hasRelevantInPool: true },
        envelope: env,
      };
    });
  }, [index, rankerBM25, rankerTFIDF, judgments]);

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans text-navy selection:bg-cobalt selection:text-white">
      {/* Top Header Rail */}
      <HeaderRail
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        queries={CAMPUS_QUERIES}
        selectedQueryId={selectedQueryId}
        onSelectQuery={setSelectedQueryId}
        envelope={currentEnvelope}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'duel' && (
          <SearchDuelView
            query={selectedQuery}
            rankingsA={rankingsA}
            rankingsB={rankingsB}
            judgmentsMap={judgmentsMap}
            envelope={currentEnvelope}
            onNavigateToEnvelope={() => setActiveTab('envelope')}
            onNavigateToDesk={() => setActiveTab('desk')}
          />
        )}

        {activeTab === 'envelope' && (
          <EvidenceEnvelopeView
            query={selectedQuery}
            envelope={currentEnvelope}
            onApplyHypotheticalLabels={handleApplyHypothetical}
          />
        )}

        {activeTab === 'desk' && (
          <JudgmentDeskView
            query={selectedQuery}
            documents={CAMPUS_DOCUMENTS}
            poolDocIds={currentPoolDocIds}
            judgments={judgments}
            onUpdateJudgment={handleUpdateJudgment}
            envelope={currentEnvelope}
          />
        )}

        {activeTab === 'regression' && (
          <RegressionMapView
            evaluationResults={allEvaluationResults}
            onSelectQuery={(qId) => {
              setSelectedQueryId(qId);
              setActiveTab('duel');
            }}
            selectedQueryId={selectedQueryId}
          />
        )}

        {activeTab === 'notebook' && <RunNotebookView />}
      </main>

      {/* Status Footer */}
      <footer className="border-t border-stone-200 bg-white py-3 text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Exact Enumeration Active</span>
            </span>
            <span>·</span>
            <span>120 Campus IT Documents · 30 Queries</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Deterministic Math · MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
