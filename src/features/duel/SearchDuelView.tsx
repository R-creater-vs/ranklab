import React from 'react';
import { RankedDocument, Query, JudgmentEnvelope } from '../../domain/types';
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle, HelpCircle, Layers } from 'lucide-react';

interface SearchDuelViewProps {
  query: Query;
  rankingsA: RankedDocument[];
  rankingsB: RankedDocument[];
  judgmentsMap: Record<string, 0 | 1>;
  envelope: JudgmentEnvelope;
  onNavigateToEnvelope: () => void;
  onNavigateToDesk: () => void;
}

export const SearchDuelView: React.FC<SearchDuelViewProps> = ({
  query,
  rankingsA,
  rankingsB,
  judgmentsMap,
  envelope,
  onNavigateToEnvelope,
  onNavigateToDesk,
}) => {
  // Map ranks in B for rank movement tracking
  const rankInB = new Map<string, number>();
  rankingsB.forEach((d) => rankInB.set(d.docId, d.rank));

  // Map ranks in A for B view
  const rankInA = new Map<string, number>();
  rankingsA.forEach((d) => rankInA.set(d.docId, d.rank));

  const renderJudgmentBadge = (docId: string) => {
    const val = judgmentsMap[docId];
    if (val === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3 h-3" /> Relevant (1)
        </span>
      );
    }
    if (val === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <XCircle className="w-3 h-3" /> Non-Relevant (0)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
        <HelpCircle className="w-3 h-3" /> Unjudged (null)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Recruiter-Facing Moment Banner */}
      <div className="bg-gradient-to-r from-navy to-slate-900 text-white rounded-xl p-6 shadow-sm border border-navy-light">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-cobalt/30 text-cobalt-light border border-cobalt/40">
                Core Differentiator
              </span>
              <span className="text-xs text-stone-300 font-mono">
                Exact Bounded Uncertainty Engine · 120-Document Campus IT Corpus
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              “The leaderboard says this search engine wins. Change one previously unknown relevance judgment and that conclusion is no longer supported.”
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Standard search evaluation pipelines arbitrarily coerce unjudged documents to 0 (non-relevant). This introduces massive pool bias. RANKLAB evaluates candidates across the exact mathematical envelope of all missing relevance completions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/15 min-w-[240px]">
            <div className="text-xs font-mono text-stone-300 uppercase tracking-wider">
              Query [{query.queryId}]
            </div>
            <div className="text-sm font-bold text-white mt-1 line-clamp-1">
              "{query.text}"
            </div>
            <div className="mt-2 text-xs font-mono text-stone-300 flex items-center justify-between">
              <span>Missing Judgments:</span>
              <span className="font-bold text-amber-300">{envelope.missingCount} docs</span>
            </div>
            <div className="text-xs font-mono text-stone-300 flex items-center justify-between mt-0.5">
              <span>Provisional Diff:</span>
              <span className={`font-bold ${envelope.baselineDifference >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {envelope.baselineDifference >= 0 ? '+' : ''}{envelope.baselineDifference.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Duel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engine A: BM25 */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col">
          <div className="px-5 py-3.5 bg-cobalt/5 border-b border-cobalt/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-cobalt text-white flex items-center justify-center text-xs font-mono font-bold">
                A
              </span>
              <div>
                <span className="font-bold text-navy text-sm">Engine A: BM25 (Non-negative RSJ)</span>
                <span className="ml-2 text-[10px] font-mono text-stone-500">k1=1.2, b=0.75 · Duplicate-Suppressed</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-cobalt bg-white px-2 py-0.5 rounded border border-cobalt/20">
              Top 5 Cutoff
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1">
            {rankingsA.slice(0, 5).map((doc) => {
              const bRank = rankInB.get(doc.docId);
              return (
                <div
                  key={doc.docId}
                  className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-navy text-white text-[10px] font-mono font-bold flex items-center justify-center">
                        {doc.rank}
                      </span>
                      <code className="text-xs font-mono font-bold text-navy">{doc.docId}</code>
                      <span className="text-[10px] font-mono text-stone-400">v{doc.version}</span>
                      {doc.current ? (
                        <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 rounded">
                          Current
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono bg-rose-50 text-rose-700 border border-rose-200 px-1 rounded">
                          Archived
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {renderJudgmentBadge(doc.docId)}
                      <span className="text-xs font-mono font-bold text-stone-700">
                        {doc.score.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-stone-900 leading-snug">
                    {doc.title}
                  </div>

                  {/* Term Contributions */}
                  {doc.termContributions && doc.termContributions.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-stone-400">Terms:</span>
                      {doc.termContributions.map((tc) => (
                        <span
                          key={tc.term}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-stone-200 text-stone-600"
                        >
                          {tc.term}: <strong className="text-navy">{tc.scoreContribution.toFixed(2)}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Linked Rank Movement */}
                  <div className="text-[10px] font-mono text-stone-500 pt-1 border-t border-stone-100 flex items-center justify-between">
                    <span>Family: <strong>{doc.familyId}</strong></span>
                    <span>
                      In Engine B:{' '}
                      <strong className={bRank ? 'text-cobalt' : 'text-stone-400'}>
                        {bRank ? `#${bRank}` : 'Outside Top 5'}
                      </strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engine B: TF-IDF Baseline */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col">
          <div className="px-5 py-3.5 bg-indigo-50/50 border-b border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-indigo-700 text-white flex items-center justify-center text-xs font-mono font-bold">
                B
              </span>
              <div>
                <span className="font-bold text-navy text-sm">Engine B: Token-Overlap TF-IDF</span>
                <span className="ml-2 text-[10px] font-mono text-stone-500">Log-TF · Unsuppressed Baseline</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
              Top 5 Cutoff
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1">
            {rankingsB.slice(0, 5).map((doc) => {
              const aRank = rankInA.get(doc.docId);
              return (
                <div
                  key={doc.docId}
                  className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-navy text-white text-[10px] font-mono font-bold flex items-center justify-center">
                        {doc.rank}
                      </span>
                      <code className="text-xs font-mono font-bold text-navy">{doc.docId}</code>
                      <span className="text-[10px] font-mono text-stone-400">v{doc.version}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {renderJudgmentBadge(doc.docId)}
                      <span className="text-xs font-mono font-bold text-stone-700">
                        {doc.score.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-stone-900 leading-snug">
                    {doc.title}
                  </div>

                  {/* Linked Rank Movement */}
                  <div className="text-[10px] font-mono text-stone-500 pt-1 border-t border-stone-100 flex items-center justify-between">
                    <span>Family: <strong>{doc.familyId}</strong></span>
                    <span>
                      In Engine A:{' '}
                      <strong className={aRank ? 'text-cobalt' : 'text-stone-400'}>
                        {aRank ? `#${aRank}` : 'Outside Top 5'}
                      </strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-stone-200 bg-white shadow-2xs">
        <div className="text-xs text-stone-600 font-mono">
          Pool size: <strong>{envelope.fixedPoolDocIds.length}</strong> unique docs ·{' '}
          <strong>{envelope.missingCount}</strong> unjudged ·{' '}
          <strong>{envelope.totalCombinations}</strong> possible completions
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToEnvelope}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt text-white font-mono text-xs font-bold hover:bg-cobalt-dark transition-all"
          >
            Inspect Evidence Envelope <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNavigateToDesk}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 font-mono text-xs font-bold hover:bg-stone-200 transition-all border border-stone-300"
          >
            Open Judgment Desk
          </button>
        </div>
      </div>
    </div>
  );
};
