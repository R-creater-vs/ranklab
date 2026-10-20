import React from 'react';
import { Swords, Activity, Scale, Grid3X3, BookOpen, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Query, JudgmentEnvelope } from '../domain/types';

interface HeaderRailProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  queries: Query[];
  selectedQueryId: string;
  onSelectQuery: (id: string) => void;
  envelope: JudgmentEnvelope;
}

export const HeaderRail: React.FC<HeaderRailProps> = ({
  activeTab,
  setActiveTab,
  queries,
  selectedQueryId,
  onSelectQuery,
  envelope,
}) => {
  const selectedQuery = queries.find((q) => q.queryId === selectedQueryId) || queries[0];

  const navTabs = [
    { id: 'duel', label: 'Search Duel', icon: Swords },
    { id: 'envelope', label: 'Evidence Envelope', icon: Activity },
    { id: 'desk', label: 'Judgment Desk', icon: Scale },
    { id: 'regression', label: 'Regression Map', icon: Grid3X3 },
    { id: 'notebook', label: 'Run Notebook', icon: BookOpen },
  ];

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-white font-mono font-bold text-lg shadow-sm">
            RL
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-bold tracking-tight text-navy">RANKLAB</h1>
              <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200">
                v1.0.0
              </span>
              {envelope.verdict === 'unresolved' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Winner Unresolved ({envelope.missingCount} unknown docs)
                </span>
              ) : envelope.verdict === 'strictly_positive' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Engine A Dominates
                </span>
              ) : envelope.verdict === 'strictly_negative' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                  Engine B Dominates
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                  Tied At Zero
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-sans">
              Search Evaluation Under Missing Judgments · Exact Bounded Uncertainty Envelope
            </p>
          </div>
        </div>

        {/* Query Switcher */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
            Query:
          </label>
          <select
            value={selectedQueryId}
            onChange={(e) => onSelectQuery(e.target.value)}
            className="text-xs font-sans bg-stone-50 border border-stone-300 text-stone-800 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-cobalt font-medium max-w-xs"
          >
            <optgroup label="Development Split (15 Queries)">
              {queries
                .filter((q) => q.split === 'dev')
                .map((q) => (
                  <option key={q.queryId} value={q.queryId}>
                    [{q.queryId}] {q.text} ({q.intentFamily})
                  </option>
                ))}
            </optgroup>
            <optgroup label="Held-Out Evaluation Split (15 Queries)">
              {queries
                .filter((q) => q.split === 'held-out')
                .map((q) => (
                  <option key={q.queryId} value={q.queryId}>
                    [{q.queryId}] {q.text} ({q.intentFamily})
                  </option>
                ))}
            </optgroup>
          </select>
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold border ${
            selectedQuery?.split === 'held-out'
              ? 'bg-purple-50 text-purple-800 border-purple-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            {selectedQuery?.split || 'dev'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-stone-100">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-cobalt text-cobalt font-bold bg-cobalt-light/40'
                  : 'border-transparent text-stone-600 hover:text-navy hover:border-stone-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cobalt' : 'text-stone-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
