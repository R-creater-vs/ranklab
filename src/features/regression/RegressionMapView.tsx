import React, { useState } from 'react';
import { Query, QueryEvaluationResult } from '../../domain/types';
import { Grid3X3, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, Filter } from 'lucide-react';

interface RegressionMapViewProps {
  evaluationResults: QueryEvaluationResult[];
  onSelectQuery: (queryId: string) => void;
  selectedQueryId: string;
}

export const RegressionMapView: React.FC<RegressionMapViewProps> = ({
  evaluationResults,
  onSelectQuery,
  selectedQueryId,
}) => {
  const [splitFilter, setSplitFilter] = useState<'all' | 'dev' | 'held-out'>('all');

  const filteredResults = evaluationResults.filter((r) => {
    if (splitFilter === 'all') return true;
    return r.query.split === splitFilter;
  });

  const devResults = evaluationResults.filter((r) => r.query.split === 'dev');
  const heldOutResults = evaluationResults.filter((r) => r.query.split === 'held-out');

  const calcStats = (list: QueryEvaluationResult[]) => {
    let unres = 0;
    let strictlyPos = 0;
    let strictlyNeg = 0;
    let meanDiff = 0;
    list.forEach((r) => {
      meanDiff += r.envelope.baselineDifference;
      if (r.envelope.verdict === 'unresolved') unres++;
      else if (r.envelope.verdict === 'strictly_positive') strictlyPos++;
      else if (r.envelope.verdict === 'strictly_negative') strictlyNeg++;
    });
    return {
      total: list.length,
      unresolved: unres,
      strictlyPositive: strictlyPos,
      strictlyNegative: strictlyNeg,
      meanBaselineDiff: list.length > 0 ? meanDiff / list.length : 0,
    };
  };

  const devStats = calcStats(devResults);
  const heldOutStats = calcStats(heldOutResults);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-navy text-white">
                Regression Map
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Development vs Held-Out Intent Families
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Query-Level Sensitivity & Evaluation Split Matrix
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              An aggregate average can easily conceal massive individual query failures. The Regression Map visualizes exact uncertainty envelopes across both the Development and Held-Out sets to ensure BM25 parameter tuning did not overfit.
            </p>
          </div>

          {/* Split KPI Cards */}
          <div className="grid grid-cols-2 gap-3 min-w-[300px]">
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200 text-center">
              <div className="text-[11px] font-mono text-blue-900 uppercase font-bold">Dev Split (15)</div>
              <div className="text-lg font-bold font-mono text-blue-950 mt-1">
                {devStats.unresolved} / {devStats.total} Unresolved
              </div>
              <div className="text-[11px] text-blue-800 font-mono">
                Mean Diff: {devStats.meanBaselineDiff.toFixed(3)}
              </div>
            </div>

            <div className="bg-purple-50/60 p-3 rounded-lg border border-purple-200 text-center">
              <div className="text-[11px] font-mono text-purple-900 uppercase font-bold">Held-Out Split (15)</div>
              <div className="text-lg font-bold font-mono text-purple-950 mt-1">
                {heldOutStats.unresolved} / {heldOutStats.total} Unresolved
              </div>
              <div className="text-[11px] text-purple-800 font-mono">
                Mean Diff: {heldOutStats.meanBaselineDiff.toFixed(3)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSplitFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
            splitFilter === 'all'
              ? 'bg-navy text-white border-navy'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          All 30 Queries
        </button>
        <button
          onClick={() => setSplitFilter('dev')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
            splitFilter === 'dev'
              ? 'bg-blue-700 text-white border-blue-800'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          Development Set (15 Queries)
        </button>
        <button
          onClick={() => setSplitFilter('held-out')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
            splitFilter === 'held-out'
              ? 'bg-purple-700 text-white border-purple-800'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          Held-Out Evaluation Set (15 Queries)
        </button>
      </div>

      {/* Query Matrix Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-100/80 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-4">ID</th>
                <th className="py-2.5 px-4">Split</th>
                <th className="py-2.5 px-4">Query Text</th>
                <th className="py-2.5 px-4">Intent Family</th>
                <th className="py-2.5 px-4">Unjudged</th>
                <th className="py-2.5 px-4">Provisional Diff</th>
                <th className="py-2.5 px-4">Uncertainty Envelope</th>
                <th className="py-2.5 px-4">Sign Verdict</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {filteredResults.map((res) => {
                const isSelected = res.query.queryId === selectedQueryId;
                const env = res.envelope;

                return (
                  <tr
                    key={res.query.queryId}
                    className={`hover:bg-stone-50 transition-colors ${
                      isSelected ? 'bg-cobalt-light/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 font-bold text-navy">{res.query.queryId}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                        res.query.split === 'held-out'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {res.query.split}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-sans font-semibold text-stone-900 max-w-xs truncate">
                      "{res.query.text}"
                    </td>
                    <td className="py-2.5 px-4 text-stone-500">{res.query.intentFamily}</td>
                    <td className="py-2.5 px-4">
                      <span className={`font-bold ${env.missingCount > 0 ? 'text-amber-800' : 'text-stone-400'}`}>
                        {env.missingCount} docs
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`font-bold ${
                        env.baselineDifference > 0
                          ? 'text-emerald-700'
                          : env.baselineDifference < 0
                          ? 'text-rose-700'
                          : 'text-stone-500'
                      }`}>
                        {env.baselineDifference > 0 ? '+' : ''}{env.baselineDifference.toFixed(3)}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <code className="text-[11px] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                        [{env.minDifference.toFixed(3)}, {env.maxDifference.toFixed(3)}]
                      </code>
                    </td>
                    <td className="py-2.5 px-4">
                      {env.verdict === 'unresolved' ? (
                        <span className="inline-flex items-center gap-1 text-amber-800 font-bold">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Unresolved
                        </span>
                      ) : env.verdict === 'strictly_positive' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3 h-3" /> A Wins
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-indigo-700 font-bold">
                          <ShieldAlert className="w-3 h-3" /> B Wins
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={() => onSelectQuery(res.query.queryId)}
                        className="px-2 py-1 rounded bg-stone-100 text-stone-700 hover:bg-navy hover:text-white transition-all text-[11px] font-bold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
