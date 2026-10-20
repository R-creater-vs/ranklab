# RANKLAB — Prior Art & Novelty Boundaries

## 1. Prior Art in Information Retrieval Evaluation

### Quepid (OpenSource Connections)
- **Overview**: Quepid is the established open-source relevance workbench for search engineers tuning Solr, Elasticsearch, and OpenSearch. It provides Judged Rating Lists, pairwise comparison of search endpoints, and team judgment workflows.
- **How RANKLAB Differs**: Quepid treats unjudged documents as non-relevant (score 0) or unrated for simple scoring. RANKLAB implements exact finite enumeration over unresolved judgments ($2^u$), outputting upper and lower mathematical bounds $[\min \Delta, \max \Delta]$ and witness label sets.

### ranx (Pradeep et al. / AmenRa)
- **Overview**: A high-performance Python evaluation library supporting statistical tests (Student's t-test, Wilcoxon, bootstrap) and standard TREC metrics (NDCG, MAP, MRR).
- **How RANKLAB Differs**: `ranx` operates under complete qrels (or standard non-relevant imputation). RANKLAB focuses explicitly on the decision uncertainty created before judgments are complete.

### BEIR (Thakur et al., 2021)
- **Overview**: A heterogeneous benchmark suite for zero-shot IR model evaluation across 18 datasets, establishing the importance of pooled relevance judgment evaluation.
- **How RANKLAB Differs**: BEIR benchmarks full-corpus models. RANKLAB is a diagnostic laboratory for candidate pool sensitivity and missing evidence.

---

## 2. Novelty & Intellectual Honesty Boundaries
- **No Claim of New IR Metric**: RANKLAB calculates standard binary $\text{NDCG}@k$ and $\text{RR}@k$. The contribution is the exact bounded uncertainty interval and witness reconstruction.
- **Finite Model, Not Statistical Distribution**: The $[\min \Delta, \max \Delta]$ interval represents logical extremums under a discrete binary-label assumption ($r \in \{0, 1\}$). It is **not** a Bayesian posterior credible interval or frequentist confidence interval.
- **Minimax Heuristic Disclaimer**: The "next judgment" suggestion is a greedy minimax width reduction heuristic, not a guaranteed globally optimal active learning policy.
