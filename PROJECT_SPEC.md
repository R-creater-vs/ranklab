# RANKLAB — Search Evaluation Under Missing Judgments

Portfolio expansion 06 of 07 · Gemini 3.8 Flash / Antigravity · Self-contained build specification

**Idea:** A search comparison workbench that shows whether an apparent winner depends on documents nobody has judged yet.

**Recruiter-facing moment:** “The leaderboard says this search engine wins. Change one previously unknown relevance judgment and that conclusion is no longer supported.”

---
## BUILD PROMPT

Implement **RANKLAB**, a local search evaluation workbench with exact bounded judgment-uncertainty analysis on small query pools. Build real retrieval, real metrics, and an interactive explanation of missing evidence.

I am a BCA Data Analytics student with existing analytics and forecasting applications. This project adds information retrieval and evaluation design. A search box plus chatbot is insufficient. The mandatory contribution is the **range of possible engine comparisons under unresolved relevance judgments**, with replayable assignments that attain the bounds.

### 1. Constraints and architecture

Use React, strict TypeScript, Vite, a Web Worker, and a transparent local lexical retrieval engine. Implement BM25 and a simple token-overlap baseline in small pure modules, or use a well-documented library that exposes the needed scores. Verify the formulas independently.

No paid search service, external vector database, runtime LLM, GPU, backend, or API key. Default corpus and judgments are bundled. No scraping of private content. Optional public datasets must have verified reuse terms and provenance.

Keep corpus preparation, retrieval, evaluation, uncertainty enumeration, experiment storage, and UI separate. The worker and benchmark CLI import the same production evaluation engine. Lock dependencies and maintain `BUILD_STATUS.md`.

### 2. Dataset that makes the problem concrete

Author an explicitly fictional campus IT help corpus of 120 short documents. Include near-duplicate policy versions, shared terminology, obsolete instructions with clear version metadata, and genuinely different answers. Do not portray fictional policy as real college policy.

Schemas:

```text
Document: docId, familyId, title, body, version, current, topic
Query: queryId, text, intentFamily, split
Judgment: queryId, docId, relevance: 0 | 1 | null,
          assessor, rationale, revision
Run: runId, corpusHash, querySetHash, judgmentHash,
     tokenizerVersion, rankerConfig, producedRankings
```

`null` means unjudged, never silently nonrelevant. Produce 30 authored queries split by intent family into development and held-out evaluation sets. Keep paraphrases of one intent in the same split. Record who authored judgments; coding-agent-authored labels are not independent expert judgments.

Offer a blinded judgment mode that hides ranker identity and rank positions. Save changes locally and export them. Do not claim user research from self-authored labels.

### 3. Retrieval contract

Define Unicode normalization, case handling, tokenization, empty-query behavior, document lengths, and tie ordering by stable docId. Use the same tokenizer for indexing and querying.

BM25 uses a documented nonnegative IDF variant:

```text
idf(t) = ln(1 + (N - df(t) + 0.5)/(df(t) + 0.5))
score(q,d) = sum over distinct query terms:
  idf(t) * tf(t,d)*(k1+1) /
  (tf(t,d) + k1*(1-b + b*len(d)/avgLen))
```

Show term-level score contributions. Choose a fixed baseline and a small development-only parameter grid. Freeze parameters before reporting held-out performance.

Duplicate-family suppression is a separately named ranker policy: keep the top-ranked document per family. Show the resulting tradeoff rather than assuming suppression helps every query.

### 4. Metrics and incomplete evidence

Report binary NDCG@5 and reciprocal rank@5 on **fully judged evaluation pools**. State that candidate-pool evaluation is not corpus-wide recall. Include query-level scores and intent-family summaries; an overall mean must not hide failures.

For a ranking with relevance labels r:

```text
DCG@k = sum_i r_i / log2(i+1), with rank i starting at 1
IDCG@k = sum for ideal relevant-first ordering of the judged candidate pool
NDCG@k = DCG/IDCG
```

When no document is relevant, define NDCG as 0 and mark the query “no relevant item in pool.” Reciprocal rank is 1 / rank of first relevant item within k, otherwise 0.

If judgments are incomplete, a conventional “unjudged treated as 0” score may appear only as an explicitly labeled provisional baseline. It is not the main conclusion.

### 5. Mandatory signature mechanism: judgment envelope

For a query, construct a fixed candidate pool from the union of both rankers' top-five results, plus any declared extra judged documents. Fix this pool before enumeration. Up to 12 unjudged documents may have binary relevance 0 or 1.

Enumerate all `2^u` assignments for u <= 12. For each assignment, compute both engines' NDCG on the **same completed pool and ideal denominator**. Return:

- minimum and maximum of `NDCG_A - NDCG_B`;
- an actual relevance assignment attaining each bound;
- whether the sign is strictly positive throughout, strictly negative throughout, or unresolved/tied;
- enumeration size, fixed pool identity, and missing-judgment count.

