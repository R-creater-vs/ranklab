# RANKLAB — Search Evaluation Under Missing Judgments

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square)](https://github.com)
[![Contracts](https://img.shields.io/badge/Contracts-5%2F5%20Passing-brightgreen?style=flat-square)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-slate?style=flat-square)](LICENSE)

> **Recruiter-Facing Moment:** “The leaderboard says this search engine wins. Change one previously unknown relevance judgment and that conclusion is no longer supported.”

---

## What is RANKLAB?

Traditional search relevance evaluations (such as TREC pools, internal search benchmarks, and offline leaderboards) routinely treat unjudged documents as non-relevant (score 0). This introduces massive pool bias and false superiority conclusions.

**RANKLAB** is a local information retrieval evaluation workbench that replaces arbitrary zero-imputation with exact bounded judgment-uncertainty analysis over fixed candidate pools.

### Key Capabilities
1. **The Judgment Uncertainty Envelope:**
   - Computes exact mathematical bounds $[\min \Delta, \max \Delta]$ where $\Delta = \text{NDCG}_A - \text{NDCG}_B$ across all $2^u$ ($u \le 12$) binary relevance completions.
   - Outputs the exact **witness assignments** attaining each bound.
2. **Minimax Next-Judgment Recommendation:**
   - Evaluates worst-case remaining envelope width $W^*(d) = \max(W_0, W_1)$ to guide annotators toward the highest-information document to judge next.
3. **Transparent Lexical Retrieval Engine:**
   - Robertson-Spärck Jones non-negative IDF: $\text{idf}(t) = \ln(1 + \frac{N - \text{df}(t) + 0.5}{\text{df}(t) + 0.5})$.
   - Term-level explainability breakdown and duplicate-family suppression policy.
4. **Blinded Judgment Desk:**
   - Hides ranker identity and rank positions during human evaluation to eliminate confirmation bias.
5. **No Cross-Split Leakage:**
   - 120-document corpus across 15 intent families with 30 queries strictly partitioned into development (15) and held-out (15) splits.

---

## Architecture Overview

```
RANKLAB
├── src/
│   ├── app/App.tsx                   # Interactive Analytical Workbench
│   ├── components/HeaderRail.tsx     # Navigation & Split Selector
│   ├── domain/                       # Core Mathematical & IR Engine
│   │   ├── types.ts                  # Document, Query, Judgment, Envelope types
│   │   ├── tokenizer.ts              # Unicode NFKC tokenization
│   │   ├── bm25.ts                   # Inverted Index & RSJ BM25 scoring
│   │   ├── metrics.ts                # Binary NDCG@5 & Shared IDCG
│   │   ├── envelope.ts               # Exact 2^u enumeration & minimax heuristic
│   │   └── corpus.ts                 # 120 Campus IT documents & 30 queries
│   └── features/
│       ├── duel/                     # Side-by-side search duel with term pills
│       ├── envelope/                 # Number line with bounds & witness inspection
│       ├── desk/                     # Blinded review & active judgment tools
│       ├── regression/               # Development vs Held-Out sensitivity matrix
│       └── notebook/                 # Provenance ledger & reproduction commands
├── tests/
│   └── ranklab_contract.test.ts      # 5/5 Mathematical Contract Verification
├── scripts/
│   ├── build_corpus.cjs              # Corpus generator script
│   ├── run_benchmark.mjs             # Scalability & split evaluation benchmark
│   └── capture_screenshots.mjs       # Headless screenshot capture
└── docs/                             # Evaluation contract, prior art, & benchmarks
```

---

## Quick Start (100% Offline & Zero Cloud Spend)

```bash
# 1. Install dependencies
npm install

# 2. Run automated contract verification suite (177 ms)
npm test

# 3. Execute scalability & split evaluation benchmark (7.39 ms for u=12)
npm run benchmark

# 4. Build production bundle (306 kB total)
npm run build

# 5. Launch local interactive workbench
npm run preview
```

---

## Contract Verification Summary

```
✔ Contract 1: Canonical 2-Document Fixture & Mathematical Envelope Verification (8.95ms)
✔ Contract 2: BM25 Formula, RSJ Non-Negative IDF, and Tie-Breaking (3.09ms)
✔ Contract 3: Duplicate-Family Suppression Policy Tradeoff (0.51ms)
✔ Contract 4: Monotonic Envelope Contraction Under Incremental Judgments (1.10ms)
✔ Contract 5: Minimax Next-Judgment Recommendation Heuristic (1.08ms)
ℹ tests 5
ℹ duration_ms 177.15ms
```

---

## Prior Art Attribution
- **Quepid** (OpenSource Connections): Search relevance workbench for Apache Solr and Elasticsearch.
- **ranx** (AmenRa): Fast Python information retrieval evaluation library.
- **BEIR**: Benchmark for diverse domain IR evaluations.

---

## License
MIT
