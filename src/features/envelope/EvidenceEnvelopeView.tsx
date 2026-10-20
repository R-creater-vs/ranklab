import React, { useState } from 'react';
import { JudgmentEnvelope, WitnessAssignment, Query } from '../../domain/types';
import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, CornerDownRight, Scale, Info } from 'lucide-react';

interface EvidenceEnvelopeViewProps {
  query: Query;
  envelope: JudgmentEnvelope;
  onApplyHypotheticalLabels?: (labels: Record<string, 0 | 1>) => void;
}

export const EvidenceEnvelopeView: React.FC<EvidenceEnvelopeViewProps> = ({
  query,
  envelope,
  onApplyHypotheticalLabels,
}) => {
  const [selectedWitness, setSelectedWitness] = useState<'none' | 'min' | 'max'>('none');

  const {
    minDifference,
    maxDifference,
    baselineDifference,
    missingCount,
    totalCombinations,
    minWitness,
    maxWitness,
    verdict,
  } = envelope;

  const activeWitness: WitnessAssignment | null =
    selectedWitness === 'min' ? minWitness : selectedWitness === 'max' ? maxWitness : null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Signature Mechanism
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Exact Judgment Uncertainty Envelope
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Range of Possible Engine Comparisons (Δ = NDCG_A - NDCG_B)
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              When documents in the candidate pool remain unjudged, there is no single score difference. Every combination of binary relevance ($0$ or $1$) produces an attainable score. The envelope below proves the exact mathematical bounds across all {totalCombinations.toLocaleString()} completions.
            </p>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-3 gap-3 min-w-[340px]">
            <div className="bg-stone-50 rounded-lg p-3 border border-stone-200 text-center">
              <div className="text-[11px] font-mono text-stone-500 uppercase">Worst Case (Min)</div>
              <div className="text-2xl font-bold font-mono text-rose-700 mt-0.5">
                {minDifference >= 0 ? '+' : ''}{minDifference.toFixed(3)}
              </div>
              <div className="text-[11px] text-stone-500">NDCG diff</div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-300 text-center">
              <div className="text-[11px] font-mono text-amber-900 uppercase">Provisional (0s)</div>
              <div className="text-2xl font-bold font-mono text-amber-950 mt-0.5">
                {baselineDifference >= 0 ? '+' : ''}{baselineDifference.toFixed(3)}
              </div>
              <div className="text-[11px] text-amber-800">unjudged as 0</div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-300 text-center">
              <div className="text-[11px] font-mono text-emerald-900 uppercase">Best Case (Max)</div>
              <div className="text-2xl font-bold font-mono text-emerald-800 mt-0.5">
                {maxDifference >= 0 ? '+' : ''}{maxDifference.toFixed(3)}
              </div>
              <div className="text-[11px] text-emerald-700">NDCG diff</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Number Line */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-sm">NDCG@5 Difference Number Line</h3>
            <p className="text-xs text-stone-500 mt-0.5 font-mono">
              Envelope Width: {(maxDifference - minDifference).toFixed(4)} · Sign Verdict:{' '}
              <strong className="uppercase">{verdict.replace('_', ' ')}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWitness(selectedWitness === 'min' ? 'none' : 'min')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                selectedWitness === 'min'
                  ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                  : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
              }`}
            >
              Reveal Min Witness
            </button>
            <button
              onClick={() => setSelectedWitness(selectedWitness === 'max' ? 'none' : 'max')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                selectedWitness === 'max'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              Reveal Max Witness
            </button>
          </div>
        </div>

        {/* Visual Line Visualization */}
        <div className="relative pt-8 pb-10 px-4">
          {/* Base Track (-1.0 to +1.0) */}
          <div className="h-2 w-full bg-stone-200 rounded-full relative">
            {/* Zero Axis Marker (Center at 50%) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-6 bg-stone-400 z-10">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-mono font-bold text-stone-500">
                0.0 (Tie)
              </span>
            </div>

            {/* Left bound tick (-1.0) */}
            <span className="absolute -bottom-6 left-0 text-[10px] font-mono text-stone-400">
              -1.0 (B Wins)
            </span>

            {/* Right bound tick (+1.0) */}
            <span className="absolute -bottom-6 right-0 text-[10px] font-mono text-stone-400">
              +1.0 (A Wins)
            </span>

            {/* Active Uncertainty Envelope Band */}
            {(() => {
              // Convert range [-1, +1] to percentage [0%, 100%]
              const leftPct = Math.max(0, Math.min(100, ((minDifference + 1) / 2) * 100));
              const rightPct = Math.max(0, Math.min(100, ((maxDifference + 1) / 2) * 100));
              const widthPct = Math.max(2, rightPct - leftPct);

              return (
                <div
                  className="absolute top-0 h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full opacity-90 shadow-sm"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                >
                  {/* Min marker */}
                  <div className="absolute -top-7 -left-3 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-100 px-1 rounded border border-rose-300">
                      {minDifference >= 0 ? '+' : ''}{minDifference.toFixed(3)}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-0.5" />
                  </div>

                  {/* Max marker */}
                  <div className="absolute -top-7 -right-3 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-900 bg-emerald-100 px-1 rounded border border-emerald-300">
                      {maxDifference >= 0 ? '+' : ''}{maxDifference.toFixed(3)}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5" />
                  </div>
                </div>
              );
            })()}

            {/* Provisional Dot (unjudged = 0) */}
            {(() => {
              const basePct = Math.max(0, Math.min(100, ((baselineDifference + 1) / 2) * 100));
              return (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
                  style={{ left: `${basePct}%` }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-navy border-2 border-white shadow-md ring-2 ring-navy/20" />
                  <span className="absolute top-5 text-[10px] font-mono font-bold text-navy whitespace-nowrap bg-stone-100 px-1 rounded border border-stone-300">
                    Provisional: {baselineDifference >= 0 ? '+' : ''}{baselineDifference.toFixed(3)}
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Verdict Explanation Alert */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          verdict === 'unresolved'
            ? 'bg-amber-50/70 border-amber-300 text-amber-950'
            : verdict === 'strictly_positive'
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            : 'bg-indigo-50/70 border-indigo-300 text-indigo-950'
        }`}>
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-sm">
              {verdict === 'unresolved'
                ? 'Sign of Comparison is Unresolved (Winner Depends on Unjudged Documents)'
                : verdict === 'strictly_positive'
                ? 'Engine A Strictly Dominates Across ALL Possible Completions'
                : 'Engine B Strictly Dominates Across ALL Possible Completions'}
            </div>
            <p className="leading-relaxed text-stone-600">
              {verdict === 'unresolved'
                ? `Because the interval spans both positive (+${maxDifference.toFixed(3)}) and negative (${minDifference.toFixed(3)}) values across 0.0, calling Engine A the winner is logically ungrounded without judging the remaining ${missingCount} documents.`
                : `Regardless of whether the ${missingCount} unjudged documents turn out to be relevant (1) or non-relevant (0), the sign of the difference does not change.`}
            </p>
          </div>
        </div>
      </div>

      {/* Witness Assignment Inspection Drawer */}
      {activeWitness && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-navy" />
              <h3 className="font-bold text-stone-900 text-sm">
                Witness Relevance Assignment ({selectedWitness.toUpperCase()} Bound)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-navy">
              Attained Diff: {activeWitness.difference >= 0 ? '+' : ''}{activeWitness.difference.toFixed(4)}
            </span>
          </div>

          <p className="text-xs text-stone-600">
            {activeWitness.explanation}. Here are the exact document labels that produce this mathematical extremum:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 font-mono text-xs">
            {Object.entries(activeWitness.labels).map(([docId, val]) => (
              <div
                key={docId}
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  val === 1
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <code className="font-bold">{docId}</code>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  val === 1 ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-200 text-stone-700'
                }`}>
                  {val === 1 ? 'Rel: 1' : 'Rel: 0'}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 flex items-center justify-between text-xs font-mono">
            <div className="text-stone-600">
              Score under witness: Engine A = <strong>{activeWitness.scoreA.toFixed(4)}</strong>, Engine B ={' '}
              <strong>{activeWitness.scoreB.toFixed(4)}</strong>
            </div>
            {onApplyHypotheticalLabels && (
              <button
                onClick={() => onApplyHypotheticalLabels(activeWitness.labels)}
                className="px-3 py-1 bg-navy text-white rounded font-bold hover:bg-navy-light transition-all"
              >
                Apply Witness as Temporary Labels
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recruiter Talking Point Callout */}
      <div className="bg-stone-900 text-white rounded-xl p-6 border border-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-cobalt-light font-mono text-xs font-bold uppercase tracking-wider">
          <Info className="w-4 h-4 text-cobalt" /> Information Retrieval Principle
        </div>
        <p className="text-sm text-stone-300 leading-relaxed">
          “In TREC evaluations and enterprise search leaderboards, unjudged documents are routinely treated as negative. This creates massive candidate pool bias: whichever engine fetched documents that an assessor happened to review gets rewarded, while the competing engine is penalized for unreviewed items. RANKLAB replaces this arbitrary imputation with exact bounded uncertainty.”
        </p>
      </div>
    </div>
  );
};
