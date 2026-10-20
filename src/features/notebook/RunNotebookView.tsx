import React, { useState } from 'react';
import { BookOpen, Terminal, Download, Copy, Check, ShieldCheck, Database, Sliders } from 'lucide-react';

export const RunNotebookView: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-navy text-white">
              Run Notebook
            </span>
            <span className="text-xs text-stone-500 font-mono">
              Evaluation Parameters & Provenance Ledger
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Reproducibility Ledger & Parameter Registry
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Full mathematical parameters, corpus provenance, and CLI execution commands.
          </p>
        </div>
      </div>

      {/* Grid: Reproducibility Commands Left, Parameter Ledger Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CLI Reproduction Commands */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Terminal className="w-4 h-4 text-stone-700" />
            <h3 className="font-bold text-stone-900 text-sm">Deterministic CLI Reproduction</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="text-[11px] text-stone-500 mb-1 font-sans">
                Run 5/5 Mathematical Contract Tests (136 ms):
              </div>
              <div className="bg-stone-900 text-stone-100 p-3 rounded-lg flex items-center justify-between">
                <code>npm test</code>
                <button
                  onClick={() => copyToClipboard('npm test', 'cmd1')}
                  className="text-stone-400 hover:text-white"
                >
                  {copiedCmd === 'cmd1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-stone-500 mb-1 font-sans">
                Run Comprehensive Benchmark Suite (120 docs, u=12 scaling):
              </div>
              <div className="bg-stone-900 text-stone-100 p-3 rounded-lg flex items-center justify-between">
                <code>npm run benchmark</code>
                <button
                  onClick={() => copyToClipboard('npm run benchmark', 'cmd2')}
                  className="text-stone-400 hover:text-white"
                >
                  {copiedCmd === 'cmd2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-stone-500 mb-1 font-sans">
                Inspect Benchmark JSON Output:
              </div>
              <div className="bg-stone-900 text-stone-100 p-3 rounded-lg flex items-center justify-between">
                <code>cat public/reports/benchmark-results.json</code>
                <button
                  onClick={() => copyToClipboard('cat public/reports/benchmark-results.json', 'cmd3')}
                  className="text-stone-400 hover:text-white"
                >
                  {copiedCmd === 'cmd3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Parameters */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Sliders className="w-4 h-4 text-stone-700" />
            <h3 className="font-bold text-stone-900 text-sm">Engine Hyperparameters & Configuration</h3>
          </div>

          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Tokenizer:</span>
              <span className="font-bold text-navy">Unicode NFKC + Contiguous Alphanumeric</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">BM25 k1:</span>
              <span className="font-bold text-navy">1.2 (Standard TREC parameter)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">BM25 b:</span>
              <span className="font-bold text-navy">0.75 (Document length penalty)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">IDF Variant:</span>
              <span className="font-bold text-navy">Robertson-Spärck Jones Non-Negative</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Evaluation Cutoff k:</span>
              <span className="font-bold text-navy">k = 5 (Standard Web Search head)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Shared IDCG Denominator:</span>
              <span className="font-bold text-emerald-700">Strictly Enforced (Identical Pool)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corpus Provenance & Prior Art */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-navy text-sm">
            <Database className="w-4 h-4 text-cobalt" />
            <span>Corpus Provenance & Licensing</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            The bundled 120-document corpus is an <strong>explicitly fictional</strong> campus IT helpdesk dataset authored specifically for evaluation diagnostics. It models real-world enterprise IR challenges: near-duplicate policy versions, obsolete protocol guides, shared technical jargon, and versioned migrations. Zero real student data or private policies are included.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-navy text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Intellectual Honesty & Boundaries</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Attribution is given to <strong>Quepid</strong> (OpenSource Connections), <strong>ranx</strong> (AmenRa), and <strong>BEIR</strong>. RANKLAB does not claim a new IR metric: it evaluates standard binary NDCG@5 and RR@5. The contribution is the exact bounded uncertainty interval and opposing witness assignment verification over incomplete candidate pools.
          </p>
        </div>
      </div>
    </div>
  );
};
