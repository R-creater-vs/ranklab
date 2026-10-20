import React, { useState } from 'react';
import { Query, Document, Judgment, JudgmentEnvelope } from '../../domain/types';
import { Scale, Eye, EyeOff, Sparkles, CheckCircle2, XCircle, HelpCircle, Save, Download } from 'lucide-react';

interface JudgmentDeskViewProps {
  query: Query;
  documents: Document[];
  poolDocIds: string[];
  judgments: Judgment[];
  onUpdateJudgment: (docId: string, rel: 0 | 1 | null, rationale?: string) => void;
  envelope: JudgmentEnvelope;
}

export const JudgmentDeskView: React.FC<JudgmentDeskViewProps> = ({
  query,
  documents,
  poolDocIds,
  judgments,
  onUpdateJudgment,
  envelope,
}) => {
  const [blindedMode, setBlindedMode] = useState(true);
  const [rationales, setRationales] = useState<Record<string, string>>({});

  const docsMap = new Map<string, Document>();
  documents.forEach((d) => docsMap.set(d.docId, d));

  const judgmentMap = new Map<string, Judgment>();
  judgments.filter((j) => j.queryId === query.queryId).forEach((j) => judgmentMap.set(j.docId, j));

  const handleRationaleChange = (docId: string, text: string) => {
    setRationales((prev) => ({ ...prev, [docId]: text }));
  };

  const handleExportJudgments = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(judgments, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `ranklab-judgments-export.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-navy text-white">
              Judgment Desk
            </span>
            <span className="text-xs text-stone-500 font-mono">
              Blinded Assessment & Active Heuristic
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Relevance Review for Query: "{query.text}"
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Judge documents to narrow the uncertainty envelope. Changes update metrics in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Blinded Mode Toggle */}
          <button
            onClick={() => setBlindedMode(!blindedMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              blindedMode
                ? 'bg-navy text-white border-navy-light shadow-xs'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
            }`}
          >
            {blindedMode ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
            {blindedMode ? 'Blinded Review (ON)' : 'Unblinded Mode (OFF)'}
          </button>

          <button
            onClick={handleExportJudgments}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 font-mono text-xs font-bold border border-stone-300 hover:bg-stone-200 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" /> Export JSON
          </button>
        </div>
      </div>

      {/* Next Judgment Suggestion Card */}
      {envelope.suggestedNextJudgment && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-950 font-mono uppercase tracking-wide">
                Minimax Next-Judgment Recommendation
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-800 font-bold bg-white/80 px-2.5 py-0.5 rounded border border-amber-200">
              Target: {envelope.suggestedNextJudgment.docId}
            </span>
          </div>

          <p className="text-xs text-amber-900 mt-2 leading-relaxed">
            {envelope.suggestedNextJudgment.reasoning}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-amber-950 pt-2 border-t border-amber-200/60">
            <span>If Relevant (1): Envelope width = <strong>{envelope.suggestedNextJudgment.widthIfOne.toFixed(3)}</strong></span>
            <span>If Non-Relevant (0): Envelope width = <strong>{envelope.suggestedNextJudgment.widthIfZero.toFixed(3)}</strong></span>
            <span>Worst-Case Guaranteed Width: <strong>{envelope.suggestedNextJudgment.expectedWorstCaseWidth.toFixed(3)}</strong></span>
          </div>
        </div>
      )}

      {/* Candidate Pool Document List */}
      <div className="space-y-4">
        {poolDocIds.map((docId, index) => {
          const doc = docsMap.get(docId);
          const j = judgmentMap.get(docId);
          const currentRel = j?.relevance !== undefined ? j.relevance : null;
          const rationale = rationales[docId] || j?.rationale || '';

          return (
            <div
              key={docId}
              className={`bg-white rounded-xl border p-5 transition-all shadow-2xs space-y-4 ${
                envelope.suggestedNextJudgment?.docId === docId
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[10px]">
                      {index + 1}
                    </span>
                    <code className="font-bold text-navy">{docId}</code>
                    {!blindedMode && (
                      <>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-600">Family: <strong>{doc?.familyId}</strong></span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-600">v{doc?.version}</span>
                        {doc?.current ? (
                          <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px]">
                            Current
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[10px]">
                            Archived
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {doc?.title || 'Unknown Document Title'}
                  </h4>
                </div>

                {/* Relevance Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onUpdateJudgment(docId, 1, rationale)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
                      currentRel === 1
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Relevant (1)
                  </button>
                  <button
                    onClick={() => onUpdateJudgment(docId, 0, rationale)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
                      currentRel === 0
                        ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                        : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Non-Rel (0)
                  </button>
                  <button
                    onClick={() => onUpdateJudgment(docId, null, rationale)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all border ${
                      currentRel === null
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Unjudged
                  </button>
                </div>
              </div>

              {/* Document Body */}
              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs text-stone-700 leading-relaxed font-sans">
                {doc?.body}
              </div>

              {/* Rationale Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={rationale}
                  onChange={(e) => handleRationaleChange(docId, e.target.value)}
                  onBlur={() => onUpdateJudgment(docId, currentRel, rationale)}
                  placeholder="Annotator rationale / justification for this relevance decision..."
                  className="flex-1 text-xs bg-stone-50 border border-stone-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cobalt font-mono"
                />
                <span className="text-[10px] font-mono text-stone-400">
                  Rev: {j?.revision || 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