These are logical bounds over a finite binary-label model, not confidence intervals or probabilities about real relevance. Larger pools must return “exact enumeration unsupported” or an explicitly labeled bounded/partial method. Never label a partial search exact.

For an eligible multi-query set with independent query-specific judgment variables, the macro-average difference's min/max equal the means of per-query minima/maxima. Explain that independence here is a modeling freedom, not a claim that relevance judgments are statistically independent.

Add a “next judgment” suggestion: for each unknown document, condition on relevance=0 and relevance=1, compute both remaining envelope widths, and prefer the smallest worst-case width. Tie-break by docId. Name it a minimax width heuristic, not optimal human labeling strategy.

### 6. Canonical fixture

Two documents x and y; ranker A orders `[x,y]`, ranker B `[y,x]`; k=2; x is relevant and y is unknown.

If y=0, A's NDCG is 1 and B's is `1/log2(3)`. If y=1, both score 1. Thus A-B is in `[0, 1 - 1/log2(3)]`: A is never worse in this tiny pool but not strictly better under every completion.

Now make both judgments unknown. The sign can favor either ranker; show both witness assignments. The UI must calculate these results from the production enumerator.

### 7. Views and art direction

**Search duel:** Side-by-side ranked results; linked rank movement; document family and judgment state.

**Evidence envelope:** A number line with minimum/maximum difference and zero; select an endpoint to apply its witness labels temporarily. Keep hypothetical assignments visually separate from saved assessor judgments.

**Judgment desk:** Blinded query/document review, rationale, unknown label, versioned edits, and next-judgment recommendation.

**Regression map:** Query-family heatmap, raw and duplicate-suppressed rankings, worst regressions, fixed evaluation set, and explicit held-out status.

**Run notebook:** Tokenizer, ranker parameters, corpus/judgment hashes, metric definitions, exports, and benchmark methodology.

Visual system: pale gray `#F3F5F8`, ink `#152336`, cobalt `#315FD4`, amber for unknown evidence. Use two tall ranked lists and a prominent envelope, not generic KPI tiles. Keyboard users must be able to select ranks, open evidence, and submit judgments. Include reduced motion, mobile stacked lists, 200% zoom, and text equivalents to charts.

### 8. Verification and evaluation

Tests import production code. Cover BM25 against independent hand cases, repeated query tokens, empty documents, ties, canonical NDCG, zero-relevance pools, MRR cutoff, duplicate-family grouping, unknown labels, enumeration bounds, endpoint reproduction, and export/import.

Independently brute-force tiny pools to verify the optimized worker enumerator. Test that completing judgments narrows or preserves the possible-comparison set; it cannot create outcomes outside the earlier exact envelope.

Run development configurations, freeze one, then evaluate held-out queries. Publish actual per-query rankings, judgment coverage, scores, bounds, and limitations. Do not demand the advanced ranker win.

Measure indexing, query latency, and exact enumeration at u=0, 4, 8, 12 on documented hardware. Add cancellation and stale-result protection.

Playwright: run canonical query → inspect envelope → reveal opposing witnesses → judge one document → recompute → export/reload → reproduce.

### 9. Milestones and deliverables

1. Implement retrieval/metrics and the two-document envelope fixture.
2. Build one real query-to-ranking-to-witness vertical slice.
3. Add corpus, blind judgments, duplicate policies, and next-judgment heuristic.
4. Run held-out evaluation, inspect screenshots, and test imports.
5. Document and prepare an honest showcase.

Ship source, fixtures, lockfile, valid dev/build/preview/test/test:e2e/benchmark commands, corpus license statement, README, evaluation contract, prior art, raw results, validation, performance, five screenshots, demo script, interview notes, and LinkedIn draft.

Interview topics: missing labels versus negative labels, pooled evaluation bias, query-family leakage, NDCG's shared denominator, and why bounds do not express probability.

### 10. Prior art and novelty limits

Review [Quepid](https://quepid-docs.dev.o19s.com/2/quepid), [ranx](https://github.com/AmenRa/ranx), and [BEIR](https://github.com/beir-cellar/beir). They establish existing relevance evaluation and benchmarking work. The proposed emphasis is the finite missing-judgment envelope, endpoint evidence, and next-judgment interaction.

These established methods and this limited research do not prove worldwide novelty. Do not advertise a new IR metric or claim other platforms cannot implement the workflow.

Begin milestone 1. Completion requires the exact bounded envelope and witnesses, not just a search comparison dashboard.

### Continuation prompt

Read PROJECT_SPEC.md and BUILD_STATUS.md. Resume RANKLAB's first incomplete milestone. Preserve unknown judgments, the shared fixed candidate pool, exact-versus-incomplete enumeration labels, and held-out queries. Verify actual production metrics before adding visual polish.

### Final audit prompt

Recompute the canonical envelopes independently. Verify every displayed endpoint using its witness assignment, ensure partial searches are not labeled exact, and test that imported runs reproduce rankings and judgments. Inspect the real browser journey and report evaluation limits.
