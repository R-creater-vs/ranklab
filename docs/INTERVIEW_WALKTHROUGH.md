# RANKLAB — Technical Deep-Dive Interview Walkthrough

## 1. System Architecture
RANKLAB is organized into three decoupled layers:
1. **Lexical Retrieval Engine (`src/domain/bm25.ts`, `tokenizer.ts`)**:
   - Inverted index with tokenization over Unicode NFKC and non-alphanumeric boundaries.
   - Non-negative Robertson-Spärck Jones IDF: $\text{idf}(t) = \ln(1 + \frac{N - \text{df}(t) + 0.5}{\text{df}(t) + 0.5})$.
   - Term-level explainability breakdown and duplicate-family suppression policy.
2. **Evaluation & Uncertainty Bounds Engine (`src/domain/metrics.ts`, `envelope.ts`)**:
   - Fixed candidate pool construction ($\mathcal{P} = \text{Top}_k(A) \cup \text{Top}_k(B) \cup \mathcal{D}_{\text{judged}}$).
   - Strict shared ideal denominator $\text{IDCG}@k$ ensuring neither engine receives an artificial boost from an asymmetric pool.
   - Exact binary enumeration over $2^u$ assignments ($u \le 12$) to extract $[\min \Delta, \max \Delta]$ and witness label sets.
   - Minimax greedy width reduction heuristic for next-judgment recommendations.
3. **Interactive Analytical Workbench (`src/features/`)**:
   - Search Duel, Evidence Envelope, Blinded Judgment Desk, Regression Map, and Run Notebook.

---

## 2. Common IR Interview Questions & Honest Answers

### Q: "Why is treating unjudged documents as non-relevant (0) dangerous in search evaluation?"
> "In pooled evaluation (e.g. TREC or internal search benchmarks), pool depth is finite. An existing production model often contributed documents to the historical judgment pool. When evaluating a new neural or hybrid ranker that retrieves novel, unjudged documents, standard pipelines mark those new documents as 0. This systematically penalizes model exploration and creates an artificial bias in favor of incumbent engines. RANKLAB computes the bounds of what the new engine could score if those unjudged documents are relevant."

### Q: "Are the envelope bounds confidence intervals or Bayesian probabilities?"
> "No, and that distinction is critical. They are **exact logical bounds over a discrete finite binary-label model**. They show the physical range of mathematically possible metric differences without making assumptions about prior probability distributions of relevance. If zero is inside the envelope, one cannot claim superiority without obtaining additional evidence."

### Q: "How does the shared IDCG denominator prevent evaluation drift?"
> "If Engine A and Engine B were evaluated against separate ideal denominators based only on the documents each retrieved, their NDCG scores would not be on a shared scale. RANKLAB fixes the candidate pool $\mathcal{P}$ as the union of both candidate sets before enumeration, computing a single shared $\text{IDCG}@k$ for every completion. This guarantees that $\text{NDCG}_A - \text{NDCG}_B$ is a strictly fair differential."

### Q: "Why split development and held-out queries by intent family?"
> "If two paraphrased queries belonging to the same intent family (e.g., 'connect to eduroam' and 'eduroam wifi setup') were split across development and held-out sets, lexical parameters tuned on development would leak directly into the test set. By strictly partitioning whole intent families into either development or held-out, we prevent cross-split leakage."
